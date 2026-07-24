# @yantra/router

**Status:** planned — no implementation yet (Phase 3, gated by an approved
specification per
[`01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`](../../docs/architecture/01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md)).

## Purpose

Routes LLM requests across providers (OpenAI, Claude, OpenRouter, Qwen, local models), with fallback/retry policy per 01_FOUNDATION/SYSTEM_INVARIANTS.md scenarios 1-2.

## Layer

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../../docs/architecture/LAYERED_ARCHITECTURE.md)
for this package's position in the layer stack and its allowed dependencies.

## Boundary

Never contains domain logic about Missions or Agents.

## Specification

The binding specification for this package will live at
`docs/specifications/router-spec.md` (or an equivalent named spec) and must be
approved before implementation begins here.
