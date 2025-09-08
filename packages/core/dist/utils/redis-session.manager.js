"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessionManager = void 0;
const langgraph_1 = require("@langchain/langgraph");
/**
 * Redis-based checkpoint saver for LangGraph sessions
 * Supports multiple sessions, TTL, compression, and advanced session management
 */
class RedisSessionManager extends langgraph_1.BaseCheckpointSaver {
    constructor(config) {
        super();
        this.activeSessions = new Map();
        this.config = {
            host: 'localhost',
            port: 6379,
            database: 0,
            keyPrefix: 'oobe:session',
            ttl: 86400, // 24 hours default
            maxSessions: 100,
            enableCompression: false,
            ...config
        };
        this.keyPrefix = this.config.keyPrefix;
    }
    /**
     * Initialize Redis connection
     */
    async initialize() {
        try {
            // Dynamic import for Redis (optional dependency)
            let Redis;
            try {
                // Use dynamic import to avoid compilation errors when ioredis is not installed
                const ioredisModule = await eval('import("ioredis")');
                Redis = ioredisModule.default;
            }
            catch {
                throw new Error('ioredis package not found. Install it with: npm install ioredis @types/ioredis');
            }
            if (this.config.url) {
                this.redis = new Redis(this.config.url);
            }
            else {
                this.redis = new Redis({
                    host: this.config.host,
                    port: this.config.port,
                    password: this.config.password,
                    db: this.config.database,
                });
            }
            // Test connection
            await this.redis.ping();
            console.log('✅ Redis session manager connected successfully');
            // Load existing sessions
            await this.loadActiveSessions();
        }
        catch (error) {
            console.error('❌ Failed to initialize Redis session manager:', error);
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Redis connection failed: ${message}`);
        }
    }
    /**
     * Create a new session
     */
    async createSession(userId, metadata) {
        const sessionId = this.generateSessionId();
        const sessionMeta = {
            id: sessionId,
            createdAt: new Date(),
            lastAccessed: new Date(),
        };
        // Add optional properties only if they have values
        if (userId !== undefined) {
            sessionMeta.userId = userId;
        }
        if (metadata !== undefined) {
            sessionMeta.metadata = metadata;
        }
        if (this.config.ttl) {
            sessionMeta.expiresAt = new Date(Date.now() + this.config.ttl * 1000);
        }
        // Check session limit
        if (this.activeSessions.size >= this.config.maxSessions) {
            await this.cleanupOldestSession();
        }
        // Store session metadata
        await this.redis.hset(`${this.keyPrefix}:meta:${sessionId}`, 'data', JSON.stringify(sessionMeta));
        // Set TTL if configured
        if (this.config.ttl) {
            await this.redis.expire(`${this.keyPrefix}:meta:${sessionId}`, this.config.ttl);
        }
        this.activeSessions.set(sessionId, sessionMeta);
        console.log(`📝 Created new session: ${sessionId}${userId ? ` for user: ${userId}` : ''}`);
        return sessionId;
    }
    /**
     * Get session metadata
     */
    async getSession(sessionId) {
        try {
            const data = await this.redis.hget(`${this.keyPrefix}:meta:${sessionId}`, 'data');
            if (!data)
                return null;
            const sessionMeta = JSON.parse(data);
            // Update last accessed
            sessionMeta.lastAccessed = new Date();
            await this.updateSessionMetadata(sessionId, sessionMeta);
            return sessionMeta;
        }
        catch (error) {
            console.error(`Error getting session ${sessionId}:`, error);
            return null;
        }
    }
    /**
     * List all active sessions
     */
    async listSessions(userId) {
        const sessions = [];
        for (const [sessionId, sessionMeta] of this.activeSessions) {
            if (!userId || sessionMeta.userId === userId) {
                sessions.push(sessionMeta);
            }
        }
        return sessions.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
    }
    /**
     * Delete a session
     */
    async deleteSession(sessionId) {
        try {
            // Delete all checkpoint data for this session
            const pattern = `${this.keyPrefix}:${sessionId}:*`;
            const keys = await this.redis.keys(pattern);
            if (keys.length > 0) {
                await this.redis.del(...keys);
            }
            // Delete session metadata
            await this.redis.del(`${this.keyPrefix}:meta:${sessionId}`);
            this.activeSessions.delete(sessionId);
            console.log(`🗑️ Deleted session: ${sessionId}`);
            return true;
        }
        catch (error) {
            console.error(`Error deleting session ${sessionId}:`, error);
            return false;
        }
    }
    /**
     * Clean up expired sessions
     */
    async cleanupExpiredSessions() {
        const now = new Date();
        let cleanedCount = 0;
        for (const [sessionId, sessionMeta] of this.activeSessions) {
            if (sessionMeta.expiresAt && sessionMeta.expiresAt < now) {
                await this.deleteSession(sessionId);
                cleanedCount++;
            }
        }
        if (cleanedCount > 0) {
            console.log(`🧹 Cleaned up ${cleanedCount} expired sessions`);
        }
        return cleanedCount;
    }
    /**
     * Get session statistics
     */
    async getSessionStats() {
        const sessions = Array.from(this.activeSessions.values());
        const now = new Date();
        const sessionsByUser = {};
        let totalAge = 0;
        let oldestSession;
        let newestSession;
        for (const session of sessions) {
            // Count by user
            const userId = session.userId || 'anonymous';
            sessionsByUser[userId] = (sessionsByUser[userId] || 0) + 1;
            // Calculate age
            const age = now.getTime() - session.createdAt.getTime();
            totalAge += age;
            // Track oldest and newest
            if (!oldestSession || session.createdAt < oldestSession.createdAt) {
                oldestSession = session;
            }
            if (!newestSession || session.createdAt > newestSession.createdAt) {
                newestSession = session;
            }
        }
        const result = {
            totalSessions: sessions.length,
            sessionsByUser,
            averageSessionAge: sessions.length > 0 ? totalAge / sessions.length : 0,
        };
        if (oldestSession) {
            result.oldestSession = oldestSession;
        }
        if (newestSession) {
            result.newestSession = newestSession;
        }
        return result;
    }
    // BaseCheckpointSaver implementation
    async getTuple(config) {
        const sessionId = this.getSessionIdFromConfig(config);
        if (!sessionId)
            return undefined;
        try {
            const key = `${this.keyPrefix}:${sessionId}:checkpoint`;
            const data = await this.redis.hget(key, 'data');
            if (!data)
                return undefined;
            const parsed = JSON.parse(data);
            return {
                config,
                checkpoint: parsed.checkpoint,
                metadata: parsed.metadata,
            };
        }
        catch (error) {
            console.error(`Error getting checkpoint for session ${sessionId}:`, error);
            return undefined;
        }
    }
    async *list(config) {
        const sessionId = this.getSessionIdFromConfig(config);
        if (!sessionId)
            return;
        try {
            const pattern = `${this.keyPrefix}:${sessionId}:checkpoint:*`;
            const keys = await this.redis.keys(pattern);
            for (const key of keys) {
                const data = await this.redis.hget(key, 'data');
                if (data) {
                    const parsed = JSON.parse(data);
                    yield {
                        config,
                        checkpoint: parsed.checkpoint,
                        metadata: parsed.metadata,
                    };
                }
            }
        }
        catch (error) {
            console.error(`Error listing checkpoints for session ${sessionId}:`, error);
        }
    }
    async put(config, checkpoint, metadata) {
        const sessionId = this.getSessionIdFromConfig(config);
        if (!sessionId) {
            throw new Error('Session ID not found in config');
        }
        try {
            const key = `${this.keyPrefix}:${sessionId}:checkpoint`;
            const data = JSON.stringify({
                checkpoint,
                metadata,
                timestamp: new Date().toISOString()
            });
            await this.redis.hset(key, 'data', data);
            // Set TTL if configured
            if (this.config.ttl) {
                await this.redis.expire(key, this.config.ttl);
            }
            // Update session last accessed
            await this.updateSessionLastAccessed(sessionId);
            return config;
        }
        catch (error) {
            console.error(`Error saving checkpoint for session ${sessionId}:`, error);
            throw error;
        }
    }
    async putWrites(config, writes, taskId) {
        const sessionId = this.getSessionIdFromConfig(config);
        if (!sessionId) {
            throw new Error('Session ID not found in config');
        }
        try {
            const key = `${this.keyPrefix}:${sessionId}:writes:${taskId}`;
            const data = JSON.stringify({
                writes,
                taskId,
                timestamp: new Date().toISOString()
            });
            await this.redis.hset(key, 'data', data);
            // Set TTL if configured
            if (this.config.ttl) {
                await this.redis.expire(key, this.config.ttl);
            }
            // Update session last accessed
            await this.updateSessionLastAccessed(sessionId);
        }
        catch (error) {
            console.error(`Error saving writes for session ${sessionId}:`, error);
            throw error;
        }
    }
    // Private helper methods
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    getSessionIdFromConfig(config) {
        return config.configurable?.thread_id || config.configurable?.session_id;
    }
    async loadActiveSessions() {
        try {
            const pattern = `${this.keyPrefix}:meta:*`;
            const keys = await this.redis.keys(pattern);
            for (const key of keys) {
                const data = await this.redis.hget(key, 'data');
                if (data) {
                    const sessionMeta = JSON.parse(data);
                    this.activeSessions.set(sessionMeta.id, sessionMeta);
                }
            }
            console.log(`📚 Loaded ${this.activeSessions.size} active sessions`);
        }
        catch (error) {
            console.error('Error loading active sessions:', error);
        }
    }
    async updateSessionMetadata(sessionId, sessionMeta) {
        await this.redis.hset(`${this.keyPrefix}:meta:${sessionId}`, 'data', JSON.stringify(sessionMeta));
        this.activeSessions.set(sessionId, sessionMeta);
    }
    async updateSessionLastAccessed(sessionId) {
        const sessionMeta = this.activeSessions.get(sessionId);
        if (sessionMeta) {
            sessionMeta.lastAccessed = new Date();
            await this.updateSessionMetadata(sessionId, sessionMeta);
        }
    }
    async cleanupOldestSession() {
        let oldestSessionId;
        let oldestTime = Date.now();
        for (const [sessionId, sessionMeta] of this.activeSessions) {
            if (sessionMeta.lastAccessed.getTime() < oldestTime) {
                oldestTime = sessionMeta.lastAccessed.getTime();
                oldestSessionId = sessionId;
            }
        }
        if (oldestSessionId) {
            await this.deleteSession(oldestSessionId);
        }
    }
    /**
     * Disconnect from Redis
     */
    async disconnect() {
        if (this.redis) {
            await this.redis.quit();
            console.log('👋 Redis session manager disconnected');
        }
    }
}
exports.RedisSessionManager = RedisSessionManager;
//# sourceMappingURL=redis-session.manager.js.map