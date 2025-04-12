import { Connection, PublicKey } from "@solana/web3.js";
/**
 * @module ZeroCombineFetcher
 * @description: Fetches and processes transactions from a PDA account. Used for Agentic Actions.
 * @author: OOBE
 * @param agentWallet: PublicKey - The wallet address of the agent.
 * @param connection: Connection - The Solana connection object.
 * @returns FinalTransactions - The processed transactions categorized into messages and tools.
 */
export declare class ZeroCombineFetcher {
    private agentWallet;
    private connection;
    constructor(agentWallet: PublicKey, connection: Connection);
    execute(): Promise<{
        finalTransactions: {
            messages: any[];
            tools: any[];
        };
    }>;
}
//# sourceMappingURL=ZeroCombineFetcher.d.ts.map