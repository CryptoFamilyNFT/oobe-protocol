import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";

export class WithdrawSharesTool extends StructuredTool {
    name = "withdraw_shares_from_kamino_strategy";
    description = "Withdraw shares from a Kamino strategy (given amount of shares to withdraw).";

    schema = z.object({
        address: z.string().describe("Strategy public key"),
        amountUSDH: z.string().describe("Amount of USDH to withdraw"),
        amountUSDC: z.string().describe("Amount of USDC to withdraw"),
    });

    constructor(private kamino: kaminoOperations) {
        super();
    }

    async _call(input: z.infer<typeof this.schema>) {
        try {
            const tx = await this.kamino.withdrawShares(
                new PublicKey(input.address),
                new Decimal(input.amountUSDH),
                new Decimal(input.amountUSDC)
            );
            return JSON.stringify({
                status: "success",
                transaction: tx,
                message: "Shares withdrawn successfully",
            });
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
