"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaBalanceTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("@langchain/core/tools");
const logger_1 = __importDefault(require("../../../utils/logger/logger"));
class SolanaBalanceTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "solana_balance";
        this.description = `Get the balance of a Solana wallet or token account.

  If you want to get the balance of your wallet, you don't need to provide the tokenAddress.
  If no tokenAddress is provided, the balance will be in SOL.

  Inputs ( input is a JSON string ):
  tokenAddress: string, eg "So11111111111111111111111111111111111111112" (optional)`;
        this.logger = new logger_1.default();
    }
    async _call(input) {
        try {
            const tokenAddress = input ? new web3_js_1.PublicKey(input) : new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
            const balance = await this.agent.getBalance(new web3_js_1.PublicKey(this.agent.walletAddress), tokenAddress);
            this.logger.info(`[oobe-protocol:] Balance of ${input || "SOL"}`);
            return JSON.stringify({
                status: "success",
                balance,
                token: input || "SOL",
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
exports.SolanaBalanceTool = SolanaBalanceTool;
//# sourceMappingURL=balance.tool.js.map