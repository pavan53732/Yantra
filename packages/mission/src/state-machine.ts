import type { MissionState } from './types';

const allowed: Record<MissionState, MissionState[]> = {
  created: ['parsed', 'failed'],
  parsed: ['planned', 'failed'],
  planned: ['coordinating', 'failed'],
  coordinating: ['executing', 'failed'],
  executing: ['verifying', 'failed'],
  verifying: ['completed', 'failed'],
  completed: [],
  failed: []
};

export function canTransition(from: MissionState, to: MissionState): boolean {
  return allowed[from].includes(to);
}

export function transition(from: MissionState, to: MissionState): MissionState {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid mission transition: ${from} -> ${to}`);
  }
  return to;
}
