# Memory Schema

## Purpose

Defines the structured record shape stored by the Memory Layer — vector-indexed embeddings and structured facts/mission history.

## Schema

```json
{
  "schema_version": "1.0", "memory_id": "uuid", "mission_id": "uuid | null",
  "record_type": "fact | embedding | mission_summary | artifact_reference",
  "content": "string | vector<float>", "embedding_model": "string | null", "confidence": "number (0-1)",
  "provenance": { "source_type": "string", "source_ref": "string" }, "version": "number",
  "superseded_by": "uuid | null", "created_at": "ISO-8601 timestamp", "expires_at": "ISO-8601 timestamp | null"
}
```

## Required Fields

- `schema_version`, `memory_id`, `record_type`, `content`, `confidence`, `provenance`, `version`, `created_at`

## Optional Fields

- `mission_id`, `embedding_model`, `superseded_by`, `expires_at`

## Validation Rules

- `confidence` MUST be within [0,1].
- Updates create a new `memory_id` with incremented `version`; prior record gets `superseded_by` set (Invariant 4).
- Memory Layer MUST NOT write to workspace paths (Invariant 8).

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

- New `record_type` values additive (MINOR). Changing `superseded_by` chain semantics is MAJOR.

## Example Payload

```json
{
  "schema_version": "1.0", "memory_id": "d00d0000-0000-4000-8000-000000000006",
  "mission_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f", "record_type": "fact",
  "content": "The API gateway uses Express middleware chains for cross-cutting concerns.",
  "embedding_model": null, "confidence": 0.92,
  "provenance": { "source_type": "codebase_scan", "source_ref": "apps/api/src/middleware/index.ts" },
  "version": 1, "superseded_by": null, "created_at": "2026-07-25T00:04:00Z", "expires_at": null
}
```
