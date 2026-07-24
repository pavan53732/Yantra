import { createRuntimeKernel } from '@yantra/core';
import type { MissionEnvelope } from '@yantra/sdk';
import { DefaultMissionParser } from './parser';
import { DefaultMissionPlanner } from './planner';
import { DefaultMissionCoordinator } from './coordinator';
import { DefaultMissionVerifier } from './verifier';
import { InMemoryMissionPersistence } from './persistence';
import { MissionEngine } from './engine';
import type { MissionResult } from './types';

export async function runMission(input: MissionEnvelope, workspacePath: string): Promise<MissionResult> {
  const kernel = createRuntimeKernel({ configuration: { environment: 'test', workspaceRoot: workspacePath, logLevel: 'info' } });
  await kernel.start();
  const engine = new MissionEngine(kernel.events, kernel.logger, {
    parser: new DefaultMissionParser(),
    planner: new DefaultMissionPlanner(),
    coordinator: new DefaultMissionCoordinator(kernel.events, kernel.logger),
    verifier: new DefaultMissionVerifier(),
    persistence: new InMemoryMissionPersistence()
  });
  const result = await engine.run(input, workspacePath);
  await kernel.stop();
  return result;
}
