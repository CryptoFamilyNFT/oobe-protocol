import { Agent } from "./agent/Agents";
import verifyConfig from "./utils/helpers/verifyConfig";
import Logger from "./utils/logger/logger";
import { IConfiguration } from "./config/types/config.types";
import launchPumpfunTokenAction from "./actions/pumpfun/pumpfun.action";

/**
 * @name OobeCore
 * @description Core module for the OOBE protocol
 * @example const core = new OobeCore(config)
 * @author oobe-protocol
                                                                      
               ████████                       ███████████   ██        
            ██████████████      ████                           █      
           ████████████████  █                ██████████       █      
          █████            █ █ █  ████████████████████████     ██     
         █████             █ █  ██████████████████████████  █  ███    
         █████   █████  █  █ █  ██████████████████████████  █  █ █    
         █████   ███    ██ █ █  ██████████████████████████  █  █  █   
         ███               █ █ ███████████████████████████  █  █   █  
         ███        ██     █ █ ███████████████████████████  █  █   █  
          █                █ █ ███████████████████████████  █  █   █  
           █        ████  █  █ ███████████████████████████  █  █   █  
           ██        ██  █   █  ██████████████████████████  █  █   █  
        ██████    ██   ██  █ █  ██████████████████████████  █  █   █  
      ███████████      ████  █  █████████████████████████   █  █   █  
     ███████████████████████ █  █████████████████████████   █ ██ ██   
    ██████████████████████████ ██████ ███████████████████   █ ███     
   ███████████████████████████ ██                       █  ██ ██      
  ████████████████████████████     ███████████             █ ██       
  █████████████████████████████  ██     ███          ███████  ██      
 ██████████████████████████████    ███        ████████     ██  █████  
  ██████████████████████████ ████████████       ██      ██   ███████  
   █    ████████████████████    █████████       █████ █   ████████    
   █    █████████████████████    █ █████████████████████████████      
   ██     ████████████████████████ █████ █████████████████████        
   ███     ███████████████████████████████████████████ ████           
   █████    █ ███████████████████████████████████  █████              
   ███████ ███████████████████ ███████████████ ██ ██                  
   █████████ ███  █████ █  █████  █ ██████ ██  █                      
     ████████   █ █  ████████████████   █ ███   ████                  
           ████████████ ██████████ ██  ██  ███     ██                 
                     ███  ███   █  ██                                 
                           ██████                                     
                                                                      */
export class OobeCore {
  private agent: Agent;
  private logger: Logger;

  constructor(config: IConfiguration) {
    this.logger = new Logger();
    if (verifyConfig(config)) {
      this.agent = new Agent(config.solanaEndpoint, config.dbConfig, config.private_key);
      this.agent.registerAction(launchPumpfunTokenAction);
    } else {
      this.logger.error("Invalid configuration");
      throw new Error("Invalid configuration");
    }
  }

  async start() {
    try {
      await this.agent.initialize();
      this.logger.info("OobeCore started successfully!");
    } catch (error) {
      this.logger.error(`Error starting OobeCore: ${error}`);
    }
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