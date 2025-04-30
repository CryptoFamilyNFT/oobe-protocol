"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const orca_create_clmm_tool_1 = require("../../config/tool/orca/orca_create_clmm.tool");
const createOrcaCLMMAction = {
    name: "CREATE_ORCA_CLMM_ACTION",
    description: "Create a Concentrated Liquidity Market Maker (CLMM) pool on Orca, the most efficient and capital-optimized CLMM on Solana. This function initializes a CLMM pool but does not add liquidity. You can add liquidity later using a centered position or a single-sided position.",
    similes: [
        "create orca clmm",
        "create orca concentrated pool",
        "create orca clmm pool",
        "create orca concentrated liquidity",
    ],
    examples: [
        [
            {
                input: {
                    mintDeploy: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
                    mintPair: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                    initialPrice: 1.1,
                    feeTier: 1,
                },
                output: {
                    status: "success",
                    message: "CLMM pool created successfully. Note: No liquidity was added.",
                },
                explanation: "Create a CLMM pool with USDC and JUP",
            },
        ],
    ],
    schema: zod_1.z.object({
        mintDeploy: zod_1.z
            .string()
            .describe("The mint address of the token you want to deploy"),
        mintPair: zod_1.z
            .string()
            .describe("The mint address of the token you want to pair the deployed mint with"),
        initialPrice: zod_1.z
            .number()
            .positive()
            .describe("Initial price of mintDeploy in terms of mintPair"),
        feeTier: zod_1.z
            .number()
            .positive()
            .min(1)
            .describe("The fee tier in bps. Options: 1, 2, 4, 5, 16, 30, 65, 100, 200"),
    }),
    handler: async (agent, input) => {
        try {
            const [mintDeploy, mintPair, initialPrice, feeTier] = [
                new web3_js_1.PublicKey(input.mintDeploy),
                new web3_js_1.PublicKey(input.mintPair),
                new decimal_js_1.default(input.initialPrice),
                input.feeTier,
            ];
            const signature = new orca_create_clmm_tool_1.orcaCreateClmm(agent).invoke(JSON.stringify({
                mintDeploy: mintDeploy.toString(),
                mintPair: mintPair.toString(),
                initialPrice: initialPrice.toNumber(),
                feeTier: feeTier,
            }));
            return {
                status: "success",
                message: "CLMM pool created successfully. Note: No liquidity was added.",
                signature,
            };
        }
        catch (e) {
            return {
                status: "error",
                message: `Failed to create Orca CLMM pool: ${e.message}`,
            };
        }
    },
};
exports.default = createOrcaCLMMAction;
//# sourceMappingURL=orca_create_clmm.action.js.map