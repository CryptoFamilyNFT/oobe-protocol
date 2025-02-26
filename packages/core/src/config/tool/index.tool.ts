import launchPumpfunTokenAction from "../../actions/pumpfun/pumpfun.action";
import { Agent } from "../../agent/Agents";
import { SolanaCreateImageTool } from "./agent/createImage.tool";
import { SolanaPumpfunTokenLaunchTool } from "./pumpfun/createTokenPF";
import { SolanaBalanceTool } from "./solana/balance.tool";
import { SolanaBalanceOtherTool } from "./solana/balance_of.tool";
import { SolanaCloseEmptyTokenAccounts } from "./solana/close_empty_account.tool";
import { SolanaTokenBalances } from "./solana/token_balances.tool";
import { SolanaTPSCalculatorTool } from "./solana/tps.tool";
import { SolanaTransferTool } from "./solana/transfer.tool";

export async function createSolanaTools(agent: Agent) {
    return [
        new SolanaBalanceOtherTool(agent),
        new SolanaBalanceTool(agent),
        new SolanaCloseEmptyTokenAccounts(agent),
        new SolanaTPSCalculatorTool(agent),
        new SolanaTransferTool(agent),
        new SolanaPumpfunTokenLaunchTool(agent),
        new SolanaCreateImageTool(agent),
    ]
}
