import { typewriterEffect } from "./loggerEffects";

/**
 * @name ILogger
 * @description Interface for the logger object
 * @property {Function} info - Log an info message
 * @property {Function} warn - Log a warning message
 * @property {Function} error - Log an error message
 * @property {Function} debug - Log a debug message
 * @property {Function} writeLog - Write a log message
 * @property {Function} formatMessage - Format a log message
 * @property {Function} colorize - Colorize a message
 */
export interface ILogger {
    info(message: string, color?: string): void;
    warn(message: string, color?: string): void;
    error(message: string, color?: string): void;
    debug(message: string, color?: string): void;
    success(message: string, color?: string): void;
    progress(message: string, color?: string): void;
    writeLog(level: LogLevel, message: string, color?: string): void;
    showAsciiOOBE(): void;
    formatMessage(level: LogLevel, message: string): string;
    colorize(message: string, color: string): string;
}

/**
 * @name LogLevel
 * @description Enum for the log levels
 * @property {string} INFO - Info log level
 * @property {string} WARN - Warn log level
 * @property {string} ERROR - Error log level
 * @property {string} DEBUG - Debug log level
 * @example LogLevel.INFO
 */
enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
    SUCCESS = 'SUCCESS',
    PROGRESS = 'PROGRESS',
}

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
    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    public writeLog(level: LogLevel, message: string, color?: string): void {
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

    info(message: string, color?: string): void {
        this.writeLog(LogLevel.INFO, message, color);
    }

    warn(message: string, color?: string): void {
        this.writeLog(LogLevel.WARN, message, color);
    }

    error(message: string, color?: string): void {
        this.writeLog(LogLevel.ERROR, message, color);
    }

    debug(message: string, color?: string): void {
        this.writeLog(LogLevel.DEBUG, message, color);
    }

    success(message: string, color?: string): void {
        this.writeLog(LogLevel.SUCCESS, message, color);
    }

    progress(message: string, color?: string): void {
        this.writeLog(LogLevel.PROGRESS, message, color);
    }

    colorize(message: string, color: string): string {
        const colorCodes: { [key: string]: string } = {
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

    typewriter(message: string, speed: number = 100, glitchChance: number = 0.4): void {
        typewriterEffect(message, speed, glitchChance);
    }

    showAsciiOOBE(): void {
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

    returnAsciiOOBE(): string {
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

export default Logger;