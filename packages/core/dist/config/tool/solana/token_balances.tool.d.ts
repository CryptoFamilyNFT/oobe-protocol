import { PublicKey } from "@solana/web3.js";
import type { Agent } from "../../../agent/Agents";
/**
 * Get the token balances of a Solana wallet
 * @param agent - SolanaAgentKit instance
 * @param token_address - Optional SPL token mint address. If not provided, returns SOL balance
 * @returns Promise resolving to the balance as an object containing sol balance and token balances with their respective mints, symbols, names and decimals
 */
export declare function SolanaTokenBalances(agent: Agent, walletAddress?: PublicKey): Promise<{
    sol: number;
    tokens: Array<{
        tokenAddress: string;
        name: string;
        symbol: string;
        balance: number;
        decimals: number;
    }>;
}>;
//# sourceMappingURL=token_balances.tool.d.ts.map