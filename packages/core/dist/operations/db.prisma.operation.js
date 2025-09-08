"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBOperations = void 0;
const prisma_1 = require("../generated/prisma");
class DBOperations {
    constructor() {
        this.prisma = new prisma_1.PrismaClient({
            log: ['query', 'info', 'warn', 'error'],
        });
    }
    // Singleton pattern
    static getInstance() {
        if (!DBOperations.instance) {
            DBOperations.instance = new DBOperations();
        }
        return DBOperations.instance;
    }
    // Connection methods
    async connect() {
        try {
            await this.prisma.$connect();
            console.log("Prisma Client connected successfully!");
        }
        catch (err) {
            console.error("Error connecting to database:", err);
            throw err;
        }
    }
    async disconnect() {
        try {
            await this.prisma.$disconnect();
            console.log("Prisma Client disconnected successfully!");
        }
        catch (err) {
            console.error("Error disconnecting from database:", err);
            throw err;
        }
    }
    // Agent Persona operations
    async createAgentPersona(data) {
        return this.prisma.agentPersona.create({ data });
    }
    async getAgentPersona(id) {
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
    async getAgentPersonaByName(name) {
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
    async getAgentPersonaByWallet(walletAddress) {
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
    async updateAgentPersona(id, data) {
        return this.prisma.agentPersona.update({
            where: { id },
            data,
        });
    }
    async deleteAgentPersona(id) {
        return this.prisma.agentPersona.delete({
            where: { id },
        });
    }
    async listAgentPersonas(options) {
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
    async createProofOfAction(data) {
        return this.prisma.proofOfAction.create({ data });
    }
    async getProofOfAction(id) {
        return this.prisma.proofOfAction.findUnique({
            where: { id },
            include: { persona: true },
        });
    }
    async getProofsOfActionByPersona(personaId) {
        return this.prisma.proofOfAction.findMany({
            where: { personaId },
            orderBy: { createdAt: 'desc' },
            include: { persona: true },
        });
    }
    async getProofsOfActionByType(actionType) {
        return this.prisma.proofOfAction.findMany({
            where: { actionType },
            orderBy: { createdAt: 'desc' },
            include: { persona: true },
        });
    }
    // Proof of Evidence operations
    async createProofOfEvidence(data) {
        return this.prisma.proofOfEvidence.create({ data });
    }
    async getProofOfEvidence(id) {
        return this.prisma.proofOfEvidence.findUnique({
            where: { id },
            include: { persona: true },
        });
    }
    async getProofsOfEvidenceByPersona(personaId) {
        return this.prisma.proofOfEvidence.findMany({
            where: { personaId },
            orderBy: { createdAt: 'desc' },
            include: { persona: true },
        });
    }
    // Proof of Evolution operations
    async createProofOfEvolution(data) {
        return this.prisma.proofOfEvolution.create({ data });
    }
    async getProofOfEvolution(id) {
        return this.prisma.proofOfEvolution.findUnique({
            where: { id },
            include: { persona: true },
        });
    }
    async getProofsOfEvolutionByPersona(personaId) {
        return this.prisma.proofOfEvolution.findMany({
            where: { personaId },
            orderBy: { createdAt: 'desc' },
            include: { persona: true },
        });
    }
    // Memory Snapshot operations
    async createMemorySnapshot(data) {
        return this.prisma.memorySnapshot.create({ data });
    }
    async getMemorySnapshot(id) {
        return this.prisma.memorySnapshot.findUnique({
            where: { id },
            include: { persona: true },
        });
    }
    async getMemorySnapshotsByPersona(personaId) {
        return this.prisma.memorySnapshot.findMany({
            where: { personaId },
            orderBy: { createdAt: 'desc' },
            include: { persona: true },
        });
    }
    // Solana Transaction operations
    async createSolanaTransaction(data) {
        return this.prisma.solanaTransaction.create({ data });
    }
    async getSolanaTransaction(id) {
        return this.prisma.solanaTransaction.findUnique({
            where: { id },
        });
    }
    async getSolanaTransactionByHash(transactionHash) {
        return this.prisma.solanaTransaction.findFirst({
            where: { transactionHash },
        });
    }
    async getSolanaTransactionsByWallet(agentWallet) {
        return this.prisma.solanaTransaction.findMany({
            where: { agentWallet },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateSolanaTransaction(id, data) {
        return this.prisma.solanaTransaction.update({
            where: { id },
            data,
        });
    }
    // Token Metadata operations
    async createTokenMetadata(data) {
        return this.prisma.tokenMetadata.create({ data });
    }
    async getTokenMetadata(id) {
        return this.prisma.tokenMetadata.findUnique({
            where: { id },
        });
    }
    async getTokenMetadataByMint(mintAddress) {
        return this.prisma.tokenMetadata.findUnique({
            where: { mintAddress },
        });
    }
    async updateTokenMetadata(id, data) {
        return this.prisma.tokenMetadata.update({
            where: { id },
            data,
        });
    }
    async searchTokensBySymbol(symbol) {
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
    async executeRawQuery(query, parameters) {
        return this.prisma.$queryRawUnsafe(query, ...(parameters || []));
    }
    // Transaction support
    async executeTransaction(callback) {
        return this.prisma.$transaction(callback);
    }
    // Health check
    async healthCheck() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            console.error('Database health check failed:', error);
            return false;
        }
    }
    // Get Prisma instance for direct access
    getPrismaClient() {
        return this.prisma;
    }
}
exports.DBOperations = DBOperations;
//# sourceMappingURL=db.prisma.operation.js.map