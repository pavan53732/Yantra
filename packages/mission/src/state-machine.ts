import type { MissionState } from './types';

const transitions: Record<MissionState, MissionState[]> = {
  created: ['parsed', 'failed'],
  parsed: ['planned', 'failed'],
  planned: ['coordinating', 'failed'],
  coordinating: ['executing', 'failed'],
  executing: ['verifying', 'failed'],
  verifying: ['completed', 'failed'],
  completed: [],
  failed: []
};

export function assertTransition(current: MissionState, next: MissionState): MissionState {
  if (!transitions[current].includes(next)) {
    throw new Error(`Invalid mission transition: ${current} -> ${next}`);
  }
  return next;
}

export function missionStateGraph(): Record<MissionState, MissionState[]> {
  return transitions;
}
