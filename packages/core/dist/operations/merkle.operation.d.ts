import { MerkleValidatorResult } from '../utils/merkleValidator';
import { Agent } from '../agent/Agents';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
export interface MemoDbLastChunk {
    content: string;
}
export interface MemoDbIntermediateChunk {
    content: string;
    prevSign: string;
}
export interface ZeroChunk {
    leaf1: string;
    leaf2: string;
    prevSign: string;
}
export declare class MerkleTreeManager {
    private events;
    private merkleTree;
    private agent;
    constructor(agent: Agent);
    addEvent(details: string): void;
    convertLeafToString(leaf: string): string;
    private updateMerkleTree;
    getMerkleRoot(): string | null;
    getProof(eventDetails: string): string[] | null;
    getOriginalDataFromLeaf(leaf: string): Record<string, any> | null;
    getLeaf(eventDetails: string): string | null;
    getEvents(): any;
    verifyEvent(eventDetails: string): boolean;
    createMerkle(data: any): string;
    sendTx(programId: PublicKey, wallet: PublicKey, pda: PublicKey, bump: number, data_size: number): Promise<Transaction>;
    onChainPDAPersonality(wallet: PublicKey, connection: Connection): Promise<{
        personalityROOT_PDA: PublicKey;
        personalityDB_PDA: PublicKey;
    }>;
    onChainPDAccounts(wallet: PublicKey, custom?: {
        merkleDbSeed: string;
        merkleRootSeed: string;
    }, connection?: Connection): Promise<{
        dbAccountStore: PublicKey;
        dbAccountRoot: PublicKey;
    }>;
    sendCustomDataTx(wallet: PublicKey, data: Buffer, connection: Connection, pda: PublicKey, signer: Keypair): Promise<any>;
    calculateChunksFromBuffer(buffer: Buffer, minChunkSize?: number, maxChunkSize?: number): Buffer[];
    onChainMerklePersonalityInscription(data: MerkleValidatorResult): Promise<any>;
    /**
     * @name onChainMerkleInscription
     * @description This function is used to store the Merkle data on-chain.
     * @param data - The MerkleValidatorResult containing the merkle leaf, events, root, and proof.
     * @param pdas - The PDA accounts to use for the inscription. [optional]
     */
    onChainMerkleInscription(data: MerkleValidatorResult, pdas?: {
        dbAccountStore: PublicKey;
        dbAccountRoot: PublicKey;
    }): Promise<any>;
}
//# sourceMappingURL=merkle.operation.d.ts.map