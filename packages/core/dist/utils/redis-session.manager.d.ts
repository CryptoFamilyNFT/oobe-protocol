import { BaseCheckpointSaver, Checkpoint, CheckpointMetadata, CheckpointTuple } from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";
/**
 * Redis session configuration interface
 */
export interface RedisSessionConfig {
    host?: string;
    port?: number;
    password?: string;
    database?: number;
    url?: string;
    keyPrefix?: string;
    ttl?: number;
    maxSessions?: number;
    enableCompression?: boolean;
}
/**
 * Session metadata interface
 */
export interface SessionMetadata {
    id: string;
    userId?: string;
    createdAt: Date;
    lastAccessed: Date;
    expiresAt?: Date;
    metadata?: Record<string, any>;
}
/**
 * Redis-based checkpoint saver for LangGraph sessions
 * Supports multiple sessions, TTL, compression, and advanced session management
 */
export declare class RedisSessionManager extends BaseCheckpointSaver {
    private redis;
    private config;
    private keyPrefix;
    private activeSessions;
    constructor(config: RedisSessionConfig);
    /**
     * Initialize Redis connection
     */
    initialize(): Promise<void>;
    /**
     * Create a new session
     */
    createSession(userId?: string, metadata?: Record<string, any>): Promise<string>;
    /**
     * Get session metadata
     */
    getSession(sessionId: string): Promise<SessionMetadata | null>;
    /**
     * List all active sessions
     */
    listSessions(userId?: string): Promise<SessionMetadata[]>;
    /**
     * Delete a session
     */
    deleteSession(sessionId: string): Promise<boolean>;
    /**
     * Clean up expired sessions
     */
    cleanupExpiredSessions(): Promise<number>;
    /**
     * Get session statistics
     */
    getSessionStats(): Promise<{
        totalSessions: number;
        sessionsByUser: Record<string, number>;
        averageSessionAge: number;
        oldestSession?: SessionMetadata;
        newestSession?: SessionMetadata;
    }>;
    getTuple(config: RunnableConfig): Promise<CheckpointTuple | undefined>;
    list(config: RunnableConfig): AsyncGenerator<CheckpointTuple>;
    put(config: RunnableConfig, checkpoint: Checkpoint, metadata: CheckpointMetadata): Promise<RunnableConfig>;
    putWrites(config: RunnableConfig, writes: any[], taskId: string): Promise<void>;
    private generateSessionId;
    private getSessionIdFromConfig;
    private loadActiveSessions;
    private updateSessionMetadata;
    private updateSessionLastAccessed;
    private cleanupOldestSession;
    /**
     * Disconnect from Redis
     */
    disconnect(): Promise<void>;
}
//# sourceMappingURL=redis-session.manager.d.ts.map