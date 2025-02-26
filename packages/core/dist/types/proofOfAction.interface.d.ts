import { MerkleTree } from 'merkletreejs';
export interface ProofOfAction {
    actionId: string;
    timestamp: number;
    details: string;
    merkleTree: MerkleTree;
    generateProof(): string;
}
export declare class ProofOfActionImpl implements ProofOfAction {
    actionId: string;
    timestamp: number;
    details: string;
    merkleTree: MerkleTree;
    constructor(actionId: string, details: string);
    generateProof(): string;
}
//# sourceMappingURL=proofOfAction.interface.d.ts.map