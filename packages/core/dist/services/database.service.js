"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const db_operation_1 = require("../operations/db.operation");
/**
 * DatabaseService - A simplified interface for database operations
 * Optimized for Next.js and edge runtime environments
 */
class DatabaseService {
    constructor() {
        this.db = db_operation_1.DBOperations.getInstance();
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    // Simplified connection management
    async init() {
        try {
            await this.db.connect();
        }
        catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }
    async cleanup() {
        try {
            await this.db.disconnect();
        }
        catch (error) {
            console.error('Failed to cleanup database:', error);
        }
    }
    // Agent operations with simplified interface
    async createAgent(data) {
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
    async getAgent(id) {
        return this.db.getAgentPersona(id);
    }
    async getAgentByName(name) {
        return this.db.getAgentPersonaByName(name);
    }
    async getAgentByWallet(walletAddress) {
        return this.db.getAgentPersonaByWallet(walletAddress);
    }
    async updateAgent(id, data) {
        return this.db.updateAgentPersona(id, data);
    }
    async listAgents(params) {
        const options = {};
        if (params?.limit)
            options.take = params.limit;
        if (params?.offset)
            options.skip = params.offset;
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
    async recordAction(data) {
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
    async getActionsByAgent(personaId) {
        return this.db.getProofsOfActionByPersona(personaId);
    }
    // Evidence tracking
    async recordEvidence(data) {
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
    async recordEvolution(data) {
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
    async saveMemorySnapshot(data) {
        return this.db.createMemorySnapshot({
            persona: { connect: { id: data.personaId } },
            snapshotType: data.snapshotType,
            memoryData: data.memoryData,
            merkleRoot: data.merkleRoot,
            description: data.description ?? null,
        });
    }
    // Transaction tracking
    async recordTransaction(data) {
        return this.db.createSolanaTransaction({
            transactionHash: data.transactionHash,
            agentWallet: data.agentWallet ?? null,
            status: data.status ?? 'pending',
            fee: data.fee ?? BigInt(0),
            memo: data.memo ?? null,
        });
    }
    async updateTransaction(id, data) {
        return this.db.updateSolanaTransaction(id, data);
    }
    async getTransactionsByWallet(walletAddress) {
        return this.db.getSolanaTransactionsByWallet(walletAddress);
    }
    // Token metadata
    async saveTokenMetadata(data) {
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
    async getTokenByMint(mintAddress) {
        return this.db.getTokenMetadataByMint(mintAddress);
    }
    async searchTokens(symbol) {
        return this.db.searchTokensBySymbol(symbol);
    }
    // Health check
    async isHealthy() {
        return this.db.healthCheck();
    }
    // Statistics for agent
    async getAgentStatistics(personaId) {
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
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map