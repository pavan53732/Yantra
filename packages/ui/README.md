# @yantra/ui

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Shared, client-agnostic UI primitives (design tokens, component contracts) usable by the desktop client and potentially future clients.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never contain Mission/Agent business logic — that belongs in the engine layers.

## Specification

The binding specification for this package will live at
`docs/specifications/ui-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
