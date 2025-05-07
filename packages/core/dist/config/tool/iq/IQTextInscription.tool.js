"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaIQTextTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class SolanaIQTextTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        message: zod_1.z.string().describe("Message to be inscribed"),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "iq_code_in_text_inscription";
        this.description = `This tool can inscribe a text using the IQ6900 protocol optimization for data storage.

    Inputs:
    message: string, eg "Much Luv to IQ from Bobby Hill Agent"`;
    }
    async _call(input) {
        try {
            // Parse and normalize input
            const trimmedInput = input.message.trim();
            console.log("input", trimmedInput);
            const result = await this.agent.generateCodeInIQInscription(input.message, "text", 10, 0.5);
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