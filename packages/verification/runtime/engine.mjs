import { verifyEvidenceShape, verifyDocumentationPresence } from './rules.mjs';
export class VerificationEngine {
  run(input) {
    const findings = [
      ...verifyEvidenceShape(input.evidence),
      ...verifyDocumentationPresence(input.docs ?? [])
    ];
    const blocking = findings.filter((f) => f.disposition === 'blocking' && f.severity === 'fail').length;
    const warnings = findings.filter((f) => f.severity === 'warning').length;
    const passed = findings.filter((f) => f.severity === 'pass').length;
    return { status: blocking > 0 ? 'FAIL' : 'PASS', findings, summary: { total: findings.length, blocking, warnings, passed } };
  }
}
