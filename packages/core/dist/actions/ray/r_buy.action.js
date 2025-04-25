"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ray_operation_1 = require("../../operations/ray/ray.operation");
const zod_1 = require("zod");
const spl_v1_1 = require("spl-v1");
const RayBuy = {
    name: "RAYDIUM_BUY_TOKEN",
    similes: [
        "buy token on raydium",
        "purchase token on raydium",
        "raydium buy token",
        "raydium swap in",
        "raydium purchase",
        "buy token on ray",
        "purchase token on ray",
        "swap buy token on ray for sol",
        "buy token",
        "purchase token",
        "buy token on raydium",
        "purchase token on raydium",
        "swap token on raydium for sol",
    ],
    description: "Buy a token with a specified tokenmint, amount and slippage.",
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
                    message: "Successfully bought token on Raydium",
                },
                explanation: "Buy this token on Raydium with 0.01 SOL and 0.5% slippage",
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
        const operation = new ray_operation_1.RayOperation(agent);
        console.log("Input received in RAYDIUM_BUY_TOKEN tool:", input);
        try {
            const { tokenMint, amount, slippage, balanceSol, balanceMint } = input;
            const tokenNative = spl_v1_1.NATIVE_MINT.toBase58();
            // Check if the balance is sufficient
            if (balanceSol && balanceSol < amount) {
                return {
                    status: "error",
                    message: `Insufficient balance. You have ${balanceSol} SOL, but you need ${amount} SOL to complete the purchase.`,
                };
            }
            // Check if the token account exists, if not create it
            const { tokenAccounts } = await operation.parseTokenAccountData().catch(error => {
                console.error("Error parsing token account data:", error);
                throw new Error("Failed to parse token account data.");
            });
            let outputTokenAcc = tokenAccounts.find(a => a.mint.toBase58() === tokenMint)?.publicKey;
            if (!outputTokenAcc) {
                console.log(`Creating associated token account for mint: ${tokenMint}`);
                outputTokenAcc = await operation.createAssociatedTokenAccount(tokenMint).catch(error => {
                    console.error("Error creating associated token account:", error);
                    throw new Error("Failed to create associated token account.");
                });
            }
            const result = await operation.apiSwapIn({
                tokenNative,
                tokenMint,
                amount,
                slippage,
            }).catch(error => {
                console.error("Error during API swap in operation:", error);
                throw new Error("Failed to execute API swap in operation.");
            });
            return {
                status: "success",
                transactionId: result?.txId,
                amountBought: result?.bought,
                mintAddress: tokenMint,
                slippage,
                message: result?.message,
            };
        }
        catch (error) {
            console.error("Error during RayBuy operation:", error);
            return {
                status: "error",
                message: "An error occurred during the RayBuy operation.",
                error: error.message,
            };
        }
    },
};
exports.default = RayBuy;
//# sourceMappingURL=r_buy.action.js.map