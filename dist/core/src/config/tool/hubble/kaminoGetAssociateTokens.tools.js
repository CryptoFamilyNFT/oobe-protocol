"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAssociatedForTokensAndSharesTool = void 0;
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
class GetAssociatedForTokensAndSharesTool extends tools_1.StructuredTool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "get_associated_token_and_shares";
        this.description = "Get associated token addresses and data for a Kamino strategy.";
        this.schema = zod_1.z.object({
            address: zod_1.z.string().describe("Strategy public key"),
        });
    }
    async _call(input) {
        try {
            const strategy = await this.kamino.getKaminoCustomStrategy(new web3_js_1.PublicKey(input.address));
            const associated = await this.kamino.getAssociatedForTokensAndShares({
                strategy: strategy,
                strategyPubkey: new web3_js_1.PublicKey(input.address)
            });
            if (!associated) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Associated token addresses not found',
                });
            }
            if (!strategy) {
                return JSON.stringify({
                    status: 'error',
                    message: 'Strategy not found',
                });
            }
            return JSON.stringify({
                sharesAta: associated?.sharesAta.toBase58(),
                tokenAAta: associated?.tokenAAta.toBase58(),
                tokenBAta: associated?.tokenBAta.toBase58(),
                sharesMint: strategy.sharesMint.toBase58(),
                tokenAMint: strategy.tokenAMint.toBase58(),
                tokenBMint: strategy.tokenBMint.toBase58(),
            });
        }
        catch (e) {
            if (e instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: 'error',
                    message: `Invalid input: ${e.message}`,
                });
            }
            return JSON.stringify({
                status: 'error',
                message: e.message,
            });
        }
    }
}
exports.GetAssociatedForTokensAndSharesTool = GetAssociatedForTokensAndSharesTool;
//# sourceMappingURL=kaminoGetAssociateTokens.tools.js.map