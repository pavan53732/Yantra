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
11. `02_SPECIFICATIONS/`
12. `03_IMPLEMENTATION/`
13. `04_GOVERNANCE/`
14. `04_GOVERNANCE/Releases/`
15. `packages/`

If documents conflict, the PRD is the source of truth.

## Relationship between `docs/` and execution layers

- `docs/` is the canonical human-readable documentation tree.
- `01_` to `04_` are staged execution and support layers.
- Where overlap exists, `docs/` provides the canonical definition and the staged layers should reference, not redefine, that content.

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

See `docs/governance/DOCUMENTATION_MANIFEST.md` for the authoritative documentation registry.
