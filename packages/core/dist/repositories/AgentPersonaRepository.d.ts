import { Repository, DataSource } from 'typeorm';
import { AgentPersona } from '../entities/AgentPersona.entity';
export declare class AgentPersonaRepository extends Repository<AgentPersona> {
    constructor(dataSource: DataSource);
    /**
     * Find persona by wallet address
     */
    findByWalletAddress(walletAddress: string): Promise<AgentPersona | null>;
    /**
     * Find active personas
     */
    findActivePersonas(): Promise<AgentPersona[]>;
    /**
     * Get persona with full evolution history
     */
    getPersonaWithEvolutionHistory(id: string): Promise<AgentPersona | null>;
    /**
     * Update evolution level and experience points
     */
    updateEvolution(id: string, evolutionLevel: number, experiencePoints: number): Promise<void>;
    /**
     * Search personas by name or description
     */
    searchPersonas(query: string): Promise<AgentPersona[]>;
    /**
     * Get personas with experience above threshold
     */
    getExperiencedPersonas(minExperience: number): Promise<AgentPersona[]>;
    /**
     * Get persona statistics
     */
    getPersonaStats(id: string): Promise<{
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
}
//# sourceMappingURL=AgentPersonaRepository.d.ts.map