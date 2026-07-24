import type { RuntimeKernel } from '@yantra/core';
import type { MissionEnvelope, RuntimeEvent } from '@yantra/sdk';
import { parseMission } from './parser';
import { createMissionPlan } from './planner';
import { scheduleTasks } from './scheduler';
import { coordinateMission } from './coordinator';
import { executeTasks } from './execution-pipeline';
import { verifyMission } from './verification';
import { InMemoryMissionPersistence } from './persistence';
import { transition } from './state-machine';
import { MissionRuntimeEventTypes } from './events';
import type { MissionContext, MissionResult } from './types';

export interface MissionEngineOptions {
  kernel: RuntimeKernel;
  persistence?: InMemoryMissionPersistence;
}

export class MissionEngine {
  private readonly kernel: RuntimeKernel;
  private readonly persistence: InMemoryMissionPersistence;

  constructor(options: MissionEngineOptions) {
    this.kernel = options.kernel;
    this.persistence = options.persistence ?? new InMemoryMissionPersistence();
  }

  async run(input: MissionEnvelope): Promise<MissionResult> {
    const events: RuntimeEvent[] = [];
    const publish = (type: string, payload: Record<string, unknown>) => {
      const event = {
        id: `evt-${events.length + 1}`,
        type,
        source: '@yantra/mission',
        timestamp: new Date().toISOString(),
        payload
      };
      this.kernel.events.publish(event);
      events.push(event);
    };

    let context: MissionContext = parseMission(input);
    await this.persistence.save(context);
    publish(MissionRuntimeEventTypes.MissionParsed, { missionId: context.mission.id });

    context.state = transition(context.state, 'planned');
    context.plan = createMissionPlan(context);
    context.updatedAt = new Date().toISOString();
    context.evidence.push({ id: 'ev-plan', type: 'plan', summary: 'Mission plan created', details: { taskCount: context.plan.tasks.length } });
    await this.persistence.save(context);
    publish(MissionRuntimeEventTypes.MissionPlanned, { missionId: context.mission.id, taskCount: context.plan.tasks.length });

    context.state = transition(context.state, 'coordinating');
    const scheduled = scheduleTasks(context.plan);
    const coordinationEvidence = await coordinateMission(context, scheduled);
    context.evidence.push(...coordinationEvidence);
    await this.persistence.save(context);
    publish(MissionRuntimeEventTypes.MissionCoordinated, { missionId: context.mission.id, taskCount: scheduled.length });

    context.state = transition(context.state, 'executing');
    const executionEvidence = await executeTasks(scheduled);
    context.evidence.push(...executionEvidence);
    await this.persistence.save(context);
    publish(MissionRuntimeEventTypes.MissionExecuted, { missionId: context.mission.id });

    context.state = transition(context.state, 'verifying');
    const verificationEvidence = await verifyMission(context);
    context.evidence.push(verificationEvidence);
    await this.persistence.save(context);
    publish(MissionRuntimeEventTypes.MissionVerified, { missionId: context.mission.id });

    context.state = transition(context.state, 'completed');
    context.updatedAt = new Date().toISOString();
    await this.persistence.save(context);
    publish(MissionRuntimeEventTypes.MissionCompleted, { missionId: context.mission.id, finalState: context.state });

    return {
      missionId: context.mission.id,
      success: true,
      finalState: context.state,
      evidence: context.evidence,
      events
    };
  }
}
