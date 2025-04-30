"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ray_operation_1 = require("../../operations/ray/ray.operation");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const tokenMetadata_1 = require("../../utils/tokenMetadata");
const balanceAllTokensOwnedAction = {
    name: "BALANCE_ALL_TOKENS_OWNED_ACTION",
    similes: [
        "check all tokens balances",
        "get all wallet tokens balances",
        "view all tokens balances",
        "show all tokens balances",
        "check all tokens holdings",
        "get all wallet tokens holdings",
        "view all tokens holdings",
    ],
    description: `Get the balance of all tokens owned by a Solana wallet. If not walletAddress provided use your wallet address from fetch_agent_keypair where you check your balance if user say it generally.`,
    examples: [
        [
            {
                input: {
                    walletAddress: "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME",
                },
                output: {
                    status: "success",
                    balances: [
                        { token: "SOL", balance: "100" },
                        { token: "USDC", balance: "50" },
                    ],
                    wallet: "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME",
                },
                explanation: "Get balances of all tokens owned by the wallet",
            },
        ],
    ],
    schema: zod_1.z.object({
        walletAddress: zod_1.z.string().describe("Wallet address to check balances for"),
    }),
    handler: async (agent, input) => {
        console.log("Input:", input);
        const rayOp = new ray_operation_1.RayOperation(agent);
        try {
            const { walletAddress } = input;
            console.log("Checking balance tokens of ca:", walletAddress);
            const { tokenAccounts } = await rayOp.parseTokenAccountData();
            const results = [];
            for (const tokenAccount of tokenAccounts) {
                if (tokenAccount?.publicKey) {
                    const pdaMint = (0, raydium_sdk_v2_1.getPdaMetadataKey)(tokenAccount?.mint);
                    console.log("Token Account:", tokenAccount);
                    try {
                        const metadata = await (0, tokenMetadata_1.getTokenMetadata)(agent.connection, pdaMint.publicKey, tokenAccount?.mint);
                        // Add only tokens with valid metadata
                        if (metadata) {
                            if (metadata.decimals !== undefined) {
                                results.push({
                                    ...metadata,
                                    tokenMint: tokenAccount.mint.toBase58(),
                                    balance: tokenAccount.amount.toNumber() / Math.pow(10, metadata.decimals), // Convert from BN to decimal using metadata decimals
                                });
                            }
                            else {
                                console.warn(`Metadata for token ${tokenAccount.mint.toBase58()} is missing decimals.`);
                            }
                        }
                    }
                    catch (error) {
                        if (error.message.includes("TokenInvalidAccountOwnerError")) {
                            // Skip if the token account is invalid
                            continue;
                        }
                    }
                }
            }
            const balances = results.map((result) => ({
                token: result.symbol ?? result.name,
                balance: result.balance,
                mint: result.tokenMint,
            }));
            return {
                status: "success",
                balances,
                wallet: walletAddress,
            };
        }
        catch (error) {
            return {
                status: "error",
                message: error,
                code: error.code || "UNKNOWN_ERROR",
            };
        }
    },
};
exports.default = balanceAllTokensOwnedAction;
//# sourceMappingURL=balanceAll.action.js.map