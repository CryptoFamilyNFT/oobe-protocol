"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLangModelAgent = convertLangModelAgent;
/**
 * @name convertLangModelAgent
 * @description Convert the agent to a language model
 * @param agent:Agent
 * @returns LanguageModelV1
 */
function convertLangModelAgent(agent) {
    return {
        provider: "Google",
        modelId: "google-ai",
        ...agent.genAi(),
        specificationVersion: "v1",
        defaultObjectGenerationMode: undefined,
        doGenerate: function (options) {
            throw new Error("Function not implemented.");
        },
        doStream: function (options) {
            throw new Error("Function not implemented.");
        }
    };
}
//# sourceMappingURL=convertLangModel.js.map