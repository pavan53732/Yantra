# Memory Protocol

## Purpose

Governs how subsystems read from and write to the Memory Layer (see `MEMORY_SCHEMA.md`, `KNOWLEDGE_GRAPH_SCHEMA.md`).

## Message Types

- `memory.write_request` — any subsystem -> Memory Layer: persist a record
- `memory.write_ack` — Memory Layer -> caller: write confirmed, includes `memory_id`
- `memory.query_request` — any subsystem -> Memory Layer: retrieve records (semantic or structured)
- `memory.query_result` — Memory Layer -> caller: matching records
- `memory.conflict_notice` — Memory Layer -> Mission Engine: conflicting facts detected

## Request/Response Lifecycle

1. Caller emits `memory.write_request`; Memory Layer validates against `MEMORY_SCHEMA.md`, never mutates an existing record in place — always creates a new versioned record.
2. Memory Layer emits `memory.write_ack` and a `MemoryUpdated` event.
3. For reads, caller emits `memory.query_request` with either a semantic query (vector) or structured filter; Memory Layer returns `memory.query_result`.

## Error Semantics

- Error codes: `schema_invalid`, `store_unavailable`, `checksum_mismatch` (corruption per `01_FOUNDATION/SYSTEM_INVARIANTS.md` scenario 4), `conflict_detected`.
- `store_unavailable` triggers fallback to last known-good snapshot, never returns partial/corrupt data silently.

## Retry Rules

- Reads retry against a snapshot on `store_unavailable` (up to 2 attempts). Writes are never silently retried if they might duplicate a record — the caller must resubmit with an idempotency key.

## Timeouts

- `memory.query_request` has a default 5s timeout for vector queries, 2s for structured lookups; both configurable per deployment.

## Cancellation

- Long-running reindexing operations may be cancelled via a companion `memory.reindex_cancel` message; in-flight writes are never cancellable mid-flight (atomic write semantics).

## Streaming

- Bulk queries (e.g. full mission history) MAY stream `memory.query_result` in pages with a `cursor` field rather than one large payload.

## Version Negotiation

- `memory.write_request`/`query_request` carry `protocol_version`; the Memory Layer supports at least the current and previous MAJOR version to ease rolling upgrades.
