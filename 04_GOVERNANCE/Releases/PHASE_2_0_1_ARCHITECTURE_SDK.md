Owner: Governance
Status: Active
Authority: Repository Governance
Review Frequency: Quarterly
Last Updated: 2026-07-25

# Phase 2.0.1 — Architecture SDK

## Scope
Generate the internal `@yantra/sdk` package from canonical specifications.

## Deliverables
- Generated internal SDK package at `packages/sdk/`
- TypeScript interfaces
- JSON Schemas
- Zod validators
- Runtime event definitions
- Error enums
- Capability interfaces
- Contract tests
- CI workflow for SDK generation gate

## Compliance Rules
- Specifications are the single source of truth.
- Runtime packages must consume generated contracts only.
- No handwritten duplicated contract definitions outside the SDK.
- Generated artifacts must be reproducible.

## Completion Criteria
- SDK generation succeeds from `02_SPECIFICATIONS/`
- Generated spec index is deterministic
- Tests pass
- CI gate validates generation output presence

## Related Documents

- `docs/governance/DOCUMENTATION_GOVERNANCE.md`
- `.ai/QUALITY_GATES.md`
