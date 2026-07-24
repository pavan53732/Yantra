# Tool Schema

## Purpose

Defines a Tool invocation record — the request/response pair emitted whenever an agent calls a Capability.

## Schema

```json
{
  "schema_version": "1.0", "tool_call_id": "uuid", "task_id": "uuid", "agent_id": "uuid",
  "capability_id": "string", "arguments": "object",
  "status": "requested | running | succeeded | failed | timed_out | cancelled",
  "result": "object | null", "error": { "code": "string", "message": "string" },
  "requested_at": "ISO-8601 timestamp", "completed_at": "ISO-8601 timestamp | null", "duration_ms": "number | null"
}
```

## Required Fields

- `schema_version`, `tool_call_id`, `task_id`, `agent_id`, `capability_id`, `arguments`, `status`, `requested_at`

## Optional Fields

- `result`, `error`, `completed_at`, `duration_ms`

## Validation Rules

- `failed` MUST populate `error`; `succeeded` MUST populate `result` (never both null/both set).
- `timed_out` is distinct from `failed` (FAILURE_MODEL scenario 9).
- One `ToolRequested` maps to at most one terminal event.

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

- New `error.code` values additive (MINOR). Merging `timed_out` into `failed` is MAJOR, violates failure-model distinction.

## Example Payload

```json
{
  "schema_version": "1.0", "tool_call_id": "7001face-0000-4000-8000-000000000007",
  "task_id": "b1e2a3c4-0000-4000-8000-000000000001", "agent_id": "a1a1a1a1-0000-4000-8000-000000000003",
  "capability_id": "terminal.exec", "arguments": { "command": "npm test" }, "status": "succeeded",
  "result": { "exit_code": 0, "stdout_ref": "logs/7001face-stdout.txt" }, "error": null,
  "requested_at": "2026-07-25T00:06:00Z", "completed_at": "2026-07-25T00:06:04Z", "duration_ms": 4210
}
```
