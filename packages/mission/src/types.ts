import type { MissionEnvelope } from '@yantra/sdk';

export type MissionState =
  | 'created'
  | 'parsed'
  | 'planned'
  | 'coordinating'
  | 'executing'
  | 'verifying'
  | 'completed'
  | 'failed';

export interface MissionTask {
  id: string;
  title: string;
  action: 'create-file' | 'run-command' | 'initialize-git' | 'verify';
  input: Record<string, unknown>;
}

export interface MissionPlan {
  missionId: string;
  tasks: MissionTask[];
}

export interface MissionVerificationEvidence {
  type: 'file' | 'command' | 'git' | 'verification';
  detail: string;
  success: boolean;
}

export interface MissionResult {
  missionId: string;
  success: boolean;
  finalState: MissionState;
  evidence: MissionVerificationEvidence[];
}

export interface ParsedMission {
  envelope: MissionEnvelope;
  normalizedObjective: string;
}

export interface MissionContext {
  missionId: string;
  objective: string;
  workspacePath: string;
  state: MissionState;
  plan?: MissionPlan;
  evidence: MissionVerificationEvidence[];
}

export interface MissionPersistence {
  save(context: MissionContext): Promise<void>;
  load(missionId: string): Promise<MissionContext | null>;
}

export interface MissionRuntimeDependencies {
  parser: MissionParser;
  planner: MissionPlanner;
  coordinator: MissionCoordinator;
  verifier: MissionVerifier;
  persistence: MissionPersistence;
}

export interface MissionParser {
  parse(input: MissionEnvelope): ParsedMission;
}

export interface MissionPlanner {
  createPlan(input: ParsedMission): MissionPlan;
}

export interface MissionCoordinator {
  execute(context: MissionContext): Promise<MissionContext>;
}

export interface MissionVerifier {
  verify(context: MissionContext): Promise<MissionResult>;
}
