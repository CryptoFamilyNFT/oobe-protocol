import { Tool, StructuredTool } from "langchain/tools";
import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation"; // percorso corretto al file kaminoOperations
import { Agent } from "../../../agent/Agents";
import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";


export class GetKaminoCustomStrategyTool extends StructuredTool {
    name = "get_kamino_custom_strategy";
    description = "Get specific Kamino strategy details by public key.";

    constructor(
        private kamino: kaminoOperations,
        override schema = z.object({
            address: z.string().describe("Public key of the strategy"),
        })
    ) {
        super();
    }

    async _call(input: z.infer<typeof this.schema>) {
        try {
            const strategy = await this.kamino.getKaminoCustomStrategy(new PublicKey(input.address));
            if (!strategy) return JSON.stringify({
                status: 'error',
                message: 'Strategy not found',
            });
            return JSON.stringify({
                ...strategy, // Replace 'name' with a valid property, e.g., 'id'
                shareMint: strategy.sharesMint.toBase58(),
                tokenA: strategy.tokenAMint.toBase58(),
                tokenB: strategy.tokenBMint.toBase58(),
            });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
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
