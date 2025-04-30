import { RayOperation } from "../../operations/ray/ray.operation";
import { Action } from "../../types/action.interface";
import { z } from 'zod';
import { NATIVE_MINT } from "spl-v1";
import { Agent } from "../../agent/Agents";
import { PublicKey } from "@solana/web3.js";

const RaySell: Action = {
    name: "RAYDIUM_SELL_TOKEN",
    similes: [
        "sell token on raydium",
        "swap token on raydium for sol",
        "raydium sell token",
        "raydium swap out",
        "sell token on ray",
        "swap sell token",
        "sell token",
        "swap token for sol",
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
                    message: "Successfully sold token on Raydium",
                },
                explanation: "Sell this token on Raydium with 1 token and 0.5% slippage",
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
        const operation = new RayOperation(agent);
        console.log("Input received in RAYDIUM_SELL_TOKEN tool:", input);

        try {
            const { tokenMint, amount, slippage, balanceMint } = input;
            const tokenNative = NATIVE_MINT.toBase58();

            // Check if the balance is sufficient
            if (balanceMint && balanceMint < amount) {
                return {
                    status: "error",
                    message: `Insufficient balance. You have ${balanceMint} tokens, but you need ${amount} tokens to complete the sale.`,
                };
            }

            // Check if the token account exists
            const { tokenAccounts } = await operation.parseTokenAccountData().catch(error => {
                console.error("Error parsing token account data:", error);
                throw new Error("Failed to parse token account data.");
            });

            const inputTokenAcc = tokenAccounts.find(a => a.mint.toBase58() === tokenMint)?.publicKey;

            if (!inputTokenAcc) {
                return {
                    status: "error",
                    message: `No associated token account found for mint: ${tokenMint}.`,
                };
            }

            const result = await operation.apiSwapOut({
                tokenNative,
                tokenMint,
                amount,
                slippage,
            }).catch(error => {
                console.error("Error during API swap out operation:", error);
                throw new Error("Failed to execute API swap out operation.");
            });

            return {
                status: "success",
                transactionId: result?.txId,
                amountSold: result?.sold,
                mintAddress: tokenMint,
                slippage,
                message: result?.message,
            } as Record<string, any>;
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

export default RaySell;
