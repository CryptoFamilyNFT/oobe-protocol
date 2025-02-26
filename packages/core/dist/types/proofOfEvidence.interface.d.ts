import { MerkleTree } from 'merkletreejs';
export interface ProofOfEvidence {
    evidenceId: string;
    timestamp: number;
    data: string;
    merkleTree: MerkleTree;
    generateProof(): string;
}
export declare class ProofOfEvidenceImpl implements ProofOfEvidence {
    evidenceId: string;
    timestamp: number;
    data: string;
    merkleTree: MerkleTree;
    constructor(evidenceId: string, data: string);
    generateProof(): string;
}
//# sourceMappingURL=proofOfEvidence.interface.d.ts.map