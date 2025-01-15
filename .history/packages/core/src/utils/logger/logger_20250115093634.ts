
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
                console.log(formattedMessage);
                break;
            case LogLevel.WARN:
                console.warn(formattedMessage);
                break;
            case LogLevel.ERROR:
                console.error(formattedMessage);
                break;
            case LogLevel.DEBUG:
                console.debug(formattedMessage);
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