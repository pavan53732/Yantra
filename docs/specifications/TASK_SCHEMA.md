# Task Schema

## Purpose

Defines an Agent Task — the atomic unit of work assigned to a single agent role as a node in an Execution Graph.

## Schema

```json
{
  "schema_version": "1.0", "task_id": "uuid", "mission_id": "uuid", "execution_graph_id": "uuid",
  "agent_role": "planner | architect | coder | verifier | memory | orchestrator",
  "status": "pending | assigned | running | blocked | succeeded | failed | cancelled",
  "input": { "description": "string", "context_refs": ["uuid"] },
  "output": { "artifact_refs": ["uuid"], "summary": "string" },
  "depends_on": ["task_id"], "capability_grants": ["string"],
  "retry_policy": { "max_attempts": "number", "backoff_seconds": "number" },
  "timeout_seconds": "number", "created_at": "ISO-8601 timestamp",
  "started_at": "ISO-8601 timestamp | null", "completed_at": "ISO-8601 timestamp | null"
}
```

## Required Fields

- `schema_version`, `task_id`, `mission_id`, `execution_graph_id`, `agent_role`, `status`, `input`, `depends_on`, `capability_grants`, `created_at`

## Optional Fields

- `output`, `retry_policy`, `timeout_seconds`, `started_at`, `completed_at`

## Validation Rules

- `capability_grants` MUST be a subset of the allowlist for `agent_role` (Invariants 7-12).
- `depends_on` MUST NOT contain cycles.
- `output` MUST be structured (Invariant 6).

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

- New `agent_role` values additive (MINOR). Changing `status` semantics is MAJOR.

## Example Payload

```json
{
  "schema_version": "1.0", "task_id": "b1e2a3c4-0000-4000-8000-000000000001",
  "mission_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f", "execution_graph_id": "e9d8c7b6-0000-4000-8000-000000000002",
  "agent_role": "coder", "status": "running",
  "input": { "description": "Implement token-bucket rate limiter middleware", "context_refs": [] },
  "output": null, "depends_on": ["b1e2a3c4-0000-4000-8000-000000000000"],
  "capability_grants": ["workspace.read", "workspace.write", "terminal.exec"],
  "retry_policy": { "max_attempts": 2, "backoff_seconds": 30 }, "timeout_seconds": 900,
  "created_at": "2026-07-25T00:05:00Z", "started_at": "2026-07-25T00:05:10Z", "completed_at": null
}
```
