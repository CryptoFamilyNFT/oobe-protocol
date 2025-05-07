"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKaminoCustomStrategyTool = void 0;
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
class GetKaminoCustomStrategyTool extends tools_1.StructuredTool {
    constructor(kamino, schema = zod_1.z.object({
        address: zod_1.z.string().describe("Public key of the strategy"),
    })) {
        super();
        this.kamino = kamino;
        this.schema = schema;
        this.name = "get_kamino_custom_strategy_details";
        this.description = "Get specific Kamino strategy details by public key.";
    }
    async _call(input) {
        try {
            const strategy = await this.kamino.getKaminoCustomStrategy(new web3_js_1.PublicKey(input.address));
            if (!strategy)
                return JSON.stringify({
                    status: 'error',
                    message: 'Strategy not found',
                });
            return JSON.stringify({
                ...strategy, // Replace 'name' with a valid property, e.g., 'id'
                shareMint: strategy.sharesMint.toBase58(),
                tokenA: strategy.tokenAMint.toBase58(),
                tokenB: strategy.tokenBMint.toBase58(),
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: 'error',
                    message: `Invalid input: ${error.message}`,
                });
            }
            return JSON.stringify({
                status: 'error',
                message: error.message,
            });
        }
    }
}
exports.GetKaminoCustomStrategyTool = GetKaminoCustomStrategyTool;
//# sourceMappingURL=kaminoGetCustomStrategy.tool.js.map