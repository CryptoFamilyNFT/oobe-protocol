import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { LLMConfig, LLMProvider, LLMFactoryConfig, LLMProviderStatus } from "../types/llm.interface";
/**
 * LLM Factory for creating and managing different language model providers
 * Supports fallback providers and health checking
 */
export declare class LLMFactory {
    private config;
    private currentProvider;
    private providerStatuses;
    private healthCheckTimer?;
    constructor(config: LLMFactoryConfig);
    /**
     * Create an LLM instance based on the configuration
     */
    createLLM(config: LLMConfig): Promise<BaseChatModel>;
    /**
     * Get the primary LLM with fallback support
     */
    getPrimaryLLM(): Promise<BaseChatModel>;
    /**
     * Switch to a different provider
     */
    switchProvider(config: LLMConfig): Promise<BaseChatModel>;
    /**
     * Get provider health status
     */
    getProviderStatus(provider: LLMProvider): LLMProviderStatus | undefined;
    /**
     * Get all provider statuses
     */
    getAllProviderStatuses(): LLMProviderStatus[];
    /**
     * Start health checking for all configured providers
     */
    startHealthChecking(): void;
    /**
     * Stop health checking
     */
    stopHealthChecking(): void;
    private createOpenAI;
    private createGroq;
    private createMistral;
    private createOllama;
    private createTogether;
    private createXAI;
    private createFireworks;
    private updateProviderStatus;
    private performHealthCheck;
    /**
     * Clean up resources
     */
    dispose(): void;
}
//# sourceMappingURL=llm.factory.d.ts.map