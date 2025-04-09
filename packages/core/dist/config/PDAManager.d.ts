/**
 * @title OobePdaTransactionManager
 * @description A modular and reusable class to manage user PDA transactions and extract structured memo data
 *              from a custom Merkle-based storage system on Solana, designed for the OOBE protocol.
 * @author OOBE
 */
import { ConfirmedSignatureInfo, Connection, PublicKey } from "@solana/web3.js";
import { ZeroChunk } from "../operations/merkle.operation";
export declare class OobePdaTransactionManager {
    private agentAdd;
    private connection;
    private config;
    constructor(agentAdd: string, connection: Connection);
    /**
     * @returns {LeafPDA, RootPDA} - PDAs derived using Merkle DB and Root seed
     */
    getUserPDAs(): {
        LeafPDA: PublicKey;
        RootPDA: PublicKey;
    };
    /**
     * @param pda PublicKey of the Root PDA
     * @returns Filtered transactions with valid memo fields
     */
    getRootTransactions(pda: PublicKey): Promise<ConfirmedSignatureInfo[]>;
    /**
     * @param pda PublicKey of the Leaf PDA
     * @param transactionsRoot Transactions coming from the RootPDA
     * @returns Structured transaction objects with ZeroChunk memo structure
     */
    getStructuredDbTransactions(pda: PublicKey, transactionsRoot: ConfirmedSignatureInfo[]): Promise<{
        root: any;
        proofSignature: any;
        transaction: {
            memo: ZeroChunk;
            signature: string;
            slot: number;
            err: import("@solana/web3.js").TransactionError | null;
            blockTime?: number | null;
            confirmationStatus?: import("@solana/web3.js").TransactionConfirmationStatus;
        };
    }[]>;
    /**
     * @param transactions List of structured transactions from DB
     * @returns Enriched transactions with the first chunk of content
     */
    fetchDbContent(transactions: any[]): Promise<any[]>;
    /**
     * Recursively walks through memo chunks following `prev_chunk_sign`
     * @param transactions Enriched transactions with firstChunkContent
     * @returns Full content for each transaction reconstructed from memo chunks
     */
    resolveMemoChunks(transactions: any[]): Promise<any[]>;
}
//# sourceMappingURL=PDAManager.d.ts.map