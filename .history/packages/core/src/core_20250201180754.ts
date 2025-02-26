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
  private memory: MemorySaver;

  constructor(config: IConfiguration) {
    this.logger = new Logger();
    if (verifyConfig(config)) {
      this.agent = new Agent(config.solanaEndpoint, config.private_key, config.oobeKey);
    } else {
      this.logger.error("Invalid configuration");
      throw new Error("Invalid configuration");
    }
    this.memory = new MemorySaver();
  }

  async start() {
    try {
      //this.logger.showAsciiOOBE();
      await this.agent.initialize();
      this.logger.success("OOBE CORE - started successfully!");
    } catch (error) {
      this.logger.error(`Error starting OobeCore: ${error}`);
    }
  }

  private async CreatePersona(name: string) {
    try {
      return new PersonaImpl("defaultId", "Agent Persona");
    } catch (error) {
      this.logger.error(`Error on CreatePersona: ${error}`);
      return
    }
  }

  async CreateOobeAgent(
    name: string,
    age: number,
    socials: ISocials | null,
    genAi: ChatOpenAI<ChatOpenAICallOptions>, 
    tools: any | ToolNode<any>, 
    memory: MemorySaver, 
    messageModifier: any) {
    try {
      return createReactAgent({
        llm: genAi as unknown as BaseChatModel<BaseChatModelCallOptions, AIMessageChunk>,
        tools: tools as unknown as ToolNode<any>,
        checkpointSaver: memory,
        messageModifier: messageModifier
      });
    } catch (error) {
      this.logger.error(`Error stopping CreateOobeAgent: ${error}`);
      return null;
    }
  }

  async AccessMemory() {
    try {
      return this.memory
    } catch (error) {
      this.logger.error(`Error on CreateMemory: ${error}`);
      return null;
    }
  }

  AgentHumanMessage(userInput: string): HumanMessage {
      return new HumanMessage(userInput);
  }

  async stop() {
    try {
      await this.agent.shutdown();
      this.logger.info("OobeCore stopped successfully!");
    } catch (error) {
      this.logger.error(`Error stopping OobeCore: ${error}`);
    }
  }

  getAgent() {
    return this.agent;
  }
}