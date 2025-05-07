import { Agent } from "../../agent/Agents";
import { kaminoOperations } from "../../operations/kamino/kamino.operation";
import { PerpCloseTradeTool } from "./adrena/close_perp.tool";
import { PerpOpenTradeTool } from "./adrena/open_perp.tool";
import { SolanaCreateImageTool } from "./agent/createImage.tool";
import { ClaimRewardsTool } from "./kamino/kaminoClaimRewards.tool";
import { DepositSharesTool } from "./kamino/kaminoDepositShares.tool";
import { GetAllKaminoStrategiesTool } from "./kamino/kaminoGetAllStrategies.tool";
import { GetAssociatedForTokensAndSharesTool } from "./kamino/kaminoGetAssociateTokens.tools";
import { GetKaminoCustomStrategyTool } from "./kamino/kaminoGetCustomStrategy.tool";
import { GetKaminoHoldersTool } from "./kamino/kaminoGetHolders.tool";
import { GetKaminoSharePriceTool } from "./kamino/kaminoGetSharePriceStrategy.tool";
import { WithdrawSharesTool } from "./kamino/kaminoWithdrawShares.tool";
import { CreateMemoWithStrategyKeyTool } from "./kamino/keminoCreateMemoWithStrategy.tool";
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
import { AgentAwarenessTool } from "./singularity/singularity.tool";
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
import { wrapAllTools } from "./utils/wrapperToolsStructured";
import { PersonalityTool } from "./agent-personality/a-personality.tool";
import { GetPersonalityTool } from "./agent-personality/g-personality.tool";
import { UsePersonalityTool } from "./agent-personality/u-personality.tool";

export async function createSolanaTools(agent: Agent) {
    const kamino = new kaminoOperations(agent);
    return wrapAllTools([
        new SolanaBalanceOtherTool(agent),
        new SolanaBalanceTool(agent),
        new SolanaCloseEmptyTokenAccounts(agent),
        new SolanaTPSCalculatorTool(agent),
        new SolanaTransferTool(agent),
        new SolanaPumpfunTokenLaunchTool(agent),
        new SolanaCreateImageTool(agent),
        new SolanaIQImageTool(agent),
        //new SolanaIQTextTool(agent),
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
        new JupiterSellTokenTool(agent),
        new AgentAwarenessTool(agent),
        new GetAllKaminoStrategiesTool(kamino),
        new GetKaminoCustomStrategyTool(kamino),
        new GetKaminoSharePriceTool(kamino),
        new GetKaminoHoldersTool(kamino),
        new DepositSharesTool(kamino),
        new WithdrawSharesTool(kamino),              
        new ClaimRewardsTool(kamino),                
        new CreateMemoWithStrategyKeyTool(kamino),
        new GetAssociatedForTokensAndSharesTool(kamino),
        new PersonalityTool(agent),
        new GetPersonalityTool(agent),
        new UsePersonalityTool(agent)
    ]);
}
