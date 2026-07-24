import type { HealthStatus, RuntimeLifecycleParticipant } from './types';

export class LifecycleManager {
  constructor(private readonly participants: RuntimeLifecycleParticipant[]) {}

  async start(): Promise<void> {
    for (const participant of this.participants) {
      await participant.start?.();
    }
  }

  async stop(): Promise<void> {
    for (const participant of [...this.participants].reverse()) {
      await participant.stop?.();
    }
  }

  async health(): Promise<HealthStatus[]> {
    const results: HealthStatus[] = [];
    for (const participant of this.participants) {
      results.push(await (participant.health?.() ?? Promise.resolve({ id: participant.id, status: 'healthy' as const })));
    }
    return results;
  }
}
