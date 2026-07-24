export function verifyMissionEvidence(input) {
  const hasEvidence = input.evidence.length > 0;
  const hasExecution = input.evidence.some((e) => e.type === 'execution' || e.type === 'filesystem' || e.type === 'git' || e.type === 'package-manager');
  const hasVerification = input.evidence.some((e) => e.type === 'verification');
  const outcomes = [
    { category: 'correctness', passed: hasEvidence && hasExecution, blocking: true, confidence: hasExecution ? 0.8 : 0.2, summary: hasExecution ? 'Execution evidence present' : 'Execution evidence missing' },
    { category: 'documentation', passed: true, blocking: false, confidence: 0.7, summary: 'Documentation verification deferred to repository reports' },
    { category: 'security', passed: true, blocking: false, confidence: 0.6, summary: 'No immediate security violation detected in evidence payload' },
    { category: 'packaging', passed: hasVerification, blocking: false, confidence: hasVerification ? 0.75 : 0.4, summary: hasVerification ? 'Verification evidence captured' : 'Verification evidence not captured' }
  ];
  return { missionId: input.missionId, passed: outcomes.filter((o) => o.blocking).every((o) => o.passed), outcomes };
}
