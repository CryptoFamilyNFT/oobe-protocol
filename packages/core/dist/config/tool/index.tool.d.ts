import { Agent } from "../../agent/Agents";
import { SolanaCreateImageTool } from "./agent/createImage.tool";
import { SolanaPumpfunTokenLaunchTool } from "./pumpfun/createTokenPF";
import { SolanaBalanceTool } from "./solana/balance.tool";
import { SolanaBalanceOtherTool } from "./solana/balance_of.tool";
import { SolanaCloseEmptyTokenAccounts } from "./solana/close_empty_account.tool";
import { SolanaTPSCalculatorTool } from "./solana/tps.tool";
import { SolanaTransferTool } from "./solana/transfer.tool";
export declare function createSolanaTools(agent: Agent): Promise<(SolanaCreateImageTool | SolanaPumpfunTokenLaunchTool | SolanaBalanceTool | SolanaBalanceOtherTool | SolanaCloseEmptyTokenAccounts | SolanaTPSCalculatorTool | SolanaTransferTool)[]>;
//# sourceMappingURL=index.tool.d.ts.map