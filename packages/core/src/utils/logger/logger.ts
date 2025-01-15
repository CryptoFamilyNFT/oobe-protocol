/**
 * @name ILogger
 * @description Interface for the logger object
 * @property {Function} info - Log an info message
 * @property {Function} warn - Log a warning message
 * @property {Function} error - Log an error message
 * @property {Function} debug - Log a debug message
 * @property {Function} writeLog - Write a log message
 * @property {Function} formatMessage - Format a log message
 */
export interface ILogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    writeLog(level: LogLevel, message: string): void;
    formatMessage(level: LogLevel, message: string): string;
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
    DEBUG = 'DEBUG'
}

/**
 * @name Logger
 * @alias OOBELogger
 * @description Class for logging messages to the console with different log levels (INFO, WARN, ERROR, DEBUG) to handle oobe logs
 * @method info - Log an info message
 * @method warn - Log a warning message
 * @method error - Log an error message
 * @method debug - Log a debug message
 * @method writeLog - Write a log message
 * @method formatMessage - Format a log message
 * @example const logger = new Logger();
 */
class Logger {
    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }

    private writeLog(level: LogLevel, message: string): void {
        const formattedMessage = this.formatMessage(level, message);
        switch (level) {
            case LogLevel.INFO:
                console.log('[oobe-protocol]: ' + formattedMessage);
                break;
            case LogLevel.WARN:
                console.warn('[oobe-protocol]: ' + formattedMessage);
                break;
            case LogLevel.ERROR:
                console.error('[oobe-protocol]: ' + formattedMessage);
                break;
            case LogLevel.DEBUG:
                console.debug('[oobe-protocol]: ' + formattedMessage);
                break;
        }
    }

    info(message: string): void {
        this.writeLog(LogLevel.INFO, message);
    }

    warn(message: string): void {
        this.writeLog(LogLevel.WARN, message);
    }

    error(message: string): void {
        this.writeLog(LogLevel.ERROR, message);
    }

    debug(message: string): void {
        this.writeLog(LogLevel.DEBUG, message);
    }
}

export default Logger;