"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaBalanceTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("@langchain/core/tools");
const logger_1 = __importDefault(require("../../../utils/logger/logger"));
const ray_operation_1 = require("../../../operations/ray/ray.operation");
class SolanaBalanceTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "BALANCE_ACTION";
        this.description = `Get the balance of a Solana wallet or token account.

  If you want to get the balance of your wallet, you don't need to provide the tokenAddress.
  If no tokenAddress is provided, the balance will be in SOL.

  Inputs ( input is a JSON string ):
  tokenAddress: string, eg "So11111111111111111111111111111111111111112" (optional)`;
        this.logger = new logger_1.default();
    }
    async _call(input) {
        const rayOp = new ray_operation_1.RayOperation(this.agent);
        try {
            // Parse and normalize input
            input = input.trim();
            const parsedInput = JSON.parse(input);
            if (!parsedInput.tokenAddress || Object.keys(parsedInput.tokenAddress).length === 0) {
                const balance = await this.agent.connection.getBalance(this.agent.wallet.publicKey);
                return JSON.stringify({
                    status: "success",
                    balance: balance / 1e9,
                    token: "SOL",
                });
            }
            else {
                console.log("Checking balance tokens of ca:", parsedInput.tokenAddress);
                const { tokenAccounts } = await rayOp.parseTokenAccountData();
                const tokenAccount = tokenAccounts.find(a => a.mint.toBase58() === new web3_js_1.PublicKey(parsedInput.tokenAddress).toBase58());
                if (!tokenAccount || !tokenAccount.publicKey) {
                    throw new Error("Token account not found");
                }
                const balance = await this.agent.connection.getTokenAccountBalance(tokenAccount?.publicKey);
                const mintAccountInfo = await this.agent.connection.getAccountInfo(new web3_js_1.PublicKey(parsedInput.tokenAddress));
                if (!mintAccountInfo || !mintAccountInfo.data) {
                    throw new Error("Unable to fetch mint account data");
                }
                const mintData = Buffer.from(mintAccountInfo.data);
                const decimals = mintData.readUInt8(44); // Decimals are stored at byte offset 44
                const symbol = ""; // Symbol is not directly stored in the account data, so it must be handled separately or omitted
                return JSON.stringify({
                    status: "success",
                    wallet: tokenAccount?.publicKey.toBase58(),
                    balance: Number(balance.value.amount) / (10 ** balance.value.decimals),
                    token: parsedInput.tokenAddress,
                    symbol: symbol,
                });
            }
        }
        catch (error) {
            this.logger.error("Error in SolanaBalanceTool:", error);
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