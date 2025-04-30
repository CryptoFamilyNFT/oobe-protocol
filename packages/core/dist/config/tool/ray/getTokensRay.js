"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaydiumGetTokensTool = void 0;
const tools_1 = require("@langchain/core/tools");
class RaydiumGetTokensTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "RAYDIUM_GET_TOKENS";
        this.description = `This tool can be used to find a token on Raydium.
    Do not use this tool for any other purpose, or for creating SPL tokens.
    generate good values for the parameters for a good trade. aspetta 10 secondi prima di fare la richiesta.
    `;
    }
    async _call() {
        try {
            // Buy token with validated input
            const result = await this.agent.getNewPools();
            return JSON.stringify(result);
        }
        catch (error) {
            console.error("Error in RAYDIUM_GET_TOKENS tool:", error);
            throw new Error("Failed to fetch tokens on Raydium");
        }
    }
}
exports.RaydiumGetTokensTool = RaydiumGetTokensTool;
//# sourceMappingURL=getTokensRay.js.map