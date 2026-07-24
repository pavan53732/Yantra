# @yantra/workspace

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Filesystem/workspace abstraction: safe, reversible file operations backing the reversibility invariant (Invariant 4).

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never bypass version control snapshotting for tracked changes.

## Specification

The binding specification for this package will live at
`docs/specifications/workspace-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
