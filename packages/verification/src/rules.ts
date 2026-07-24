import type { VerificationFinding } from './types.js';
export function verifyEvidenceShape(evidence: unknown[]): VerificationFinding[] {
  const findings: VerificationFinding[] = [];
  if (!Array.isArray(evidence) || evidence.length === 0) {
    findings.push({ id: 'ver-empty-evidence', category: 'correctness', severity: 'fail', disposition: 'blocking', summary: 'Mission evidence is empty' });
    return findings;
  }
  const malformed = evidence.filter((e) => typeof e !== 'object' || e === null || !('id' in e) || !('type' in e) || !('summary' in e));
  if (malformed.length > 0) findings.push({ id: 'ver-evidence-shape', category: 'correctness', severity: 'fail', disposition: 'blocking', summary: 'Evidence items are malformed', details: { malformedCount: malformed.length } });
  else findings.push({ id: 'ver-evidence-shape-pass', category: 'correctness', severity: 'pass', disposition: 'recoverable', summary: 'Evidence items have expected shape' });
  return findings;
}
export function verifyDocumentationPresence(paths: string[]): VerificationFinding[] {
  const required = ['README.md'];
  const ok = required.every((p) => paths.includes(p));
  return [ok ? { id: 'ver-docs-pass', category: 'documentation', severity: 'pass', disposition: 'recoverable', summary: 'Required documentation is present' } : { id: 'ver-docs-fail', category: 'documentation', severity: 'warning', disposition: 'recoverable', summary: 'Required documentation is missing', details: { required } }];
}
