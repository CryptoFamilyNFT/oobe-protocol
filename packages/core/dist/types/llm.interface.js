"use strict";
/**
 * LLM Provider types and configurations for OOBE Protocol
 * Supports multiple LLM providers through LangChain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIGS = exports.DEFAULT_MODELS = void 0;
/**
 * Default model configurations for each provider
 */
exports.DEFAULT_MODELS = {
    openai: 'gpt-4o-mini',
    groq: 'llama3-8b-8192',
    mistral: 'mistral-small',
    ollama: 'llama2',
    together: 'meta-llama/Llama-2-7b-chat-hf',
    xai: 'grok-beta',
    fireworks: 'accounts/fireworks/models/llama-v2-7b-chat'
};
/**
 * Default configurations for each provider
 */
exports.DEFAULT_CONFIGS = {
    openai: {
        temperature: 0.7,
        maxTokens: 2048,
        streaming: true
    },
    groq: {
        temperature: 0.7,
        maxTokens: 8192,
        streaming: true
    },
    mistral: {
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true
    },
    ollama: {
        temperature: 0.7,
        maxTokens: 2048,
        streaming: false
    },
    together: {
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true
    },
    xai: {
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true
    },
    fireworks: {
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true
    }
};
//# sourceMappingURL=llm.interface.js.map