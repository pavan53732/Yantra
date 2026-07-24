import type { MissionContext } from './types';
import type { MissionEnvelope } from '@yantra/sdk';
import { validateMissionEnvelope } from '@yantra/sdk';

export function parseMission(input: MissionEnvelope): MissionContext {
  const mission = validateMissionEnvelope(input);
  const now = new Date().toISOString();
  return {
    mission,
    state: 'parsed',
    evidence: [{ id: 'ev-parse', type: 'parse', summary: 'Mission parsed successfully' }],
    createdAt: now,
    updatedAt: now
  };
}
