import { z } from "zod";
import { PublicKey } from "@solana/web3.js";
import Decimal from "decimal.js";
import { Agent } from "../../agent/Agents";
import { orcaOpenSingleSidePositionTool } from "../../config/tool/orca/orca_open_single_side_pos";
import { Action } from "../../types/action.interface";

const openOrcaSingleSidedPositionAction: Action = {
  name: "OPEN_ORCA_SINGLE_SIDED_POSITION_ACTION",
  description: "Open a single-sided liquidity position in an Orca Whirlpool",
  similes: [
    "open orca single-sided position",
    "open orca whirlpool single sided position",
    "open orca single sideed liquidity pool",
  ],
  examples: [
    [
      {
        input: {
          whirlpoolAddress: "ERjsdF...",
          distanceFromCurrentPriceBps: 250,
          widthBps: 500,
          inputTokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
          inputAmount: 100,
        },
        output: {
          status: "success",
          signature: "12Erx...",
          message: "Successfully opened Orca whirlpool single-sided position",
        },
        explanation:
          "Open a single sided USDC position in a USDC/SOL whirlpool",
      },
    ],
  ],
  schema: z.object({
    whirlpoolAddress: z.string().describe("The address of the Orca Whirlpool"),
    distanceFromCurrentPriceBps: z
      .number()
      .positive()
      .describe(
        "The basis point offset from the current price for the lower bound",
      ),
    widthBps: z
      .number()
      .positive()
      .describe(
        "The width of the range as a percentage increment from the lower bound",
      ),
    inputTokenMint: z
      .string()
      .describe("The mint address of the token to deposit"),
    inputAmount: z
      .number()
      .positive()
      .describe("The amount of the input token to deposit"),
  }),
  handler: async (agent: Agent, input: Record<string,any>) => {
    try {
      const [
        whirlpoolAddress,
        distanceFromCurrentPriceBps,
        widthBps,
        inputTokenMint,
        inputAmount,
      ] = [
        new PublicKey(input.whirlpoolAddress),
        input.distanceFromCurrentPriceBps,
        input.widthBps,
        new PublicKey(input.inputTokenMint),
        new Decimal(input.inputAmount),
      ];

      const signature = await new orcaOpenSingleSidePositionTool(agent).invoke(JSON.stringify({
        agent,
        whirlpoolAddress,
        distanceFromCurrentPriceBps,
        widthBps,
        inputTokenMint,
        inputAmount,
    }));

      return {
        status: "success",
        signature,
        message: "Successfully opened Orca whirlpool single-sided position",
      };
    } catch (e: any) {
      return {
        status: "error",
        message: `Failed to open Orca whirlpool single-sided position: ${e.message}`,
      };
    }
  },
};

export default openOrcaSingleSidedPositionAction;