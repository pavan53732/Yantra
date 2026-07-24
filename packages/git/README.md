# @yantra/git

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Git capability: commit, branch, merge, and conflict reporting per 01_FOUNDATION/SYSTEM_INVARIANTS.md scenario 8.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never force-push or discard changes automatically on conflict.

## Specification

The binding specification for this package will live at
`docs/specifications/git-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
