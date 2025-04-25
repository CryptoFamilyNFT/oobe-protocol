"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositSharesTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class DepositSharesTool extends tools_1.StructuredTool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "deposit_shares_into_kamino_strategy";
        this.description = "Deposit USDH and USDC into a Kamino strategy.";
        this.schema = zod_1.z.object({
            address: zod_1.z.string(),
            amount_usdh: zod_1.z.string(),
            amount_usdc: zod_1.z.string(),
        });
    }
    async _call(input) {
        try {
            const tx = await this.kamino.depositShares(new web3_js_1.PublicKey(input.address), new decimal_js_1.default(input.amount_usdh), new decimal_js_1.default(input.amount_usdc));
            return JSON.stringify(tx);
        }
        catch (e) {
            if (e instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: "error",
                    message: `Invalid input: ${e.message}`,
                });
            }
            else {
                return JSON.stringify({
                    status: "error",
                    message: e.message,
                });
            }
        }
    }
}
exports.DepositSharesTool = DepositSharesTool;
//# sourceMappingURL=kaminoDepositShares.tool.js.map