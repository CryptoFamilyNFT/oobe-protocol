import { MemorySaver } from "@langchain/langgraph";
import { IConfiguration } from "../config/types/config.types";
import { RedisSessionManager } from "./redis-session.manager";
/**
 * Creates and configures a MemorySaver instance based on the provided configuration
 * @param config - The OOBE configuration object containing memorySaver settings
 * @returns Configured MemorySaver instance or null if disabled
 */
export declare function createMemorySaver(config: IConfiguration): MemorySaver | RedisSessionManager | null;
/**
 * Type definition for memory saver configuration
 */
export interface MemorySaverConfig {
    enabled: boolean;
    storageType: 'memory' | 'file' | 'redis';
    filePath?: string;
    redisUrl?: string;
}
/**
 * Default memory saver configuration
 */
export declare const defaultMemorySaverConfig: MemorySaverConfig;
/**
 * Creates a Redis session manager with advanced features
 * @param redisUrl Redis connection URL
 * @param options Additional configuration options
 * @returns Configured RedisSessionManager
 */
export declare function createRedisSessionManager(redisUrl: string, options?: Partial<import('./redis-session.manager').RedisSessionConfig>): Promise<RedisSessionManager>;
//# sourceMappingURL=memorySaver.helper.d.ts.map