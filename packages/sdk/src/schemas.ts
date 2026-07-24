import type { SpecificationIndex } from './types';
import specIndex from './generated/spec-index.json' assert { type: 'json' };

export const specificationIndex = specIndex as SpecificationIndex;

export const missionEnvelopeJsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'yantra://schemas/mission-envelope',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'objective'],
  properties: {
    id: { type: 'string', minLength: 1 },
    objective: { type: 'string', minLength: 1 },
    constraints: { type: 'array', items: { type: 'string' } },
    acceptanceCriteria: { type: 'array', items: { type: 'string' } },
    resources: { type: 'array', items: { type: 'string' } },
    priority: { enum: ['low', 'medium', 'high', 'critical'] },
    timeoutMs: { type: 'integer', minimum: 1 }
  }
} as const;

export const runtimeEventJsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'yantra://schemas/runtime-event',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'type', 'source', 'timestamp', 'payload'],
  properties: {
    id: { type: 'string', minLength: 1 },
    type: { type: 'string', minLength: 1 },
    source: { type: 'string', minLength: 1 },
    timestamp: { type: 'string', minLength: 1 },
    payload: {}
  }
} as const;

export const capabilityContractJsonSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'yantra://schemas/capability-contract',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'name', 'version', 'methods'],
  properties: {
    id: { type: 'string', minLength: 1 },
    name: { type: 'string', minLength: 1 },
    version: { type: 'string', minLength: 1 },
    methods: { type: 'array', items: { type: 'string' } }
  }
} as const;
