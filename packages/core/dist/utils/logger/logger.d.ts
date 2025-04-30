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
declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
    SUCCESS = "SUCCESS",
    PROGRESS = "PROGRESS"
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
declare class Logger {
    private formatMessage;
    writeLog(level: LogLevel, message: string, color?: string): void;
    info(message: string, color?: string): void;
    warn(message: string, color?: string): void;
    error(message: string, color?: string): void;
    debug(message: string, color?: string): void;
    success(message: string, color?: string): void;
    progress(message: string, color?: string): void;
    colorize(message: string, color: string): string;
    typewriter(message: string, speed?: number, glitchChance?: number): void;
    showAsciiOOBE(): void;
    returnAsciiOOBE(): string;
}
export default Logger;
//# sourceMappingURL=logger.d.ts.map