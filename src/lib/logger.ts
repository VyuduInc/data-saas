type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, metadata?: Record<string, any>): LogMessage {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    const formattedMessage = this.formatMessage(level, message, metadata);

    if (this.isDevelopment) {
      const color = {
        debug: '\x1b[36m', // cyan
        info: '\x1b[32m',  // green
        warn: '\x1b[33m',  // yellow
        error: '\x1b[31m', // red
      }[level];

      console.log(
        `${color}[${formattedMessage.timestamp}] ${level.toUpperCase()}\x1b[0m:`,
        message,
        metadata || ''
      );
    } else {
      // In production, we might want to send logs to a service
      // For now, we'll just use console.log
      console.log(JSON.stringify(formattedMessage));
    }
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata);
  }
}

export const logger = new Logger();
