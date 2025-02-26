import { Agent } from "./agent/Agents";
import { IConfiguration } from "./config/types/config.types";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
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
    constructor(config: IConfiguration);
    start(): Promise<void>;
    CreateOobeAgent(genAi: ChatOpenAI<ChatOpenAICallOptions>, tools: any | ToolNode<any>, memory: MemorySaver, messageModifier: any): Promise<import("@langchain/langgraph").CompiledStateGraph<import("@langchain/langgraph").StateType<{
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
    }>, import("@langchain/langgraph").UpdateType<{
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages").BaseMessage[], import("@langchain/langgraph").Messages>;
    }>, "tools" | "__start__" | "agent", any, any, import("@langchain/langgraph").StateDefinition> | null>;
    AccessMemory(): Promise<MemorySaver | null>;
    AgentHumanMessage(userInput: string): HumanMessage;
    stop(): Promise<void>;
    getAgent(): Agent;
}
//# sourceMappingURL=core.d.ts.map