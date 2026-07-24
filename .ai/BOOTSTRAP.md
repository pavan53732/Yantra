# Bootstrap — Yantra AI Agent Loading Protocol

## Purpose

This file is the entry point for every AI agent operating inside the Yantra
repository. It establishes the canonical loading sequence, context model, and
behavioural constraints before any planning, architecture, or implementation
work begins.

Load this file first. Do not skip any step in the sequence below.

## Loading Sequence

1. Load `.ai/LOADING_ORDER.md` — understand the full documentation hierarchy
   and the relationship between `docs/` and the `01_–04_` numbered folders.
2. Load `.ai/RULES.md` — load all behavioural constraints before reasoning.
3. Load `.ai/MISSIONS.md` — understand mission format, execution contracts,
   and how to handle mission packs in `missions/`.
4. Load `.ai/QUALITY_GATES.md` — understand all mandatory gates that must pass
   before any implementation is authorised.
5. Load context documents listed in the Context Model section below.

## Context Model

After completing the loading sequence above, establish product context by reading:

- `docs/product/PRODUCT_REQUIREMENTS.md` — canonical product specification
  (source of truth for all product decisions)
- `docs/product/PRODUCT_VISION.md` — long-term direction and positioning
- `docs/product/PRODUCT_PRINCIPLES.md` — decision constraints and operating rules
- `docs/roadmap/PHASE_3_ROADMAP.md` — current active phase deliverables
- `docs/architecture/PRODUCT_ARCHITECTURE.md` — system layer model

For implementation-level tasks, additionally load:

- `01_FOUNDATION/SYSTEM_INVARIANTS.md` — system invariants that must never be violated
- `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` — lifecycle state machines
- `02_SPECIFICATIONS/Mission/MISSION_DSL.md` — mission contract format
- `02_SPECIFICATIONS/Verifier/VERIFICATION_FRAMEWORK.md` — verification categories

## Execution Constraints

- Never begin implementation without completing the full loading sequence.
- Never invent architecture, roadmap phases, files, or repository structure.
- Never present assumed state as verified state.
- Always report what was observed, inspected, executed, and externally verified
  as distinct categories.
- If a quality gate cannot be confirmed as passed, halt and report the blocker.
- Do not stop work mid-phase unless: the phase is complete, a genuine blocker
  exists, or execution limits are reached.

## Relationship to AGENTS.md

`AGENTS.md` at the repository root is the primary human-readable and
AI-readable instruction file and the canonical entry point for all AI agents.
This bootstrap file provides the detailed operational loading protocol that
`AGENTS.md` delegates to. They are complementary and consistent:
`AGENTS.md` is the entry point; this file is the execution protocol.
