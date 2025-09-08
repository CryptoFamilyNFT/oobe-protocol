import { Repository, DataSource } from 'typeorm';
import { ProofOfAction } from '../entities/ProofOfAction.entity';
export declare class ProofOfActionRepository extends Repository<ProofOfAction> {
    constructor(dataSource: DataSource);
    /**
     * Find actions by persona ID
     */
    findByPersonaId(personaId: string): Promise<ProofOfAction[]>;
    /**
     * Find actions by type
     */
    findByActionType(actionType: string): Promise<ProofOfAction[]>;
    /**
     * Find successful actions
     */
    findSuccessfulActions(personaId?: string): Promise<ProofOfAction[]>;
    /**
     * Find failed actions
     */
    findFailedActions(personaId?: string): Promise<ProofOfAction[]>;
    /**
     * Get actions within date range
     */
    findActionsByDateRange(startDate: Date, endDate: Date, personaId?: string): Promise<ProofOfAction[]>;
    /**
     * Get action statistics for a persona
     */
    getActionStats(personaId: string): Promise<{
        total: number;
        successful: number;
        failed: number;
        successRate: number;
    }>;
    /**
     * Get action types distribution
     */
    getActionTypesDistribution(personaId?: string): Promise<any[]>;
    /**
     * Find actions by transaction hash
     */
    findByTransactionHash(transactionHash: string): Promise<ProofOfAction[]>;
    /**
     * Get recent actions
     */
    getRecentActions(limit?: number, personaId?: string): Promise<ProofOfAction[]>;
}
//# sourceMappingURL=ProofOfActionRepository.d.ts.map