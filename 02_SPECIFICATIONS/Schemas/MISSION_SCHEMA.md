# Mission Schema

## Purpose

Defines the canonical shape of a Mission — the top-level unit of work in Yantra, as introduced in [`01_FOUNDATION/MISSION.md`](../../01_FOUNDATION/MISSION.md). Every client (chat, CLI, API, CI/CD, IDE) creates a Mission using this schema.

## Schema

```json
{
  "schema_version": "1.0",
  "mission_id": "uuid",
  "title": "string",
  "objective": "string",
  "status": "created | planning | waiting | executing | paused | resuming | verifying | completed | partially_completed | blocked | failed | archived",
  "goals": [ { "id": "string", "description": "string", "measurable": true } ],
  "constraints": {
    "budget": { "currency": "string", "amount": "number" },
    "timeout_seconds": "number",
    "allowed_capabilities": ["string"],
    "security_boundary": "string"
  },
  "requirements": [ { "id": "string", "description": "string", "type": "functional | non_functional" } ],
  "plan_ref": "uuid | null",
  "execution_graph_ref": "uuid | null",
  "artifacts": ["uuid"],
  "created_by": { "client_type": "chat | cli | api | ci | ide", "actor_id": "string" },
  "created_at": "ISO-8601 timestamp",
  "updated_at": "ISO-8601 timestamp",
  "parent_mission_id": "uuid | null"
}
```

## Required Fields

- `schema_version`, `mission_id`, `title`, `objective`, `status`, `goals`, `constraints`, `created_by`, `created_at`, `updated_at`

## Optional Fields

- `requirements`, `plan_ref`, `execution_graph_ref`, `artifacts`, `parent_mission_id`

## Validation Rules

- `mission_id` MUST be a UUIDv4, unique across the system.
- `status` MUST only transition per `STATE_MACHINES.md`.
- `goals` MUST contain at least one entry before a Mission may leave `created`.
- A Mission MUST NOT be marked `completed` unless every `artifacts` entry has passed Verification (Invariant 6).

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

- New optional fields may be added in MINOR versions; consumers ignore unrecognized fields.
- Renaming/removing `mission_id` or `status` semantics requires a MAJOR bump and an ADR.

## Example Payload

```json
{
  "schema_version": "1.0",
  "mission_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f",
  "title": "Add rate limiting to the API gateway",
  "objective": "Prevent abuse of the public API by enforcing per-key rate limits.",
  "status": "planning",
  "goals": [ { "id": "g1", "description": "No single API key can exceed 100 req/min", "measurable": true } ],
  "constraints": { "budget": { "currency": "USD", "amount": 5.00 }, "timeout_seconds": 3600, "allowed_capabilities": ["workspace", "terminal", "git"], "security_boundary": "repo:api-gateway" },
  "requirements": [ { "id": "r1", "description": "Rate limiter must be configurable per API key tier", "type": "functional" } ],
  "plan_ref": null, "execution_graph_ref": null, "artifacts": [],
  "created_by": { "client_type": "cli", "actor_id": "user:pavan" },
  "created_at": "2026-07-25T00:00:00Z", "updated_at": "2026-07-25T00:00:00Z", "parent_mission_id": null
}
```
