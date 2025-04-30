"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaIQImageTool = void 0;
const tools_1 = require("@langchain/core/tools");
class SolanaIQImageTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "iq_code_in_inscription";
        this.description = `This tool can inscribe an image with ASCII characters using the IQ protocol optimization for data storage.

    The image has to be 500x500 max.

    Inputs:
    imageUrl: string, eg "https://www.creativefabrica.com/wp-content/uploads/2022/10/13/Bobby-Hill-Portrait-41509313-1.png`;
    }
    async _call(input) {
        try {
            // Parse and normalize input
            input = input.trim();
            console.log("input", input);
            // Launch token with validated input
            const result = await this.agent.generateCodeInIQInscription(input, "image", 10, 0.5);
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
exports.SolanaIQImageTool = SolanaIQImageTool;
//# sourceMappingURL=IQimageInscription.tool.js.map