"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfActionRepository = void 0;
const typeorm_1 = require("typeorm");
const ProofOfAction_entity_1 = require("../entities/ProofOfAction.entity");
class ProofOfActionRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(ProofOfAction_entity_1.ProofOfAction, dataSource.createEntityManager());
    }
    /**
     * Find actions by persona ID
     */
    async findByPersonaId(personaId) {
        return await this.find({
            where: { persona_id: personaId },
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Find actions by type
     */
    async findByActionType(actionType) {
        return await this.find({
            where: { actionType },
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Find successful actions
     */
    async findSuccessfulActions(personaId) {
        const whereCondition = { isSuccessful: true };
        if (personaId) {
            whereCondition.persona_id = personaId;
        }
        return await this.find({
            where: whereCondition,
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Find failed actions
     */
    async findFailedActions(personaId) {
        const whereCondition = { isSuccessful: false };
        if (personaId) {
            whereCondition.persona_id = personaId;
        }
        return await this.find({
            where: whereCondition,
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Get actions within date range
     */
    async findActionsByDateRange(startDate, endDate, personaId) {
        const whereCondition = {
            createdAt: (0, typeorm_1.Between)(startDate, endDate)
        };
        if (personaId) {
            whereCondition.persona_id = personaId;
        }
        return await this.find({
            where: whereCondition,
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Get action statistics for a persona
     */
    async getActionStats(personaId) {
        const [total, successful, failed] = await Promise.all([
            this.count({ where: { persona_id: personaId } }),
            this.count({ where: { persona_id: personaId, isSuccessful: true } }),
            this.count({ where: { persona_id: personaId, isSuccessful: false } })
        ]);
        const successRate = total > 0 ? (successful / total) * 100 : 0;
        return {
            total,
            successful,
            failed,
            successRate: Math.round(successRate * 100) / 100
        };
    }
    /**
     * Get action types distribution
     */
    async getActionTypesDistribution(personaId) {
        const queryBuilder = this.createQueryBuilder('action')
            .select('action.actionType', 'actionType')
            .addSelect('COUNT(*)', 'count')
            .groupBy('action.actionType');
        if (personaId) {
            queryBuilder.where('action.persona_id = :personaId', { personaId });
        }
        return await queryBuilder.getRawMany();
    }
    /**
     * Find actions by transaction hash
     */
    async findByTransactionHash(transactionHash) {
        return await this.find({
            where: { transactionHash },
            relations: ['persona']
        });
    }
    /**
     * Get recent actions
     */
    async getRecentActions(limit = 10, personaId) {
        const whereCondition = {};
        if (personaId) {
            whereCondition.persona_id = personaId;
        }
        return await this.find({
            where: whereCondition,
            order: { createdAt: 'DESC' },
            take: limit,
            relations: ['persona']
        });
    }
}
exports.ProofOfActionRepository = ProofOfActionRepository;
//# sourceMappingURL=ProofOfActionRepository.js.map