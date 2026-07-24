# Event Schema

## Purpose

Defines the Event envelope carried on the Event Bus. Every cross-layer communication in Yantra is an instance of this schema.

## Schema

```json
{
  "schema_version": "1.0", "event_id": "uuid", "mission_id": "uuid",
  "event_type": "MissionCreated | PlannerFinished | ExecutionStarted | AgentSpawned | ToolRequested | ToolFinished | ToolFailed | MemoryUpdated | VerificationPassed | VerificationFailed | MissionCompleted | MissionPaused | MissionResumed | ProviderFailed | PluginCrashed | MemoryDegraded | MemoryConflict",
  "emitted_by": { "layer": "string", "component": "string", "agent_id": "uuid | null" },
  "timestamp": "ISO-8601 timestamp", "causation_id": "uuid | null", "correlation_id": "uuid",
  "payload": "object (event_type-specific)"
}
```

## Required Fields

- `schema_version`, `event_id`, `mission_id`, `event_type`, `emitted_by`, `timestamp`, `correlation_id`, `payload`

## Optional Fields

- `causation_id` (null only for root `MissionCreated`)

## Validation Rules

- `event_type` MUST be an enumerated canonical type.
- `causation_id` MUST reference a prior `event_id`, enabling causal replay.
- Events are immutable once emitted.

## Versioning Strategy

All schemas in `docs/specifications/` are versioned independently using a
`schema_version` field of the form `MAJOR.MINOR`. This document defines
`schema_version: "1.0"`.

- **MAJOR** increments on breaking changes (removed/renamed required fields,
  changed semantics of an existing field).
- **MINOR** increments on additive, backward-compatible changes (new optional
  fields, new enum values that consumers can ignore safely).
- Producers MUST stamp every payload with the `schema_version` they were
  written against. Consumers MUST reject payloads with a MAJOR version they
  do not support, and MAY ignore unknown fields on MINOR version mismatches.

## Forward/Backward Compatibility

- New `event_type` values additive (MINOR); consumers ignore unknown types.
- Changing an existing type's required payload shape is MAJOR for that type.

## Example Payload

```json
{
  "schema_version": "1.0", "event_id": "f00dbabe-0000-4000-8000-000000000005",
  "mission_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f", "event_type": "ToolFinished",
  "emitted_by": { "layer": "capability", "component": "terminal", "agent_id": "a1a1a1a1-0000-4000-8000-000000000003" },
  "timestamp": "2026-07-25T00:06:00Z", "causation_id": "f00dbabe-0000-4000-8000-000000000004",
  "correlation_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f",
  "payload": { "tool": "terminal.exec", "exit_code": 0, "duration_ms": 4210 }
}
```
