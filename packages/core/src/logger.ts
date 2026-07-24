import type { RuntimeLogEntry, RuntimeLogger } from './types';

export class MemoryLogger implements RuntimeLogger {
  private readonly logs: RuntimeLogEntry[] = [];

  debug(message: string, context?: Record<string, unknown>): void { this.logs.push({ level: 'debug', message, context }); }
  info(message: string, context?: Record<string, unknown>): void { this.logs.push({ level: 'info', message, context }); }
  warn(message: string, context?: Record<string, unknown>): void { this.logs.push({ level: 'warn', message, context }); }
  error(message: string, context?: Record<string, unknown>): void { this.logs.push({ level: 'error', message, context }); }
  entries(): RuntimeLogEntry[] { return [...this.logs]; }
}
