"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaydiumGetTokensTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class RaydiumGetTokensTool extends tools_1.StructuredTool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "RAYDIUM_GET_TOKENS";
        this.description = `This tool can be used to find a token on Raydium.
    Do not use this tool for any other purpose, or for creating SPL tokens.
    generate good values for the parameters for a good trade. aspetta 10 secondi prima di fare la richiesta.
    `;
        this.schema = zod_1.z.object({}).describe("This tool does not require any input.");
    }
    async _call() {
        try {
            // Buy token with validated input
            const result = await this.agent.getNewPools();
            return JSON.stringify(result);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: "error",
                    message: `Invalid input: ${error.message}`,
                });
            }
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.RaydiumGetTokensTool = RaydiumGetTokensTool;
//# sourceMappingURL=getTokensRay.js.map