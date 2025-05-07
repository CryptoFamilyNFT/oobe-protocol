import { PublicKey } from "@solana/web3.js";
import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";

export class SolanaTransferTool extends StructuredTool {
  name = "solana_transfer";
  description = `Transfer tokens or SOL to another address ( also called as wallet address ).

  Inputs ( input is a JSON string ):
  to: string, eg "8x2dR8Mpzuz2YqyZyZjUbYWKSWesBo5jMx2Q9Y86udVk" (required)
  amount: number, eg 1 (required)
  mint?: string, eg "So11111111111111111111111111111111111111112" or "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa" (optional)`;

  constructor(private agent: Agent, override schema = z.object({
    to: z.string().describe("Recipient wallet address"),
    amount: z.number().describe("Amount to transfer"),
    mint: z.string().optional().nullable().describe("Mint address of the token (optional)"),
  })) {
    super();
  }

  protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
    try {
      const parsedInput = input;

      const recipient = new PublicKey(parsedInput.to);
      const mintAddress = parsedInput.mint
        ? new PublicKey(parsedInput.mint)
        : undefined;

      const tx = await this.agent.transfer(
        recipient,
        parsedInput.amount,
        mintAddress,
      );

      return JSON.stringify({
        status: "success",
        message: "Transfer completed successfully",
        amount: parsedInput.amount,
        recipient: parsedInput.to,
        token: parsedInput.mint || "SOL",
        transaction: tx,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}