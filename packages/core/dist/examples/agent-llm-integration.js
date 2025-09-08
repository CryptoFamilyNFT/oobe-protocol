"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAgentLLMDemo = main;
const Agents_1 = require("../agent/Agents");
const logger_1 = __importDefault(require("../utils/logger/logger"));
/**
 * OOBE Protocol - Agent Multi-LLM Integration Example
 * Demonstrates how to use different LLM providers through the Agent class
 */
async function main() {
    console.log('OOBE Agent - Multi-LLM Integration Demo\n');
    // Initialize Agent with required parameters
    const solanaEndpoint = {
        rpc: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
    };
    const privateKey = process.env.PRIVATE_KEY || 'your-private-key-base58';
    const openAIKey = process.env.OPENAI_API_KEY || 'your-openai-key';
    const logger = new logger_1.default();
    // Create Agent instance
    const agent = new Agents_1.Agent(solanaEndpoint, privateKey, openAIKey, logger);
    try {
        // Initialize agent (this will auto-configure available LLM providers)
        await agent.initialize();
        console.log('\n📊 LLM Provider Status:');
        const statuses = agent.getLLMProviderStatuses();
        statuses.forEach((status, provider) => {
            const icon = status?.available ? '✅' : '❌';
            console.log(`${icon} ${provider.toUpperCase()}: ${status?.available ? 'Available' : 'Unavailable'}`);
            if (status?.error) {
                console.log(`   🚫 Error: ${status.error}`);
            }
        });
        // Example 1: Using default LLM (usually OpenAI)
        console.log('\n📡 Example 1: Using Default LLM');
        try {
            const defaultLLM = await agent.getOobeAgent();
            const response1 = await defaultLLM.invoke([
                { role: 'human', content: 'What is OOBE Protocol? Answer in 50 words.' }
            ]);
            console.log('🗣️  Default LLM Response:', response1.content);
        }
        catch (error) {
            console.error('❌ Default LLM Error:', error instanceof Error ? error.message : String(error));
        }
        // Example 2: Switching to Groq if available
        console.log('\n📡 Example 2: Switching to Groq');
        if (process.env.GROQ_API_KEY && agent.isLLMProviderAvailable('groq')) {
            try {
                const groqConfig = {
                    provider: 'groq',
                    apiKey: process.env.GROQ_API_KEY,
                    model: 'mixtral-8x7b-32768',
                    temperature: 0.7
                };
                const groqLLM = await agent.switchLLMProvider(groqConfig);
                const response2 = await groqLLM.invoke([
                    { role: 'human', content: 'Explain Solana blockchain architecture briefly.' }
                ]);
                console.log('🗣️  Groq LLM Response:', response2.content);
            }
            catch (error) {
                console.error('❌ Groq Error:', error instanceof Error ? error.message : String(error));
            }
        }
        else {
            console.log('⚠️  Groq not available - add GROQ_API_KEY to environment');
        }
        // Example 3: Using local Ollama if running
        console.log('\n📡 Example 3: Testing Local Ollama');
        try {
            const ollamaConfig = {
                provider: 'ollama',
                model: 'llama3.2',
                baseUrl: 'http://localhost:11434',
                temperature: 0.8
            };
            const ollamaLLM = await agent.createLLM(ollamaConfig);
            const response3 = await ollamaLLM.invoke([
                { role: 'human', content: 'What are the benefits of using local LLMs?' }
            ]);
            console.log('🗣️  Ollama Response:', response3.content);
        }
        catch (error) {
            console.log('⚠️  Ollama not available - make sure it\'s running: ollama serve');
        }
        // Example 4: Getting the best available LLM
        console.log('\n📡 Example 4: Getting Best Available LLM');
        try {
            const preferredProviders = ['groq', 'openai', 'mistral'];
            const bestLLM = await agent.getBestAvailableLLM(preferredProviders);
            const response4 = await bestLLM.invoke([
                { role: 'human', content: 'Hello from the best available LLM provider!' }
            ]);
            console.log('🗣️  Best LLM Response:', response4.content);
        }
        catch (error) {
            console.error('❌ Best LLM Error:', error instanceof Error ? error.message : String(error));
        }
        // Example 5: Using Agent personality with different LLMs
        console.log('\n📡 Example 5: Agent Personality with Different LLMs');
        try {
            const personality = await agent.getDefaultPersonality();
            await agent.setPersonality(personality);
            const personalityLLM = await agent.getCurrentLLM();
            const response5 = await personalityLLM.invoke([
                { role: 'human', content: `Act according to your personality: ${personality.name}. Tell me about Solana development.` }
            ]);
            console.log('🗣️  Personality Response:', response5.content);
        }
        catch (error) {
            console.error('❌ Personality Error:', error instanceof Error ? error.message : String(error));
        }
        // Example 6: Configure multiple providers at once
        console.log('\n📡 Example 6: Configuring Multiple Providers');
        const multiConfigs = [];
        if (process.env.GROQ_API_KEY) {
            multiConfigs.push({
                provider: 'groq',
                apiKey: process.env.GROQ_API_KEY,
                model: 'llama-3.1-8b-instant'
            });
        }
        if (process.env.MISTRAL_API_KEY) {
            multiConfigs.push({
                provider: 'mistral',
                apiKey: process.env.MISTRAL_API_KEY,
                model: 'mistral-small-latest'
            });
        }
        if (multiConfigs.length > 0) {
            await agent.configureLLMProviders(multiConfigs);
            console.log(`✅ Configured ${multiConfigs.length} additional LLM providers`);
        }
        else {
            console.log('ℹ️  No additional API keys found for multi-provider demo');
        }
        console.log('\n🎉 Agent Multi-LLM Integration Demo Complete!');
        console.log('\n💡 Available Environment Variables:');
        console.log('   - OPENAI_API_KEY (required)');
        console.log('   - GROQ_API_KEY (optional)');
        console.log('   - MISTRAL_API_KEY (optional)');
        console.log('   - TOGETHER_API_KEY (optional)');
        console.log('   - XAI_API_KEY (optional)');
        console.log('   - FIREWORKS_API_KEY (optional)');
        console.log('   - OLLAMA_BASE_URL (optional, default: http://localhost:11434)');
    }
    catch (error) {
        console.error('❌ Demo failed:', error instanceof Error ? error.message : String(error));
    }
    finally {
        // Cleanup
        await agent.shutdown();
    }
}
// Environment setup helper
function checkEnvironment() {
    const required = ['OPENAI_API_KEY', 'PRIVATE_KEY'];
    const optional = ['GROQ_API_KEY', 'MISTRAL_API_KEY', 'TOGETHER_API_KEY', 'XAI_API_KEY', 'FIREWORKS_API_KEY'];
    console.log('🔍 Environment Check:');
    required.forEach(key => {
        const available = !!process.env[key];
        console.log(`${available ? '✅' : '❌'} ${key}: ${available ? 'Set' : 'Missing (required)'}`);
    });
    optional.forEach(key => {
        const available = !!process.env[key];
        console.log(`${available ? '✅' : 'ℹ️ '} ${key}: ${available ? 'Set' : 'Not set (optional)'}`);
    });
    console.log('');
}
// Run the demo
if (require.main === module) {
    checkEnvironment();
    main().catch(console.error);
}
//# sourceMappingURL=agent-llm-integration.js.map