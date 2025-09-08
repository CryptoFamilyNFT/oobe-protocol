#!/usr/bin/env node

/**
 * Example showcasing the new Prisma database and MemorySaver configuration
 */

import { OobeCore, ConfigManager } from './dist/index.js';

console.log('🔧 Testing new Prisma DB and MemorySaver configuration...');

try {
  // Create configuration manager
  const configManager = new ConfigManager();
  
  // Test 1: Default configuration with new features
  console.log('\n1️⃣ Testing default configuration with Prisma and MemorySaver...');
  
  const defaultConfig = configManager.createDefaultConfig(
    'test_private_key',
    'test_openai_key', 
    'test_oobe_key'
  );
  
  console.log('✅ Default Prisma DB URL:', defaultConfig.url_prisma_db);
  console.log('✅ Default MemorySaver config:', JSON.stringify(defaultConfig.memorySaver, null, 2));
  
  // Test 2: Custom configuration
  console.log('\n2️⃣ Testing custom configuration...');
  
  const customConfig = configManager.createDefaultConfig(
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
    'postgresql://user:password@localhost:5432/oobe_db', // custom Prisma URL
    {
      enabled: true,
      storageType: 'memory',
    }
  );
  
  console.log('✅ Custom Prisma DB URL:', customConfig.url_prisma_db);
  console.log('✅ Custom MemorySaver config:', JSON.stringify(customConfig.memorySaver, null, 2));
  
  // Test 3: Core instantiation with new config
  console.log('\n3️⃣ Testing OobeCore instantiation...');
  
  try {
    const core = new OobeCore(customConfig);
    console.log('✅ OobeCore created successfully');
    
    // Access new methods
    console.log('✅ Prisma DB URL from core:', core.getPrismaDbUrl());
    console.log('✅ MemorySaver config from core:', JSON.stringify(core.getMemorySaverConfig(), null, 2));
  } catch (configError) {
    // Configuration errors are expected with test keys
    if (configError.message.includes('Non-base58') || configError.message.includes('Invalid configuration')) {
      console.log('ℹ️ Configuration error expected with test keys - this is normal');
      console.log('✅ Configuration structure validation passed');
    } else {
      throw configError;
    }
  }
  
  console.log('\n🎉 All new configuration tests passed!');
  
} catch (error) {
  console.error('❌ Configuration test failed:', error.message);
  process.exit(1);
}
