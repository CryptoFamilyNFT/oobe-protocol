#!/usr/bin/env node

/**
 * Practical example of Redis session management with OOBE Protocol
 * This shows how to use Redis sessions in a real application scenario
 */

import { OobeCore, ConfigManager } from './dist/index.js';

/**
 * Example: Multi-user chat application with persistent sessions
 */
class ChatApplication {
  constructor() {
    this.core = null;
    this.userSessions = new Map();
  }

  async initialize() {
    const configManager = new ConfigManager();
    
    // Configure with Redis session storage
    const config = configManager.createDefaultConfig(
      process.env.SOLANA_PRIVATE_KEY || 'your_private_key_here',
      process.env.OPENAI_API_KEY || 'your_openai_key_here',
      process.env.OOBE_KEY || 'your_oobe_key_here',
      undefined, undefined, undefined,
      'oobedbleaf', 'oobedbroot', 'chat_strategy',
      [],
      process.env.DATABASE_URL || 'file:./chat.db',
      {
        enabled: true,
        storageType: 'redis',
        redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
      }
    );

    this.core = new OobeCore(config);
    
    try {
      await this.core.start();
      console.log('-- Chat application started with Redis sessions');
      return true;
    } catch (error) {
      console.log('-- Redis not available, using fallback storage');
      console.log('Error:', error.message);
      return false;
    }
  }

  async createUserSession(userId, userMetadata = {}) {
    try {
      const sessionId = await this.core.createSession(userId, {
        ...userMetadata,
        sessionType: 'chat',
        startedAt: new Date().toISOString()
      });

      if (sessionId) {
        this.userSessions.set(userId, sessionId);
        console.log(`👤 Created session for user ${userId}: ${sessionId}`);
        return sessionId;
      }
      
      // Fallback for non-Redis storage
      const fallbackSessionId = `fallback_${userId}_${Date.now()}`;
      this.userSessions.set(userId, fallbackSessionId);
      return fallbackSessionId;
      
    } catch (error) {
      console.error(`Error creating session for user ${userId}:`, error);
      return null;
    }
  }

  async getUserSession(userId) {
    return this.userSessions.get(userId);
  }

  async listAllSessions() {
    try {
      const sessions = await this.core.listSessions();
      if (sessions) {
        console.log('-- Active sessions:');
        sessions.forEach(session => {
          console.log(`  - User: ${session.userId || 'anonymous'}, Session: ${session.id}, Last accessed: ${session.lastAccessed}`);
        });
        return sessions;
      }
      
      // Fallback for non-Redis storage
      console.log('-- Fallback sessions:', Array.from(this.userSessions.entries()));
      return Array.from(this.userSessions.entries()).map(([userId, sessionId]) => ({
        userId,
        sessionId,
        type: 'fallback'
      }));
      
    } catch (error) {
      console.error('Error listing sessions:', error);
      return [];
    }
  }

  async getSessionStatistics() {
    try {
      const stats = await this.core.getSessionStats();
      if (stats) {
        console.log('-- Session Statistics:');
        console.log(`  - Total sessions: ${stats.totalSessions}`);
        console.log(`  - Sessions by user:`, stats.sessionsByUser);
        console.log(`  - Average session age: ${Math.round(stats.averageSessionAge / 1000 / 60)} minutes`);
        return stats;
      }
      
      console.log('📊 Fallback statistics: Total sessions:', this.userSessions.size);
      return { totalSessions: this.userSessions.size, type: 'fallback' };
      
    } catch (error) {
      console.error('Error getting statistics:', error);
      return null;
    }
  }

  async cleanupOldSessions() {
    try {
      const cleaned = await this.core.cleanupExpiredSessions();
      console.log(`🧹 Cleaned up ${cleaned} expired sessions`);
      return cleaned;
    } catch (error) {
      console.error('Error cleaning up sessions:', error);
      return 0;
    }
  }

  async removeUserSession(userId) {
    try {
      const sessionId = this.userSessions.get(userId);
      if (sessionId) {
        const success = await this.core.deleteSession(sessionId);
        if (success) {
          this.userSessions.delete(userId);
          console.log(`🗑️ Removed session for user ${userId}`);
          return true;
        }
      }
      
      // Fallback removal
      this.userSessions.delete(userId);
      console.log(`🗑️ Removed fallback session for user ${userId}`);
      return true;
      
    } catch (error) {
      console.error(`Error removing session for user ${userId}:`, error);
      return false;
    }
  }

  async shutdown() {
    try {
      await this.core.stop();
      console.log('👋 Chat application stopped');
    } catch (error) {
      console.error('Error stopping application:', error);
    }
  }
}

// Example usage
async function runChatExample() {
  console.log('🎯 Starting Chat Application Example');
  console.log('==================================');
  
  const app = new ChatApplication();
  
  // Initialize the application
  const redisAvailable = await app.initialize();
  
  if (redisAvailable) {
    console.log('✅ Using Redis for session management');
  } else {
    console.log('ℹ️ Using fallback session management');
  }
  
  // Simulate multiple users joining
  console.log('\n👥 Simulating users joining...');
  await app.createUserSession('alice', { role: 'admin', location: 'US' });
  await app.createUserSession('bob', { role: 'user', location: 'EU' });
  await app.createUserSession('charlie', { role: 'user', location: 'ASIA' });
  
  // List active sessions
  console.log('\n📋 Listing active sessions...');
  await app.listAllSessions();
  
  // Get statistics
  console.log('\n📊 Getting session statistics...');
  await app.getSessionStatistics();
  
  // Simulate user leaving
  console.log('\n👋 User bob leaving...');
  await app.removeUserSession('bob');
  
  // Final statistics
  console.log('\n📊 Final statistics...');
  await app.getSessionStatistics();
  
  // Cleanup
  console.log('\n🧹 Cleaning up...');
  await app.cleanupOldSessions();
  
  // Shutdown
  console.log('\n🛑 Shutting down...');
  await app.shutdown();
  
  console.log('\n✅ Chat application example completed!');
}

// Run the example
runChatExample().catch(console.error);
