import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { 
  LLMConfig, 
  LLMProvider, 
  LLMFactoryConfig,
  LLMProviderStatus,
  OpenAIConfig,
  GroqConfig,
  MistralConfig,
  OllamaConfig,
  TogetherConfig,
  XAIConfig,
  FireworksConfig,
  DEFAULT_CONFIGS
} from "../types/llm.interface";

/**
 * LLM Factory for creating and managing different language model providers
 * Supports fallback providers and health checking
 */
export class LLMFactory {
  private config: LLMFactoryConfig;
  private currentProvider: BaseChatModel | null = null;
  private providerStatuses: Map<LLMProvider, LLMProviderStatus> = new Map();
  private healthCheckTimer?: NodeJS.Timeout | undefined;

  constructor(config: LLMFactoryConfig) {
    this.config = {
      retryAttempts: 3,
      retryDelay: 1000,
      healthCheckInterval: 60000, // 1 minute
      ...config
    };
  }

  /**
   * Create an LLM instance based on the configuration
   */
  async createLLM(config: LLMConfig): Promise<BaseChatModel> {
    try {
      switch (config.provider) {
        case 'openai':
          return await this.createOpenAI(config as OpenAIConfig);
        case 'groq':
          return await this.createGroq(config as GroqConfig);
        case 'mistral':
          return await this.createMistral(config as MistralConfig);
        case 'ollama':
          return await this.createOllama(config as OllamaConfig);
        case 'together':
          return await this.createTogether(config as TogetherConfig);
        case 'xai':
          return await this.createXAI(config as XAIConfig);
        case 'fireworks':
          return await this.createFireworks(config as FireworksConfig);
        default:
          throw new Error(`Unsupported LLM provider: ${(config as any).provider}`);
      }
    } catch (error) {
      console.error(`Failed to create LLM for provider ${config.provider}:`, error);
      throw error;
    }
  }

  /**
   * Get the primary LLM with fallback support
   */
  async getPrimaryLLM(): Promise<BaseChatModel> {
    if (this.currentProvider) {
      return this.currentProvider;
    }

    // Try primary provider first
    try {
      this.currentProvider = await this.createLLM(this.config.primary);
      this.updateProviderStatus(this.config.primary.provider, true);
      return this.currentProvider;
    } catch (error) {
      this.updateProviderStatus(this.config.primary.provider, false, error as Error);
      console.warn(`Primary provider ${this.config.primary.provider} failed, trying fallbacks...`);
    }

    // Try fallback providers
    if (this.config.fallbacks) {
      for (const fallbackConfig of this.config.fallbacks) {
        try {
          this.currentProvider = await this.createLLM(fallbackConfig);
          this.updateProviderStatus(fallbackConfig.provider, true);
          console.info(`Using fallback provider: ${fallbackConfig.provider}`);
          return this.currentProvider;
        } catch (error) {
          this.updateProviderStatus(fallbackConfig.provider, false, error as Error);
          console.warn(`Fallback provider ${fallbackConfig.provider} failed:`, error);
        }
      }
    }

    throw new Error('All LLM providers failed to initialize');
  }

  /**
   * Switch to a different provider
   */
  async switchProvider(config: LLMConfig): Promise<BaseChatModel> {
    try {
      const newProvider = await this.createLLM(config);
      this.currentProvider = newProvider;
      this.updateProviderStatus(config.provider, true);
      console.info(`Switched to provider: ${config.provider}`);
      return newProvider;
    } catch (error) {
      this.updateProviderStatus(config.provider, false, error as Error);
      throw error;
    }
  }

  /**
   * Get provider health status
   */
  getProviderStatus(provider: LLMProvider): LLMProviderStatus | undefined {
    return this.providerStatuses.get(provider);
  }

  /**
   * Get all provider statuses
   */
  getAllProviderStatuses(): LLMProviderStatus[] {
    return Array.from(this.providerStatuses.values());
  }

  /**
   * Start health checking for all configured providers
   */
  startHealthChecking(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
    }

    this.healthCheckTimer = setInterval(async () => {
      await this.performHealthCheck();
    }, this.config.healthCheckInterval);
  }

  /**
   * Stop health checking
   */
  stopHealthChecking(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = undefined;
    }
  }

  // Private methods for creating specific providers

  private async createOpenAI(config: OpenAIConfig): Promise<BaseChatModel> {
    try {
      const { ChatOpenAI } = await import('@langchain/openai');
      
      const openAIConfig: any = {
        openAIApiKey: config.apiKey,
        modelName: config.model,
        verbose: config.verbose || false
      };

      if (config.temperature !== undefined) openAIConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) openAIConfig.maxTokens = config.maxTokens;
      if (config.topP !== undefined) openAIConfig.topP = config.topP;
      if (config.frequencyPenalty !== undefined) openAIConfig.frequencyPenalty = config.frequencyPenalty;
      if (config.presencePenalty !== undefined) openAIConfig.presencePenalty = config.presencePenalty;
      if (config.streaming !== undefined) openAIConfig.streaming = config.streaming;
      if (config.organizationId) openAIConfig.organization = config.organizationId;
      if (config.baseURL) openAIConfig.configuration = { baseURL: config.baseURL };

      return new ChatOpenAI(openAIConfig);
    } catch (error) {
      throw new Error(`Failed to load OpenAI: ${error}. Install @langchain/openai`);
    }
  }

  private async createGroq(config: GroqConfig): Promise<BaseChatModel> {
    try {
      const { ChatGroq } = await eval('import("@langchain/groq")');
      
      const groqConfig: any = {
        apiKey: config.apiKey,
        model: config.model,
        verbose: config.verbose || false
      };

      if (config.temperature !== undefined) groqConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) groqConfig.maxTokens = config.maxTokens;
      if (config.streaming !== undefined) groqConfig.streaming = config.streaming;

      return new ChatGroq(groqConfig);
    } catch (error) {
      throw new Error(`Failed to load Groq: ${error}. Install @langchain/groq`);
    }
  }

  private async createMistral(config: MistralConfig): Promise<BaseChatModel> {
    try {
      const { ChatMistralAI } = await eval('import("@langchain/mistralai")');
      
      const mistralConfig: any = {
        apiKey: config.apiKey,
        model: config.model,
        verbose: config.verbose || false
      };

      if (config.temperature !== undefined) mistralConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) mistralConfig.maxTokens = config.maxTokens;
      if (config.topP !== undefined) mistralConfig.topP = config.topP;
      if (config.streaming !== undefined) mistralConfig.streaming = config.streaming;
      if (config.endpoint) mistralConfig.endpoint = config.endpoint;

      return new ChatMistralAI(mistralConfig);
    } catch (error) {
      throw new Error(`Failed to load Mistral: ${error}. Install @langchain/mistralai`);
    }
  }

  private async createOllama(config: OllamaConfig): Promise<BaseChatModel> {
    try {
      const { ChatOllama } = await eval('import("@langchain/ollama")');
      
      const ollamaConfig: any = {
        model: config.model,
        baseUrl: config.baseUrl || 'http://localhost:11434',
        keepAlive: config.keepAlive || '5m',
        verbose: config.verbose || false
      };

      if (config.temperature !== undefined) ollamaConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) ollamaConfig.numCtx = config.maxTokens;
      if (config.topP !== undefined) ollamaConfig.topP = config.topP;
      if (config.format) ollamaConfig.format = config.format;

      return new ChatOllama(ollamaConfig);
    } catch (error) {
      throw new Error(`Failed to load Ollama: ${error}. Install @langchain/ollama`);
    }
  }

  private async createTogether(config: TogetherConfig): Promise<BaseChatModel> {
    try {
      const { ChatTogetherAI } = await eval('import("@langchain/community/chat_models/togetherai")');
      
      const togetherConfig: any = {
        apiKey: config.apiKey,
        model: config.model,
        verbose: config.verbose || false
      };

      if (config.temperature !== undefined) togetherConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) togetherConfig.maxTokens = config.maxTokens;
      if (config.topP !== undefined) togetherConfig.topP = config.topP;
      if (config.streaming !== undefined) togetherConfig.streaming = config.streaming;

      return new ChatTogetherAI(togetherConfig);
    } catch (error) {
      throw new Error(`Failed to load Together AI: ${error}. Install @langchain/community`);
    }
  }

  private async createXAI(config: XAIConfig): Promise<BaseChatModel> {
    try {
      // X.AI uses OpenAI-compatible API
      const { ChatOpenAI } = await import('@langchain/openai');
      
      const xaiConfig: any = {
        openAIApiKey: config.apiKey,
        modelName: config.model,
        verbose: config.verbose || false,
        configuration: {
          baseURL: config.baseURL || 'https://api.x.ai/v1'
        }
      };

      if (config.temperature !== undefined) xaiConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) xaiConfig.maxTokens = config.maxTokens;
      if (config.topP !== undefined) xaiConfig.topP = config.topP;
      if (config.streaming !== undefined) xaiConfig.streaming = config.streaming;

      return new ChatOpenAI(xaiConfig);
    } catch (error) {
      throw new Error(`Failed to load X.AI: ${error}. Install @langchain/openai`);
    }
  }

  private async createFireworks(config: FireworksConfig): Promise<BaseChatModel> {
    try {
      const { ChatFireworks } = await eval('import("@langchain/community/chat_models/fireworks")');
      
      const fireworksConfig: any = {
        apiKey: config.apiKey,
        model: config.model,
        verbose: config.verbose || false
      };

      if (config.temperature !== undefined) fireworksConfig.temperature = config.temperature;
      if (config.maxTokens !== undefined) fireworksConfig.maxTokens = config.maxTokens;
      if (config.topP !== undefined) fireworksConfig.topP = config.topP;
      if (config.streaming !== undefined) fireworksConfig.streaming = config.streaming;
      if (config.baseURL) fireworksConfig.baseURL = config.baseURL;

      return new ChatFireworks(fireworksConfig);
    } catch (error) {
      throw new Error(`Failed to load Fireworks: ${error}. Install @langchain/community`);
    }
  }

  private updateProviderStatus(provider: LLMProvider, available: boolean, error?: Error): void {
    this.providerStatuses.set(provider, {
      provider,
      available,
      lastCheck: new Date(),
      ...(error?.message && { error: error.message })
    });
  }

  private async performHealthCheck(): Promise<void> {
    const configs = [this.config.primary, ...(this.config.fallbacks || [])];
    
    for (const config of configs) {
      try {
        const startTime = Date.now();
        const llm = await this.createLLM(config);
        
        // Simple test message
        await llm.invoke("test");
        
        const latency = Date.now() - startTime;
        this.providerStatuses.set(config.provider, {
          provider: config.provider,
          available: true,
          latency,
          lastCheck: new Date()
        });
      } catch (error) {
        this.updateProviderStatus(config.provider, false, error as Error);
      }
    }
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stopHealthChecking();
    this.currentProvider = null;
    this.providerStatuses.clear();
  }
}
