# Loading Order — Yantra Documentation Hierarchy

## Purpose

This file documents the full documentation hierarchy of the Yantra repository
and the correct loading order for AI agents. It resolves the relationship
between the two parallel documentation systems that coexist in this repository.

## Two Documentation Systems — Explained

Yantra contains two documentation systems that serve different but
complementary purposes. They are **not competing** — both are authoritative
within their own scope.

### System A — `docs/` (Product-first, Human-readable canonical chain)

```
docs/product/          — canonical product specification, vision, principles
docs/roadmap/          — milestone planning and phase definitions
docs/architecture/     — domain architecture overview documents
docs/development/      — contributor and engineering workflow guidance
docs/governance/       — release, verification, readiness, and policy artifacts
```

**Authority:** `docs/product/PRODUCT_REQUIREMENTS.md` is the source of truth
for all product decisions. All other documents are subordinate to it.

**Audience:** Human contributors, product reviewers, and AI agents reading
high-level product direction and phase planning.

**Entry point declared by:** `README.md` and `AGENTS.md`

### System B — `01_–04_/` (Specification-first, Agent-execution layer)

```
01_FOUNDATION/         — core principles, philosophy, invariants, glossary
02_SPECIFICATIONS/     — detailed domain specs, schemas, DSLs, state machines,
                         protocols, verification framework, capability contracts
03_IMPLEMENTATION/     — implementation-level technical reference
04_GOVERNANCE/         — quality gates, compliance rules, certification
                         criteria, release readiness, CI policies, validation
```

**Authority:** Specifications in `02_SPECIFICATIONS/` are immutable contracts.
Governance rules in `04_GOVERNANCE/` are enforced before implementation.

**Audience:** AI agents executing engineering tasks, automated tooling, and
contributors working on implementation-level decisions.

**Entry point declared by:** `.ai/BOOTSTRAP.md` → this file

## How the Two Systems Relate

| `docs/` Document | `01_–04_/` Counterpart | Relationship |
|---|---|---|
| `docs/product/PRODUCT_REQUIREMENTS.md` | `01_FOUNDATION/` | PRD governs; Foundation elaborates principles and invariants |
| `docs/roadmap/PHASE_3_ROADMAP.md` | `02_SPECIFICATIONS/` | Roadmap declares deliverables; Specs define their technical contracts |
| `docs/architecture/*.md` | `02_SPECIFICATIONS/Architecture/` | Architecture docs are overview-level; Specs contain state machines, schemas, event models |
| `docs/governance/` | `04_GOVERNANCE/` | Governance docs are policy statements; `04_GOVERNANCE/` contains operational gate definitions |
| `docs/product/PRODUCT_PRINCIPLES.md` | `01_FOUNDATION/CORE_PRINCIPLES.md` | Product-facing principles; Foundation contains engineering and architecture principles |

## Conflict Resolution

**Rule:** When any conflict exists between `docs/` and `01_–04_/` content,
`docs/product/PRODUCT_REQUIREMENTS.md` is always the resolution authority.
No other document overrides the PRD.

## Agent Loading Order

For full context before any engineering task, load in this sequence:

1. `01_FOUNDATION/` — all files (principles, invariants, glossary, philosophy)
2. `02_SPECIFICATIONS/` — relevant domain specs for the current task area
3. `03_IMPLEMENTATION/` — implementation reference for the work area
4. `04_GOVERNANCE/` — quality gates and compliance rules
5. `missions/` — the active mission pack if operating under a mission

## Navigation for New Engineers

A new engineer should read in this order:

```
README.md
  ↓ AGENTS.md
  ↓ docs/product/PRODUCT_REQUIREMENTS.md
  ↓ docs/product/PRODUCT_VISION.md
  ↓ docs/product/PRODUCT_PRINCIPLES.md
  ↓ docs/roadmap/PHASE_3_ROADMAP.md
  ↓ docs/architecture/PRODUCT_ARCHITECTURE.md
  ↓ 01_FOUNDATION/SYSTEM_INVARIANTS.md
  ↓ 02_SPECIFICATIONS/ (domain area relevant to current work)
```
