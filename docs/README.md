# Yantra Documentation

Yantra is designed as an AI Engineering Operating System (AEOS), not a chat
application. This documentation set is organized to separate concerns that
long-lived engineering systems need to keep separate: architecture, APIs,
protocols, schemas, decisions, research, and roadmap.

## Structure

- [`architecture/`](./architecture/) — system-level design: layers, engine
  flow, event-driven core.
- [`specifications/`](./specifications/) — per-subsystem specs. Required
  before implementation, per `ARCHITECTURE_PRINCIPLES.md`.
- [`research/`](./research/) — spikes, evaluations, and Phase 0 findings.
- [`adr/`](./adr/) — Architecture Decision Records.
- [`api/`](./api/) — external-facing API contracts (CLI, headless server,
  automation API).
- [`protocols/`](./protocols/) — inter-component communication protocols
  (Event Bus message formats, agent-to-orchestrator protocol, MCP/plugin
  protocol).
- [`schemas/`](./schemas/) — JSON Schema / type definitions for Mission,
  Plan, Execution Graph, Artifacts, and other structured objects.
- [`examples/`](./examples/) — worked examples of Missions end-to-end.
- [`decisions/`](./decisions/) — product/scope decisions that are not
  strictly architectural (distinct from ADRs, which are technical).
- [`roadmap/`](./roadmap/) — the five-phase roadmap and milestones.

## Start Here

- [`ARCHITECTURE_PRINCIPLES.md`](../ARCHITECTURE_PRINCIPLES.md) — the
  governing rule: specification before code.
- [`SYSTEM_INVARIANTS.md`](../SYSTEM_INVARIANTS.md) — rules that must never
  be violated.
- [`FAILURE_MODEL.md`](../FAILURE_MODEL.md) — how Yantra is expected to fail
  gracefully.
- [`MISSION.md`](../MISSION.md) — the core unit of work in Yantra.
