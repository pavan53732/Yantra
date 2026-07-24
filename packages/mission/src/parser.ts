import { validateMissionEnvelope } from '@yantra/sdk';
import type { MissionEnvelope } from '@yantra/sdk';
import type { MissionParser, ParsedMission } from './types';

export class DefaultMissionParser implements MissionParser {
  parse(input: MissionEnvelope): ParsedMission {
    const envelope = validateMissionEnvelope(input);
    return {
      envelope,
      normalizedObjective: envelope.objective.trim().toLowerCase()
    };
  }
}
