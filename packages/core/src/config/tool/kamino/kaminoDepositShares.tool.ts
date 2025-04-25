import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";

export class DepositSharesTool extends StructuredTool {
  name = "deposit_shares_into_kamino_strategy";
  description = "Deposit USDH and USDC into a Kamino strategy.";

  schema = z.object({
    address: z.string(),
    amount_usdh: z.string(),
    amount_usdc: z.string(),
  });

  constructor(private kamino: kaminoOperations
  ) {
    super();
  }

  async _call(input: z.infer<typeof this.schema>) {
    try {
      const tx = await this.kamino.depositShares(
        new PublicKey(input.address),
        new Decimal(input.amount_usdh),
        new Decimal(input.amount_usdc)
      );
      return JSON.stringify(tx);
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        return JSON.stringify({
          status: "error",
          message: `Invalid input: ${e.message}`,
        });
      } else {
        return JSON.stringify({
          status: "error",
          message: e.message,
        });
      }
    }
  }
}
