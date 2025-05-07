import { PublicKey } from "@solana/web3.js";
import type { Agent } from "../../../agent/Agents";
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
//# sourceMappingURL=token_balances.d.ts.map