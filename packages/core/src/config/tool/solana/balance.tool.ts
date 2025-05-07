import { PublicKey } from "@solana/web3.js";
import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import Logger from "../../../utils/logger/logger";
import { RayOperation } from "../../../operations/ray/ray.operation";
import { z } from "zod";

export class SolanaBalanceTool extends StructuredTool {
  name = "BALANCE_ACTION";
  description = `Get the balance of a Solana wallet or token account.

If you want to get the balance of your wallet, you don't need to provide the tokenAddress.
If no tokenAddress is provided, the balance will be in SOL.

Inputs (input is a JSON string):
- tokenAddress: string, e.g., "So11111111111111111111111111111111111111112" (optional)`;

  constructor(
    private agent: Agent,
    override schema = z.object({
      tokenAddress: z.string().optional().nullable().describe("Token address to check balance for (optional)"),
    })
  ) {
    super();
  }

  private logger = new Logger();

  protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
    const rayOp = new RayOperation(this.agent);

    try {
      const { tokenAddress } = input;

      // Get SOL balance
      if (!tokenAddress) {
        const balance = await this.agent.connection.getBalance(this.agent.wallet.publicKey);

        return JSON.stringify({
          status: "success",
          balance: balance / 1e9,
          token: "SOL",
        });
      }

      // Get token balance
      const { tokenAccounts } = await rayOp.parseTokenAccountData();
      const tokenMint = new PublicKey(tokenAddress);
      const tokenAccount = tokenAccounts.find(a => a.mint.equals(tokenMint));

      if (!tokenAccount?.publicKey) {
        throw new Error("Token account not found for the provided token mint.");
      }

      const balanceInfo = await this.agent.connection.getTokenAccountBalance(tokenAccount.publicKey);

      const mintAccountInfo = await this.agent.connection.getAccountInfo(tokenMint);
      if (!mintAccountInfo?.data) {
        throw new Error("Unable to fetch mint account data.");
      }

      const mintData = Buffer.from(mintAccountInfo.data);
      const decimals = mintData.readUInt8(44); // Solana SPL Token standard offset for decimals
      const symbol = ""; // Optional: Use metadata or external registry for token symbol

      return JSON.stringify({
        status: "success",
        wallet: tokenAccount.publicKey.toBase58(),
        balance: Number(balanceInfo.value.amount) / 10 ** decimals,
        token: tokenAddress,
        symbol: symbol,
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
