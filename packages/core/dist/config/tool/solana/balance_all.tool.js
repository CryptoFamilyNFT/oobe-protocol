"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceAllTokensOwnedTool = void 0;
const tools_1 = require("@langchain/core/tools");
const ray_operation_1 = require("../../../operations/ray/ray.operation");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const tokenMetadata_1 = require("../../../utils/tokenMetadata");
class balanceAllTokensOwnedTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "solana_balance_all_tokens_owned";
        this.description = `Get the balance of all tokens owned by a Solana wallet.
    use your wallet address using fetch_agent_keypair where you check your balance if user say it generally, remember the correlation between name, symbol and tokenMint.

    Input (input is JSON string):
    walletAddress: string, eg "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME" (required)
    `;
    }
    async _call(input) {
        const rayOp = new ray_operation_1.RayOperation(this.agent);
        console.log("Input:", input);
        try {
            // Parse and normalize input
            const parsedInput = typeof input === "string" && input.trim().startsWith("{")
                ? JSON.parse(input)
                : { walletAddress: input.trim() };
            let walletAddress;
            if (!parsedInput.tokenAddress || Object.keys(parsedInput.tokenAddress).length === 0) {
                walletAddress = this.agent.wallet.publicKey.toBase58();
            }
            const { tokenAccounts } = await rayOp.parseTokenAccountData();
            const results = [];
            for (const tokenAccount of tokenAccounts) {
                if (tokenAccount?.publicKey) {
                    const pdaMint = (0, raydium_sdk_v2_1.getPdaMetadataKey)(tokenAccount?.mint);
                    try {
                        const metadata = await (0, tokenMetadata_1.getTokenMetadata)(this.agent.connection, pdaMint.publicKey, tokenAccount?.mint);
                        if (metadata) {
                            results.push({
                                ...metadata,
                                tokenMint: tokenAccount.mint.toBase58(),
                                balance: tokenAccount.amount.toNumber() / Math.pow(10, metadata.decimals), // Convert from BN to decimal using metadata decimals
                            });
                            results[results.length - 1].balance = parseFloat(results[results.length - 1].balance.toFixed(metadata.decimals));
                        }
                    }
                    catch (error) {
                        if (error.message.includes("TokenInvalidAccountOwnerError")) {
                            continue;
                        }
                    }
                }
            }
            return JSON.stringify({
                status: "success",
                tokens: results,
            });
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.balanceAllTokensOwnedTool = balanceAllTokensOwnedTool;
//# sourceMappingURL=balance_all.tool.js.map