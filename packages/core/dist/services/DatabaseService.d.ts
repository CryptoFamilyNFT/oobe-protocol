import { AgentPersona, ProofOfAction, ProofOfEvidence, ProofOfEvolution, MemorySnapshot } from '../entities';
import { AgentPersonaRepository, ProofOfActionRepository } from '../repositories';
import { IDatabaseConfig } from '../types/db.interface';
export declare class DatabaseService {
    private dbOperations;
    private logger;
    constructor(config: IDatabaseConfig);
    /**
     * Initialize database connection
     */
    initialize(): Promise<void>;
    /**
     * Close database connection
     */
    close(): Promise<void>;
    /**
     * Get custom repositories
     */
    getAgentPersonaRepository(): AgentPersonaRepository;
    getProofOfActionRepository(): ProofOfActionRepository;
    /**
     * Create a new agent persona
     */
    createAgentPersona(data: Partial<AgentPersona>): Promise<AgentPersona>;
    /**
     * Add proof of action to persona
     */
    addProofOfAction(personaId: string, actionData: Partial<ProofOfAction>): Promise<ProofOfAction>;
    /**
     * Add proof of evidence to persona
     */
    addProofOfEvidence(personaId: string, evidenceData: Partial<ProofOfEvidence>): Promise<ProofOfEvidence>;
    /**
     * Add proof of evolution to persona
     */
    addProofOfEvolution(personaId: string, evolutionData: Partial<ProofOfEvolution>): Promise<ProofOfEvolution>;
    /**
     * Create memory snapshot
     */
    createMemorySnapshot(personaId: string, snapshotData: Partial<MemorySnapshot>): Promise<MemorySnapshot>;
    /**
     * Get persona by wallet address with all related data
     */
    getPersonaByWallet(walletAddress: string): Promise<AgentPersona | null>;
    /**
     * Get persona statistics
     */
    getPersonaStatistics(personaId: string): Promise<{
        id: string;
        name: string;
        evolutionLevel: number;
        experiencePoints: number;
        totalActions: number;
        totalEvidence: number;
        totalEvolutions: number;
        createdAt: Date;
        lastActivity: number;
    } | null>;
    /**
     * Execute transaction
     */
    executeTransaction<T>(fn: (manager: any) => Promise<T>): Promise<T>;
    /**
     * Run database migrations
     */
    runMigrations(): Promise<void>;
    /**
     * Synchronize database schema
     */
    synchronizeSchema(): Promise<void>;
    /**
     * Check if database is connected
     */
    isConnected(): Promise<boolean>;
    /**
     * Health check for the database
     */
    healthCheck(): Promise<{
        status: string;
        message: string;
        timestamp?: never;
    } | {
        status: string;
        message: string;
        timestamp: string;
    }>;
}
//# sourceMappingURL=DatabaseService.d.ts.map