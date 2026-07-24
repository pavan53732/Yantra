import type { MissionEnvelope, RuntimeEvent } from '@yantra/sdk';

export interface MissionTask {
  id: string;
  title: string;
  kind: 'analyze' | 'create-file' | 'run-command' | 'verify';
  input?: Record<string, unknown>;
}

export interface MissionPlan {
  missionId: string;
  tasks: MissionTask[];
}

export interface MissionContext {
  mission: MissionEnvelope;
  plan?: MissionPlan;
  state: MissionState;
  evidence: MissionEvidence[];
  createdAt: string;
  updatedAt: string;
}

export interface MissionEvidence {
  id: string;
  type: 'parse' | 'plan' | 'execution' | 'verification';
  summary: string;
  details?: Record<string, unknown>;
}

export type MissionState =
  | 'created'
  | 'parsed'
  | 'planned'
  | 'coordinating'
  | 'executing'
  | 'verifying'
  | 'completed'
  | 'failed';

export interface MissionResult {
  missionId: string;
  success: boolean;
  finalState: MissionState;
  evidence: MissionEvidence[];
  events: RuntimeEvent[];
}

export interface MissionPersistence {
  save(context: MissionContext): Promise<void>;
  load(missionId: string): Promise<MissionContext | undefined>;
}
