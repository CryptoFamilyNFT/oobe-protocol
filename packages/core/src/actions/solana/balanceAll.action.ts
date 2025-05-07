import { ParsedAccountData, PublicKey } from "@solana/web3.js";
import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";
import { RayOperation } from "../../operations/ray/ray.operation";
import { getPdaMetadataKey } from "@raydium-io/raydium-sdk-v2";
import { BN } from "bn.js";
import { SolanaTokenBalances } from "../../config/tool/solana/token_balances";

const balanceAllTokensOwnedAction: Action = {
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
    schema: z.object({
        walletAddress: z.string().describe("Wallet address to check balances for"),
    }),
    handler: async (agent: Agent, input: Record<string, any>) => {
        console.log("Input:", input);
        const rayOp = new RayOperation(agent);

        try {
            const { walletAddress } = input;
            console.log("Checking balance tokens of ca:", walletAddress);
            const { tokenAccounts } = await rayOp.parseTokenAccountData();



            const results = await SolanaTokenBalances(agent, new PublicKey(walletAddress));

            return {
                status: "success",
                tokens: results,
            };
        } catch (error: any) {
            return {
                status: "error",
                message: error,
                code: error.code || "UNKNOWN_ERROR",
            };
        }
    },
};

export default balanceAllTokensOwnedAction;