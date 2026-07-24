import type { RuntimeConfiguration } from './types';

export function loadConfiguration(input?: Partial<RuntimeConfiguration>): RuntimeConfiguration {
  return {
    environment: input?.environment ?? 'development',
    workspaceRoot: input?.workspaceRoot ?? process.cwd(),
    logLevel: input?.logLevel ?? 'info'
  };
}
