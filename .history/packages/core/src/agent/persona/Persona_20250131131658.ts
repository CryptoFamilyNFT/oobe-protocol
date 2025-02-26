import { ProofOfAction, ProofOfActionImpl } from '../../types/proofOfAction.interface';
import { ProofOfEvidence, ProofOfEvidenceImpl } from '../../types/proofOfEvidence.interface';
import { ProofOfEvolution, ProofOfEvolutionImpl } from '../../types/proofOfEvolution.interface';
import { MerkleTree } from 'merkletreejs';
import { SHA256 } from 'crypto-js';

export interface Persona {
  id: string;
  name: string;
  proofsOfAction: ProofOfAction[];
  proofsOfEvidence: ProofOfEvidence[];
  proofsOfEvolution: ProofOfEvolution[];
  addProofOfAction(proof: ProofOfAction): void;
  addProofOfEvidence(proof: ProofOfEvidence): void;
  addProofOfEvolution(proof: ProofOfEvolution): void;
  getProofs(): { actions: ProofOfAction[], evidences: ProofOfEvidence[], evolutions: ProofOfEvolution[] };
  evolve(): void;
  generateMerkleTree(): MerkleTree;
  sendToDatabase(): Promise<void>;
}

export class PersonaImpl implements Persona {
  id: string;
  name: string;
  proofsOfAction: ProofOfAction[];
  proofsOfEvidence: ProofOfEvidence[];
  proofsOfEvolution: ProofOfEvolution[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.proofsOfAction = [];
    this.proofsOfEvidence = [];
    this.proofsOfEvolution = [];
  }

  addProofOfAction(proof: ProofOfAction): void {
    this.proofsOfAction.push(proof);
    this.evolve();
  }

  addProofOfEvidence(proof: ProofOfEvidence): void {
    this.proofsOfEvidence.push(proof);
    this.evolve();
  }

  addProofOfEvolution(proof: ProofOfEvolution): void {
    this.proofsOfEvolution.push(proof);
    this.evolve();
  }

  getProofs() {
    return {
      actions: this.proofsOfAction,
      evidences: this.proofsOfEvidence,
      evolutions: this.proofsOfEvolution
    };
  }

  evolve(): void {
    const changes = `Evolved at ${new Date().toISOString()}`;
    const proofOfEvolution = new ProofOfEvolutionImpl(`evolution-${Date.now()}`, changes);
    this.proofsOfEvolution.push(proofOfEvolution);
  }

  generateMerkleTree(): MerkleTree {
    const leaves = [
      ...this.proofsOfAction.map(proof => SHA256(proof.generateProof())),
      ...this.proofsOfEvidence.map(proof => SHA256(proof.generateProof())),
      ...this.proofsOfEvolution.map(proof => SHA256(proof.generateProof()))
    ];
    return new MerkleTree(leaves, SHA256);
  }

  async sendToDatabase(): Promise<void> {
    const merkleTree = this.generateMerkleTree();
    const root = merkleTree.getRoot().toString('hex');
    const data = {
      id: this.id,
      name: this.name,
      proofs: this.getProofs(),
      merkleRoot: root
    };
    // Simulate sending data to a database
    console.log('Sending data to database:', data);
    // Replace with actual database logic
    // await databaseClient.insert(data);
  }
}