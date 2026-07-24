# Event-Driven Core

Yantra components communicate primarily through an **Event Bus**, not direct
method calls, whenever an interaction crosses a subsystem/layer boundary.
This is what makes the system observable and extensible: any component can
subscribe to Mission activity without the emitting component knowing or
caring who is listening.

## Canonical Mission Event Sequence

```
MissionCreated
  -> PlannerFinished
  -> ExecutionStarted
  -> AgentSpawned
  -> ToolRequested
  -> ToolFinished
  -> MemoryUpdated
  -> VerificationPassed
  -> MissionCompleted
```

This is the "happy path." Real executions interleave many `AgentSpawned` /
`ToolRequested` / `ToolFinished` pairs, may loop back from a failed
`VerificationPassed` (i.e. verification-failed) to `ExecutionStarted` again,
and may pause on provider or connectivity failures as described in
`01_FOUNDATION/SYSTEM_INVARIANTS.md`.

## Why Events, Not Direct Calls

- **Observability** — every state change is a fact on the bus, which gives
  Yantra an audit trail for free (ties to `01_FOUNDATION/SYSTEM_INVARIANTS.md` #2 and #3).
- **Extensibility** — new subsystems (telemetry, a new UI surface, a
  webhook integration) can subscribe without touching existing code.
- **Decoupling** — the Orchestrator does not need a compile-time dependency
  on the Memory Layer to know a Mission's memory was updated; it just reacts
  to `MemoryUpdated`.
- **Resumability** — a durable event log is a natural basis for reconstructing
  and resuming Mission state after a crash or restart.

## Event Contract

Every event on the bus must, at minimum, declare:

- `type` — the event name (e.g. `ToolRequested`).
- `missionId` — the Mission this event belongs to.
- `timestamp`.
- `payload` — a schema-validated object specific to that event type (see
  `docs/schemas/`).
- `correlationId` — links related events (e.g. a `ToolRequested` /
  `ToolFinished` pair) together.

Exact message formats belong in `docs/protocols/event-bus.md` (to be
authored in Phase 2) — this document defines the *why*, not the wire format.
