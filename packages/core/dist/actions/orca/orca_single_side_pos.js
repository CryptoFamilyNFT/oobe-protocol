"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const orca_open_single_side_pos_1 = require("../../config/tool/orca/orca_open_single_side_pos");
const openOrcaSingleSidedPositionAction = {
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
                explanation: "Open a single sided USDC position in a USDC/SOL whirlpool",
            },
        ],
    ],
    schema: zod_1.z.object({
        whirlpoolAddress: zod_1.z.string().describe("The address of the Orca Whirlpool"),
        distanceFromCurrentPriceBps: zod_1.z
            .number()
            .positive()
            .describe("The basis point offset from the current price for the lower bound"),
        widthBps: zod_1.z
            .number()
            .positive()
            .describe("The width of the range as a percentage increment from the lower bound"),
        inputTokenMint: zod_1.z
            .string()
            .describe("The mint address of the token to deposit"),
        inputAmount: zod_1.z
            .number()
            .positive()
            .describe("The amount of the input token to deposit"),
    }),
    handler: async (agent, input) => {
        try {
            const [whirlpoolAddress, distanceFromCurrentPriceBps, widthBps, inputTokenMint, inputAmount,] = [
                new web3_js_1.PublicKey(input.whirlpoolAddress),
                input.distanceFromCurrentPriceBps,
                input.widthBps,
                new web3_js_1.PublicKey(input.inputTokenMint),
                new decimal_js_1.default(input.inputAmount),
            ];
            const signature = await new orca_open_single_side_pos_1.orcaOpenSingleSidePositionTool(agent).invoke(JSON.stringify({
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
        }
        catch (e) {
            return {
                status: "error",
                message: `Failed to open Orca whirlpool single-sided position: ${e.message}`,
            };
        }
    },
};
exports.default = openOrcaSingleSidedPositionAction;
//# sourceMappingURL=orca_single_side_pos.js.map