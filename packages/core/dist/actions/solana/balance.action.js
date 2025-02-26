"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const zod_1 = require("zod");
const balanceAction = {
    name: "BALANCE_ACTION",
    similes: [
        "check balance",
        "get wallet balance",
        "view balance",
        "show balance",
        "check token balance",
    ],
    description: `Get the balance of a Solana wallet or token account.
  If you want to get the balance of your wallet, you don't need to provide the tokenAddress.
  If no tokenAddress is provided, the balance will be in SOL.`,
    examples: [
        [
            {
                input: {},
                output: {
                    status: "success",
                    balance: "100",
                    token: "SOL",
                },
                explanation: "Get SOL balance of the wallet",
            },
        ],
        [
            {
                input: {
                    tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                },
                output: {
                    status: "success",
                    balance: "1000",
                    token: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                },
                explanation: "Get USDC token balance",
            },
        ],
    ],
    schema: zod_1.z.object({
        tokenAddress: zod_1.z.string().optional(),
    }),
    handler: async (agent, input) => {
        const balance = await agent.connection.getBalance(input.tokenAddress && new web3_js_1.PublicKey(input.tokenAddress));
        return {
            status: "success",
            balance: balance,
            token: input.tokenAddress || "SOL",
        };
    },
};
exports.default = balanceAction;
//# sourceMappingURL=balance.action.js.map