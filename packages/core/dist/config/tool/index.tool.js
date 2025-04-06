"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolanaTools = createSolanaTools;
const close_perp_tool_1 = require("./adrena/close_perp.tool");
const open_perp_tool_1 = require("./adrena/open_perp.tool");
const createImage_tool_1 = require("./agent/createImage.tool");
const IQimageInscription_tool_1 = require("./iq/IQimageInscription.tool");
const IQTextInscription_tool_1 = require("./iq/IQTextInscription.tool");
const buyTokenJup_1 = require("./jup/buyTokenJup");
const sellTokenJup_1 = require("./jup/sellTokenJup");
const token_2022_tool_1 = require("./oobe/token_2022.tool");
const orca_create_clmm_tool_1 = require("./orca/orca_create_clmm.tool");
const orca_create_ss_lp_1 = require("./orca/orca_create_ss_lp");
const orca_fetch_position_tool_1 = require("./orca/orca_fetch_position.tool");
const orca_pos_close_tool_1 = require("./orca/orca_pos_close.tool");
const createTokenPF_1 = require("./pumpfun/createTokenPF");
const buyTokenRay_1 = require("./ray/buyTokenRay");
const sellTokenRay_1 = require("./ray/sellTokenRay");
const balance_tool_1 = require("./solana/balance.tool");
const balance_all_tool_1 = require("./solana/balance_all.tool");
const balance_of_tool_1 = require("./solana/balance_of.tool");
const check_tokens_tool_1 = require("./solana/check_tokens.tool");
const close_empty_account_tool_1 = require("./solana/close_empty_account.tool");
const fetch_agent_wallet_1 = require("./solana/fetch_agent_wallet");
const tps_tool_1 = require("./solana/tps.tool");
const transfer_tool_1 = require("./solana/transfer.tool");
const bufferInput_tool_1 = require("./utils/bufferInput.tool");
async function createSolanaTools(agent) {
    return [
        new balance_of_tool_1.SolanaBalanceOtherTool(agent),
        new balance_tool_1.SolanaBalanceTool(agent),
        new close_empty_account_tool_1.SolanaCloseEmptyTokenAccounts(agent),
        new tps_tool_1.SolanaTPSCalculatorTool(agent),
        new transfer_tool_1.SolanaTransferTool(agent),
        new createTokenPF_1.SolanaPumpfunTokenLaunchTool(agent),
        new createImage_tool_1.SolanaCreateImageTool(agent),
        new IQimageInscription_tool_1.SolanaIQImageTool(agent),
        new IQTextInscription_tool_1.SolanaIQTextTool(agent),
        new buyTokenRay_1.RaydiumBuyTokenTool(agent),
        new sellTokenRay_1.RaydiumSellTokenTool(agent),
        new token_2022_tool_1.createToken2022Tool(agent),
        new bufferInput_tool_1.BufferInputTool(agent),
        new balance_all_tool_1.balanceAllTokensOwnedTool(agent),
        new open_perp_tool_1.PerpOpenTradeTool(agent),
        new close_perp_tool_1.PerpCloseTradeTool(agent),
        new check_tokens_tool_1.CheckTokensRugTool(agent),
        new fetch_agent_wallet_1.FetchAgentKeypair(agent),
        new orca_pos_close_tool_1.orcaClosePositionTool(agent),
        new orca_create_ss_lp_1.orcaCreateSsLp(agent),
        new orca_create_clmm_tool_1.orcaCreateClmm(agent),
        new orca_fetch_position_tool_1.orcaFetchPositionTool(agent),
        new buyTokenJup_1.JupiterBuyTokenTool(agent),
        new sellTokenJup_1.JupiterSellTokenTool(agent)
    ];
}
//# sourceMappingURL=index.tool.js.map