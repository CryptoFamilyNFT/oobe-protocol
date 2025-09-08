"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMFactory = void 0;
/**
 * LLM Factory for creating and managing different language model providers
 * Supports fallback providers and health checking
 */
class LLMFactory {
    constructor(config) {
        this.currentProvider = null;
        this.providerStatuses = new Map();
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
    async createLLM(config) {
        try {
            switch (config.provider) {
                case 'openai':
                    return await this.createOpenAI(config);
                case 'groq':
                    return await this.createGroq(config);
                case 'mistral':
                    return await this.createMistral(config);
                case 'ollama':
                    return await this.createOllama(config);
                case 'together':
                    return await this.createTogether(config);
                case 'xai':
                    return await this.createXAI(config);
                case 'fireworks':
                    return await this.createFireworks(config);
                default:
                    throw new Error(`Unsupported LLM provider: ${config.provider}`);
            }
        }
        catch (error) {
            console.error(`Failed to create LLM for provider ${config.provider}:`, error);
            throw error;
        }
    }
    /**
     * Get the primary LLM with fallback support
     */
    async getPrimaryLLM() {
        if (this.currentProvider) {
            return this.currentProvider;
        }
        // Try primary provider first
        try {
            this.currentProvider = await this.createLLM(this.config.primary);
            this.updateProviderStatus(this.config.primary.provider, true);
            return this.currentProvider;
        }
        catch (error) {
            this.updateProviderStatus(this.config.primary.provider, false, error);
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
                }
                catch (error) {
                    this.updateProviderStatus(fallbackConfig.provider, false, error);
                    console.warn(`Fallback provider ${fallbackConfig.provider} failed:`, error);
                }
            }
        }
        throw new Error('All LLM providers failed to initialize');
    }
    /**
     * Switch to a different provider
     */
    async switchProvider(config) {
        try {
            const newProvider = await this.createLLM(config);
            this.currentProvider = newProvider;
            this.updateProviderStatus(config.provider, true);
            console.info(`Switched to provider: ${config.provider}`);
            return newProvider;
        }
        catch (error) {
            this.updateProviderStatus(config.provider, false, error);
            throw error;
        }
    }
    /**
     * Get provider health status
     */
    getProviderStatus(provider) {
        return this.providerStatuses.get(provider);
    }
    /**
     * Get all provider statuses
     */
    getAllProviderStatuses() {
        return Array.from(this.providerStatuses.values());
    }
    /**
     * Start health checking for all configured providers
     */
    startHealthChecking() {
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
    stopHealthChecking() {
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
            this.healthCheckTimer = undefined;
        }
    }
    // Private methods for creating specific providers
    async createOpenAI(config) {
        try {
            const { ChatOpenAI } = await Promise.resolve().then(() => __importStar(require('@langchain/openai')));
            const openAIConfig = {
                openAIApiKey: config.apiKey,
                modelName: config.model,
                verbose: config.verbose || false
            };
            if (config.temperature !== undefined)
                openAIConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                openAIConfig.maxTokens = config.maxTokens;
            if (config.topP !== undefined)
                openAIConfig.topP = config.topP;
            if (config.frequencyPenalty !== undefined)
                openAIConfig.frequencyPenalty = config.frequencyPenalty;
            if (config.presencePenalty !== undefined)
                openAIConfig.presencePenalty = config.presencePenalty;
            if (config.streaming !== undefined)
                openAIConfig.streaming = config.streaming;
            if (config.organizationId)
                openAIConfig.organization = config.organizationId;
            if (config.baseURL)
                openAIConfig.configuration = { baseURL: config.baseURL };
            return new ChatOpenAI(openAIConfig);
        }
        catch (error) {
            throw new Error(`Failed to load OpenAI: ${error}. Install @langchain/openai`);
        }
    }
    async createGroq(config) {
        try {
            const { ChatGroq } = await eval('import("@langchain/groq")');
            const groqConfig = {
                apiKey: config.apiKey,
                model: config.model,
                verbose: config.verbose || false
            };
            if (config.temperature !== undefined)
                groqConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                groqConfig.maxTokens = config.maxTokens;
            if (config.streaming !== undefined)
                groqConfig.streaming = config.streaming;
            return new ChatGroq(groqConfig);
        }
        catch (error) {
            throw new Error(`Failed to load Groq: ${error}. Install @langchain/groq`);
        }
    }
    async createMistral(config) {
        try {
            const { ChatMistralAI } = await eval('import("@langchain/mistralai")');
            const mistralConfig = {
                apiKey: config.apiKey,
                model: config.model,
                verbose: config.verbose || false
            };
            if (config.temperature !== undefined)
                mistralConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                mistralConfig.maxTokens = config.maxTokens;
            if (config.topP !== undefined)
                mistralConfig.topP = config.topP;
            if (config.streaming !== undefined)
                mistralConfig.streaming = config.streaming;
            if (config.endpoint)
                mistralConfig.endpoint = config.endpoint;
            return new ChatMistralAI(mistralConfig);
        }
        catch (error) {
            throw new Error(`Failed to load Mistral: ${error}. Install @langchain/mistralai`);
        }
    }
    async createOllama(config) {
        try {
            const { ChatOllama } = await eval('import("@langchain/ollama")');
            const ollamaConfig = {
                model: config.model,
                baseUrl: config.baseUrl || 'http://localhost:11434',
                keepAlive: config.keepAlive || '5m',
                verbose: config.verbose || false
            };
            if (config.temperature !== undefined)
                ollamaConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                ollamaConfig.numCtx = config.maxTokens;
            if (config.topP !== undefined)
                ollamaConfig.topP = config.topP;
            if (config.format)
                ollamaConfig.format = config.format;
            return new ChatOllama(ollamaConfig);
        }
        catch (error) {
            throw new Error(`Failed to load Ollama: ${error}. Install @langchain/ollama`);
        }
    }
    async createTogether(config) {
        try {
            const { ChatTogetherAI } = await eval('import("@langchain/community/chat_models/togetherai")');
            const togetherConfig = {
                apiKey: config.apiKey,
                model: config.model,
                verbose: config.verbose || false
            };
            if (config.temperature !== undefined)
                togetherConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                togetherConfig.maxTokens = config.maxTokens;
            if (config.topP !== undefined)
                togetherConfig.topP = config.topP;
            if (config.streaming !== undefined)
                togetherConfig.streaming = config.streaming;
            return new ChatTogetherAI(togetherConfig);
        }
        catch (error) {
            throw new Error(`Failed to load Together AI: ${error}. Install @langchain/community`);
        }
    }
    async createXAI(config) {
        try {
            // X.AI uses OpenAI-compatible API
            const { ChatOpenAI } = await Promise.resolve().then(() => __importStar(require('@langchain/openai')));
            const xaiConfig = {
                openAIApiKey: config.apiKey,
                modelName: config.model,
                verbose: config.verbose || false,
                configuration: {
                    baseURL: config.baseURL || 'https://api.x.ai/v1'
                }
            };
            if (config.temperature !== undefined)
                xaiConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                xaiConfig.maxTokens = config.maxTokens;
            if (config.topP !== undefined)
                xaiConfig.topP = config.topP;
            if (config.streaming !== undefined)
                xaiConfig.streaming = config.streaming;
            return new ChatOpenAI(xaiConfig);
        }
        catch (error) {
            throw new Error(`Failed to load X.AI: ${error}. Install @langchain/openai`);
        }
    }
    async createFireworks(config) {
        try {
            const { ChatFireworks } = await eval('import("@langchain/community/chat_models/fireworks")');
            const fireworksConfig = {
                apiKey: config.apiKey,
                model: config.model,
                verbose: config.verbose || false
            };
            if (config.temperature !== undefined)
                fireworksConfig.temperature = config.temperature;
            if (config.maxTokens !== undefined)
                fireworksConfig.maxTokens = config.maxTokens;
            if (config.topP !== undefined)
                fireworksConfig.topP = config.topP;
            if (config.streaming !== undefined)
                fireworksConfig.streaming = config.streaming;
            if (config.baseURL)
                fireworksConfig.baseURL = config.baseURL;
            return new ChatFireworks(fireworksConfig);
        }
        catch (error) {
            throw new Error(`Failed to load Fireworks: ${error}. Install @langchain/community`);
        }
    }
    updateProviderStatus(provider, available, error) {
        this.providerStatuses.set(provider, {
            provider,
            available,
            lastCheck: new Date(),
            ...(error?.message && { error: error.message })
        });
    }
    async performHealthCheck() {
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
            }
            catch (error) {
                this.updateProviderStatus(config.provider, false, error);
            }
        }
    }
    /**
     * Clean up resources
     */
    dispose() {
        this.stopHealthChecking();
        this.currentProvider = null;
        this.providerStatuses.clear();
    }
}
exports.LLMFactory = LLMFactory;
//# sourceMappingURL=llm.factory.js.map