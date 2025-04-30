import { MerkleTree } from 'merkletreejs';
export interface ProofOfEvolution {
    evolutionId: string;
    timestamp: number;
    changes: string;
    merkleTree: MerkleTree;
    generateProof(): string;
}
export declare class ProofOfEvolutionImpl implements ProofOfEvolution {
    evolutionId: string;
    timestamp: number;
    changes: string;
    merkleTree: MerkleTree;
    constructor(evolutionId: string, changes: string);
    generateProof(): string;
}
//# sourceMappingURL=proofOfEvolution.interface.d.ts.map