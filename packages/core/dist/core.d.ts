import { Agent } from "./agent/Agents";
import { IConfiguration } from "./config/types/config.types";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { ISocials } from "./types/core.interface";
import { DatabaseService } from "./services/database.service";
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
export declare class OobeCore {
    private agent;
    private logger;
    private memory;
    private databaseService?;
    private config;
    constructor(config: IConfiguration);
    start(): Promise<void>;
    private CreatePersona;
    recordAction(actionType: string, actionData: any, result?: any): Promise<void>;
    getPersonaStatistics(): Promise<any>;
    CreateOobeAgent(name: string, age: number, socials: ISocials | null, genAi: ChatOpenAI<ChatOpenAICallOptions>, tools: any | ToolNode<any>, memory: MemorySaver, messageModifier: any): import("@langchain/langgraph").CompiledStateGraph<import("@langchain/langgraph").StateType<{
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
    }>, import("@langchain/langgraph").UpdateType<{
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
    }>, any, {
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
    }, {
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
        structuredResponse: {
            (): import("@langchain/langgraph").LastValue<Record<string, any>>;
            (annotation: import("@langchain/langgraph").SingleReducer<Record<string, any>, Record<string, any>>): import("@langchain/langgraph").BinaryOperatorAggregate<Record<string, any>, Record<string, any>>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
    } & {
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
    }, import("@langchain/langgraph").StateDefinition>;
    AccessMemory(): RedisSessionManager | MemorySaver;
    /**
     * Get the current configuration
     */
    getConfig(): IConfiguration;
    /**
     * Get the configured Prisma database URL
     */
    getPrismaDbUrl(): string | undefined;
    /**
     * Get the MemorySaver configuration
     */
    getMemorySaverConfig(): {
        enabled?: boolean;
        storageType?: "memory" | "file" | "redis";
        filePath?: string;
        redisUrl?: string;
    } | undefined;
    /**
     * Get the session manager (if using Redis)
     */
    getSessionManager(): RedisSessionManager | null;
    /**
     * Create a new session (Redis only)
     */
    createSession(userId?: string, metadata?: Record<string, any>): Promise<string | null>;
    /**
     * List all active sessions (Redis only)
     */
    listSessions(userId?: string): Promise<any[] | null>;
    /**
     * Delete a session (Redis only)
     */
    deleteSession(sessionId: string): Promise<boolean>;
    /**
     * Get session statistics (Redis only)
     */
    getSessionStats(): Promise<any | null>;
    /**
     * Clean up expired sessions (Redis only)
     */
    cleanupExpiredSessions(): Promise<number>;
    AgentHumanMessage(userInput: string): HumanMessage;
    stop(): Promise<void>;
    getAgent(): Agent;
    getDatabaseService(): DatabaseService | undefined;
    getConfiguration(): IConfiguration;
}
//# sourceMappingURL=core.d.ts.map