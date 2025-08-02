import { Connection, PublicKey } from "@solana/web3.js";
import { ProofRecord } from "../types/agent.interface";
import { IConfiguration } from "./types/config.types";
interface FinalTransactions {
    tools: ProofRecord[];
}
interface PersonalitiesTransaction {
    personalities: ProofRecord[];
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
    private configManager;
    constructor(agentWallet: PublicKey, connection: Connection, configManager: IConfiguration);
    execute(batchSize?: number, routed?: {
        LeafPDA: PublicKey;
        RootPDA: PublicKey;
    } | null): Promise<{
        finalTransactions: FinalTransactions;
    }>;
    executePersonality(batchSize?: number): Promise<{
        finalTransactions: PersonalitiesTransaction;
    }>;
}
export {};
//# sourceMappingURL=ZeroCombineFetcher.d.ts.map