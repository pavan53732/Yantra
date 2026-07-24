export type SpecKind = 'schemas' | 'protocols' | 'architecture' | 'mission' | 'verifier' | 'knowledgegraph' | 'capabilities';
export interface SpecificationEntity {
  name: string;
  kind: string;
  path: string;
  const: string;
  ts: string;
}
export interface SpecificationIndex {
  generated_from: string;
  entity_count: number;
  entities: SpecificationEntity[];
}
export interface MissionEnvelope {
  id: string;
  objective: string;
  constraints?: string[];
  acceptanceCriteria?: string[];
  resources?: string[];
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timeoutMs?: number;
}
export interface RuntimeEvent<TPayload = unknown> {
  id: string;
  type: string;
  source: string;
  timestamp: string;
  payload: TPayload;
}
export interface CapabilityContract {
  id: string;
  name: string;
  version: string;
  methods: string[];
}
