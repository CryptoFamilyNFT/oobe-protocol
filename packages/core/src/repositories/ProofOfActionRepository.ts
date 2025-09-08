import { Repository, DataSource, Between } from 'typeorm';
import { ProofOfAction } from '../entities/ProofOfAction.entity';

export class ProofOfActionRepository extends Repository<ProofOfAction> {
  constructor(dataSource: DataSource) {
    super(ProofOfAction, dataSource.createEntityManager());
  }

  /**
   * Find actions by persona ID
   */
  async findByPersonaId(personaId: string): Promise<ProofOfAction[]> {
    return await this.find({
      where: { persona_id: personaId },
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Find actions by type
   */
  async findByActionType(actionType: string): Promise<ProofOfAction[]> {
    return await this.find({
      where: { actionType },
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Find successful actions
   */
  async findSuccessfulActions(personaId?: string): Promise<ProofOfAction[]> {
    const whereCondition: any = { isSuccessful: true };
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
  async findFailedActions(personaId?: string): Promise<ProofOfAction[]> {
    const whereCondition: any = { isSuccessful: false };
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
  async findActionsByDateRange(startDate: Date, endDate: Date, personaId?: string): Promise<ProofOfAction[]> {
    const whereCondition: any = {
      createdAt: Between(startDate, endDate)
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
  async getActionStats(personaId: string) {
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
  async getActionTypesDistribution(personaId?: string) {
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
  async findByTransactionHash(transactionHash: string): Promise<ProofOfAction[]> {
    return await this.find({
      where: { transactionHash },
      relations: ['persona']
    });
  }

  /**
   * Get recent actions
   */
  async getRecentActions(limit: number = 10, personaId?: string): Promise<ProofOfAction[]> {
    const whereCondition: any = {};
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
