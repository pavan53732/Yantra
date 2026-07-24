# Repository Consolidation Audit

## Scope

This audit classifies repository documentation and identifies consolidation priorities before Phase 3.0 implementation.

## Canonical documents

- `docs/product/PRODUCT_REQUIREMENTS.md`
- `docs/product/PRODUCT_VISION.md`
- `docs/product/PRODUCT_PRINCIPLES.md`
- `docs/product/USER_JOURNEYS.md`
- `docs/product/UI_UX_GUIDELINES.md`
- `docs/product/DESIGN_SYSTEM.md`
- `docs/roadmap/PHASE_3_ROADMAP.md`
- `docs/roadmap/PHASE_4_ROADMAP.md`

## Historical documents

- `docs/roadmap/phase-0-research.md`
- `docs/roadmap/phase-1-product-definition.md`
- `docs/roadmap/phase-2-architecture.md`
- `docs/roadmap/phase-3-core-engine.md`
- `docs/roadmap/phase-4-desktop-application.md`
- `docs/roadmap/PHASE_0_5_SPECIFICATION_FREEZE.md`
- `docs/roadmap/PHASE_0_7_SPECIFICATION_RELEASE.md`
- `docs/roadmap/PHASE_0_8_ARCHITECTURE_VALIDATION.md`
- `docs/roadmap/PHASE_0_9_ARCHITECTURE_CERTIFICATION.md`

## Architecture documents

The following remain relevant but should be reviewed for duplication against the canonical PRD and roadmap:

- `docs/architecture/PRODUCT_ARCHITECTURE.md`
- `docs/architecture/WORKSPACE_MODEL.md`
- `docs/architecture/MISSION_MODEL.md`
- `docs/architecture/AGENT_MODEL.md`
- `docs/architecture/MEMORY_MODEL.md`
- `docs/architecture/PROVIDER_MODEL.md`
- `docs/architecture/SECURITY_MODEL.md`
- `docs/architecture/IPC_ARCHITECTURE.md`
- `docs/architecture/system-overview.md`
- `docs/architecture/event-driven-core.md`

## Duplicate and overlapping areas

- Product positioning appears in `README.md`, `PRODUCT_REQUIREMENTS.md`, `PRODUCT_VISION.md`, and `PRODUCT_PRINCIPLES.md`. This is acceptable as long as the PRD remains the canonical product definition and other docs defer to it.
- Roadmap stage naming appears in both `docs/roadmap/README.md` and `docs/roadmap/PHASE_3_ROADMAP.md`. The README should remain summary-level only.
- Architecture descriptions overlap across product architecture, workspace model, mission model, agent model, and legacy runtime docs. These should be retained only where they provide non-duplicative detail.

## Deferred cleanup

- Package-level responsibility mapping.
- Dependency graph review.
- Removal of stale generated artefacts.
- Pruning of any superseded runtime mirror material not yet proven obsolete.

## Conclusion

The repository is now organized around a canonical product definition, but additional consolidation is still advisable before Phase 3.0 implementation begins.
