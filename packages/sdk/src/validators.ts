import { z } from 'zod';
import type { MissionEnvelope, RuntimeEvent, CapabilityContract } from './types';

export const MissionEnvelopeSchema = z.object({
  id: z.string().min(1),
  objective: z.string().min(1),
  constraints: z.array(z.string()).optional(),
  acceptanceCriteria: z.array(z.string()).optional(),
  resources: z.array(z.string()).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  timeoutMs: z.number().int().positive().optional()
}).strict();

export const RuntimeEventSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  source: z.string().min(1),
  timestamp: z.string().min(1),
  payload: z.unknown()
}).strict();

export const CapabilityContractSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().min(1),
  methods: z.array(z.string())
}).strict();

export function validateMissionEnvelope(input: unknown): MissionEnvelope {
  return MissionEnvelopeSchema.parse(input);
}
export function validateRuntimeEvent<TPayload = unknown>(input: unknown): RuntimeEvent<TPayload> {
  return RuntimeEventSchema.parse(input) as RuntimeEvent<TPayload>;
}
export function validateCapabilityContract(input: unknown): CapabilityContract {
  return CapabilityContractSchema.parse(input);
}
