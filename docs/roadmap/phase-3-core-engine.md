Status: Historical
Superseded By: `docs/roadmap/PHASE_3_ROADMAP.md`

> [!WARNING]
> Superseded historical document. This file is retained for traceability only and is not authoritative for current planning. Use `docs/roadmap/PHASE_3_ROADMAP.md` and the PRD as the canonical source.

# Phase 3 — Core Engine

**Goal:** Implement the engine — Mission Engine, Orchestrator, Capability Layer, Memory Layer, AI Router, Verification Engine — with zero dependency on any GUI framework.

## Scope

- Implement `packages/mission`, `packages/planner`, `packages/orchestrator`, `packages/runtime`, `packages/capabilities`, `packages/memory`, `packages/router`, `packages/verifier`, `packages/plugins`, `packages/telemetry`.
- Expose the engine via a CLI (`packages/core` + `tools/`) and a headless API before any desktop work begins.
- Validate the engine end-to-end against the examples in `docs/examples/`.

## Exit Criteria

- The engine can run a full Mission lifecycle (Mission -> Plan -> Execution Graph -> Agent Tasks -> Verification -> Artifacts -> Completion) headlessly, with no UI involved.
