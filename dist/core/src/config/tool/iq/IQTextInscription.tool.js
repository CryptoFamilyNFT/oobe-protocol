"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaIQTextTool = void 0;
const tools_1 = require("@langchain/core/tools");
class SolanaIQTextTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "iq_code_in_text_inscription";
        this.description = `This tool can inscribe a text using the IQ6900 protocol optimization for data storage.

    Inputs:
    message: string, eg "Much Luv to IQ from Bobby Hill Agent"`;
    }
    async _call(input) {
        try {
            // Parse and normalize input
            input = input.trim();
            console.log("input", input);
            const result = await this.agent.generateCodeInIQInscription(input, "text", 10, 0.5);
            return JSON.stringify(result);
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.SolanaIQTextTool = SolanaIQTextTool;
//# sourceMappingURL=IQTextInscription.tool.js.map