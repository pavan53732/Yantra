# @yantra/orchestrator

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Schedules Execution Graph nodes, spawns agents via the Runtime, and tracks task completion/failure.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never defines what a Mission is, and never bypasses the Verification Engine.

## Specification

The binding specification for this package will live at
`docs/specifications/orchestrator-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
