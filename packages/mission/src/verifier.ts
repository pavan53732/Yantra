import { assertTransition } from './state-machine';
import type { MissionContext, MissionResult, MissionVerifier } from './types';

export class DefaultMissionVerifier implements MissionVerifier {
  async verify(context: MissionContext): Promise<MissionResult> {
    const success = context.evidence.every((item) => item.success);
    context.state = assertTransition(context.state, success ? 'completed' : 'failed');
    return {
      missionId: context.missionId,
      success,
      finalState: context.state,
      evidence: [...context.evidence]
    };
  }
}
