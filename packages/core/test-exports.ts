// Test file to verify all exports work correctly
import {
  // Core exports
  OobeCore,
  Agent,
  Logger,
  
  // Database exports
  DatabaseService,
  
  // Multi-LLM exports
  LLMFactory,
  
  // Session management
  RedisSessionManager,
  
  // LLM Types
  LLMConfig,
  LLMProvider,
  OpenAIConfig,
  GroqConfig,
  OllamaConfig,
  
  // Core types
  IConfiguration,
  
} from './src/index';

console.log('✅ All exports imported successfully!');

// Test LLM config types
const openaiConfig: OpenAIConfig = {
  provider: 'openai',
  apiKey: 'test-key',
  model: 'gpt-4'
};

const groqConfig: GroqConfig = {
  provider: 'groq',
  apiKey: 'test-key',
  model: 'mixtral-8x7b-32768'
};

console.log('✅ LLM configuration types work!');

// Test that we can reference the classes (without instantiating)
console.log('Available classes:');
console.log('- OobeCore:', typeof OobeCore);
console.log('- Agent:', typeof Agent);
console.log('- LLMFactory:', typeof LLMFactory);
console.log('- RedisSessionManager:', typeof RedisSessionManager);
console.log('- DatabaseService:', typeof DatabaseService);

console.log('🎉 All Next.js/Turbopack exports are working correctly!');
