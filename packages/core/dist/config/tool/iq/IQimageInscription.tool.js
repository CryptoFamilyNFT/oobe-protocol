"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaIQImageTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class SolanaIQImageTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        imageUrl: zod_1.z.string().url().describe("URL of the image to be inscribed"),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "iq_code_in_inscription";
        this.description = `This tool can inscribe an image with ASCII characters using the IQ protocol optimization for data storage.

    The image has to be 500x500 max.

    Inputs:
    imageUrl: string, eg "https://www.creativefabrica.com/wp-content/uploads/2022/10/13/Bobby-Hill-Portrait-41509313-1.png`;
    }
    async _call(input) {
        try {
            // Parse and normalize input
            // Launch token with validated input
            const result = await this.agent.generateCodeInIQInscription(input.imageUrl, "image", 10, 0.5);
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