"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const db_operation_1 = require("../operations/db.operation");
const repositories_1 = require("../repositories");
const logger_1 = __importDefault(require("../utils/logger/logger"));
class DatabaseService {
    constructor(config) {
        this.dbOperations = new db_operation_1.DBOperations(config);
        this.logger = new logger_1.default();
    }
    /**
     * Initialize database connection
     */
    async initialize() {
        await this.dbOperations.connect();
        this.logger.success('Database service initialized successfully');
    }
    /**
     * Close database connection
     */
    async close() {
        await this.dbOperations.disconnect();
        this.logger.info('Database service closed');
    }
    /**
     * Get custom repositories
     */
    getAgentPersonaRepository() {
        return new repositories_1.AgentPersonaRepository(this.dbOperations['dataSource']);
    }
    getProofOfActionRepository() {
        return new repositories_1.ProofOfActionRepository(this.dbOperations['dataSource']);
    }
    /**
     * Create a new agent persona
     */
    async createAgentPersona(data) {
        const repository = this.dbOperations.getAgentPersonaRepository();
        const persona = repository.create(data);
        return await repository.save(persona);
    }
    /**
     * Add proof of action to persona
     */
    async addProofOfAction(personaId, actionData) {
        const repository = this.dbOperations.getProofOfActionRepository();
        const proof = repository.create({
            ...actionData,
            persona_id: personaId
        });
        return await repository.save(proof);
    }
    /**
     * Add proof of evidence to persona
     */
    async addProofOfEvidence(personaId, evidenceData) {
        const repository = this.dbOperations.getProofOfEvidenceRepository();
        const proof = repository.create({
            ...evidenceData,
            persona_id: personaId
        });
        return await repository.save(proof);
    }
    /**
     * Add proof of evolution to persona
     */
    async addProofOfEvolution(personaId, evolutionData) {
        const repository = this.dbOperations.getProofOfEvolutionRepository();
        const proof = repository.create({
            ...evolutionData,
            persona_id: personaId
        });
        return await repository.save(proof);
    }
    /**
     * Create memory snapshot
     */
    async createMemorySnapshot(personaId, snapshotData) {
        const repository = this.dbOperations.getMemorySnapshotRepository();
        const snapshot = repository.create({
            ...snapshotData,
            persona_id: personaId
        });
        return await repository.save(snapshot);
    }
    /**
     * Get persona by wallet address with all related data
     */
    async getPersonaByWallet(walletAddress) {
        const repository = this.getAgentPersonaRepository();
        return await repository.findByWalletAddress(walletAddress);
    }
    /**
     * Get persona statistics
     */
    async getPersonaStatistics(personaId) {
        const repository = this.getAgentPersonaRepository();
        return await repository.getPersonaStats(personaId);
    }
    /**
     * Execute transaction
     */
    async executeTransaction(fn) {
        return await this.dbOperations.transaction(fn);
    }
    /**
     * Run database migrations
     */
    async runMigrations() {
        await this.dbOperations.runMigrations();
    }
    /**
     * Synchronize database schema
     */
    async synchronizeSchema() {
        await this.dbOperations.synchronizeSchema();
    }
    /**
     * Check if database is connected
     */
    async isConnected() {
        return await this.dbOperations.isConnected();
    }
    /**
     * Health check for the database
     */
    async healthCheck() {
        try {
            const isConnected = await this.isConnected();
            if (!isConnected) {
                return { status: 'error', message: 'Database not connected' };
            }
            // Simple query to test the connection
            await this.dbOperations.executeRawQuery('SELECT 1 as test');
            return {
                status: 'healthy',
                message: 'Database connection is working',
                timestamp: new Date().toISOString()
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: `Database health check failed: ${error}`,
                timestamp: new Date().toISOString()
            };
        }
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map