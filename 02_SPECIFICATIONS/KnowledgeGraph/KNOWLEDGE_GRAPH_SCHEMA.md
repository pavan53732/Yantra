# Knowledge Graph Schema

## Purpose

Specifies the graph structure underlying the Memory Layer's long-term knowledge store — nodes and edges connecting Missions, Artifacts, Facts, and code entities. Complements `MEMORY_SCHEMA.md`'s flat record shape with relational structure, and exists to prevent the inconsistency memory systems accumulate without explicit versioning and conflict rules.

## Schema

```json
{
  "schema_version": "1.0",
  "node": {
    "node_id": "uuid",
    "node_type": "mission | task | artifact | fact | code_entity | requirement | agent",
    "label": "string",
    "properties": "object",
    "confidence": "number (0-1)",
    "provenance": { "source_type": "string", "source_ref": "string" },
    "version": "number",
    "superseded_by": "uuid | null",
    "created_at": "ISO-8601 timestamp",
    "retention_policy": "permanent | ttl | mission_scoped"
  },
  "edge": {
    "edge_id": "uuid",
    "edge_type": "produces | depends_on | references | supersedes | verifies | contradicts",
    "from_node_id": "uuid",
    "to_node_id": "uuid",
    "confidence": "number (0-1)",
    "created_at": "ISO-8601 timestamp"
  }
}
```

## Required Fields

- Node: `schema_version`, `node_id`, `node_type`, `label`, `confidence`, `provenance`, `version`, `created_at`
- Edge: `edge_id`, `edge_type`, `from_node_id`, `to_node_id`, `confidence`, `created_at`

## Optional Fields

- Node: `properties`, `superseded_by`, `retention_policy`

## Validation Rules

- `confidence` MUST be within [0,1] for both nodes and edges.
- `contradicts` edges MUST trigger a `MemoryConflict` event (see `memory-protocol.md`) rather than silent resolution.
- Nodes are never mutated in place; updates create a new `node_id` + `version` with `superseded_by` set on the prior node (mirrors `MEMORY_SCHEMA.md`).
- Garbage collection: `retention_policy: ttl` nodes are eligible for removal after expiry; `mission_scoped` nodes are eligible for removal once their Mission is `Archived`; `permanent` nodes are never auto-removed.
- Merge rule: when two nodes describe the same real-world entity with a confidence delta above a configurable threshold, the lower-confidence node is marked `superseded_by` the higher-confidence one; below threshold, both persist with a `contradicts` edge for human/agent review.

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

- New `node_type`/`edge_type` values are additive (MINOR).
- Changing the merge/conflict resolution algorithm's default behavior is MAJOR and requires an ADR, since it affects the interpretation of existing graph data.

## Example Payload

```json
{
  "node": {
    "schema_version": "1.0", "node_id": "aa11bb22-0000-4000-8000-000000000010",
    "node_type": "fact", "label": "API gateway uses Express middleware",
    "properties": { "file": "apps/api/src/middleware/index.ts" }, "confidence": 0.92,
    "provenance": { "source_type": "codebase_scan", "source_ref": "commit:abc123" },
    "version": 1, "superseded_by": null, "created_at": "2026-07-25T00:04:00Z",
    "retention_policy": "permanent"
  },
  "edge": {
    "schema_version": "1.0", "edge_id": "cc33dd44-0000-4000-8000-000000000011",
    "edge_type": "references", "from_node_id": "aa11bb22-0000-4000-8000-000000000010",
    "to_node_id": "3fa2c1d0-1234-4a11-9c2e-1a2b3c4d5e6f", "confidence": 0.9,
    "created_at": "2026-07-25T00:04:00Z"
  }
}
```
