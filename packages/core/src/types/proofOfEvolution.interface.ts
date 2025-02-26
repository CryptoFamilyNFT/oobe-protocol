import { MerkleTree } from 'merkletreejs';
import { SHA256 } from 'crypto-js';

export interface ProofOfEvolution {
  evolutionId: string;
  timestamp: number;
  changes: string;
  merkleTree: MerkleTree;
  generateProof(): string;
}

export class ProofOfEvolutionImpl implements ProofOfEvolution {
  evolutionId: string;
  timestamp: number;
  changes: string;
  merkleTree: MerkleTree;

  constructor(evolutionId: string, changes: string) {
    this.evolutionId = evolutionId;
    this.timestamp = Date.now();
    this.changes = changes;
    this.merkleTree = new MerkleTree([SHA256(changes)], SHA256);
  }

  generateProof(): string {
    return this.merkleTree.getRoot().toString('hex');
  }
}