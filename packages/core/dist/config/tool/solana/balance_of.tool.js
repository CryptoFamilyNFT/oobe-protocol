"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaBalanceOtherTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("@langchain/core/tools");
class SolanaBalanceOtherTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "solana_balance_other";
        this.description = `Get the balance of a Solana wallet or token account which is different from the agent's wallet.

  If no tokenAddress is provided, the SOL balance of the wallet will be returned.

  Inputs ( input is a JSON string ):
  walletAddress: string, eg "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME" (required)
  tokenAddress: string, eg "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa" (optional)`;
    }
    async _call(input) {
        try {
            const { walletAddress, tokenAddress } = JSON.parse(input);
            const tokenPubKey = tokenAddress
                ? new web3_js_1.PublicKey(tokenAddress)
                : undefined;
            const balance = await this.agent.getBalanceOf(new web3_js_1.PublicKey(walletAddress), tokenPubKey);
            return JSON.stringify({
                status: "success",
                balance,
                wallet: walletAddress,
                token: tokenAddress || "SOL",
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
exports.SolanaBalanceOtherTool = SolanaBalanceOtherTool;
//# sourceMappingURL=balance_of.tool.js.map