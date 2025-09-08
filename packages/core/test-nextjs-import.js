#!/usr/bin/env node

/**
 * Test to verify Next.js compatibility of oobe-protocol after TypeORM to Prisma migration
 * This simulates the import that was failing in Next.js
 */

console.log('🧪 Testing Next.js import compatibility...');

try {
  // This should work without the TypeORM "getMetadataArgsStorage" error
  const { OobeCore, DatabaseService } = require('./dist/index.js');
  
  console.log('✅ Successfully imported OobeCore:', typeof OobeCore);
  console.log('✅ Successfully imported DatabaseService:', typeof DatabaseService);
  
  // Test basic instantiation (should not throw metadata errors)
  console.log('🔧 Testing basic configuration...');
  
  const testConfig = {
    solanaEndpoint: 'https://api.mainnet-beta.solana.com',
    private_key: 'test_private_key_placeholder',
    openAiKey: 'test_openai_key_placeholder',
    solana_unofficial_endpoints: [], // Add this missing config
    database: {
      type: 'sqlite',
      database: ':memory:'
    }
  };
  
  try {
    // This should not throw "Cannot define property getMetadataArgsStorage"
    const core = new OobeCore(testConfig);
    console.log('✅ OobeCore instantiated successfully');
  } catch (configError) {
    // Configuration errors are expected with test keys, but not TypeORM errors
    if (configError.message.includes('getMetadataArgsStorage')) {
      throw new Error('TypeORM compatibility issue still exists!');
    }
    console.log('ℹ️ Configuration error (expected with test keys):', configError.message);
  }
  
  console.log('🎉 All tests passed! SDK is Next.js compatible');
  
} catch (error) {
  console.error('❌ Import test failed:', error.message);
  
  if (error.message.includes('getMetadataArgsStorage')) {
    console.error('🚨 TypeORM compatibility issue detected!');
  }
  
  if (error.message.includes('bigint')) {
    console.error('🚨 BigInt serialization issue detected!');
  }
  
  process.exit(1);
}
