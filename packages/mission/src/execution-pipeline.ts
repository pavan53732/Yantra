import type { MissionEvidence, MissionTask } from './types';

export async function executeTasks(tasks: MissionTask[]): Promise<MissionEvidence[]> {
  return tasks.map((task) => ({
    id: `exec-${task.id}`,
    type: task.kind === 'verify' ? 'verification' : 'execution',
    summary: `Executed task: ${task.title}`,
    details: task.input ?? {}
  }));
}
