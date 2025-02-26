import { MerkleTree } from 'merkletreejs';
import { SHA256 } from 'crypto-js';

export interface ProofOfAction {
  actionId: string;
  timestamp: number;
  details: string;
  merkleTree: MerkleTree;
  generateProof(): string;
}

export class ProofOfActionImpl implements ProofOfAction {
  actionId: string;
  timestamp: number;
  details: string;
  merkleTree: MerkleTree;

  constructor(actionId: string, details: string) {
    this.actionId = actionId;
    this.timestamp = Date.now();
    this.details = details;
    this.merkleTree = new MerkleTree([SHA256(details)], SHA256);
  }

  generateProof(): string {
    return this.merkleTree.getRoot().toString('hex');
  } 
}