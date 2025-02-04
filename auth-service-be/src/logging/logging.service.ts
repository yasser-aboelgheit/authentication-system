import { Injectable, Logger, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  private formatMessage(message: unknown): string {
    return message !== undefined ? String(message) : "[Undefined message]";
  }

  log(message: unknown, context?: string) {
    context
      ? this.logger.log(this.formatMessage(message), context)
      : this.logger.log(this.formatMessage(message));
  }

  info(message: unknown, context?: string) {
    context
      ? this.logger.log(this.formatMessage(message), context)
      : this.logger.log(this.formatMessage(message));
  }

  warn(message: unknown, context?: string) {
    context
      ? this.logger.warn(this.formatMessage(message), context)
      : this.logger.warn(this.formatMessage(message));
  }

  error(message: unknown, trace?: string, context?: string) {
    context
      ? this.logger.error(this.formatMessage(message), trace, context)
      : this.logger.error(this.formatMessage(message), trace);
  }

  debug(message: unknown, context?: string) {
    context
      ? this.logger.debug(this.formatMessage(message), context)
      : this.logger.debug(this.formatMessage(message));
  }
}
