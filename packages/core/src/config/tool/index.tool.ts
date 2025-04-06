import { Agent } from "../../agent/Agents";
import { PerpCloseTradeTool } from "./adrena/close_perp.tool";
import { PerpOpenTradeTool } from "./adrena/open_perp.tool";
import { SolanaCreateImageTool } from "./agent/createImage.tool";
import { SolanaIQImageTool } from "./iq/IQimageInscription.tool";
import { SolanaIQTextTool } from "./iq/IQTextInscription.tool";
import { JupiterBuyTokenTool } from "./jup/buyTokenJup";
import { JupiterSellTokenTool } from "./jup/sellTokenJup";
import { createToken2022Tool } from "./oobe/token_2022.tool";
import { orcaCreateClmm } from "./orca/orca_create_clmm.tool";
import { orcaCreateSsLp } from "./orca/orca_create_ss_lp";
import { orcaFetchPositionTool } from "./orca/orca_fetch_position.tool";
import { orcaClosePositionTool } from "./orca/orca_pos_close.tool";
import { SolanaPumpfunTokenLaunchTool } from "./pumpfun/createTokenPF";
import { RaydiumBuyTokenTool } from "./ray/buyTokenRay";
import { RaydiumGetTokensTool } from "./ray/getTokensRay";
import { RaydiumSellTokenTool } from "./ray/sellTokenRay";
import { SolanaBalanceTool } from "./solana/balance.tool";
import { balanceAllTokensOwnedTool } from "./solana/balance_all.tool";
import { SolanaBalanceOtherTool } from "./solana/balance_of.tool";
import { CheckTokensRugTool } from "./solana/check_tokens.tool";
import { SolanaCloseEmptyTokenAccounts } from "./solana/close_empty_account.tool";
import { FetchAgentKeypair } from "./solana/fetch_agent_wallet";
import { MetricsDataToolStudyLogics } from "./solana/metrics_data.tool";
import { SolanaTPSCalculatorTool } from "./solana/tps.tool";
import { SolanaTransferTool } from "./solana/transfer.tool";
import { BufferInputTool } from "./utils/bufferInput.tool";

export async function createSolanaTools(agent: Agent) {
    return [
        new SolanaBalanceOtherTool(agent),
        new SolanaBalanceTool(agent),
        new SolanaCloseEmptyTokenAccounts(agent),
        new SolanaTPSCalculatorTool(agent),
        new SolanaTransferTool(agent),
        new SolanaPumpfunTokenLaunchTool(agent),
        new SolanaCreateImageTool(agent),
        new SolanaIQImageTool(agent),
        new SolanaIQTextTool(agent),
        new RaydiumBuyTokenTool(agent),
        new RaydiumSellTokenTool(agent),
        new createToken2022Tool(agent),
        new BufferInputTool(agent),
        new balanceAllTokensOwnedTool(agent),
        new PerpOpenTradeTool(agent),
        new PerpCloseTradeTool(agent),
        new CheckTokensRugTool(agent),
        new FetchAgentKeypair(agent),
        new orcaClosePositionTool(agent),
        new orcaCreateSsLp(agent),
        new orcaCreateClmm(agent),
        new orcaFetchPositionTool(agent),
        new JupiterBuyTokenTool(agent),
        new JupiterSellTokenTool(agent)
    ]
}
