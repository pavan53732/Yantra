import type { MissionPlan, MissionTask } from './types';

export function scheduleTasks(plan: MissionPlan): MissionTask[] {
  return [...plan.tasks];
}
