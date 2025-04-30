"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const JupiterSellAction = {
    name: "jupiter_SELL_TOKEN",
    similes: [
        "sell token on jupiter",
        "swap token on jupiter for sol",
        "jupiter sell token",
        "jupiter swap out",
        "sell token on jup",
        "swap sell token on jup",
        "sell token via jup",
        "swap token for sol via jupiter",
    ],
    description: "Sell a token with a specified tokenMint, amount, and slippage.",
    examples: [
        [
            {
                input: {
                    tokenMint: "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
                    amount: 1,
                    slippage: 0.5,
                    balanceSol: 2.3,
                    balanceMint: 45000000,
                },
                output: {
                    status: "success",
                    transactionId: "TRANSACTION_ID",
                    amountSold: 1,
                    tokenMint: "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
                    slippage: 0.5,
                    message: "Successfully sold token on jupiter",
                },
                explanation: "Sell this token on jupiter with 1 token and 0.5% slippage",
            },
        ],
    ],
    schema: zod_1.z.object({
        tokenMint: zod_1.z.string().describe("Contract address of the token to sell"),
        amount: zod_1.z.number().min(0.1).describe("Amount of the token to sell"),
        slippage: zod_1.z.number().min(0.5).max(18).default(1).describe("Slippage percentage"),
        balanceSol: zod_1.z.number().default(1).describe("Balance of the agent wallet in SOL"),
        balanceMint: zod_1.z.number().default(1).describe("Balance of the agent wallet in the token to sell"),
    }),
    handler: async (agent, input) => {
        console.log("Input received in jupiter_SELL_TOKEN tool:", input);
        try {
            const { tokenMint, amount, slippage, balanceMint } = input;
            const jup = agent.getJupiterOp();
            const { signature } = await jup.swapTokenToSol(tokenMint, amount, slippage);
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
            console.error("Error during RaySell operation:", error);
            return {
                status: "error",
                message: "An error occurred during the RaySell operation.",
                error: error.message,
            };
        }
    },
};
exports.default = JupiterSellAction;
//# sourceMappingURL=jupiter_sell.action.js.map