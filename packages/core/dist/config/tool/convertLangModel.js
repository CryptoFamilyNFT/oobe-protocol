"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLangModelAgent = void 0;
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
exports.convertLangModelAgent = convertLangModelAgent;
//# sourceMappingURL=convertLangModel.js.map