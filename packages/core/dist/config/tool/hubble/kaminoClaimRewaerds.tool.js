"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRewardsTool = void 0;
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
class ClaimRewardsTool extends tools_1.StructuredTool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "claim_rewards_from_kamino_strategy";
        this.description = "Claim all available rewards from a Kamino strategy.";
        this.schema = zod_1.z.object({
            address: zod_1.z.string().describe("Strategy public key"),
        });
    }
    async _call(input) {
        try {
            const strategy = await this.kamino.getKaminoCustomStrategy(new web3_js_1.PublicKey(input.address));
            const tx = await this.kamino.claimRewards(strategy);
            return {
                status: "success",
                transaction: tx,
                message: "Rewards claimed successfully",
            };
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
exports.ClaimRewardsTool = ClaimRewardsTool;
//# sourceMappingURL=kaminoClaimRewaerds.tool.js.map