# Specifications

This directory contains the binding technical specifications for Yantra.
Per [`ARCHITECTURE_PRINCIPLES.md`](../../ARCHITECTURE_PRINCIPLES.md),
**no implementation code may be added for a subsystem until its specification
here has been approved and merged.**

Yantra has completed drafting for **Phase 0.5 — Engineering Specification
Freeze**: the goal was to reach a point where an engineer who has never seen
Yantra could implement the runtime from these specifications alone, before
any production code is written. See
[`docs/roadmap/PHASE_0_5_SPECIFICATION_FREEZE.md`](../roadmap/PHASE_0_5_SPECIFICATION_FREEZE.md)
for the full milestone checklist (all ten priorities drafted; review/approval
still pending before implementation begins).

## Foundational Specs

- [`SYSTEM_INVARIANTS.md`](../../SYSTEM_INVARIANTS.md) — rules that must never be violated
- [`FAILURE_MODEL.md`](../../FAILURE_MODEL.md) — how the system behaves when things break
- [`MISSION.md`](../../MISSION.md) — the Mission lifecycle at the heart of Yantra

## Priority 1 — Core Schemas

- [`MISSION_SCHEMA.md`](./MISSION_SCHEMA.md)
- [`TASK_SCHEMA.md`](./TASK_SCHEMA.md)
- [`AGENT_SCHEMA.md`](./AGENT_SCHEMA.md)
- [`WORKFLOW_SCHEMA.md`](./WORKFLOW_SCHEMA.md)
- [`EXECUTION_GRAPH_SCHEMA.md`](./EXECUTION_GRAPH_SCHEMA.md)
- [`EVENT_SCHEMA.md`](./EVENT_SCHEMA.md)
- [`MEMORY_SCHEMA.md`](./MEMORY_SCHEMA.md)
- [`CAPABILITY_SCHEMA.md`](./CAPABILITY_SCHEMA.md)
- [`PLUGIN_SCHEMA.md`](./PLUGIN_SCHEMA.md)
- [`TOOL_SCHEMA.md`](./TOOL_SCHEMA.md)
- [`MODEL_PROVIDER_SCHEMA.md`](./MODEL_PROVIDER_SCHEMA.md)

All frozen at `schema_version: "1.0"` pending review.

## Priority 2 — Runtime Protocols

See [`docs/protocols/`](../protocols/): `agent-protocol.md`,
`tool-protocol.md`, `memory-protocol.md`, `planner-protocol.md`,
`verifier-protocol.md`, `provider-protocol.md`, `plugin-protocol.md`,
`ipc-protocol.md`.

## Priority 3 — State Machines

- [`STATE_MACHINES.md`](./STATE_MACHINES.md) — Mission, Agent, Tool, Plugin,
  Workspace, Terminal Session, Model Provider, Memory Synchronization.

## Priority 4 — Capability Contracts

- [`docs/architecture/CAPABILITY_CONTRACTS.md`](../architecture/CAPABILITY_CONTRACTS.md)

## Priority 5 — AI Provider Contract

- [`docs/architecture/AI_PROVIDER_CONTRACT.md`](../architecture/AI_PROVIDER_CONTRACT.md)

## Priority 6 — Mission DSL

- [`MISSION_DSL.md`](./MISSION_DSL.md)

## Priority 7 — Knowledge Graph Specification

- [`KNOWLEDGE_GRAPH_SCHEMA.md`](./KNOWLEDGE_GRAPH_SCHEMA.md)

## Priority 8 — Observability

- [`OBSERVABILITY.md`](./OBSERVABILITY.md)

## Priority 9 — Verification Framework

- [`VERIFICATION_FRAMEWORK.md`](./VERIFICATION_FRAMEWORK.md)

## Priority 10 — Autonomous Decision Policy

- [`AUTONOMOUS_DECISION_POLICY.md`](./AUTONOMOUS_DECISION_POLICY.md)

## Legacy Subsystem Spec Stubs (superseded)

- [Agent Framework Specification](./agent-framework.md) — superseded by `AGENT_SCHEMA.md` + `agent-protocol.md`
- [Model Router Specification](./model-router.md) — superseded by `MODEL_PROVIDER_SCHEMA.md` + `AI_PROVIDER_CONTRACT.md` + `provider-protocol.md`
- [Memory System Specification](./memory-system.md) — superseded by `MEMORY_SCHEMA.md` + `KNOWLEDGE_GRAPH_SCHEMA.md` + `memory-protocol.md`
- [MCP Plugin System Specification](./mcp-system.md) — superseded by `PLUGIN_SCHEMA.md` + `plugin-protocol.md`
- [IPC and Security Boundaries Specification](./ipc-security.md) — superseded by `ipc-protocol.md` + `AUTONOMOUS_DECISION_POLICY.md`
- [Verification Engine Specification](./verification-engine.md) — superseded by `VERIFICATION_FRAMEWORK.md` + `verifier-protocol.md`
- [Capability Engine Specification](./capability-engine.md) — superseded by `CAPABILITY_SCHEMA.md` + `CAPABILITY_CONTRACTS.md`
