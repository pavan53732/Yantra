# @yantra/terminal

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Terminal execution capability with per-command timeouts per FAILURE_MODEL.md scenario 9.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never run without an enforced timeout.

## Specification

The binding specification for this package will live at
`docs/specifications/terminal-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
