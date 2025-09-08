#!/usr/bin/env node

/**
 * Redis Session Management Configuration Demo
 * Shows how to configure Redis sessions without requiring valid keys
 */

import { ConfigManager, RedisSessionManager } from './dist/index.js';

console.log('🔧 Redis Session Management Configuration Demo');
console.log('=============================================');

// Test 1: Different Redis configuration options
console.log('\n1Redis Configuration Options:');

const configManager = new ConfigManager();

// Basic Redis configuration
const basicRedisConfig = {
  enabled: true,
  storageType: 'redis',
  redisUrl: 'redis://localhost:6379'
};

// Advanced Redis configuration
const advancedRedisConfig = {
  enabled: true,
  storageType: 'redis',
  redisUrl: 'redis://username:password@redis-host:6379/0'
};

// Redis with TTL and session limits
const productionRedisConfig = {
  enabled: true,
  storageType: 'redis',
  redisUrl: 'redis://production-redis:6379',
  ttl: 86400, // 24 hours
  maxSessions: 1000
};

console.log('📋 Basic Redis Config:', JSON.stringify(basicRedisConfig, null, 2));
console.log('📋 Advanced Redis Config:', JSON.stringify(advancedRedisConfig, null, 2));
console.log('📋 Production Redis Config:', JSON.stringify(productionRedisConfig, null, 2));

// Test 2: RedisSessionManager configuration options
console.log('\n2️⃣ RedisSessionManager Configuration Options:');

const redisConfigs = [
  {
    name: 'Development',
    config: {
      host: 'localhost',
      port: 6379,
      keyPrefix: 'oobe:dev',
      ttl: 3600, // 1 hour
      maxSessions: 50
    }
  },
  {
    name: 'Production',
    config: {
      url: 'redis://prod-redis-cluster:6379',
      keyPrefix: 'oobe:prod',
      ttl: 86400, // 24 hours
      maxSessions: 10000,
      enableCompression: true
    }
  },
  {
    name: 'Testing',
    config: {
      host: 'localhost',
      port: 6379,
      database: 1,
      keyPrefix: 'oobe:test',
      ttl: 300, // 5 minutes
      maxSessions: 10
    }
  }
];

redisConfigs.forEach(({ name, config }) => {
  console.log(`\n${name} Configuration:`);
  console.log(JSON.stringify(config, null, 2));
  
  // Create manager instance (won't connect without initialize())
  const manager = new RedisSessionManager(config);
  console.log(`✅ ${name} RedisSessionManager created`);
});

// Test 3: Full OobeCore configuration examples
console.log('\n3️⃣ Complete OobeCore Configuration Examples:');

const configurations = [
  {
    name: 'Local Development',
    config: configManager.createDefaultConfig(
      'placeholder_private_key',
      'placeholder_openai_key',
      'placeholder_oobe_key',
      undefined, undefined, undefined,
      'oobedbleaf', 'oobedbroot', 'dev_strategy',
      [],
      'file:./dev.db',
      {
        enabled: true,
        storageType: 'redis',
        redisUrl: 'redis://localhost:6379'
      }
    )
  },
  {
    name: 'Production Setup',
    config: configManager.createDefaultConfig(
      'production_private_key',
      'production_openai_key', 
      'production_oobe_key',
      undefined, undefined, undefined,
      'prod_merkle_seed', 'prod_root_seed', 'prod_strategy',
      ['https://api.mainnet-beta.solana.com'],
      'postgresql://user:pass@db:5432/oobe',
      {
        enabled: true,
        storageType: 'redis',
        redisUrl: 'redis://redis-cluster:6379'
      }
    )
  },
  {
    name: 'Hybrid Storage',
    config: configManager.createDefaultConfig(
      'hybrid_private_key',
      'hybrid_openai_key',
      'hybrid_oobe_key',
      undefined, undefined, undefined,
      'hybrid_merkle', 'hybrid_root', 'hybrid_strategy',
      [],
      'file:./hybrid.db',
      {
        enabled: true,
        storageType: 'memory' // Fallback to memory if Redis fails
      }
    )
  }
];

configurations.forEach(({ name, config }) => {
  console.log(`\n${name} Configuration:`);
  console.log('Database URL:', config.url_prisma_db);
  console.log('MemorySaver:', JSON.stringify(config.memorySaver, null, 2));
});

// Test 4: Session management features overview
console.log('\n4️⃣ Session Management Features:');

const features = [
  '🔐 Multi-user session isolation',
  '⏰ Configurable session TTL (time-to-live)',
  '👥 User-based session filtering and listing',
  '📊 Real-time session statistics and monitoring',
  '🧹 Automatic cleanup of expired sessions',
  '💾 Persistent session storage with Redis',
  '🔄 Graceful fallback to in-memory storage',
  '🏷️ Custom session metadata support',
  '📈 Session limit management and rotation',
  '🔌 Easy integration with existing OobeCore applications'
];

features.forEach(feature => console.log(`  ${feature}`));

// Test 5: Usage examples
console.log('\n5️⃣ Usage Examples:');

console.log(`
// Example 1: Standalone Redis Session Manager
const manager = new RedisSessionManager({
  url: 'redis://localhost:6379',
  keyPrefix: 'myapp',
  ttl: 3600,
  maxSessions: 100
});

await manager.initialize();
const sessionId = await manager.createSession('user123', { role: 'admin' });

// Example 2: OobeCore with Redis Sessions
const config = configManager.createDefaultConfig(
  privateKey, openAiKey, oobeKey,
  undefined, undefined, undefined, undefined, undefined, undefined, [],
  'postgresql://localhost/mydb',
  { enabled: true, storageType: 'redis', redisUrl: 'redis://localhost:6379' }
);

const core = new OobeCore(config);
await core.start();

const sessionId = await core.createSession('user456');
const sessions = await core.listSessions();
const stats = await core.getSessionStats();

await core.stop();

// Example 3: Environment-based Configuration
const envConfig = {
  enabled: true,
  storageType: process.env.SESSION_STORAGE || 'memory',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
};
`);

console.log('\n✅ Redis Session Management Demo Completed!');
console.log('\n -- Installation Requirements:');
console.log('  npm install ioredis @types/ioredis');
console.log('\n -- Docker Redis Setup:');
console.log('  docker run -d -p 6379:6379 redis:alpine');
console.log('\n -- Environment Variables:');
console.log('  REDIS_URL=redis://localhost:6379');
console.log('  SESSION_STORAGE=redis');
console.log('  DATABASE_URL=postgresql://user:pass@localhost/db');
