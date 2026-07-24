# AGENT

## Repository Identity
- Name: Yantra
- Branch: main
- Purpose: AI Engineering Operating System with specification-first runtime architecture

## Operating Rules
- Repository structure is frozen.
- Canonical specifications live under `02_SPECIFICATIONS/`.
- Shared contracts must come from `@yantra/sdk`.
- Runtime infrastructure belongs in `@yantra/core`.
- Mission orchestration belongs in `@yantra/mission`.
- Do not introduce handwritten duplicate shared contracts outside the SDK.
- Structural repository changes require governance approval.

## Current Implemented Runtime Layers
- `@yantra/sdk`
- `@yantra/core`
- `@yantra/mission`

## Current Phase Status
- Phase 2.0.1 — Architecture SDK: implemented
- Phase 2.0.2 — Runtime Kernel: implemented
- Phase 2.0.3 — Mission Runtime: implemented, verification hardening pending
- Phase 2.0.4+ — pending

## Agent Expectations
- Report only verified actions as completed.
- Distinguish between planned, designed, implemented, and verified work.
- Keep architecture aligned with specifications and governance.
- Prefer additive implementation over structural reorganization.
