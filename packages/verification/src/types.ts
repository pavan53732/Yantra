export type VerificationCategory = 'architecture' | 'security' | 'correctness' | 'performance' | 'maintainability' | 'compatibility' | 'accessibility' | 'documentation' | 'licensing' | 'packaging';
export interface VerificationInput { missionId: string; evidence: Array<{ id: string; type: string; summary: string; details?: Record<string, unknown> }>; }
export interface VerificationOutcome { category: VerificationCategory; passed: boolean; blocking: boolean; confidence: number; summary: string; }
export interface VerificationReport { missionId: string; passed: boolean; outcomes: VerificationOutcome[]; }
