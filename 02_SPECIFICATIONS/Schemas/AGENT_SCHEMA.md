# Agent Schema

## Purpose

Defines an Agent instance — a runtime process/session executing a Task under a specific role. Stateless except the Memory Agent (Invariant 7).

## Schema

```json
{
  "schema_version": "1.0", "agent_id": "uuid", "role": "planner | architect | coder | verifier | memory | orchestrator",
  "task_id": "uuid | null", "mission_id": "uuid", "provider_ref": "string", "capability_grants": ["string"],
  "status": "spawning | idle | busy | terminating | terminated | crashed",
  "spawned_at": "ISO-8601 timestamp", "terminated_at": "ISO-8601 timestamp | null",
  "resource_limits": { "max_memory_mb": "number", "max_runtime_seconds": "number" }
}
```

## Required Fields

- `schema_version`, `agent_id`, `role`, `mission_id`, `capability_grants`, `status`, `spawned_at`

## Optional Fields

- `task_id`, `provider_ref`, `terminated_at`, `resource_limits`

## Validation Rules

- `capability_grants` MUST NOT exceed the per-role allowlist.
- Only `role: memory` may persist state across tasks.
- `status: crashed` MUST link to an `AgentCrashed`/`ToolFailed` event.

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

- New `resource_limits` fields MINOR. Removing statelessness for non-memory roles is MAJOR, requires ADR.

## Example Payload

```json
{
  "schema_version": "1.0", "agent_id": "a1a1a1a1-0000-4000-8000-000000000003", "role": "coder",
  "task_id": "b1e2a3c4-0000-4000-8000-000000000001", "mission_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f",
  "provider_ref": "router:default", "capability_grants": ["workspace.read", "workspace.write", "terminal.exec"],
  "status": "busy", "spawned_at": "2026-07-25T00:05:05Z", "terminated_at": null,
  "resource_limits": { "max_memory_mb": 2048, "max_runtime_seconds": 900 }
}
```
