"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPersonaRepository = void 0;
const typeorm_1 = require("typeorm");
const AgentPersona_entity_1 = require("../entities/AgentPersona.entity");
class AgentPersonaRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(AgentPersona_entity_1.AgentPersona, dataSource.createEntityManager());
    }
    /**
     * Find persona by wallet address
     */
    async findByWalletAddress(walletAddress) {
        return await this.findOne({
            where: { walletAddress },
            relations: ['proofsOfAction', 'proofsOfEvidence', 'proofsOfEvolution', 'memorySnapshots']
        });
    }
    /**
     * Find active personas
     */
    async findActivePersonas() {
        return await this.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' }
        });
    }
    /**
     * Get persona with full evolution history
     */
    async getPersonaWithEvolutionHistory(id) {
        return await this.findOne({
            where: { id },
            relations: ['proofsOfEvolution'],
            order: {
                proofsOfEvolution: {
                    createdAt: 'ASC'
                }
            }
        });
    }
    /**
     * Update evolution level and experience points
     */
    async updateEvolution(id, evolutionLevel, experiencePoints) {
        await this.update(id, { evolutionLevel, experiencePoints });
    }
    /**
     * Search personas by name or description
     */
    async searchPersonas(query) {
        return await this.createQueryBuilder('persona')
            .where('persona.name ILIKE :query', { query: `%${query}%` })
            .orWhere('persona.description ILIKE :query', { query: `%${query}%` })
            .getMany();
    }
    /**
     * Get personas with experience above threshold
     */
    async getExperiencedPersonas(minExperience) {
        return await this.createQueryBuilder('persona')
            .where('persona.experiencePoints >= :minExperience', { minExperience })
            .orderBy('persona.experiencePoints', 'DESC')
            .getMany();
    }
    /**
     * Get persona statistics
     */
    async getPersonaStats(id) {
        const persona = await this.findOne({
            where: { id },
            relations: ['proofsOfAction', 'proofsOfEvidence', 'proofsOfEvolution']
        });
        if (!persona)
            return null;
        return {
            id: persona.id,
            name: persona.name,
            evolutionLevel: persona.evolutionLevel,
            experiencePoints: persona.experiencePoints,
            totalActions: persona.proofsOfAction.length,
            totalEvidence: persona.proofsOfEvidence.length,
            totalEvolutions: persona.proofsOfEvolution.length,
            createdAt: persona.createdAt,
            lastActivity: Math.max(...persona.proofsOfAction.map(p => p.createdAt.getTime()), ...persona.proofsOfEvidence.map(p => p.createdAt.getTime()), ...persona.proofsOfEvolution.map(p => p.createdAt.getTime()))
        };
    }
}
exports.AgentPersonaRepository = AgentPersonaRepository;
//# sourceMappingURL=AgentPersonaRepository.js.map