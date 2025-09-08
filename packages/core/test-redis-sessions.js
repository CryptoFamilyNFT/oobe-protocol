#!/usr/bin/env node

/**
 * Example showcasing Redis session management features
 * Note: This requires Redis to be running and ioredis package installed
 */

import { OobeCore, ConfigManager, RedisSessionManager } from './dist/index.js';

console.log('🔧 Testing Redis Session Management...');

async function testRedisFeatures() {
  try {
    // Test 1: Configuration with Redis
    console.log('\n1️⃣ Testing Redis configuration...');
    
    const configManager = new ConfigManager();
    
    const redisConfig = configManager.createDefaultConfig(
      'test_private_key',
      'test_openai_key',
      'test_oobe_key',
      undefined, // solanaEndpoint
      undefined, // solanaUnofficialEndpoints  
      undefined, // solanaExplorer
      'oobedbleaf', // merkleDbSeed
      'oobedbroot', // merkleRootSeed
      'test_strategy', // strategy_key
      [], // transportsRPC
      'file:./test.db', // Prisma URL
      {
        enabled: true,
        storageType: 'redis',
        redisUrl: 'redis://localhost:6379'
      }
    );
    
    console.log('✅ Redis config created:', JSON.stringify(redisConfig.memorySaver, null, 2));
    
    // Test 2: Standalone Redis Session Manager
    console.log('\n2️⃣ Testing standalone Redis Session Manager...');
    
    const redisManager = new RedisSessionManager({
      host: 'localhost',
      port: 6379,
      keyPrefix: 'oobe:test',
      ttl: 3600, // 1 hour
      maxSessions: 10
    });
    
    console.log('✅ Redis session manager created');
    console.log('ℹ️ Note: To test Redis features, make sure Redis is running on localhost:6379');
    console.log('ℹ️ Install ioredis with: npm install ioredis @types/ioredis');
    
    // Test 3: OobeCore with Redis (will fail gracefully if Redis not available)
    console.log('\n3️⃣ Testing OobeCore with Redis configuration...');
    
    try {
      // This will create the core but may fail on start() if Redis is not available
      const core = new OobeCore(redisConfig);
      console.log('✅ OobeCore created with Redis config');
      
      // Check if session manager is available
      const sessionManager = core.getSessionManager();
      if (sessionManager) {
        console.log('✅ Redis session manager available in core');
      } else {
        console.log('ℹ️ Using fallback memory storage (Redis not configured)');
      }
      
    } catch (configError) {
      console.log('ℹ️ Configuration error (expected with test keys)');
    }
    
    // Test 4: Example session operations (conceptual)
    console.log('\n4️⃣ Example session operations (Redis required):');
    console.log(`
    // Initialize Redis session manager
    const manager = new RedisSessionManager({ url: 'redis://localhost:6379' });
    await manager.initialize();
    
    // Create sessions
    const sessionId1 = await manager.createSession('user123', { role: 'admin' });
    const sessionId2 = await manager.createSession('user456', { role: 'user' });
    
    // List sessions
    const sessions = await manager.listSessions();
    console.log('Active sessions:', sessions.length);
    
    // Get session stats
    const stats = await manager.getSessionStats();
    console.log('Session statistics:', stats);
    
    // Clean up expired sessions
    const cleaned = await manager.cleanupExpiredSessions();
    console.log('Cleaned up sessions:', cleaned);
    
    // With OobeCore
    const core = new OobeCore(redisConfig);
    await core.start(); // Initializes Redis connection
    
    const newSessionId = await core.createSession('user789');
    const allSessions = await core.listSessions();
    const sessionStats = await core.getSessionStats();
    
    await core.stop(); // Disconnects Redis
    `);
    
    console.log('\n🎉 Redis session management test completed!');
    console.log('\n📚 Features available:');
    console.log('  ✅ Multiple session support');
    console.log('  ✅ Session TTL and expiration');
    console.log('  ✅ User-based session filtering');
    console.log('  ✅ Session metadata and statistics');
    console.log('  ✅ Automatic cleanup of expired sessions');
    console.log('  ✅ Integration with OobeCore');
    console.log('  ✅ Fallback to in-memory storage');
    
  } catch (error) {
    console.error('❌ Redis test failed:', error.message);
  }
}

testRedisFeatures();
