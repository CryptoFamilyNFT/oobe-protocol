import { Tool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";
import { StructuredTool } from "langchain/tools";

export class GetKaminoHoldersTool extends StructuredTool {
    name = "get_kamino_holders_for_strategy";
    description = "Get the token holders of a Kamino strategy.";

    constructor(
        private kamino: kaminoOperations,
        override schema = z.object({
            address: z.string().describe("Strategy public key"),
        })) {
        super();
    }

    async _call(input: z.infer<typeof this.schema>) {
        try {
        const holders = await this.kamino.getKaminoHolders(new PublicKey(input.address));
        return JSON.stringify(holders);
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
