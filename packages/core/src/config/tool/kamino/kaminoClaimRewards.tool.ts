import { StructuredTool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";

export class ClaimRewardsTool extends StructuredTool {
    name = "claim_rewards_from_kamino_strategy";
    description = "Claim all available rewards from a Kamino strategy.";

    schema = z.object({
        address: z.string().describe("Strategy public key"),
    });

    constructor(private kamino: kaminoOperations) {
        super();
    }

    async _call(input: z.infer<typeof this.schema>) {
        try {
            const strategy = await this.kamino.getKaminoCustomStrategy(new PublicKey(input.address));
            const tx = await this.kamino.claimRewards(strategy);
            return {
                status: "success",
                transaction: tx,
                message: "Rewards claimed successfully",
            }
        } catch (e: any) {
            if (e instanceof z.ZodError) {
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
