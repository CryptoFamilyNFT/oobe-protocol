"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = require("decimal.js");
const orca_create_ss_lp_1 = require("../../config/tool/orca/orca_create_ss_lp");
// Fee tiers mapping from the original tool
const FEE_TIERS = {
    0.01: 1,
    0.02: 2,
    0.04: 4,
    0.05: 8,
    0.16: 16,
    0.3: 64,
    0.65: 96,
    1.0: 128,
    2.0: 256,
};
const createOrcaSingleSidedWhirlpoolAction = {
    name: "CREATE_ORCA_SINGLE_SIDED_WHIRLPOOL",
    similes: [
        "create orca whirlpool",
        "setup orca single sided pool",
        "initialize orca whirlpool",
        "create orca concentrated pool",
        "setup orca concentrated liquidity",
        "create orca trading pair",
    ],
    description: "Create a new single-sided whirlpool on Orca with concentrated liquidity",
    examples: [
        [
            {
                input: {
                    depositTokenAmount: "1000000000000", // 1 million tokens with 6 decimals
                    depositTokenMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
                    otherTokenMint: "So11111111111111111111111111111111111111112", // SOL
                    initialPrice: "0.001",
                    maxPrice: "5.0",
                    feeTier: 0.3,
                },
                output: {
                    status: "success",
                    signature: "2ZE7Rz...",
                    message: "Successfully created Orca single-sided whirlpool",
                },
                explanation: "Create a USDC/SOL whirlpool with 1M USDC initial liquidity",
            },
        ],
    ],
    schema: zod_1.z.object({
        depositTokenAmount: zod_1.z
            .string()
            .min(1)
            .describe("The amount of deposit token to provide as liquidity (including decimals)"),
        depositTokenMint: zod_1.z
            .string()
            .min(1)
            .describe("The mint address of the token being deposited"),
        otherTokenMint: zod_1.z
            .string()
            .min(1)
            .describe("The mint address of the other token in the pool"),
        initialPrice: zod_1.z
            .string()
            .min(1)
            .describe("Initial price of deposit token in terms of the other token"),
        maxPrice: zod_1.z
            .string()
            .min(1)
            .describe("Maximum price at which liquidity is added"),
        feeTier: zod_1.z
            .number()
            .refine((val) => val in FEE_TIERS, "Invalid fee tier")
            .describe("Fee tier percentage for the pool (e.g., 0.3 for 0.3%)"),
    }),
    handler: async (agent, input) => {
        try {
            const depositTokenAmount = Number(input.depositTokenAmount);
            const depositTokenMint = new web3_js_1.PublicKey(input.depositTokenMint);
            const otherTokenMint = new web3_js_1.PublicKey(input.otherTokenMint);
            const initialPrice = new decimal_js_1.Decimal(input.initialPrice);
            const maxPrice = new decimal_js_1.Decimal(input.maxPrice);
            const feeTier = input.feeTier;
            // Create the whirlpool
            const data = await new orca_create_ss_lp_1.orcaCreateSsLp(agent).invoke(JSON.stringify({
                agent,
                depositTokenAmount,
                depositTokenMint,
                otherTokenMint,
                initialPrice,
                maxPrice,
                feeTier,
            }));
            const parsedData = JSON.parse(data);
            return {
                transactionId: parsedData.transactionId,
                whirlpoolAddress: parsedData.whirlpoolAddress,
                positionMintAddress: parsedData.positionMintAddress,
                signature: parsedData.signature,
                message: "Successfully created Orca whirlpool position",
            };
        }
        catch (error) {
            return {
                status: "error",
                message: `Failed to create whirlpool: ${error.message}`,
            };
        }
    },
};
exports.default = createOrcaSingleSidedWhirlpoolAction;
//# sourceMappingURL=orca_create_ss_lp.action.js.map