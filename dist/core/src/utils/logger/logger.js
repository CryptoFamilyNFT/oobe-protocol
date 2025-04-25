"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerEffects_1 = require("./loggerEffects");
/**
 * @name LogLevel
 * @description Enum for the log levels
 * @property {string} INFO - Info log level
 * @property {string} WARN - Warn log level
 * @property {string} ERROR - Error log level
 * @property {string} DEBUG - Debug log level
 * @example LogLevel.INFO
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["SUCCESS"] = "SUCCESS";
    LogLevel["PROGRESS"] = "PROGRESS";
})(LogLevel || (LogLevel = {}));
/**
 * @name Logger
 * @alias OOBELogger
 * @description Class for logging messages to the console with different log levels (INFO, WARN, ERROR, DEBUG) to handle oobe logs
 * @method info - Log an info message
 * @method warn - Log a warning message
 * @method error - Log an error message
 * @method debug - Log a debug message
 * @method success - Log a success message
 * @method progress - Log a progress message
 * @method writeLog - Write a log message
 * @method formatMessage - Format a log message
 * @method colorize - Colorize a message
 * @example const logger = new Logger();
 */
class Logger {
    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }
    writeLog(level, message, color) {
        const formattedMessage = this.formatMessage(level, message);
        let colorCode = '';
        let resetCode = '\x1b[0m';
        switch (level) {
            case LogLevel.INFO:
                colorCode = '\x1b[36m'; // Azzurro
                break;
            case LogLevel.WARN:
                colorCode = '\x1b[33m'; // Giallo
                break;
            case LogLevel.ERROR:
                colorCode = '\x1b[31m'; // Rosso
                break;
            case LogLevel.DEBUG:
                colorCode = '\x1b[34m'; // Blu
                break;
            case LogLevel.SUCCESS:
                colorCode = '\x1b[32m'; // Verde
                break;
            case LogLevel.PROGRESS:
                colorCode = '\x1b[35m'; // Magenta
                break;
        }
        console.log(`[oobe-protocol]: ${colorCode}${formattedMessage}${resetCode}`);
    }
    info(message, color) {
        this.writeLog(LogLevel.INFO, message, color);
    }
    warn(message, color) {
        this.writeLog(LogLevel.WARN, message, color);
    }
    error(message, color) {
        this.writeLog(LogLevel.ERROR, message, color);
    }
    debug(message, color) {
        this.writeLog(LogLevel.DEBUG, message, color);
    }
    success(message, color) {
        this.writeLog(LogLevel.SUCCESS, message, color);
    }
    progress(message, color) {
        this.writeLog(LogLevel.PROGRESS, message, color);
    }
    colorize(message, color) {
        const colorCodes = {
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
        };
        const resetCode = '\x1b[0m';
        const colorCode = colorCodes[color.toLowerCase()] || '';
        return `${colorCode}${message}${resetCode}`;
    }
    typewriter(message, speed = 100, glitchChance = 0.4) {
        (0, loggerEffects_1.typewriterEffect)(message, speed, glitchChance);
    }
    showAsciiOOBE() {
        const asciiArt = `
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

 * ${this.colorize('@name OOBE_AGENT', 'cyan')}
 * @neural-network ${this.colorize('ONLINE', 'green')}
 * ${this.colorize('@author oobe-protocol', 'red')} 
    `;
        this.writeLog(LogLevel.SUCCESS, asciiArt);
    }
    returnAsciiOOBE() {
        const asciiArt = `
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

 * ${this.colorize('@name OOBE_AGENT', 'cyan')}
 * @neural-network ${this.colorize('ONLINE', 'green')}
 * ${this.colorize('@author oobe-protocol', 'red')} 
    `;
        this.writeLog(LogLevel.SUCCESS, asciiArt);
        return asciiArt;
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map