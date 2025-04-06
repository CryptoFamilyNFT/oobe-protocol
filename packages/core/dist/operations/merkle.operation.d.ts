import { MerkleValidatorResult } from '../utils/merkleValidator';
import { Agent } from '../agent/Agents';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
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
    sendTx(programId: PublicKey, wallet: PublicKey, pda: PublicKey, bump: number, data_size: number): Promise<Transaction>;
    onChainPDAccounts(wallet: PublicKey, connection: Connection): Promise<{
        dbAccountStore: PublicKey;
        dbAccountRoot: PublicKey;
    }>;
    sendCustomDataTx(wallet: PublicKey, data: Buffer, connection: Connection, pda: PublicKey): Promise<any>;
    calculateChunksFromBuffer(buffer: Buffer, minChunkSize?: number, maxChunkSize?: number): Buffer[];
    onChainMerkleInscription(data: MerkleValidatorResult): Promise<any>;
}
//# sourceMappingURL=merkle.operation.d.ts.map