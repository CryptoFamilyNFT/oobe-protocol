import { PublicKey } from "@solana/web3.js";
import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";

export class SolanaBalanceOtherTool extends StructuredTool {
  name = "solana_balance_other";
  description = `Get the balance of a Solana wallet or token account which is different from the agent's wallet.

  If no tokenAddress is provided, the SOL balance of the wallet will be returned.

  Inputs ( input is a JSON string ):
  walletAddress: string, eg "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME" (required)
  tokenAddress: string, eg "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa" (optional) `;

  constructor(private agent: Agent, override schema = z.object({
    walletAddress: z.string().describe("Wallet address to check balance for"),
    tokenAddress: z.string().optional().nullable().describe("Token address to check balance for (optional)"),
  })) {
    super();

  }

  protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
    console.log("Input:", input);
    try {
      const { walletAddress, tokenAddress } = input;

      const tokenPubKey = tokenAddress
        ? new PublicKey(tokenAddress)
        : undefined;

      const balance = await this.agent.getBalanceOf(
        new PublicKey(walletAddress),
        tokenPubKey,
      );

      return JSON.stringify({
        status: "success",
        balance: balance / (10 ** 9),
        wallet: walletAddress,
        token: tokenAddress || "SOL",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
          return JSON.stringify({
              status: "error",
              message: `Invalid input: ${error.message}`,
          });
      }
      return JSON.stringify({
          status: "error",
          message: error.message,
          code: error.code || "UNKNOWN_ERROR",
      });
  }
  }
}