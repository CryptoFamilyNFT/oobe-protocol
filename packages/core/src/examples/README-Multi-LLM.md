*# OOBE Protocol - Multi-LLM Integration

The OOBE Protocol `Agent` class now supports integration with multiple LLM providers through the `LLMFactory` system. This functionality allows you to use different language models dynamically with automatic fallback.

## Supported Providers

- **OpenAI** - GPT-4, GPT-3.5, GPT-4o, etc.
- **Groq** - Mixtral, Llama-3.1, etc. (ultra-fast)
- **Mistral AI** - Mistral Large, Small, etc.
- **Ollama** - Llama 3.2, Qwen, etc. (local)
- **Together AI** - Optimized open-source models
- **X.AI (Grok)** - Grok models with real-time access
- **Fireworks** - Performance-optimized models

## Environment Configuration

```bash
# Required
OPENAI_API_KEY=your_openai_key
PRIVATE_KEY=your_solana_private_key_base58

# Optional - add to enable additional providers
GROQ_API_KEY=your_groq_key
MISTRAL_API_KEY=your_mistral_key
TOGETHER_API_KEY=your_together_key
XAI_API_KEY=your_xai_key
FIREWORKS_API_KEY=your_fireworks_key

# Ollama (local)
OLLAMA_BASE_URL=http://localhost:11434  # default
```

## Basic Usage

### Agent Initialization with Multi-LLM

```typescript
import { Agent } from './src/agent/Agents';
import { IOfficialEndpoint } from './src/config/types/config.types';
import Logger from './src/utils/logger/logger';

const solanaEndpoint: IOfficialEndpoint = {
  rpc: 'https://api.mainnet-beta.solana.com'
};

const agent = new Agent(
  solanaEndpoint,
  process.env.PRIVATE_KEY!,
  process.env.OPENAI_API_KEY!,
  new Logger()
);

// Initialize with auto-configuration of available providers
await agent.initialize();
```

### Switching Between Providers

```typescript
// Switch to Groq for ultra-fast performance
const groqConfig = {
  provider: 'groq' as const,
  apiKey: process.env.GROQ_API_KEY!,
  model: 'mixtral-8x7b-32768',
  temperature: 0.7
};

const groqLLM = await agent.switchLLMProvider(groqConfig);
const response = await groqLLM.invoke([
  { role: 'human', content: 'Explain Solana development' }
]);
```

### Local Usage with Ollama

```typescript
// Configure local Ollama
const ollamaConfig = {
  provider: 'ollama' as const,
  model: 'llama3.2',
  baseUrl: 'http://localhost:11434',
  temperature: 0.8
};

const localLLM = await agent.createLLM(ollamaConfig);
const response = await localLLM.invoke([
  { role: 'human', content: 'What are the benefits of local LLMs?' }
]);
```

## Available Methods

### Provider Management

```typescript
// Create a new LLM
const llm = await agent.createLLM(config);

// Change primary provider
const newLLM = await agent.switchLLMProvider(config);

// Get current LLM
const currentLLM = await agent.getCurrentLLM();

// Get the best available LLM
const bestLLM = await agent.getBestAvailableLLM(['groq', 'openai']);
```

### Status and Monitoring

```typescript
// Check status of all providers
const statuses = agent.getLLMProviderStatuses();
statuses.forEach((status, provider) => {
  console.log(`${provider}: ${status?.available ? 'Available' : 'Unavailable'}`);
});

// Check single provider
const isGroqAvailable = agent.isLLMProviderAvailable('groq');

// Configure multiple providers
await agent.configureLLMProviders([config1, config2, config3]);
```

### Integration with Agent Personality

```typescript
// Agent maintains personality even when changing LLM
const personality = await agent.getDefaultPersonality();
await agent.setPersonality(personality);

// New LLM will use the configured personality
const personalizedLLM = await agent.getCurrentLLM();
```

## Practical Examples

### 1. Automatic Fallback

```typescript
// Try Groq for speed, fallback to OpenAI if unavailable
try {
  const fastLLM = await agent.switchLLMProvider({
    provider: 'groq',
    apiKey: process.env.GROQ_API_KEY!,
    model: 'llama-3.1-8b-instant'
  });
  
  const response = await fastLLM.invoke([...]);
} catch (error) {
  console.log('Groq not available, using OpenAI...');
  const fallbackLLM = await agent.getCurrentLLM();
  const response = await fallbackLLM.invoke([...]);
}
```

### 2. Task-Specific LLM Selection

```typescript
// Use Groq for fast tasks
const quickLLM = await agent.createLLM({
  provider: 'groq',
  model: 'llama-3.1-8b-instant',
  temperature: 0.1
});

// Use GPT-4 for complex tasks
const complexLLM = await agent.createLLM({
  provider: 'openai',
  model: 'gpt-4',
  temperature: 0.8
});

// Use Ollama for privacy
const privateLLM = await agent.createLLM({
  provider: 'ollama',
  model: 'llama3.2'
});
```

### 3. Advanced Configuration

```typescript
// Configure multiple providers with priority
const configs = [
  { provider: 'groq', apiKey: process.env.GROQ_API_KEY!, model: 'mixtral-8x7b-32768' },
  { provider: 'mistral', apiKey: process.env.MISTRAL_API_KEY!, model: 'mistral-large-latest' },
  { provider: 'ollama', model: 'llama3.2', baseUrl: 'http://localhost:11434' }
];

await agent.configureLLMProviders(configs);

// Get the best available with priority
const preferredProviders = ['groq', 'mistral', 'openai'];
const bestLLM = await agent.getBestAvailableLLM(preferredProviders);
```

## Performance and Costs

| Provider | Speed | Cost | Use Cases |
|----------|-------|------|-----------|
| **Groq** | 🚀🚀🚀 | 💰 | Fast tasks, prototyping |
| **OpenAI** | 🚀🚀 | 💰💰💰 | Complex tasks, high quality |
| **Mistral** | 🚀🚀 | 💰💰 | Balanced quality/cost |
| **Ollama** | 🚀 | Free | Privacy, offline, development |
| **Together** | 🚀🚀 | 💰 | Optimized open-source |
| **X.AI** | 🚀🚀 | 💰💰 | Real-time info, analysis |

## Execution Examples

```bash
# Run basic demo
cd packages/core
npx ts-node src/examples/llm-example.ts

# Run Agent integration demo
npx ts-node src/examples/agent-llm-integration.ts

# With environment variables
GROQ_API_KEY=xxx MISTRAL_API_KEY=yyy npx ts-node src/examples/agent-llm-integration.ts
```

## Technical Notes

- **Auto-configuration**: The Agent automatically detects available providers from environment variables
- **Graceful Fallback**: If a provider fails, the system automatically falls back to the primary provider
- **Type Safety**: All configs are fully typed with TypeScript
- **Caching**: The LLM factory manages instance caching for performance
- **Error Handling**: Robust error handling with detailed logging

## Troubleshooting

### Provider unavailable
```bash
# Check that Ollama is running
ollama serve

# Verify API keys
echo $GROQ_API_KEY
echo $OPENAI_API_KEY
```

### Compilation errors
```bash
# Install missing dependencies
pnpm install @langchain/groq @langchain/mistralai @langchain/ollama
```

This integration makes OOBE Protocol extremely flexible in using different AI models, allowing optimization for speed, cost, or privacy depending on specific needs.
**