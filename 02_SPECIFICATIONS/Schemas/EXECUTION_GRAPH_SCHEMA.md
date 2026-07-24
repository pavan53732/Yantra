# Execution Graph Schema

## Purpose

Defines the Execution Graph — the DAG of Agent Tasks the Orchestrator schedules, compiled by the Planner from a Mission's Plan.

## Schema

```json
{
  "schema_version": "1.0", "execution_graph_id": "uuid", "mission_id": "uuid",
  "nodes": ["task_id"], "edges": [ { "from": "task_id", "to": "task_id" } ],
  "status": "compiling | ready | executing | paused | completed | failed",
  "compiled_from_workflow_id": "uuid | null", "created_at": "ISO-8601 timestamp"
}
```

## Required Fields

- `schema_version`, `execution_graph_id`, `mission_id`, `nodes`, `edges`, `status`, `created_at`

## Optional Fields

- `compiled_from_workflow_id`

## Validation Rules

- Graph MUST be acyclic; validated before `compiling`→`ready`.
- Every `task_id` in `edges` MUST also appear in `nodes`.
- Planner owns `compiling`→`ready`; Orchestrator owns the rest.

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

- Adding graph metadata MINOR. Changing edge semantics (hard dep -> soft hint) MAJOR.

## Example Payload

```json
{
  "schema_version": "1.0", "execution_graph_id": "e9d8c7b6-0000-4000-8000-000000000002",
  "mission_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f",
  "nodes": ["b1e2a3c4-0000-4000-8000-000000000000", "b1e2a3c4-0000-4000-8000-000000000001"],
  "edges": [ { "from": "b1e2a3c4-0000-4000-8000-000000000000", "to": "b1e2a3c4-0000-4000-8000-000000000001" } ],
  "status": "executing", "compiled_from_workflow_id": "c0ffee00-0000-4000-8000-000000000004",
  "created_at": "2026-07-25T00:05:00Z"
}
```
