import { LLMFactory } from '../utils/llm.factory';
import { LLMProvider, OpenAIConfig, GroqConfig, OllamaConfig } from '../types/llm.interface';

/**
 * OOBE Protocol - LLM Provider Examples
 * Demonstrates multi-provider LLM switching capabilities
 */

async function main() {
  console.log('🤖 OOBE Protocol - Multi-LLM Provider Demo\n');

  // Initialize LLM Factory with a primary config
  const primaryConfig: OpenAIConfig = {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY || 'your-openai-key',
    model: 'gpt-4o-mini'
  };
  
  const llmFactory = new LLMFactory({ primary: primaryConfig });

  // Example 1: Basic OpenAI setup
  console.log('📡 Example 1: Basic OpenAI Setup');
  try {
    const openaiConfig: OpenAIConfig = {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY || 'your-openai-key',
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1000
    };

    const openaiLLM = await llmFactory.createLLM(openaiConfig);
    console.log('✅ OpenAI LLM created successfully');
    
    // Test basic chat
    const response1 = await openaiLLM.invoke([
      { role: 'human', content: 'Hello! What is OOBE Protocol?' }
    ]);
    console.log('🗣️  OpenAI Response:', response1.content);
  } catch (error) {
    console.error('❌ OpenAI Error:', error instanceof Error ? error.message : String(error));
  }

  // Example 2: Groq setup with fallback
  console.log('\n📡 Example 2: Groq with Fallback');
  try {
    const groqConfig: GroqConfig = {
      provider: 'groq',
      apiKey: process.env.GROQ_API_KEY || 'your-groq-key',
      model: 'mixtral-8x7b-32768',
      temperature: 0.5,
      maxTokens: 500,
      streaming: true
    };

    const groqLLM = await llmFactory.createLLM(groqConfig);
    console.log('✅ Groq LLM created successfully');
    
    const response2 = await groqLLM.invoke([
      { role: 'human', content: 'Explain Solana blockchain in 50 words' }
    ]);
    console.log('🗣️  Groq Response:', response2.content);
  } catch (error) {
    console.error('❌ Groq Error:', error instanceof Error ? error.message : String(error));
    console.log('🔄 Falling back to OpenAI...');
    
    // Fallback to OpenAI
    const fallbackConfig: OpenAIConfig = {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY || 'your-openai-key',
      model: 'gpt-3.5-turbo',
      temperature: 0.5
    };
    
    try {
      const fallbackLLM = await llmFactory.createLLM(fallbackConfig);
      const fallbackResponse = await fallbackLLM.invoke([
        { role: 'human', content: 'Explain Solana blockchain in 50 words' }
      ]);
      console.log('✅ Fallback Response:', fallbackResponse.content);
    } catch (fallbackError) {
      console.error('❌ Fallback failed:', fallbackError instanceof Error ? fallbackError.message : String(fallbackError));
    }
  }

  // Example 3: Local Ollama setup
  console.log('\n📡 Example 3: Local Ollama Setup');
  try {
    const ollamaConfig: OllamaConfig = {
      provider: 'ollama',
      model: 'llama3.2',
      baseUrl: 'http://localhost:11434',
      temperature: 0.8,
      maxTokens: 200,
      keepAlive: '10m'
    };

    const ollamaLLM = await llmFactory.createLLM(ollamaConfig);
    console.log('✅ Ollama LLM created successfully');
    
    const response3 = await ollamaLLM.invoke([
      { role: 'human', content: 'What are the benefits of local LLMs?' }
    ]);
    console.log('🗣️  Ollama Response:', response3.content);
  } catch (error) {
    console.error('❌ Ollama Error:', error instanceof Error ? error.message : String(error));
    console.log('💡 Make sure Ollama is running: ollama serve');
  }

  // Example 4: Provider Status Check
  console.log('\n🏥 Example 4: Provider Status Checks');
  const providers: LLMProvider[] = ['openai', 'groq', 'ollama', 'mistral'];
  
  for (const provider of providers) {
    try {
      const status = llmFactory.getProviderStatus(provider);
      if (status) {
        console.log(`${status.available ? '✅' : '❌'} ${provider.toUpperCase()}: ${status.available ? 'Healthy' : 'Unavailable'}`);
        if (status.error) {
          console.log(`   🚫 Error: ${status.error}`);
        }
      } else {
        console.log(`❓ ${provider.toUpperCase()}: Status unknown`);
      }
    } catch (error) {
      console.log(`❌ ${provider.toUpperCase()}: Status check failed`);
    }
  }

  // Example 5: Using Primary LLM
  console.log('\n🔄 Example 5: Using Primary LLM');
  
  try {
    const primaryLLM = await llmFactory.getPrimaryLLM();
    console.log('✅ Primary LLM available');
    
    const finalResponse = await primaryLLM.invoke([
      { role: 'human', content: 'Summarize OOBE Protocol capabilities in one sentence' }
    ]);
    console.log('🗣️  Primary LLM Response:', finalResponse.content);
  } catch (error) {
    console.error('❌ Primary LLM failed:', error instanceof Error ? error.message : String(error));
  }

  // Example 6: Provider Switching
  console.log('\n🔄 Example 6: Provider Switching');
  
  try {
    // Create a new Groq config for switching
    const groqSwitchConfig: GroqConfig = {
      provider: 'groq',
      apiKey: process.env.GROQ_API_KEY || 'your-groq-key',
      model: 'llama-3.1-8b-instant'
    };
    
    const switchedLLM = await llmFactory.switchProvider(groqSwitchConfig);
    console.log('🔄 Switched to Groq successfully');
    
    const switchResponse = await switchedLLM.invoke([
      { role: 'human', content: 'Hello from the switched provider!' }
    ]);
    console.log('🗣️  Switched Provider Response:', switchResponse.content);
  } catch (error) {
    console.error('❌ Provider switching failed:', error instanceof Error ? error.message : String(error));
  }

  console.log('\n🎉 Multi-LLM Provider Demo Complete!');
}

// Run the demo
if (require.main === module) {
  main().catch(console.error);
}

export { main as runLLMDemo };
