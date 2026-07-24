> [!WARNING]
> Superseded historical document. This file is retained for traceability only and is not authoritative for current planning. Use `docs/roadmap/PHASE_3_ROADMAP.md` and the PRD as the canonical source.

# Phase 0.8 — Architecture Validation

A validation harness verifies the specification; it does not implement the runtime.

## Checks

- Load every schema.
- Validate every example payload.
- Parse every protocol.
- Resolve every reference.
- Check state machine completeness.
- Detect dependency cycles.
- Verify traceability links.
- Produce a health report.

## CI Gate

Every pull request changing specs must run this validation.
