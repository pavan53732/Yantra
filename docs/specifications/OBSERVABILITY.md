# Observability

## Purpose

Autonomous systems are only debuggable if they are observable from the start.
This document specifies what Yantra logs, measures, traces, and replays for
every Mission, satisfying Invariant 2 (every tool execution must be
observable) and Invariant 3 (every decision must be explainable).

## Structured Logs

- Every log line is structured JSON, never freeform text, with at minimum:
  `timestamp`, `level`, `component`, `mission_id` (if applicable), `message`,
  `context` (object).
- Log levels: `debug`, `info`, `warn`, `error`, `critical`. `critical` is
  reserved for conditions requiring immediate operator attention (e.g.
  repeated Memory corruption).
- Logs are never the sole record of a state transition — every state
  transition is also an Event Bus event (`EVENT_SCHEMA.md`); logs are for
  diagnostic detail, events are the authoritative record.

## Metrics

- Per-Mission: duration, cost (USD, tokens), task count, retry count,
  verification pass/fail counts by category.
- Per-Provider: latency (p50/p95/p99), error rate, cost per request, failover
  frequency.
- Per-Capability: invocation count, latency, error rate, timeout rate.
- Per-Agent-Role: average task duration, success rate, crash rate.

## Traces

- Every Mission has a distributed trace spanning Planner -> Orchestrator ->
  Agents -> Capabilities -> Verification, using `mission_id` as the trace root
  and `causation_id` chains (from `EVENT_SCHEMA.md`) to reconstruct span
  parent/child relationships without a separate tracing schema.

## Event History

- The full, immutable sequence of Event Bus events for a Mission is retained
  per the Memory Layer's retention policy (`KNOWLEDGE_GRAPH_SCHEMA.md`) and is
  the basis for Mission Replay.

## Agent Timeline

- A per-Agent view: spawn time, tasks handled, tool calls made, termination
  reason. Derived from `AgentSpawned`, `ToolRequested`/`ToolFinished`, and
  agent state machine transitions (`STATE_MACHINES.md`).

## Tool Timeline

- A per-Tool-call view: request, arguments (redacted if sensitive), result or
  error, duration. Derived directly from `TOOL_SCHEMA.md` records.

## Mission Replay

- Any Mission's full event history can be replayed in order (respecting
  `causation_id` chains) to reconstruct exactly what happened and why,
  without re-executing side-effecting Capabilities. Replay is read-only by
  definition — it never re-invokes `terminal.exec`, `git.*`, or other
  side-effecting capabilities; it reconstructs state from recorded events only.

## Audit Trail

- Every action with `requires_approval: true` (per `CAPABILITY_SCHEMA.md` and
  `AUTONOMOUS_DECISION_POLICY.md`) is logged with: who/what approved it, when,
  and the exact Capability invocation that followed. This trail is retained
  independently of general Mission retention policy and is never subject to
  garbage collection.

## Requirements on New Subsystems

Any new `packages/*` module must, at minimum:

- Emit structured logs per the format above.
- Emit Event Bus events for every state transition it owns.
- Expose at least the metrics categories relevant to its layer (see
  `LAYERED_ARCHITECTURE.md` for layer-specific expectations).
