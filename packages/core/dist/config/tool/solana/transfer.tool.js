"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaTransferTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("@langchain/core/tools");
class SolanaTransferTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "solana_transfer";
        this.description = `Transfer tokens or SOL to another address ( also called as wallet address ).

  Inputs ( input is a JSON string ):
  to: string, eg "8x2dR8Mpzuz2YqyZyZjUbYWKSWesBo5jMx2Q9Y86udVk" (required)
  amount: number, eg 1 (required)
  mint?: string, eg "So11111111111111111111111111111111111111112" or "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa" (optional)`;
    }
    async _call(input) {
        try {
            const parsedInput = JSON.parse(input);
            const recipient = new web3_js_1.PublicKey(parsedInput.to);
            const mintAddress = parsedInput.mint
                ? new web3_js_1.PublicKey(parsedInput.mint)
                : undefined;
            const tx = await this.agent.transfer(recipient, parsedInput.amount, mintAddress);
            return JSON.stringify({
                status: "success",
                message: "Transfer completed successfully",
                amount: parsedInput.amount,
                recipient: parsedInput.to,
                token: parsedInput.mint || "SOL",
                transaction: tx,
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
exports.SolanaTransferTool = SolanaTransferTool;
//# sourceMappingURL=transfer.tool.js.map