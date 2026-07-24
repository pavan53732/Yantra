import type { MissionTask } from './types';

export class TaskScheduler {
  schedule(tasks: MissionTask[]): MissionTask[] {
    return [...tasks];
  }
}
