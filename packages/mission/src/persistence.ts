import type { MissionContext, MissionPersistence } from './types';

export class InMemoryMissionPersistence implements MissionPersistence {
  private readonly store = new Map<string, MissionContext>();

  async save(context: MissionContext): Promise<void> {
    this.store.set(context.mission.id, structuredClone(context));
  }

  async load(missionId: string): Promise<MissionContext | undefined> {
    const value = this.store.get(missionId);
    return value ? structuredClone(value) : undefined;
  }
}
