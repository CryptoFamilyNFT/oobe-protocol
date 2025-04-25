import { Action } from "../../types/action.interface";
import { z } from 'zod';
import { Agent } from "../../agent/Agents";

const JupiterSellAction: Action = {
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
    schema: z.object({
        tokenMint: z.string().describe("Contract address of the token to sell"),
        amount: z.number().min(0.1).describe("Amount of the token to sell"),
        slippage: z.number().min(0.5).max(18).default(1).describe("Slippage percentage"),
        balanceSol: z.number().default(1).describe("Balance of the agent wallet in SOL"),
        balanceMint: z.number().default(1).describe("Balance of the agent wallet in the token to sell"),
    }),
    handler: async (agent: Agent, input: Record<string, any>) => {
        console.log("Input received in jupiter_SELL_TOKEN tool:", input);

        try {
            const { tokenMint, amount, slippage, balanceMint } = input;

            const jup = agent.getJupiterOp();
            const { signature } = await jup.swapTokenToSol(
                tokenMint,
                amount,
                slippage,
            );

            return {
                status: "success",
                signature: signature,
                amountBought: amount,
                tokenMint: tokenMint,
                slippage: slippage,
                message: "Successfully bought token on Jupiter",
            };
        } catch (error: any) {
            console.error("Error during RaySell operation:", error);
            return {
                status: "error",
                message: "An error occurred during the RaySell operation.",
                error: error.message,
            };
        }
    },
};

export default JupiterSellAction;
