"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const pumpfun_operation_1 = require("../../operations/pumpfun.operation");
const launchPumpfunTokenAction = {
    name: "LAUNCH_PUMPFUN_TOKEN",
    similes: [
        "create pumpfun token",
        "launch token on pumpfun",
        "deploy pumpfun token",
        "create meme token",
        "launch memecoin",
        "create pump token",
    ],
    description: "Launch a new token on Pump.fun with customizable metadata and initial liquidity",
    examples: [
        [
            {
                input: {
                    tokenName: "Sample Token",
                    tokenTicker: "SMPL",
                    description: "A sample token for demonstration",
                    imageUrl: "https://example.com/token.png",
                    twitter: "@sampletoken",
                    telegram: "t.me/sampletoken",
                    website: "https://sampletoken.com",
                    initialLiquiditySOL: 0.1,
                    slippageBps: 10,
                    priorityFee: 0.0001,
                },
                output: {
                    status: "success",
                    signature: "2ZE7Rz...",
                    mint: "7nxQB...",
                    metadataUri: "https://arweave.net/...",
                    message: "Successfully launched token on Pump.fun",
                },
                explanation: "Launch a new token with custom metadata and 0.1 SOL initial liquidity",
            },
        ],
    ],
    schema: zod_1.z.object({
        tokenName: zod_1.z.string().min(1).max(32).describe("Name of the token"),
        tokenTicker: zod_1.z
            .string()
            .min(2)
            .max(10)
            .describe("Ticker symbol of the token"),
        description: zod_1.z
            .string()
            .min(1)
            .max(1000)
            .describe("Description of the token"),
        imageUrl: zod_1.z.string().url().describe("URL of the token image"),
        twitter: zod_1.z.string().describe("Twitter handle (optional)").optional().nullable(),
        telegram: zod_1.z.string().describe("Telegram group link (optional)").optional().nullable(),
        website: zod_1.z.string().url().optional().nullable().describe("Website URL (optional)"),
        initialLiquiditySOL: zod_1.z
            .number()
            .min(0.0001)
            .default(0.0001)
            .describe("Initial liquidity in SOL"),
        slippageBps: zod_1.z
            .number()
            .min(1)
            .max(1000)
            .default(5)
            .describe("Slippage tolerance in basis points"),
        priorityFee: zod_1.z
            .number()
            .min(0.00001)
            .default(0.00005)
            .describe("Priority fee in SOL"),
    }),
    handler: async (agent, input) => {
        const pf = new pumpfun_operation_1.PumpfunOperation();
        try {
            const { tokenName, tokenTicker, description, imageUrl } = input;
            const result = await pf.launchPumpFunToken(agent, tokenName, tokenTicker, description, imageUrl, input);
            return {
                status: "success",
                signature: result.signature,
                mint: result.mint,
                metadataUri: result.metadataUri,
                message: "Successfully launched token on Pump.fun",
            };
        }
        catch (error) {
            return {
                status: "error",
                message: `Failed to launch token: ${error.message}`,
            };
        }
    },
};
exports.default = launchPumpfunTokenAction;
//# sourceMappingURL=pumpfun.action.js.map