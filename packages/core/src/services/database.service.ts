import { DBOperations } from '../operations/db.operation';
import type { Prisma } from '../generated/prisma';

/**
 * DatabaseService - A simplified interface for database operations
 * Optimized for Next.js and edge runtime environments
 */
export class DatabaseService {
  private static instance: DatabaseService;
  private db: DBOperations;

  private constructor() {
    this.db = DBOperations.getInstance();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Simplified connection management
  async init(): Promise<void> {
    try {
      await this.db.connect();
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    try {
      await this.db.disconnect();
    } catch (error) {
      console.error('Failed to cleanup database:', error);
    }
  }

  // Agent operations with simplified interface
  async createAgent(data: {
    name: string;
    walletAddress?: string;
    description?: string;
    personality?: any;
    traits?: any;
  }) {
    const created = await this.db.createAgentPersona({
      name: data.name,
      walletAddress: data.walletAddress ?? null,
      description: data.description ?? null,
      personality: data.personality ?? null,
      traits: data.traits ?? null,
    });
    
    // Return with all relations - this should never be null for a just-created record
    const fullRecord = await this.db.getAgentPersona(created.id);
    if (!fullRecord) {
      throw new Error(`Failed to retrieve created agent persona with id: ${created.id}`);
    }
    return fullRecord;
  }

  async getAgent(id: string) {
    return this.db.getAgentPersona(id);
  }

  async getAgentByName(name: string) {
    return this.db.getAgentPersonaByName(name);
  }

  async getAgentByWallet(walletAddress: string) {
    return this.db.getAgentPersonaByWallet(walletAddress);
  }

  async updateAgent(id: string, data: Prisma.AgentPersonaUpdateInput) {
    return this.db.updateAgentPersona(id, data);
  }

  async listAgents(params?: {
    limit?: number;
    offset?: number;
    search?: string;
  }) {
    const options: any = {};
    
    if (params?.limit) options.take = params.limit;
    if (params?.offset) options.skip = params.offset;
    
    if (params?.search) {
      options.where = {
        OR: [
          { name: { contains: params.search } },
          { description: { contains: params.search } },
          { walletAddress: { contains: params.search } }
        ]
      };
    }

    return this.db.listAgentPersonas(options);
  }

  // Action tracking
  async recordAction(data: {
    personaId: string;
    actionType: string;
    actionData: string;
    actionParameters?: any;
    transactionHash?: string;
    isSuccessful?: boolean;
    result?: string | null;
  }) {
    return this.db.createProofOfAction({
      persona: { connect: { id: data.personaId } },
      actionType: data.actionType,
      actionData: data.actionData,
      actionParameters: data.actionParameters ?? null,
      transactionHash: data.transactionHash ?? null,
      isSuccessful: data.isSuccessful ?? true,
      result: data.result ?? null,
    });
  }

  async getActionsByAgent(personaId: string) {
    return this.db.getProofsOfActionByPersona(personaId);
  }

  // Evidence tracking
  async recordEvidence(data: {
    personaId: string;
    evidenceType: string;
    evidenceData: string;
    sourceType?: string;
    isVerified?: boolean;
    confidenceScore?: number;
  }) {
    return this.db.createProofOfEvidence({
      persona: { connect: { id: data.personaId } },
      evidenceType: data.evidenceType,
      evidenceData: data.evidenceData,
      sourceType: data.sourceType ?? null,
      isVerified: data.isVerified ?? false,
      confidenceScore: data.confidenceScore ?? 0,
    });
  }

  // Evolution tracking
  async recordEvolution(data: {
    personaId: string;
    evolutionType: string;
    previousState: any;
    newState: any;
    changes: any;
    reasoning?: string;
  }) {
    return this.db.createProofOfEvolution({
      persona: { connect: { id: data.personaId } },
      evolutionType: data.evolutionType,
      previousState: data.previousState,
      newState: data.newState,
      changes: data.changes,
      reasoning: data.reasoning ?? null,
    });
  }

  // Memory snapshots
  async saveMemorySnapshot(data: {
    personaId: string;
    snapshotType: string;
    memoryData: any;
    merkleRoot: string;
    description?: string;
  }) {
    return this.db.createMemorySnapshot({
      persona: { connect: { id: data.personaId } },
      snapshotType: data.snapshotType,
      memoryData: data.memoryData,
      merkleRoot: data.merkleRoot,
      description: data.description ?? null,
    });
  }

  // Transaction tracking
  async recordTransaction(data: {
    transactionHash: string;
    agentWallet?: string;
    status?: string;
    fee?: bigint;
    memo?: string;
  }) {
    return this.db.createSolanaTransaction({
      transactionHash: data.transactionHash,
      agentWallet: data.agentWallet ?? null,
      status: data.status ?? 'pending',
      fee: data.fee ?? BigInt(0),
      memo: data.memo ?? null,
    });
  }

  async updateTransaction(id: string, data: Prisma.SolanaTransactionUpdateInput) {
    return this.db.updateSolanaTransaction(id, data);
  }

  async getTransactionsByWallet(walletAddress: string) {
    return this.db.getSolanaTransactionsByWallet(walletAddress);
  }

  // Token metadata
  async saveTokenMetadata(data: {
    mintAddress: string;
    name?: string;
    symbol?: string;
    description?: string;
    logoUri?: string;
    decimals?: number;
    price?: number;
  }) {
    return this.db.createTokenMetadata({
      mintAddress: data.mintAddress,
      name: data.name ?? null,
      symbol: data.symbol ?? null,
      description: data.description ?? null,
      logoUri: data.logoUri ?? null,
      decimals: data.decimals ?? 9,
      price: data.price ?? null,
    });
  }

  async getTokenByMint(mintAddress: string) {
    return this.db.getTokenMetadataByMint(mintAddress);
  }

  async searchTokens(symbol: string) {
    return this.db.searchTokensBySymbol(symbol);
  }

  // Health check
  async isHealthy(): Promise<boolean> {
    return this.db.healthCheck();
  }

  // Statistics for agent
  async getAgentStatistics(personaId: string) {
    const actions = await this.db.getProofsOfActionByPersona(personaId);
    const evidence = await this.db.getProofsOfEvidenceByPersona(personaId);
    const evolution = await this.db.getProofsOfEvolutionByPersona(personaId);
    const memories = await this.db.getMemorySnapshotsByPersona(personaId);

    return {
      totalActions: actions.length,
      successfulActions: actions.filter(a => a.isSuccessful).length,
      totalEvidence: evidence.length,
      totalEvolution: evolution.length,
      totalMemories: memories.length,
      lastAction: actions.length > 0 ? actions[actions.length - 1] : null,
    };
  }

  // Direct Prisma access for advanced operations
  getPrisma() {
    return this.db.getPrismaClient();
  }

  // Close database connection
  async close() {
    return this.db.disconnect();
  }
}
