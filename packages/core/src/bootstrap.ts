import { RuntimeEventTypes } from '@yantra/sdk';
import { RuntimeContainer } from './container';
import { InProcessEventBus } from './event-bus';
import { loadConfiguration } from './configuration';
import { MemoryLogger } from './logger';
import { LifecycleManager } from './lifecycle';
import type { ExtensionRegistration, RuntimeConfiguration, RuntimeKernel, RuntimeLifecycleParticipant } from './types';

export interface BootstrapOptions {
  configuration?: Partial<RuntimeConfiguration>;
  participants?: RuntimeLifecycleParticipant[];
  extensions?: ExtensionRegistration[];
}

export function createRuntimeKernel(options: BootstrapOptions = {}): RuntimeKernel {
  const container = new RuntimeContainer();
  const events = new InProcessEventBus();
  const logger = new MemoryLogger();
  const configuration = loadConfiguration(options.configuration);
  const participants = options.participants ?? [];
  const lifecycle = new LifecycleManager(participants);

  container.register({ id: 'runtime.events', factory: () => events });
  container.register({ id: 'runtime.logger', factory: () => logger });
  container.register({ id: 'runtime.configuration', factory: () => configuration });
  container.register({ id: 'runtime.lifecycle', factory: () => lifecycle });

  for (const extension of options.extensions ?? []) {
    extension.register(container);
  }

  return {
    container,
    events,
    logger,
    configuration,
    async start() {
      logger.info('runtime.starting', { environment: configuration.environment });
      await lifecycle.start();
      events.publish({
        id: 'evt-runtime-started',
        type: RuntimeEventTypes.MissionExecuting,
        source: '@yantra/core',
        timestamp: new Date().toISOString(),
        payload: { phase: 'kernel-started' }
      });
      logger.info('runtime.started');
    },
    async stop() {
      logger.info('runtime.stopping');
      await lifecycle.stop();
      logger.info('runtime.stopped');
    },
    async health() {
      return lifecycle.health();
    }
  };
}
