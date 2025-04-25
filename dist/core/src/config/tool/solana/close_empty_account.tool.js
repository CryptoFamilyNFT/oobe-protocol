"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCloseEmptyTokenAccounts = void 0;
const tools_1 = require("@langchain/core/tools");
const logger_1 = __importDefault(require("../../../utils/logger/logger"));
class SolanaCloseEmptyTokenAccounts extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "close_empty_token_accounts";
        this.description = `Close all empty spl-token accounts and reclaim the rent`;
        this.logger = new logger_1.default();
    }
    async _call() {
        try {
            const { signature, size } = await this.agent.closeEmptyTokenAccount();
            this.logger.info(`[oobe-protocol:] Closed ${size} accounts successfully`);
            return JSON.stringify({
                status: "success",
                message: `${size} accounts closed successfully. ${size === 48 ? "48 accounts can be closed in a single transaction try again to close more accounts" : ""}`,
                signature,
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
exports.SolanaCloseEmptyTokenAccounts = SolanaCloseEmptyTokenAccounts;
//# sourceMappingURL=close_empty_account.tool.js.map