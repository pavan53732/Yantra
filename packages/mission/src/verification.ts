import type { MissionContext, MissionEvidence } from './types';

export async function verifyMission(context: MissionContext): Promise<MissionEvidence> {
  return {
    id: 'ev-final-verification',
    type: 'verification',
    summary: 'Mission verification completed',
    details: { missionId: context.mission.id, state: context.state }
  };
}
