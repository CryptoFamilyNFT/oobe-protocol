"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ray_operation_1 = require("../../operations/ray/ray.operation");
const zod_1 = require("zod");
const spl_v1_1 = require("spl-v1");
const RaySell = {
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
    schema: zod_1.z.object({
        tokenMint: zod_1.z.string().describe("Contract address of the token to sell"),
        amount: zod_1.z.number().min(0.1).describe("Amount of the token to sell"),
        slippage: zod_1.z.number().min(0.5).max(18).default(1).describe("Slippage percentage"),
        balanceSol: zod_1.z.number().default(1).describe("Balance of the agent wallet in SOL"),
        balanceMint: zod_1.z.number().default(1).describe("Balance of the agent wallet in the token to sell"),
    }),
    handler: async (agent, input) => {
        const operation = new ray_operation_1.RayOperation(agent);
        console.log("Input received in RAYDIUM_SELL_TOKEN tool:", input);
        try {
            const { tokenMint, amount, slippage, balanceMint } = input;
            const tokenNative = spl_v1_1.NATIVE_MINT.toBase58();
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
exports.default = RaySell;
//# sourceMappingURL=r_sell.action.js.map