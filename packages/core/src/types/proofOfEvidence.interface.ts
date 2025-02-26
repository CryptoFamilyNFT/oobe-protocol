import { MerkleTree } from 'merkletreejs';
import { SHA256 } from 'crypto-js';

export interface ProofOfEvidence {
  evidenceId: string;
  timestamp: number;
  data: string;
  merkleTree: MerkleTree;
  generateProof(): string;
}

export class ProofOfEvidenceImpl implements ProofOfEvidence {
  evidenceId: string;
  timestamp: number;
  data: string;
  merkleTree: MerkleTree;

  constructor(evidenceId: string, data: string) {
    this.evidenceId = evidenceId;
    this.timestamp = Date.now();
    this.data = data;
    this.merkleTree = new MerkleTree([SHA256(data)], SHA256);
  }

  generateProof(): string {
    return this.merkleTree.getRoot().toString('hex');
  }
}