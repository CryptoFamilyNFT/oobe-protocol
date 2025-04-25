"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawSharesTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class WithdrawSharesTool extends tools_1.StructuredTool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "withdraw_shares_from_kamino_strategy";
        this.description = "Withdraw shares from a Kamino strategy (given amount of shares to withdraw).";
        this.schema = zod_1.z.object({
            address: zod_1.z.string().describe("Strategy public key"),
            amountUSDH: zod_1.z.string().describe("Amount of USDH to withdraw"),
            amountUSDC: zod_1.z.string().describe("Amount of USDC to withdraw"),
        });
    }
    async _call(input) {
        try {
            const tx = await this.kamino.withdrawShares(new web3_js_1.PublicKey(input.address), new decimal_js_1.default(input.amountUSDH), new decimal_js_1.default(input.amountUSDC));
            return JSON.stringify({
                status: "success",
                transaction: tx,
                message: "Shares withdrawn successfully",
            });
        }
        catch (e) {
            if (e instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: 'error',
                    message: `Invalid input: ${e.message}`,
                });
            }
            return JSON.stringify({
                status: 'error',
                message: e.message,
            });
        }
    }
}
exports.WithdrawSharesTool = WithdrawSharesTool;
//# sourceMappingURL=kaminoWithdrawShares.tool.js.map