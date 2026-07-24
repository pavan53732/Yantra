import type { RuntimeEvent } from '@yantra/sdk';
import type { EventBus } from './types';

export class InProcessEventBus implements EventBus {
  private readonly subscriptions = new Map<string, Set<(event: RuntimeEvent) => void>>();
  private readonly events: RuntimeEvent[] = [];

  publish<TPayload = unknown>(event: RuntimeEvent<TPayload>): void {
    this.events.push(event as RuntimeEvent);
    for (const handler of this.subscriptions.get(event.type) ?? new Set()) {
      handler(event as RuntimeEvent);
    }
  }

  subscribe(type: string, handler: (event: RuntimeEvent) => void): () => void {
    const handlers = this.subscriptions.get(type) ?? new Set();
    handlers.add(handler);
    this.subscriptions.set(type, handlers);
    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) this.subscriptions.delete(type);
    };
  }

  history(): RuntimeEvent[] {
    return [...this.events];
  }
}
