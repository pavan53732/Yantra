# Event Bus Protocol

The Event Bus is the backbone of Yantra's event-driven core. Layers do not call each other directly across the stack; they publish and subscribe to events.

## Canonical Mission Event Sequence

```
Mission Created
   |
   v
Planner Finished
   |
   v
Execution Started
   |
   v
Agent Spawned
   |
   v
Tool Requested
   |
   v
Tool Finished
   |
   v
Memory Updated
   |
   v
Verification Passed
   |
   v
Mission Completed
```

## Event Envelope (conceptual)

Every event on the bus shares a common envelope:

- `eventId`: unique identifier
- `missionId`: the Mission this event belongs to
- `type`: e.g. `mission.created`, `tool.requested`, `tool.finished`
- `timestamp`: ISO-8601 timestamp
- `payload`: type-specific structured data (schema defined in `docs/schemas/`)
- `causedBy`: optional reference to the event that triggered this one (for explainability, per `01_FOUNDATION/SYSTEM_INVARIANTS.md`)

## Delivery Guarantees

- At-least-once delivery to subscribers within a running Mission.
- Events are persisted append-only per Mission to support resumability (Invariant: "Every workflow is resumable").
- Ordering is guaranteed per-Mission, not globally across Missions.

## Status

This is a conceptual draft. The binding schema and transport (in-process emitter vs. message queue) must be finalized as an approved specification before implementation, per `01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`.
