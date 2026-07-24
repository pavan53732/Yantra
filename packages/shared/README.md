# @yantra/shared

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Cross-cutting TypeScript types and utilities used by multiple packages to avoid upward/circular dependencies.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never depend on any other package in this repository.

## Specification

The binding specification for this package will live at
`docs/specifications/shared-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
