"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMemorySaverConfig = void 0;
exports.createMemorySaver = createMemorySaver;
exports.createRedisSessionManager = createRedisSessionManager;
const langgraph_1 = require("@langchain/langgraph");
const redis_session_manager_1 = require("./redis-session.manager");
/**
 * Creates and configures a MemorySaver instance based on the provided configuration
 * @param config - The OOBE configuration object containing memorySaver settings
 * @returns Configured MemorySaver instance or null if disabled
 */
function createMemorySaver(config) {
    // If memorySaver is not configured or disabled, return null
    if (!config.memorySaver?.enabled) {
        return null;
    }
    const { storageType, filePath, redisUrl } = config.memorySaver;
    switch (storageType) {
        case 'memory':
            // In-memory storage (default MemorySaver)
            return new langgraph_1.MemorySaver();
        case 'file':
            // File-based storage using SQLite
            if (filePath) {
                // For now, use default MemorySaver - file persistence will need custom implementation
                // TODO: Implement SQLite-based persistence for MemorySaver
                return new langgraph_1.MemorySaver();
            }
            throw new Error('File path is required for file-based memory storage');
        case 'redis':
            // Redis-based storage
            if (redisUrl) {
                return new redis_session_manager_1.RedisSessionManager({ url: redisUrl });
            }
            throw new Error('Redis URL is required for Redis-based memory storage');
        default:
            // Default to in-memory storage
            return new langgraph_1.MemorySaver();
    }
}
/**
 * Default memory saver configuration
 */
exports.defaultMemorySaverConfig = {
    enabled: true,
    storageType: 'file',
    filePath: './memory.sqlite',
};
/**
 * Creates a Redis session manager with advanced features
 * @param redisUrl Redis connection URL
 * @param options Additional configuration options
 * @returns Configured RedisSessionManager
 */
async function createRedisSessionManager(redisUrl, options) {
    const manager = new redis_session_manager_1.RedisSessionManager({
        url: redisUrl,
        ...options
    });
    await manager.initialize();
    return manager;
}
//# sourceMappingURL=memorySaver.helper.js.map