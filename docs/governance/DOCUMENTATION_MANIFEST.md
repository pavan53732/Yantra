# Documentation Manifest

Status: Canonical
Owner: Repository Governance
Source of Truth: Yes
Review Cycle: Quarterly
Related:
- `docs/governance/DOCUMENTATION_GOVERNANCE.md`
- `README.md`
- `AGENTS.md`
- `docs/roadmap/PHASE_3_ROADMAP.md`

> This manifest is the authoritative registry for Yantra documentation. Any new documentation added to the repository must be classified here or within the appropriate canonical index before being considered part of the maintained documentation set.

## Purpose

This manifest defines the documentation control plane for the Yantra repository. It explains what documentation exists, how it is classified, where canonical authority lives, how historical material is handled, and how contributors and AI agents should navigate the repository documentation system.

## Documentation Principles

- Canonical product intent is defined in the product documentation set.
- Architecture, specifications, implementation guidance, governance, and release documents must remain traceable to the canonical product set.
- Historical material is preserved for traceability but must not override canonical guidance.
- Generated outputs are not canonical unless explicitly promoted and classified.
- New documentation must be classified before it becomes part of the maintained repository knowledge system.

## Documentation Taxonomy

### Canonical

Canonical documents define the current repository truth for product, architecture, roadmap, governance, or instructions.

### Supporting

Supporting documents extend, explain, or operationalise canonical documents without replacing them.

### Historical

Historical documents preserve prior decisions, phases, audits, or migration states and must be labelled clearly.

### Generated

Generated outputs are artifacts produced by tools, audits, or workflows. They are useful for evidence but are not authoritative unless explicitly adopted.

### Archived

Archived material is retained only for traceability and should not be treated as current guidance.

## Canonical Documentation Chain

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
13. `docs/governance/DOCUMENTATION_GOVERNANCE.md`
14. `04_GOVERNANCE/`
15. `04_GOVERNANCE/Releases/`
16. `packages/*/README.md`
17. Generated outputs and reports

## Product Documentation Registry

Owner: Product
Review Cadence: Quarterly

Canonical:
- `docs/product/PRODUCT_REQUIREMENTS.md`
- `docs/product/PRODUCT_VISION.md`
- `docs/product/PRODUCT_PRINCIPLES.md`
- `docs/product/USER_JOURNEYS.md`
- `docs/product/UI_UX_GUIDELINES.md`
- `docs/product/DESIGN_SYSTEM.md`

## Architecture Registry

Owner: Architecture
Review Cadence: Quarterly

Canonical:
- `docs/architecture/PRODUCT_ARCHITECTURE.md`
- `docs/architecture/WORKSPACE_MODEL.md`
- `docs/architecture/MISSION_MODEL.md`
- `docs/architecture/AGENT_MODEL.md`
- `docs/architecture/PROVIDER_MODEL.md`
- `docs/architecture/MEMORY_MODEL.md`
- `docs/architecture/KNOWLEDGE_MODEL.md`
- `docs/architecture/VERIFICATION_MODEL.md`
- `docs/architecture/SECURITY_MODEL.md`
- `docs/architecture/IPC_ARCHITECTURE.md`
- `docs/architecture/AI_PROVIDER_CONTRACT.md`

Supporting:
- `02_SPECIFICATIONS/`
- `docs/specifications/`

## Roadmap Registry

Owner: Product and Architecture
Review Cadence: Per phase

Canonical:
- `docs/roadmap/PHASE_3_ROADMAP.md`
- `docs/roadmap/PHASE_4_ROADMAP.md`

Historical:
- `docs/roadmap/phase-0-research.md`
- `docs/roadmap/phase-1-product-definition.md`
- `docs/roadmap/phase-2-architecture.md`
- `docs/roadmap/phase-3-core-engine.md`
- `docs/roadmap/phase-4-desktop-application.md`
- `docs/roadmap/PHASE_0_5_SPECIFICATION_FREEZE.md`
- `docs/roadmap/PHASE_0_7_SPECIFICATION_RELEASE.md`
- `docs/roadmap/PHASE_0_8_ARCHITECTURE_VALIDATION.md`
- `docs/roadmap/PHASE_0_9_ARCHITECTURE_CERTIFICATION.md`

## Governance Registry

Owner: Repository Governance
Review Cadence: Quarterly

Canonical:
- `docs/governance/DOCUMENTATION_GOVERNANCE.md`
- `docs/governance/DOCUMENTATION_MANIFEST.md`
- `.ai/QUALITY_GATES.md`

Supporting:
- `04_GOVERNANCE/`
- `docs/canonical/`

## Development Registry

Owner: Engineering
Review Cadence: Quarterly

Supporting:
- `docs/development/CONTRIBUTING.md`
- `docs/development/CODING_STANDARDS.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`

## Release Registry

Owner: Repository Governance
Review Cadence: Per release boundary

Supporting:
- `04_GOVERNANCE/Releases/README.md`
- `04_GOVERNANCE/Releases/REPOSITORY_LIFECYCLE.md`
- `04_GOVERNANCE/Releases/*.md`
- `docs/releases/PHASE_2_CLOSEOUT.md`

## Package Documentation Registry

Owner: Package Maintainers
Review Cadence: When package responsibilities change

Supporting:
- `packages/core/README.md`
- `packages/mission/README.md`
- `packages/sdk/README.md`
- `packages/desktop/README.md`
- `packages/capabilities/README.md`
- `packages/verification/README.md`
- `apps/desktop/README.md`

## Generated Outputs Registry

Owner: Generating workflow
Review Cadence: As generated

Generated:
- `output/`
- generated audits, reports, and validation artifacts not explicitly promoted into canonical docs

## Historical Documentation Registry

Owner: Repository Governance
Review Cadence: When superseded

Historical:
- labelled historical roadmap files under `docs/roadmap/`
- migration and consolidation reports when retained for traceability
- prior release or readiness records under `04_GOVERNANCE/Releases/` that no longer define the current phase

## AI Instruction Registry

Owner: Repository Governance
Review Cadence: Quarterly

Canonical:
- `AGENTS.md`
- `.ai/BOOTSTRAP.md`
- `.ai/LOADING_ORDER.md`
- `.ai/RULES.md`
- `.ai/MISSIONS.md`
- `.ai/QUALITY_GATES.md`

Supporting adapters:
- `AGENT.md`
- `CLAUDE.md`
- `GEMINI.md`
- `OPENAI.md`
- `ROO.md`
- `KILO.md`
- `OPENHANDS.md`

## Documentation Ownership

- Product documentation: Product
- Architecture documentation: Architecture
- Governance documentation: Repository Governance
- Package documentation: Package maintainers
- Generated outputs: Generating workflow owner

## Review Schedule

- Canonical product and architecture: quarterly or when behavior changes
- Governance: quarterly and before major release boundaries
- Package documentation: when package scope changes
- Historical labels: whenever a canonical replacement is introduced

## Change Control Policy

- Canonical documents must be updated before dependent supporting documents when behavior changes.
- New structural documentation should not be added unless it fills a verified gap in the current canonical system.
- Documentation freeze means restructuring stops; documentation evolves only alongside implementation or governance change.

## Rules for Adding New Documents

- Prefer updating an existing canonical or supporting document first.
- Create a new document only when the topic cannot be safely integrated into the current structure.
- Classify the new document here or in an approved canonical index.
- Add navigation links from the nearest canonical parent.

## Rules for Superseding Documents

- Add the canonical replacement first.
- Mark the previous document as historical or superseded.
- Link the old document to the replacement.
- Preserve traceability unless explicit removal is verified safe.

## Rules for Archiving Documents

- Do not delete historical material without evidence.
- Use clear historical or superseded status markers.
- Keep archived material reachable from the relevant registry or index.
