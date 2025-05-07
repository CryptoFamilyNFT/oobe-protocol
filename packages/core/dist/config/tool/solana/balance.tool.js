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
const zod_1 = require("zod");
class SolanaBalanceTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        tokenAddress: zod_1.z.string().optional().nullable().describe("Token address to check balance for (optional)"),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "BALANCE_ACTION";
        this.description = `Get the balance of a Solana wallet or token account.

If you want to get the balance of your wallet, you don't need to provide the tokenAddress.
If no tokenAddress is provided, the balance will be in SOL.

Inputs (input is a JSON string):
- tokenAddress: string, e.g., "So11111111111111111111111111111111111111112" (optional)`;
        this.logger = new logger_1.default();
    }
    async _call(input) {
        const rayOp = new ray_operation_1.RayOperation(this.agent);
        try {
            const { tokenAddress } = input;
            // Get SOL balance
            if (!tokenAddress) {
                const balance = await this.agent.connection.getBalance(this.agent.wallet.publicKey);
                return JSON.stringify({
                    status: "success",
                    balance: balance / 1e9,
                    token: "SOL",
                });
            }
            // Get token balance
            const { tokenAccounts } = await rayOp.parseTokenAccountData();
            const tokenMint = new web3_js_1.PublicKey(tokenAddress);
            const tokenAccount = tokenAccounts.find(a => a.mint.equals(tokenMint));
            if (!tokenAccount?.publicKey) {
                throw new Error("Token account not found for the provided token mint.");
            }
            const balanceInfo = await this.agent.connection.getTokenAccountBalance(tokenAccount.publicKey);
            const mintAccountInfo = await this.agent.connection.getAccountInfo(tokenMint);
            if (!mintAccountInfo?.data) {
                throw new Error("Unable to fetch mint account data.");
            }
            const mintData = Buffer.from(mintAccountInfo.data);
            const decimals = mintData.readUInt8(44); // Solana SPL Token standard offset for decimals
            const symbol = ""; // Optional: Use metadata or external registry for token symbol
            return JSON.stringify({
                status: "success",
                wallet: tokenAccount.publicKey.toBase58(),
                balance: Number(balanceInfo.value.amount) / 10 ** decimals,
                token: tokenAddress,
                symbol: symbol,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: "error",
                    message: `Invalid input: ${error.message}`,
                });
            }
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