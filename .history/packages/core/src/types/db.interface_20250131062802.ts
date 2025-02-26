export interface IDatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging?: boolean;
    entities?: any[];
    migrations?: any[];
    subscribers?: any[];
    cli?: {
        entitiesDir: string;
        migrationsDir: string;
        subscribersDir: string;
    };
}

export interface IPersona {
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

export interface IProofOfAction {
    id: string;
    action: string;
    timestamp: Date;
}

export interface IProofOfEvidence {
    id: string;
    evidence: string;
    timestamp: Date;
}

export interface IProofOfEvolution {
    id: string;
    changes: string;
    timestamp: Date;
}

export interface IMerkleTree {
    root: string;
    proofs: string[];
}

export interface PersonaData {
    id: string;
    name: string;
    alias?: string;
    image?: string;
    publicKey?: string;
}