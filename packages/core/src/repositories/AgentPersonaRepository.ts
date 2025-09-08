import { Repository, DataSource } from 'typeorm';
import { AgentPersona } from '../entities/AgentPersona.entity';
import { ProofOfAction } from '../entities/ProofOfAction.entity';
import { ProofOfEvidence } from '../entities/ProofOfEvidence.entity';
import { ProofOfEvolution } from '../entities/ProofOfEvolution.entity';

export class AgentPersonaRepository extends Repository<AgentPersona> {
  constructor(dataSource: DataSource) {
    super(AgentPersona, dataSource.createEntityManager());
  }

  /**
   * Find persona by wallet address
   */
  async findByWalletAddress(walletAddress: string): Promise<AgentPersona | null> {
    return await this.findOne({
      where: { walletAddress },
      relations: ['proofsOfAction', 'proofsOfEvidence', 'proofsOfEvolution', 'memorySnapshots']
    });
  }

  /**
   * Find active personas
   */
  async findActivePersonas(): Promise<AgentPersona[]> {
    return await this.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get persona with full evolution history
   */
  async getPersonaWithEvolutionHistory(id: string): Promise<AgentPersona | null> {
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
  async updateEvolution(id: string, evolutionLevel: number, experiencePoints: number): Promise<void> {
    await this.update(id, { evolutionLevel, experiencePoints });
  }

  /**
   * Search personas by name or description
   */
  async searchPersonas(query: string): Promise<AgentPersona[]> {
    return await this.createQueryBuilder('persona')
      .where('persona.name ILIKE :query', { query: `%${query}%` })
      .orWhere('persona.description ILIKE :query', { query: `%${query}%` })
      .getMany();
  }

  /**
   * Get personas with experience above threshold
   */
  async getExperiencedPersonas(minExperience: number): Promise<AgentPersona[]> {
    return await this.createQueryBuilder('persona')
      .where('persona.experiencePoints >= :minExperience', { minExperience })
      .orderBy('persona.experiencePoints', 'DESC')
      .getMany();
  }

  /**
   * Get persona statistics
   */
  async getPersonaStats(id: string) {
    const persona = await this.findOne({
      where: { id },
      relations: ['proofsOfAction', 'proofsOfEvidence', 'proofsOfEvolution']
    });

    if (!persona) return null;

    return {
      id: persona.id,
      name: persona.name,
      evolutionLevel: persona.evolutionLevel,
      experiencePoints: persona.experiencePoints,
      totalActions: persona.proofsOfAction.length,
      totalEvidence: persona.proofsOfEvidence.length,
      totalEvolutions: persona.proofsOfEvolution.length,
      createdAt: persona.createdAt,
      lastActivity: Math.max(
        ...persona.proofsOfAction.map(p => p.createdAt.getTime()),
        ...persona.proofsOfEvidence.map(p => p.createdAt.getTime()),
        ...persona.proofsOfEvolution.map(p => p.createdAt.getTime())
      )
    };
  }
}
