import { Agent } from "./agent/Agents";
import { IConfiguration } from "./config/types/config.types";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
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
export declare class OobeCore {
    private agent;
    private logger;
    private memory;
    constructor(config: IConfiguration);
    start(): Promise<void>;
    private CreatePersona;
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
    AccessMemory(): MemorySaver;
    AgentHumanMessage(userInput: string): HumanMessage;
    stop(): Promise<void>;
    getAgent(): Agent;
}
//# sourceMappingURL=core.d.ts.map