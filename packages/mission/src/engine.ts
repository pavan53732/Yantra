import fs from 'node:fs/promises';
import path from 'node:path';
import { RuntimeEventTypes } from '@yantra/sdk';
import type { EventBus, RuntimeLogger } from '@yantra/core';
import { assertTransition } from './state-machine';
import type { MissionEnvelope } from '@yantra/sdk';
import type { MissionContext, MissionRuntimeDependencies, MissionResult } from './types';

export class MissionEngine {
  constructor(
    private readonly events: EventBus,
    private readonly logger: RuntimeLogger,
    private readonly dependencies: MissionRuntimeDependencies
  ) {}

  async run(input: MissionEnvelope, workspacePath: string): Promise<MissionResult> {
    await fs.mkdir(workspacePath, { recursive: true });
    const parsed = this.dependencies.parser.parse(input);

    let context: MissionContext = {
      missionId: parsed.envelope.id,
      objective: parsed.envelope.objective,
      workspacePath: path.resolve(workspacePath),
      state: 'created',
      evidence: []
    };

    context.state = assertTransition(context.state, 'parsed');
    this.emit('mission.parsed', context.missionId);

    context.plan = this.dependencies.planner.createPlan(parsed);
    context.state = assertTransition(context.state, 'planned');
    await this.dependencies.persistence.save(context);
    this.emit(RuntimeEventTypes.MissionPlanned, context.missionId);

    context = await this.dependencies.coordinator.execute(context);
    await this.dependencies.persistence.save(context);

    const result = await this.dependencies.verifier.verify(context);
    this.emit(RuntimeEventTypes.MissionCompleted, context.missionId, { success: result.success });
    this.logger.info('mission.completed', { missionId: context.missionId, success: result.success });
    return result;
  }

  private emit(type: string, missionId: string, payload: Record<string, unknown> = {}): void {
    this.events.publish({
      id: `evt-${missionId}-${type}`,
      type,
      source: '@yantra/mission',
      timestamp: new Date().toISOString(),
      payload: { missionId, ...payload }
    });
  }
}
