import { LanguageModelV1, LanguageModelV1CallOptions } from "ai"
import { Agent } from "../../agent/Agents";
import { LanguageModelV1CallWarning, LanguageModelV1FinishReason, LanguageModelV1FunctionToolCall, LanguageModelV1LogProbs, LanguageModelV1ProviderMetadata, LanguageModelV1StreamPart } from "@ai-sdk/provider";

/**
 * @name convertLangModelAgent
 * @description Convert the agent to a language model
 * @param agent:Agent
 * @returns LanguageModelV1
 */
export function convertLangModelAgent(agent: Agent): LanguageModelV1 {
    return {
        provider: "Google",
        modelId: "google-ai",
        ...agent.genAi(),
        specificationVersion: "v1",
        defaultObjectGenerationMode: undefined,
        doGenerate: function (options: LanguageModelV1CallOptions): PromiseLike<{ text?: string; toolCalls?: Array<LanguageModelV1FunctionToolCall>; finishReason: LanguageModelV1FinishReason; usage: { promptTokens: number; completionTokens: number; }; rawCall: { rawPrompt: unknown; rawSettings: Record<string, unknown>; }; rawResponse?: { headers?: Record<string, string>; }; request?: { body?: string; }; response?: { id?: string; timestamp?: Date; modelId?: string; }; warnings?: LanguageModelV1CallWarning[]; providerMetadata?: LanguageModelV1ProviderMetadata; logprobs?: LanguageModelV1LogProbs; }> {
            throw new Error("Function not implemented.");
        },
        doStream: function (options: LanguageModelV1CallOptions): PromiseLike<{ stream: ReadableStream<LanguageModelV1StreamPart>; rawCall: { rawPrompt: unknown; rawSettings: Record<string, unknown>; }; rawResponse?: { headers?: Record<string, string>; }; request?: { body?: string; }; warnings?: Array<LanguageModelV1CallWarning>; }> {
            throw new Error("Function not implemented.");
        }
    }
}