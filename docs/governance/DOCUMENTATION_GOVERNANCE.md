# Documentation Governance

This document defines how Yantra documentation is organised, how canonical sources are chosen, and how historical material must be handled.

## Canonical chain

The canonical documentation chain is:

1. `README.md`
2. `AGENTS.md`
3. `docs/product/PRODUCT_REQUIREMENTS.md`
4. `docs/product/PRODUCT_VISION.md`
5. `docs/product/PRODUCT_PRINCIPLES.md`
6. `docs/product/USER_JOURNEYS.md`
7. `docs/product/UI_UX_GUIDELINES.md`
8. `docs/product/DESIGN_SYSTEM.md`
9. `docs/roadmap/PHASE_3_ROADMAP.md`
10. `docs/architecture/`
11. `03_IMPLEMENTATION/`
12. `04_GOVERNANCE/`

If documents conflict, the PRD is the source of truth.

## Relationship between `docs/` and `01_`–`04_`

Yantra currently uses two navigation systems for different purposes:

- `docs/` is the human-readable, product-first canonical documentation tree.
- `01_FOUNDATION/`, `02_SPECIFICATIONS/`, `03_IMPLEMENTATION/`, and `04_GOVERNANCE/` are the staged execution loading paths used by agent workflows.

These trees are complementary, not competing:

- Product intent and canonical definitions live in `docs/`.
- Execution sequencing and stage-specific material live in `01_`–`04_`.
- When overlap exists, `docs/` provides the canonical definition and the numbered folders should reference, not redefine, that content.

## Historical documents

Historical roadmap or migration material must remain available for traceability, but it must be labelled clearly as non-canonical.

Required rules:

- Historical files must include a superseded notice at the top.
- Historical files must link to the current canonical replacement.
- Historical files must not redefine current phase names or scope without an explicit superseded banner.

## Update rules

When changing product behavior, workflow, governance, or architecture:

- update the canonical doc first,
- update dependent docs second,
- update historical notices or redirects if affected,
- add verification notes when behavior changes.
