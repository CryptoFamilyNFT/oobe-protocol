import { PrismaClient } from '../generated/prisma';
import type { 
  AgentPersona, 
  ProofOfAction, 
  ProofOfEvidence, 
  ProofOfEvolution,
  MemorySnapshot,
  SolanaTransaction,
  TokenMetadata,
  Prisma
} from '../generated/prisma';

export class DBOperations {
  private prisma: PrismaClient;
  private static instance: DBOperations;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  // Singleton pattern
  public static getInstance(): DBOperations {
    if (!DBOperations.instance) {
      DBOperations.instance = new DBOperations();
    }
    return DBOperations.instance;
  }

  // Connection methods
  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log("Prisma Client connected successfully!");
    } catch (err) {
      console.error("Error connecting to database:", err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log("Prisma Client disconnected successfully!");
    } catch (err) {
      console.error("Error disconnecting from database:", err);
      throw err;
    }
  }

  // Agent Persona operations
  async createAgentPersona(data: Prisma.AgentPersonaCreateInput): Promise<AgentPersona> {
    return this.prisma.agentPersona.create({ data });
  }

  async getAgentPersona(id: string): Promise<AgentPersona | null> {
    return this.prisma.agentPersona.findUnique({
      where: { id },
      include: {
        proofsOfAction: true,
        proofsOfEvidence: true,
        proofsOfEvolution: true,
        memorySnapshots: true,
      },
    });
  }

  async getAgentPersonaByName(name: string): Promise<AgentPersona | null> {
    return this.prisma.agentPersona.findUnique({
      where: { name },
      include: {
        proofsOfAction: true,
        proofsOfEvidence: true,
        proofsOfEvolution: true,
        memorySnapshots: true,
      },
    });
  }

  async getAgentPersonaByWallet(walletAddress: string): Promise<AgentPersona | null> {
    return this.prisma.agentPersona.findFirst({
      where: { walletAddress },
      include: {
        proofsOfAction: true,
        proofsOfEvidence: true,
        proofsOfEvolution: true,
        memorySnapshots: true,
      },
    });
  }

  async updateAgentPersona(id: string, data: Prisma.AgentPersonaUpdateInput): Promise<AgentPersona> {
    return this.prisma.agentPersona.update({
      where: { id },
      data,
    });
  }

  async deleteAgentPersona(id: string): Promise<AgentPersona> {
    return this.prisma.agentPersona.delete({
      where: { id },
    });
  }

  async listAgentPersonas(options?: {
    skip?: number;
    take?: number;
    where?: Prisma.AgentPersonaWhereInput;
    orderBy?: Prisma.AgentPersonaOrderByWithRelationInput;
  }): Promise<AgentPersona[]> {
    return this.prisma.agentPersona.findMany({
      ...(options?.skip !== undefined && { skip: options.skip }),
      ...(options?.take !== undefined && { take: options.take }),
      ...(options?.where && { where: options.where }),
      orderBy: options?.orderBy || { createdAt: 'desc' },
      include: {
        proofsOfAction: true,
        proofsOfEvidence: true,
        proofsOfEvolution: true,
        memorySnapshots: true,
      },
    });
  }

  // Proof of Action operations
  async createProofOfAction(data: Prisma.ProofOfActionCreateInput): Promise<ProofOfAction> {
    return this.prisma.proofOfAction.create({ data });
  }

  async getProofOfAction(id: string): Promise<ProofOfAction | null> {
    return this.prisma.proofOfAction.findUnique({
      where: { id },
      include: { persona: true },
    });
  }

  async getProofsOfActionByPersona(personaId: string): Promise<ProofOfAction[]> {
    return this.prisma.proofOfAction.findMany({
      where: { personaId },
      orderBy: { createdAt: 'desc' },
      include: { persona: true },
    });
  }

  async getProofsOfActionByType(actionType: string): Promise<ProofOfAction[]> {
    return this.prisma.proofOfAction.findMany({
      where: { actionType },
      orderBy: { createdAt: 'desc' },
      include: { persona: true },
    });
  }

  // Proof of Evidence operations
  async createProofOfEvidence(data: Prisma.ProofOfEvidenceCreateInput): Promise<ProofOfEvidence> {
    return this.prisma.proofOfEvidence.create({ data });
  }

  async getProofOfEvidence(id: string): Promise<ProofOfEvidence | null> {
    return this.prisma.proofOfEvidence.findUnique({
      where: { id },
      include: { persona: true },
    });
  }

  async getProofsOfEvidenceByPersona(personaId: string): Promise<ProofOfEvidence[]> {
    return this.prisma.proofOfEvidence.findMany({
      where: { personaId },
      orderBy: { createdAt: 'desc' },
      include: { persona: true },
    });
  }

  // Proof of Evolution operations
  async createProofOfEvolution(data: Prisma.ProofOfEvolutionCreateInput): Promise<ProofOfEvolution> {
    return this.prisma.proofOfEvolution.create({ data });
  }

  async getProofOfEvolution(id: string): Promise<ProofOfEvolution | null> {
    return this.prisma.proofOfEvolution.findUnique({
      where: { id },
      include: { persona: true },
    });
  }

  async getProofsOfEvolutionByPersona(personaId: string): Promise<ProofOfEvolution[]> {
    return this.prisma.proofOfEvolution.findMany({
      where: { personaId },
      orderBy: { createdAt: 'desc' },
      include: { persona: true },
    });
  }

  // Memory Snapshot operations
  async createMemorySnapshot(data: Prisma.MemorySnapshotCreateInput): Promise<MemorySnapshot> {
    return this.prisma.memorySnapshot.create({ data });
  }

  async getMemorySnapshot(id: string): Promise<MemorySnapshot | null> {
    return this.prisma.memorySnapshot.findUnique({
      where: { id },
      include: { persona: true },
    });
  }

  async getMemorySnapshotsByPersona(personaId: string): Promise<MemorySnapshot[]> {
    return this.prisma.memorySnapshot.findMany({
      where: { personaId },
      orderBy: { createdAt: 'desc' },
      include: { persona: true },
    });
  }

  // Solana Transaction operations
  async createSolanaTransaction(data: Prisma.SolanaTransactionCreateInput): Promise<SolanaTransaction> {
    return this.prisma.solanaTransaction.create({ data });
  }

  async getSolanaTransaction(id: string): Promise<SolanaTransaction | null> {
    return this.prisma.solanaTransaction.findUnique({
      where: { id },
    });
  }

  async getSolanaTransactionByHash(transactionHash: string): Promise<SolanaTransaction | null> {
    return this.prisma.solanaTransaction.findFirst({
      where: { transactionHash },
    });
  }

  async getSolanaTransactionsByWallet(agentWallet: string): Promise<SolanaTransaction[]> {
    return this.prisma.solanaTransaction.findMany({
      where: { agentWallet },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateSolanaTransaction(id: string, data: Prisma.SolanaTransactionUpdateInput): Promise<SolanaTransaction> {
    return this.prisma.solanaTransaction.update({
      where: { id },
      data,
    });
  }

  // Token Metadata operations
  async createTokenMetadata(data: Prisma.TokenMetadataCreateInput): Promise<TokenMetadata> {
    return this.prisma.tokenMetadata.create({ data });
  }

  async getTokenMetadata(id: string): Promise<TokenMetadata | null> {
    return this.prisma.tokenMetadata.findUnique({
      where: { id },
    });
  }

  async getTokenMetadataByMint(mintAddress: string): Promise<TokenMetadata | null> {
    return this.prisma.tokenMetadata.findUnique({
      where: { mintAddress },
    });
  }

  async updateTokenMetadata(id: string, data: Prisma.TokenMetadataUpdateInput): Promise<TokenMetadata> {
    return this.prisma.tokenMetadata.update({
      where: { id },
      data,
    });
  }

  async searchTokensBySymbol(symbol: string): Promise<TokenMetadata[]> {
    return this.prisma.tokenMetadata.findMany({
      where: {
        symbol: {
          contains: symbol,
        },
        isActive: true,
      },
      orderBy: { marketCap: 'desc' },
    });
  }

  // Raw query execution for complex operations
  async executeRawQuery<T = any>(query: string, parameters?: any[]): Promise<T> {
    return this.prisma.$queryRawUnsafe(query, ...(parameters || []));
  }

  // Transaction support
  async executeTransaction<T>(callback: (prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'>) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(callback);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Get Prisma instance for direct access
  getPrismaClient(): PrismaClient {
    return this.prisma;
  }
}
