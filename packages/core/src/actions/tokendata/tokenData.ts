import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";
import { getTokenDataByTicker } from "../../operations/token_data/token_data.operation";

const tokenDataAction: Action = {
  name: "GET_TOKEN_DATA",
  similes: [
    "token data by ticker",
    "fetch token info by ticker",
    "lookup token ticker info",
    "get token info by ticker",
  ],
  description: "Get the token data for a given token ticker",
  examples: [
    [
      {
        input: {
          ticker: "USDC",
        },
        output: {
          status: "success",
          tokenData: {
            // Some placeholder example data
            symbol: "USDC",
            name: "USD Coin",
            decimals: 6,
            mintAddress: "FhRg...",
          },
        },
        explanation: "Fetches metadata for the USDC token by its ticker.",
      },
    ],
  ],
  schema: z.object({
    ticker: z.string().min(1).describe("Ticker of the token, e.g. 'USDC'"),
  }),
  handler: async (agent: Agent, input: Record<string, any>) => {
    try {
      const ticker = input.ticker as string;

      const tokenData = await getTokenDataByTicker(ticker);

      return {
        status: "success",
        tokenData: tokenData,
        message: `Successfully fetched token data for ticker: ${ticker}`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to fetch token data for ticker: ${input.ticker || ""}. ${error.message}`,
        code: error.code || "UNKNOWN_ERROR",
      };
    }
  },
};

export default tokenDataAction;