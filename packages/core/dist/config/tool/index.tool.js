"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolanaTools = void 0;
const createImage_tool_1 = require("./agent/createImage.tool");
const createTokenPF_1 = require("./pumpfun/createTokenPF");
const balance_tool_1 = require("./solana/balance.tool");
const balance_of_tool_1 = require("./solana/balance_of.tool");
const close_empty_account_tool_1 = require("./solana/close_empty_account.tool");
const tps_tool_1 = require("./solana/tps.tool");
const transfer_tool_1 = require("./solana/transfer.tool");
async function createSolanaTools(agent) {
    return [
        new balance_of_tool_1.SolanaBalanceOtherTool(agent),
        new balance_tool_1.SolanaBalanceTool(agent),
        new close_empty_account_tool_1.SolanaCloseEmptyTokenAccounts(agent),
        new tps_tool_1.SolanaTPSCalculatorTool(agent),
        new transfer_tool_1.SolanaTransferTool(agent),
        new createTokenPF_1.SolanaPumpfunTokenLaunchTool(agent),
        new createImage_tool_1.SolanaCreateImageTool(agent),
    ];
}
exports.createSolanaTools = createSolanaTools;
//# sourceMappingURL=index.tool.js.map