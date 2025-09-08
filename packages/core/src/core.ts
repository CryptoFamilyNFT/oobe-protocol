import { Agent } from "./agent/Agents";
import verifyConfig from "./utils/helpers/verifyConfig";
import Logger from "./utils/logger/logger";
import { IConfiguration } from "./config/types/config.types";
import { createReactAgent, ToolNode } from "@langchain/langgraph/prebuilt";
import { BaseChatModel, BaseChatModelCallOptions } from "@langchain/core/language_models/chat_models";
import { AIMessageChunk, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { PersonaImpl } from "./agent/persona/Persona";
import { ISocials } from "./types/core.interface";
import { DatabaseService } from "./services/database.service";
import { AgentPersona } from "./generated/prisma";
import { IDatabaseConfig } from "./types/db.interface";
import { createMemorySaver } from "./utils/memorySaver.helper";
import { RedisSessionManager } from "./utils/redis-session.manager";

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
export class OobeCore {
  private agent: Agent;
  private logger: Logger;
  private memory: MemorySaver | RedisSessionManager;
  private databaseService?: DatabaseService;
  private config: IConfiguration;

  constructor(config: IConfiguration) {
    this.config = config;
    this.logger = new Logger();
    if (verifyConfig(config)) {
      this.agent = new Agent(config.solanaEndpoint, config.private_key, config.openAiKey, this.logger);
    } else {
      this.logger.error("Invalid configuration");
      throw new Error("Invalid configuration");
    }
    
    // Initialize MemorySaver based on configuration
    const memorySaver = createMemorySaver(config);
    this.memory = memorySaver || new MemorySaver(); // Fallback to default if not configured
    
    // Initialize database service with Prisma URL if available
    if (config.url_prisma_db || config.dbConfig) {
      this.databaseService = DatabaseService.getInstance();
    }
  }

  async start() {
    try {
      await this.agent.initialize();
      
      // Initialize Redis session manager if configured
      if (this.memory instanceof RedisSessionManager) {
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
    } catch (error) {
      this.logger.error(`Error starting OobeCore: ${error}`);
    }
  }

  private async CreatePersona(name: string, age: number, socials: ISocials | null): Promise<AgentPersona | null> {
    try {
      // Create in-memory persona first
      const persona = new PersonaImpl("defaultId", name);
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
    } catch (error) {
      this.logger.error(`Error on CreatePersona: ${error}`);
      return null;
    }
  }

  async recordAction(actionType: string, actionData: any, result?: any): Promise<void> {
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
    } catch (error) {
      this.logger.error(`Error recording action: ${error}`);
    }
  }

  async getPersonaStatistics(): Promise<any> {
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
    } catch (error) {
      this.logger.error(`Error getting persona statistics: ${error}`);
      return null;
    }
  }

  CreateOobeAgent(
    name: string,
    age: number,
    socials: ISocials | null,
    genAi: ChatOpenAI<ChatOpenAICallOptions>, 
    tools: any | ToolNode<any>, 
    memory: MemorySaver, 
    messageModifier: any) {
      this.CreatePersona(name, age, socials);
      return createReactAgent({
        llm: genAi as unknown as BaseChatModel<BaseChatModelCallOptions, AIMessageChunk>,
        tools: tools as unknown as ToolNode<any>,
        checkpointSaver: memory,
        messageModifier: messageModifier
      });
  }

  AccessMemory() {
      return this.memory
  }

  /**
   * Get the current configuration
   */
  getConfig(): IConfiguration {
    return this.config;
  }

  /**
   * Get the configured Prisma database URL
   */
  getPrismaDbUrl(): string | undefined {
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
  getSessionManager(): RedisSessionManager | null {
    return this.memory instanceof RedisSessionManager ? this.memory : null;
  }

  /**
   * Create a new session (Redis only)
   */
  async createSession(userId?: string, metadata?: Record<string, any>): Promise<string | null> {
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
  async listSessions(userId?: string): Promise<any[] | null> {
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
  async deleteSession(sessionId: string): Promise<boolean> {
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
  async getSessionStats(): Promise<any | null> {
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
  async cleanupExpiredSessions(): Promise<number> {
    const sessionManager = this.getSessionManager();
    if (sessionManager) {
      return await sessionManager.cleanupExpiredSessions();
    }
    this.logger.warn("Session cleanup is only available with Redis storage");
    return 0;
  }

  AgentHumanMessage(userInput: string): HumanMessage {
      return new HumanMessage(userInput);
  }

  async stop() {
    try {
      // Disconnect Redis session manager if configured
      if (this.memory instanceof RedisSessionManager) {
        await this.memory.disconnect();
      }
      
      // Close database connection if available
      if (this.databaseService) {
        await this.databaseService.close();
        this.logger.info("Database service closed!");
      }

      this.logger.success("OOBE CORE - stopped successfully!");
    } catch (error) {
      this.logger.error(`Error stopping OobeCore: ${error}`);
    }
  }  getAgent() {
    return this.agent;
  }

  getDatabaseService() {
    return this.databaseService;
  }

  getConfiguration() {
    return this.config;
  }
}