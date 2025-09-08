/**
 * LLM Provider types and configurations for OOBE Protocol
 * Supports multiple LLM providers through LangChain
 */
/**
 * Supported LLM providers
 */
export type LLMProvider = 'openai' | 'groq' | 'mistral' | 'ollama' | 'together' | 'xai' | 'fireworks';
/**
 * Base LLM configuration interface
 */
export interface BaseLLMConfig {
    provider: LLMProvider;
    model: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    streaming?: boolean;
    verbose?: boolean;
}
/**
 * OpenAI specific configuration
 */
export interface OpenAIConfig extends BaseLLMConfig {
    provider: 'openai';
    apiKey: string;
    model: 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo' | 'gpt-4o' | 'gpt-4o-mini' | string;
    organizationId?: string;
    baseURL?: string;
}
/**
 * Groq specific configuration
 */
export interface GroqConfig extends BaseLLMConfig {
    provider: 'groq';
    apiKey: string;
    model: 'llama3-8b-8192' | 'llama3-70b-8192' | 'mixtral-8x7b-32768' | 'gemma-7b-it' | string;
}
/**
 * Mistral AI specific configuration
 */
export interface MistralConfig extends BaseLLMConfig {
    provider: 'mistral';
    apiKey: string;
    model: 'mistral-tiny' | 'mistral-small' | 'mistral-medium' | 'mistral-large' | string;
    endpoint?: string;
}
/**
 * Ollama specific configuration
 */
export interface OllamaConfig extends BaseLLMConfig {
    provider: 'ollama';
    model: 'llama2' | 'codellama' | 'mistral' | 'neural-chat' | 'starling-lm' | string;
    baseUrl?: string;
    keepAlive?: string;
    format?: 'json';
}
/**
 * Together AI specific configuration
 */
export interface TogetherConfig extends BaseLLMConfig {
    provider: 'together';
    apiKey: string;
    model: 'meta-llama/Llama-2-70b-chat-hf' | 'mistralai/Mixtral-8x7B-Instruct-v0.1' | string;
}
/**
 * X.AI (Grok) specific configuration
 */
export interface XAIConfig extends BaseLLMConfig {
    provider: 'xai';
    apiKey: string;
    model: 'grok-beta' | string;
    baseURL?: string;
}
/**
 * Fireworks AI specific configuration
 */
export interface FireworksConfig extends BaseLLMConfig {
    provider: 'fireworks';
    apiKey: string;
    model: 'accounts/fireworks/models/llama-v2-70b-chat' | string;
    baseURL?: string;
}
/**
 * Union type for all LLM configurations
 */
export type LLMConfig = OpenAIConfig | GroqConfig | MistralConfig | OllamaConfig | TogetherConfig | XAIConfig | FireworksConfig;
/**
 * LLM factory configuration
 */
export interface LLMFactoryConfig {
    primary: LLMConfig;
    fallbacks?: LLMConfig[];
    retryAttempts?: number;
    retryDelay?: number;
    healthCheckInterval?: number;
}
/**
 * LLM provider status
 */
export interface LLMProviderStatus {
    provider: LLMProvider;
    available: boolean;
    latency?: number;
    lastCheck: Date;
    error?: string;
}
/**
 * Default model configurations for each provider
 */
export declare const DEFAULT_MODELS: Record<LLMProvider, string>;
/**
 * Default configurations for each provider
 */
export declare const DEFAULT_CONFIGS: Record<LLMProvider, Partial<BaseLLMConfig>>;
//# sourceMappingURL=llm.interface.d.ts.map