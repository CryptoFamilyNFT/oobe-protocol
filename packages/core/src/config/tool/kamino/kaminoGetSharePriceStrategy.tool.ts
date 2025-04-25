import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { StructuredTool, Tool } from "langchain/tools";
import { PublicKey } from "@solana/web3.js";

export class GetKaminoSharePriceTool extends Tool {
    name = "get_kamino_share_price";
    description = "Get the share price of a Kamino strategy.";


    constructor(
        private kamino: kaminoOperations,
        override schema = z.object({
            input: z.string().optional().describe("Strategy public key"),
        }).transform((data) => data.input || undefined)
    ) {
        super();
    }

    async _validateInput(input: z.infer<typeof this.schema>) {
        if (!input) {
            throw new Error("Input is required but was not provided.");
        }
        const parsed = this.schema.safeParse(input);
        if (!parsed.success) {
            throw new Error(`Invalid input: ${parsed.error.message}`);
        }
        return parsed.data;
    }

    async _call(input: z.infer<typeof this.schema>) {
        try {
            if (!input) {
                throw new Error("Input is required but was not provided.");
            }

            const price = await this.kamino.getKaminoSharePrice(new PublicKey(input));
            return price.toString();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return `Invalid input: ${error.message}`;
            }
            throw error;
        }
    }
}
