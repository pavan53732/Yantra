export type VerificationCategory = 'architecture' | 'security' | 'correctness' | 'performance' | 'maintainability' | 'compatibility' | 'documentation' | 'licensing' | 'packaging';
export type VerificationSeverity = 'pass' | 'warning' | 'fail';
export type VerificationDisposition = 'recoverable' | 'blocking';
export interface VerificationFinding { id: string; category: VerificationCategory; severity: VerificationSeverity; disposition: VerificationDisposition; summary: string; details?: Record<string, unknown>; }
export interface VerificationReport { status: 'PASS' | 'FAIL'; findings: VerificationFinding[]; summary: { total: number; blocking: number; warnings: number; passed: number; }; }
