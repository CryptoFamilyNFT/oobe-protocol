import { MemorySaver } from "@langchain/langgraph";
import { IConfiguration } from "../config/types/config.types";
import { RedisSessionManager } from "./redis-session.manager";

/**
 * Creates and configures a MemorySaver instance based on the provided configuration
 * @param config - The OOBE configuration object containing memorySaver settings
 * @returns Configured MemorySaver instance or null if disabled
 */
export function createMemorySaver(config: IConfiguration): MemorySaver | RedisSessionManager | null {
  // If memorySaver is not configured or disabled, return null
  if (!config.memorySaver?.enabled) {
    return null;
  }

  const { storageType, filePath, redisUrl } = config.memorySaver;

  switch (storageType) {
    case 'memory':
      // In-memory storage (default MemorySaver)
      return new MemorySaver();

    case 'file':
      // File-based storage using SQLite
      if (filePath) {
        // For now, use default MemorySaver - file persistence will need custom implementation
        // TODO: Implement SQLite-based persistence for MemorySaver
        return new MemorySaver();
      }
      throw new Error('File path is required for file-based memory storage');

    case 'redis':
      // Redis-based storage
      if (redisUrl) {
        return new RedisSessionManager({ url: redisUrl });
      }
      throw new Error('Redis URL is required for Redis-based memory storage');

    default:
      // Default to in-memory storage
      return new MemorySaver();
  }
}

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
export const defaultMemorySaverConfig: MemorySaverConfig = {
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
export async function createRedisSessionManager(
  redisUrl: string, 
  options?: Partial<import('./redis-session.manager').RedisSessionConfig>
): Promise<RedisSessionManager> {
  const manager = new RedisSessionManager({
    url: redisUrl,
    ...options
  });
  
  await manager.initialize();
  return manager;
}
