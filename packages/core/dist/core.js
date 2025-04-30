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
        this.logger = new logger_1.default();
        if ((0, verifyConfig_1.default)(config)) {
            this.agent = new Agents_1.Agent(config.solanaEndpoint, config.private_key, config.openAiKey, this.logger);
        }
        else {
            this.logger.error("Invalid configuration");
            throw new Error("Invalid configuration");
        }
        this.memory = new langgraph_1.MemorySaver();
    }
    async start() {
        try {
            await this.agent.initialize();
            this.logger.success("OOBE CORE - started successfully!");
        }
        catch (error) {
            this.logger.error(`Error starting OobeCore: ${error}`);
        }
    }
    async CreatePersona(name, age, socials) {
        try {
            const persona = new Persona_1.PersonaImpl("defaultId", "Agent Persona");
            persona.generateMerkleTree();
        }
        catch (error) {
            this.logger.error(`Error on CreatePersona: ${error}`);
            return;
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
    AgentHumanMessage(userInput) {
        return new messages_1.HumanMessage(userInput);
    }
    async stop() {
        try {
            await this.agent.shutdown();
            this.logger.info("OobeCore stopped successfully!");
        }
        catch (error) {
            this.logger.error(`Error stopping OobeCore: ${error}`);
        }
    }
    getAgent() {
        return this.agent;
    }
}
exports.OobeCore = OobeCore;
//# sourceMappingURL=core.js.map