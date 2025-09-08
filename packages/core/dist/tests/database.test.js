"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDatabaseOperations = testDatabaseOperations;
exports.testRepositoryOperations = testRepositoryOperations;
const DatabaseService_1 = require("../services/DatabaseService");
const logger_1 = __importDefault(require("../utils/logger/logger"));
const logger = new logger_1.default();
// Test configuration for in-memory or test database
const testConfig = {
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'oobe_test',
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: []
};
async function testDatabaseOperations() {
    logger.info('🧪 Starting Database Tests...');
    const dbService = new DatabaseService_1.DatabaseService(testConfig);
    try {
        // Test 1: Database Connection
        logger.info('Test 1: Testing database connection...');
        await dbService.initialize();
        logger.success('✅ Database connection established');
        // Test 2: Health Check
        logger.info('Test 2: Testing health check...');
        const healthCheck = await dbService.healthCheck();
        logger.success(`✅ Health check result: ${healthCheck.status}`);
        // Test 3: Create Agent Persona
        logger.info('Test 3: Creating agent persona...');
        const testPersona = await dbService.createAgentPersona({
            name: 'Test Agent',
            walletAddress: '11111111111111111111111111111112',
            description: 'A test agent for SDK validation',
            personality: { trait1: 'analytical', trait2: 'helpful' },
            traits: { intelligence: 85, creativity: 70 }
        });
        logger.success(`✅ Created persona with ID: ${testPersona.id}`);
        // Test 4: Add Proof of Action
        logger.info('Test 4: Adding proof of action...');
        const proofOfAction = await dbService.addProofOfAction(testPersona.id, {
            actionType: 'TOKEN_SWAP',
            actionData: JSON.stringify({ from: 'SOL', to: 'USDC', amount: 1.5 }),
            transactionHash: 'test_hash_123',
            isSuccessful: true,
            amount: 1.5
        });
        logger.success(`✅ Created proof of action with ID: ${proofOfAction.id}`);
        // Test 5: Add Proof of Evidence
        logger.info('Test 5: Adding proof of evidence...');
        const proofOfEvidence = await dbService.addProofOfEvidence(testPersona.id, {
            evidenceType: 'TRANSACTION_RECEIPT',
            evidenceData: JSON.stringify({ txHash: 'test_hash_123', block: 12345 }),
            sourceType: 'BLOCKCHAIN',
            isVerified: true,
            confidenceScore: 0.95
        });
        logger.success(`✅ Created proof of evidence with ID: ${proofOfEvidence.id}`);
        // Test 6: Add Proof of Evolution
        logger.info('Test 6: Adding proof of evolution...');
        const proofOfEvolution = await dbService.addProofOfEvolution(testPersona.id, {
            evolutionType: 'TRAIT_UPDATE',
            previousState: { intelligence: 85 },
            newState: { intelligence: 87 },
            changes: { intelligence: { from: 85, to: 87, reason: 'successful_trades' } },
            reasoning: 'Agent learned from successful trading patterns',
            version: 1
        });
        logger.success(`✅ Created proof of evolution with ID: ${proofOfEvolution.id}`);
        // Test 7: Create Memory Snapshot
        logger.info('Test 7: Creating memory snapshot...');
        const memorySnapshot = await dbService.createMemorySnapshot(testPersona.id, {
            snapshotType: 'DAILY_BACKUP',
            memoryData: {
                experiences: ['trade_1', 'trade_2'],
                learned_patterns: ['bullish_signal', 'support_resistance']
            },
            merkleRoot: 'test_merkle_root_abc123',
            nodeCount: 10,
            sizeBytes: 1024
        });
        logger.success(`✅ Created memory snapshot with ID: ${memorySnapshot.id}`);
        // Test 8: Retrieve Persona by Wallet
        logger.info('Test 8: Retrieving persona by wallet...');
        const retrievedPersona = await dbService.getPersonaByWallet(testPersona.walletAddress);
        logger.success(`✅ Retrieved persona: ${retrievedPersona?.name}`);
        // Test 9: Get Persona Statistics
        logger.info('Test 9: Getting persona statistics...');
        const stats = await dbService.getPersonaStatistics(testPersona.id);
        logger.success(`✅ Persona stats: ${JSON.stringify(stats, null, 2)}`);
        // Test 10: Transaction Test
        logger.info('Test 10: Testing database transactions...');
        await dbService.executeTransaction(async (manager) => {
            // This would be atomic operations
            logger.info('Inside transaction - all operations are atomic');
            return true;
        });
        logger.success('✅ Transaction test completed');
        logger.success('🎉 All database tests passed successfully!');
    }
    catch (error) {
        logger.error(`❌ Database test failed: ${error}`);
        throw error;
    }
    finally {
        // Cleanup
        await dbService.close();
        logger.info('🧹 Test cleanup completed');
    }
}
async function testRepositoryOperations() {
    logger.info('🧪 Starting Repository Tests...');
    const dbService = new DatabaseService_1.DatabaseService(testConfig);
    try {
        await dbService.initialize();
        // Test custom repository methods
        const personaRepo = dbService.getAgentPersonaRepository();
        const actionRepo = dbService.getProofOfActionRepository();
        // Test persona repository methods
        logger.info('Testing persona repository methods...');
        const activePersonas = await personaRepo.findActivePersonas();
        logger.success(`✅ Found ${activePersonas.length} active personas`);
        const experiencedPersonas = await personaRepo.getExperiencedPersonas(50);
        logger.success(`✅ Found ${experiencedPersonas.length} experienced personas`);
        // Test action repository methods
        logger.info('Testing action repository methods...');
        if (activePersonas.length > 0) {
            const actionStats = await actionRepo.getActionStats(activePersonas[0].id);
            logger.success(`✅ Action stats: ${JSON.stringify(actionStats)}`);
            const actionTypes = await actionRepo.getActionTypesDistribution(activePersonas[0].id);
            logger.success(`✅ Action types distribution: ${JSON.stringify(actionTypes)}`);
        }
        logger.success('🎉 All repository tests passed!');
    }
    catch (error) {
        logger.error(`❌ Repository test failed: ${error}`);
        throw error;
    }
    finally {
        await dbService.close();
    }
}
// Auto-run tests if this file is executed directly
if (require.main === module) {
    async function runAllTests() {
        try {
            await testDatabaseOperations();
            await testRepositoryOperations();
            logger.success('🎉 All tests completed successfully!');
            process.exit(0);
        }
        catch (error) {
            logger.error(`❌ Tests failed: ${error}`);
            process.exit(1);
        }
    }
    runAllTests();
}
//# sourceMappingURL=database.test.js.map