import { PublicKey } from "@solana/web3.js";
import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";

const balanceAction: Action = {
  name: "BALANCE_ACTION",
  similes: [
    "check balance",
    "get wallet balance",
    "view balance",
    "show balance",
    "check token balance",
  ],
  description: `Get the balance of a Solana wallet or token account.
  If you want to get the balance of your wallet, you don't need to provide the tokenAddress.
  If no tokenAddress is provided, the balance will be in SOL.`,
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          balance: "100",
          token: "SOL",
        },
        explanation: "Get SOL balance of the wallet",
      },
    ],
    [
      {
        input: {
          tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
        output: {
          status: "success",
          balance: "1000",
          token: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
        explanation: "Get USDC token balance",
      },
    ],
  ],
  schema: z.object({
    tokenAddress: z.string().optional(),
  }),
  handler: async (agent: Agent, input: Record<string, any>) => {

    const balance = await agent.connection.getBalance(
      input.tokenAddress && new PublicKey(input.tokenAddress),
    );

    return {
      status: "success",
      balance: balance,
      token: input.tokenAddress || "SOL",
    };
  },
};

export default balanceAction;