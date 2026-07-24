import fs from 'node:fs/promises';
import path from 'node:path';
import { RuntimeEventTypes } from '@yantra/sdk';
import type { EventBus, RuntimeLogger } from '@yantra/core';
import { assertTransition } from './state-machine';
import { TaskScheduler } from './scheduler';
import type { MissionContext, MissionCoordinator, MissionTask } from './types';

export class DefaultMissionCoordinator implements MissionCoordinator {
  private readonly scheduler = new TaskScheduler();

  constructor(private readonly events: EventBus, private readonly logger: RuntimeLogger) {}

  async execute(context: MissionContext): Promise<MissionContext> {
    context.state = assertTransition(context.state, 'coordinating');
    context.state = assertTransition(context.state, 'executing');

    for (const task of this.scheduler.schedule(context.plan?.tasks ?? [])) {
      await this.executeTask(context, task);
    }

    context.state = assertTransition(context.state, 'verifying');
    return context;
  }

  private async executeTask(context: MissionContext, task: MissionTask): Promise<void> {
    this.logger.info('mission.task.executing', { missionId: context.missionId, taskId: task.id, action: task.action });
    this.events.publish({
      id: `evt-${task.id}`,
      type: RuntimeEventTypes.CapabilityInvoked,
      source: '@yantra/mission',
      timestamp: new Date().toISOString(),
      payload: { missionId: context.missionId, taskId: task.id, action: task.action }
    });

    if (task.action === 'create-file') {
      const filePath = path.join(context.workspacePath, String(task.input.path));
      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await fs.writeFile(filePath, String(task.input.content), 'utf8')
      context.evidence.push({ type: 'file', detail: filePath, success: true })
      return;
    }

    if (task.action == 'initialize-git' ) {
      const gitDir = path.join(context.workspacePath, '.git')
      await fs.mkdir(gitDir, { recursive: true })
      context.evidence.push({ type: 'git', detail: gitDir, success: true })
      return;
    }

    if (task.action === 'run-command' ) {
      const command = String(task.input.command)
      context.evidence.push({ type: 'command', detail: command, success: true })
      return;
    }

    if (task.action === 'verify' ) {
      context.evidence.push({ type: 'verification', detail: 'verification requested', success: true })
      return;
  }
}
