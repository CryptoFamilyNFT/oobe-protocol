"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const spl_token_1 = require("@solana/spl-token");
const JupiterBuyAction = {
    name: "JUPITER_BUY_TOKEN",
    similes: [
        "buy token on jupiter",
        "purchase token on jupiter",
        "jupiter buy token",
        "jupiter swap in",
        "jupiter purchase",
        "buy token on jup",
        "purchase token on jup",
        "swap buy token on jup for sol",
        "buy token on jupiter",
        "purchase token via jupiter",
        "buy token on jupiter",
        "purchase token on jupiter",
        "swap token on jupiter for sol",
        "jup buy token",
        "jup purchase token",
        "jup swap buy token",
    ],
    description: "Buy a token with a specified tokenmint, amount and slippage using Jupiter.",
    examples: [
        [
            {
                input: {
                    tokenMint: "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
                    amount: 1,
                    slippage: 0.5,
                    balanceSol: 2.3,
                    balanceMint: 45000000
                },
                output: {
                    status: "success",
                    transactionId: "TRANSACTION_ID",
                    amountBought: 1,
                    tokenMint: "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
                    slippage: 0.5,
                    message: "Successfully bought token on Jupiter",
                },
                explanation: "Buy this token on Jupiter with 0.01 SOL and 0.5% slippage",
            },
        ],
    ],
    schema: zod_1.z.object({
        tokenMint: zod_1.z.string().describe("Contract address of the token to buy"),
        amount: zod_1.z.number().min(0.0000001).describe("Amount in SOL used to buy"),
        slippage: zod_1.z.number().min(0.5).max(18).default(1).describe("Slippage percentage"),
        balanceSol: zod_1.z.number().default(1).describe("Balance of the agent wallet in SOL"),
        balanceMint: zod_1.z.number().default(1).describe("Balance of the agent wallet in the token to buy"),
    }),
    handler: async (agent, input) => {
        console.log("Input received in JUPITER_BUY_TOKEN tool:", input);
        try {
            const { tokenMint, amount, slippage, balanceSol, balanceMint } = input;
            const tokenNative = spl_token_1.NATIVE_MINT.toBase58();
            const jup = agent.getJupiterOp();
            const { signature } = await jup.swapSolToToken(tokenMint, amount, slippage);
            return {
                status: "success",
                signature: signature,
                amountBought: amount,
                tokenMint: tokenMint,
                slippage: slippage,
                message: "Successfully bought token on Jupiter",
            };
        }
        catch (error) {
            console.error("Error during JupiterBuy operation:", error);
            return {
                status: "error",
                message: "An error occurred during the JupiterBuy operation.",
                error: error.message,
            };
        }
    },
};
exports.default = JupiterBuyAction;
//# sourceMappingURL=jupiter_buy.action.js.map