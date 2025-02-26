import { ProofOfAction, ProofOfActionImpl } from './proofOfAction.interface';
import { ProofOfEvidence, ProofOfEvidenceImpl } from './proofOfEvidence.interface';
import { ProofOfEvolution, ProofOfEvolutionImpl } from './proofOfEvolution.interface';

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
  }

  addProofOfEvidence(proof: ProofOfEvidence): void {
    this.proofsOfEvidence.push(proof);
  }

  addProofOfEvolution(proof: ProofOfEvolution): void {
    this.proofsOfEvolution.push(proof);
  }

  getProofs() {
    return {
      actions: this.proofsOfAction,
      evidences: this.proofsOfEvidence,
      evolutions: this.proofsOfEvolution
    };
  }
}