import type { VerificationFinding, VerificationReport } from './types.js';
import { verifyEvidenceShape, verifyDocumentationPresence } from './rules.js';
export class VerificationEngine {
  run(input: { evidence: unknown[]; docs?: string[] }): VerificationReport {
    const findings: VerificationFinding[] = [
      ...verifyEvidenceShape(input.evidence),
      ...verifyDocumentationPresence(input.docs ?? [])
    ];
    const blocking = findings.filter((f) => f.disposition === 'blocking' && f.severity === 'fail').length;
    const warnings = findings.filter((f) => f.severity === 'warning').length;
    const passed = findings.filter((f) => f.severity === 'pass').length;
    return {
      status: blocking > 0 ? 'FAIL' : 'PASS',
      findings,
      summary: { total: findings.length, blocking, warnings, passed }
    };
  }
}
