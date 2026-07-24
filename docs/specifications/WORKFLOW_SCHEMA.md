# Workflow Schema

## Purpose

Defines a reusable Workflow — a named, versioned Plan template the Planner instantiates for common Mission types.

## Schema

```json
{
  "schema_version": "1.0", "workflow_id": "uuid", "name": "string", "version": "semver string",
  "applicable_goal_types": ["string"],
  "steps": [ { "step_id": "string", "agent_role": "string", "description": "string", "depends_on": ["step_id"] } ],
  "default_capability_grants": { "agent_role": ["string"] }, "created_at": "ISO-8601 timestamp"
}
```

## Required Fields

- `schema_version`, `workflow_id`, `name`, `version`, `steps`

## Optional Fields

- `applicable_goal_types`, `default_capability_grants`, `created_at`

## Validation Rules

- `steps` MUST form a DAG.
- `version` MUST follow semver; Planner records which version produced a Plan.

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

- New `steps` fields MINOR. Changing step semantics for a published version prohibited — publish new version.

## Example Payload

```json
{
  "schema_version": "1.0", "workflow_id": "c0ffee00-0000-4000-8000-000000000004", "name": "add-api-endpoint",
  "version": "1.0.0", "applicable_goal_types": ["feature-add"],
  "steps": [
    { "step_id": "design", "agent_role": "architect", "description": "Draft endpoint contract", "depends_on": [] },
    { "step_id": "implement", "agent_role": "coder", "description": "Implement endpoint", "depends_on": ["design"] },
    { "step_id": "verify", "agent_role": "verifier", "description": "Run tests and checks", "depends_on": ["implement"] }
  ],
  "default_capability_grants": { "coder": ["workspace.read", "workspace.write"] }, "created_at": "2026-07-25T00:00:00Z"
}
```
