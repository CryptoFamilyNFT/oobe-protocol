"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const zod_1 = require("zod");
const ray_operation_1 = require("../../operations/ray/ray.operation");
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
                    tokenAddress: "CxjFWdd5AufqzSqeM2qN1xzybapC8G4wEGGkZwyTpumpa",
                },
                output: {
                    status: "success",
                    wallet: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                    balance: "1000",
                    token: "CxjFWdd5AufqzSqeM2qN1xzybapC8G4wEGGkZwyTpumpa",
                },
                explanation: "Get USDC token balance",
            },
        ],
    ],
    schema: zod_1.z.object({
        tokenAddress: zod_1.z.string().optional().nullable().describe("Token address to check balance for (optional)"),
    }),
    handler: async (agent, input) => {
        console.log("Input:", input);
        const rayOp = new ray_operation_1.RayOperation(agent);
        if (!input.tokenAddress || Object.keys(input.tokenAddress).length === 0) {
            const balance = await agent.connection.getBalance(agent.wallet.publicKey);
            return {
                status: "success",
                balance: balance / 1e9,
                token: "SOL",
            };
        }
        else {
            console.log("Checking balance tokens of ca:", input.tokenAddress);
            const { tokenAccounts } = await rayOp.parseTokenAccountData();
            const tokenAccount = tokenAccounts.find(a => a.mint.toBase58() === new web3_js_1.PublicKey(input.tokenAddress).toBase58());
            if (!tokenAccount || !tokenAccount.publicKey) {
                throw new Error("Token account not found");
            }
            const balance = await agent.connection.getTokenAccountBalance(tokenAccount?.publicKey ?? (() => { throw new Error("inputTokenAcc is undefined"); })());
            return {
                status: "success",
                wallet: tokenAccount?.publicKey.toBase58(),
                balance: balance.value.uiAmount,
                token: input.tokenAddress,
                symbol: zod_1.symbol,
            };
        }
    },
};
exports.default = balanceAction;
//# sourceMappingURL=balance.action.js.map