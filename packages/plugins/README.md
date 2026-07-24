# @yantra/plugins

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Plugin system and MCP integration: loads third-party capabilities into the Capability Layer under sandboxing per 01_FOUNDATION/SYSTEM_INVARIANTS.md scenario 5.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never grants plugins access above the Capability Layer without Verification Engine review.

## Specification

The binding specification for this package will live at
`docs/specifications/plugins-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
