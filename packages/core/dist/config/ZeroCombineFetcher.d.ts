import { Connection, PublicKey } from "@solana/web3.js";
interface FinalTransactions {
    tools: any[];
}
/**
 * @module ZeroCombineFetcher
 * @description: Fetches and processes transactions from a PDA account. Used for Agentic Actions.
 * @author: OOBE
 * @param agentWallet: PublicKey - The wallet address of the agent.
 * @param connection: Connection - The Solana connection object.
 * @returns {ProofRecord} - A promise that resolves when the fetch is complete.
 * @throws {Error} - Throws an error if the fetch fails.
 *
 */
export declare class ZeroCombineFetcher {
    private agentWallet;
    private connection;
    constructor(agentWallet: PublicKey, connection: Connection);
    execute(batchSize?: number): Promise<{
        finalTransactions: FinalTransactions;
    }>;
}
export {};
//# sourceMappingURL=ZeroCombineFetcher.d.ts.map