"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const zod_1 = require("zod");
const ray_operation_1 = require("../../operations/ray/ray.operation");
const token_balances_1 = require("../../config/tool/solana/token_balances");
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
            const results = await (0, token_balances_1.SolanaTokenBalances)(agent, new web3_js_1.PublicKey(walletAddress));
            return {
                status: "success",
                tokens: results,
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