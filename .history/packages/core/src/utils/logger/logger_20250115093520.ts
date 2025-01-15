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
 * @property {LogLevel} - Log levels
 * @property {string} - Log message
 * @property {string} - Formatted log message
 * @property {void} - Write a log message
 * @property {void} - Format a log message
 * @property {void} - Log an info message
 * @property {void} - Log a warning message
 * @property {void} - Log an error message
 * @property {void} - Log a debug message
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