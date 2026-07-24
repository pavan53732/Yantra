# @yantra/verifier

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Verification Engine: independently checks Agent Task outputs against Requirements via tests, schema validation, and static analysis.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never patches code or implementation to make a check pass (Invariant 12).

## Specification

The binding specification for this package will live at
`docs/specifications/verifier-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
