"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OobeCore = void 0;
const Agents_1 = require("./agent/Agents");
const verifyConfig_1 = __importDefault(require("./utils/helpers/verifyConfig"));
const logger_1 = __importDefault(require("./utils/logger/logger"));
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const messages_1 = require("@langchain/core/messages");
const langgraph_1 = require("@langchain/langgraph");
const Persona_1 = require("./agent/persona/Persona");
const database_service_1 = require("./services/database.service");
const memorySaver_helper_1 = require("./utils/memorySaver.helper");
const redis_session_manager_1 = require("./utils/redis-session.manager");
/**
                               ..................
                        ............. .................
                   ,....... .  .......... . .,,/ # # %,  .
                ........................ / %#####((((((((@ ,
             ,................. *( (#(#(#(((((((((((((((((#@ ,
           ............ / *(#(((((((((((((((((((((((((((((((#@ ,
         *........./ (#(((((((((((((((((((((((((((((((#####(((%@ .
        ........,/(#((((((((((((((((((((((((((#(((((########((((@ .
       ......../ ##((((((((((((((((((((((((#   @        %     (##@#
      ........./##((((((((((((#, #((#          @          ,.##(.  (@
     ......... ##(((((((((# #(##.             ,**#%%%@&&&%&%%%%&%( %%/
     ........ #%#((((((((*(#. @@      &@ (%&&%#%##(*,.../%%######/  #%
     ........../##(((((((## #   @    /%&%(%.  ,.  **.    (##%&&#*  &. (@
     ,......... #((((((((  .  ,  *#%%%#( /, @@@@@. /, //@%%%%%/(      ((((%@
     ...........##((((((     @ #&@%##* ..,    ..  .#&%&&@##     #@%   (((% #%
      ..........(#((((((    .&&##%##.   .,/(/%###%&@(#/ @        @   ((((# ##
      ...........(((((((  .&&@%&%@%##%%%&%&&%&@%#####   (     ,#(((((((((#@ %
       .........../((((#. /%%%&%%%%%%%(#.,*@ .   ###((((###(((((((((((((((@/@
        ...........((((((      @      &      #((##(((((#%  #((((((((((((((#@
         ...   .  .##((((((       @    %(((((((#   ,#( #(((((((((((((((((((@,
          ..  &%  ,##((((((((((((((((((((((((((((((((((((((((((((((((((((((@@
           , #  .%###(((((((((((((((((((((((((((((((###%   . %#((((((((((((@@
             ###, ###(((((((((((((((((((((((((((((# @ %        #(((((((((((@,
              *## ###(((((((((((((((((((((((((((#%       (/   ##((((((((((#@
                #### ##(((((((((((((((((((((((((#,    #####%/ %(((((((((((@
                     #(((((((((((((((((((((((((((((###   %###((((((((((((&.
                       #(((((((((((((((((((((((((((((((((((((((((((((((((@
                         (((((((((((((((((((((((((((((((((((((((((( #(((@
                           #((((((((((((((((((((((((((((((((((((#  (((((
                            ((((((((((((((((((((((#####(((#%    (((((((@
                       /(*(*  #((((((((((((((((((((#(#####(#((((((((((# ,(///*
                       (((,/// /(#((((((((((((((((((((((((((((((((((# .///(
                           //////*  ###((((((((((((((((((((((((((  ///((
                                ///////,    %#######((((##    /(///(
 * @name OobeCore
 * @description Core module for the OOBE protocol
 * @example const core = new OobeCore(config)
 * @author oobe-protocol
*/
class OobeCore {
    constructor(config) {
        this.config = config;
        this.logger = new logger_1.default();
        if ((0, verifyConfig_1.default)(config)) {
            this.agent = new Agents_1.Agent(config.solanaEndpoint, config.private_key, config.openAiKey, this.logger);
        }
        else {
            this.logger.error("Invalid configuration");
            throw new Error("Invalid configuration");
        }
        // Initialize MemorySaver based on configuration
        const memorySaver = (0, memorySaver_helper_1.createMemorySaver)(config);
        this.memory = memorySaver || new langgraph_1.MemorySaver(); // Fallback to default if not configured
        // Initialize database service with Prisma URL if available
        if (config.url_prisma_db || config.dbConfig) {
            this.databaseService = database_service_1.DatabaseService.getInstance();
        }
    }
    async start() {
        try {
            await this.agent.initialize();
            // Initialize Redis session manager if configured
            if (this.memory instanceof redis_session_manager_1.RedisSessionManager) {
                await this.memory.initialize();
            }
            // Initialize database if available
            if (this.databaseService) {
                // Set Prisma database URL if configured
                if (this.config.url_prisma_db) {
                    process.env.DATABASE_URL = this.config.url_prisma_db;
                    this.logger.info(`Using Prisma database: ${this.config.url_prisma_db}`);
                }
                await this.databaseService.init();
            }
            this.logger.success("OOBE CORE - started successfully!");
        }
        catch (error) {
            this.logger.error(`Error starting OobeCore: ${error}`);
        }
    }
    async CreatePersona(name, age, socials) {
        try {
            // Create in-memory persona first
            const persona = new Persona_1.PersonaImpl("defaultId", name);
            persona.generateMerkleTree();
            // If database is available, persist the persona
            if (this.databaseService) {
                const dbPersona = await this.databaseService.createAgent({
                    name: name,
                    walletAddress: this.agent.walletAddress?.toString(),
                    description: `AI Agent created on ${new Date().toISOString()}`,
                    personality: {
                        age: age,
                        socials: socials,
                        created: new Date().toISOString()
                    },
                    traits: {
                        adaptability: 75,
                        intelligence: 80,
                        creativity: 70,
                        analytical: 85
                    }
                });
                this.logger.success(`Persona created with database ID: ${dbPersona.id}`);
                return dbPersona;
            }
            this.logger.info("Persona created in memory only (no database configured)");
            return null;
        }
        catch (error) {
            this.logger.error(`Error on CreatePersona: ${error}`);
            return null;
        }
    }
    async recordAction(actionType, actionData, result) {
        if (!this.databaseService) {
            this.logger.warn('Database service not available for action recording');
            return;
        }
        try {
            const persona = await this.databaseService.getAgentByWallet(this.agent.walletAddress?.toString() || '');
            if (!persona) {
                this.logger.warn('No persona found for wallet, cannot record action');
                return;
            }
            await this.databaseService.recordAction({
                personaId: persona.id,
                actionType: actionType,
                actionData: JSON.stringify(actionData),
                result: result ? JSON.stringify(result) : null,
                isSuccessful: !!result
            });
            this.logger.success(`Action recorded: ${actionType}`);
        }
        catch (error) {
            this.logger.error(`Error recording action: ${error}`);
        }
    }
    async getPersonaStatistics() {
        if (!this.databaseService) {
            this.logger.warn("No database service available for statistics");
            return null;
        }
        try {
            const persona = await this.databaseService.getAgentByWallet(this.agent.walletAddress?.toString() || '');
            if (!persona) {
                this.logger.warn("No persona found for current agent wallet");
                return null;
            }
            return await this.databaseService.getAgentStatistics(persona.id);
        }
        catch (error) {
            this.logger.error(`Error getting persona statistics: ${error}`);
            return null;
        }
    }
    CreateOobeAgent(name, age, socials, genAi, tools, memory, messageModifier) {
        this.CreatePersona(name, age, socials);
        return (0, prebuilt_1.createReactAgent)({
            llm: genAi,
            tools: tools,
            checkpointSaver: memory,
            messageModifier: messageModifier
        });
    }
    AccessMemory() {
        return this.memory;
    }
    /**
     * Get the current configuration
     */
    getConfig() {
        return this.config;
    }
    /**
     * Get the configured Prisma database URL
     */
    getPrismaDbUrl() {
        return this.config.url_prisma_db;
    }
    /**
     * Get the MemorySaver configuration
     */
    getMemorySaverConfig() {
        return this.config.memorySaver;
    }
    /**
     * Get the session manager (if using Redis)
     */
    getSessionManager() {
        return this.memory instanceof redis_session_manager_1.RedisSessionManager ? this.memory : null;
    }
    /**
     * Create a new session (Redis only)
     */
    async createSession(userId, metadata) {
        const sessionManager = this.getSessionManager();
        if (sessionManager) {
            return await sessionManager.createSession(userId, metadata);
        }
        this.logger.warn("Session creation is only available with Redis storage");
        return null;
    }
    /**
     * List all active sessions (Redis only)
     */
    async listSessions(userId) {
        const sessionManager = this.getSessionManager();
        if (sessionManager) {
            return await sessionManager.listSessions(userId);
        }
        this.logger.warn("Session listing is only available with Redis storage");
        return null;
    }
    /**
     * Delete a session (Redis only)
     */
    async deleteSession(sessionId) {
        const sessionManager = this.getSessionManager();
        if (sessionManager) {
            return await sessionManager.deleteSession(sessionId);
        }
        this.logger.warn("Session deletion is only available with Redis storage");
        return false;
    }
    /**
     * Get session statistics (Redis only)
     */
    async getSessionStats() {
        const sessionManager = this.getSessionManager();
        if (sessionManager) {
            return await sessionManager.getSessionStats();
        }
        this.logger.warn("Session statistics are only available with Redis storage");
        return null;
    }
    /**
     * Clean up expired sessions (Redis only)
     */
    async cleanupExpiredSessions() {
        const sessionManager = this.getSessionManager();
        if (sessionManager) {
            return await sessionManager.cleanupExpiredSessions();
        }
        this.logger.warn("Session cleanup is only available with Redis storage");
        return 0;
    }
    AgentHumanMessage(userInput) {
        return new messages_1.HumanMessage(userInput);
    }
    async stop() {
        try {
            // Disconnect Redis session manager if configured
            if (this.memory instanceof redis_session_manager_1.RedisSessionManager) {
                await this.memory.disconnect();
            }
            // Close database connection if available
            if (this.databaseService) {
                await this.databaseService.close();
                this.logger.info("Database service closed!");
            }
            this.logger.success("OOBE CORE - stopped successfully!");
        }
        catch (error) {
            this.logger.error(`Error stopping OobeCore: ${error}`);
        }
    }
    getAgent() {
        return this.agent;
    }
    getDatabaseService() {
        return this.databaseService;
    }
    getConfiguration() {
        return this.config;
    }
}
exports.OobeCore = OobeCore;
//# sourceMappingURL=core.js.map