# @yantra/memory

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Memory Layer: vector store (Qdrant/LanceDB) integration, structured mission history, and the only agent role permitted to hold state across invocations.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never modifies source code or the workspace (Invariant 8).

## Specification

The binding specification for this package will live at
`docs/specifications/memory-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
