import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  log(message: string) {
    this.logger.log(message);
  }

  info(message: string, context?: string) {
    this.logger.log(message, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
  }
}
