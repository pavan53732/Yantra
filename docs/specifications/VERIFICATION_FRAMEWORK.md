# Verification Framework

## Purpose

Rather than a single monolithic verifier, Yantra defines distinct verification
categories, each independently invokable, so a Mission can require exactly
the categories relevant to its acceptance criteria (`MISSION_DSL.md`). This
document specifies each category's inputs, outputs, pass/fail criteria,
confidence semantics, and whether its failures are recoverable or blocking.

## Categories

| Category | Inputs | Outputs | Pass/Fail Criteria | Confidence | Failure Type |
|----------|--------|---------|----------------------|------------|---------------|
| Architecture | Artifact diff, `LAYERED_ARCHITECTURE.md` | Violations list | No layer-boundary or dependency-direction violations | Deterministic (1.0 or 0.0 per rule) | Blocking |
| Security | Artifact diff, dependency manifest | Vulnerability/finding list | No critical/high findings | Probabilistic (tool-dependent) | Blocking for critical; Recoverable for medium/low |
| Correctness | Artifact, acceptance criteria, test suite | Test results | All required tests pass | Deterministic (test pass/fail) | Blocking |
| Performance | Artifact, benchmark suite | Benchmark results vs. baseline | Within configured regression threshold | Probabilistic (noise-tolerant, may retry) | Recoverable (unless threshold is a hard constraint) |
| Maintainability | Artifact, static analysis config | Complexity/lint findings | Below configured complexity/lint thresholds | Deterministic per rule | Recoverable |
| Compatibility | Artifact, target environment matrix | Compatibility matrix results | No breakage on required targets | Deterministic | Blocking |
| Accessibility | UI Artifact, a11y ruleset | a11y findings | No critical a11y violations | Deterministic per rule | Recoverable (Blocking if Mission declares a11y as a hard requirement) |
| Documentation | Artifact, doc coverage rules | Coverage report | Required public interfaces documented | Deterministic | Recoverable |
| Licensing | Dependency manifest | License compatibility report | No incompatible licenses introduced | Deterministic | Blocking |
| Packaging | Build output | Build/package validation results | Package builds and installs cleanly | Deterministic | Blocking |

## Common Structure

Every category verifier, regardless of category, exposes the same envelope:

```json
{
  "schema_version": "1.0",
  "verification_id": "uuid",
  "task_id": "uuid",
  "category": "architecture | security | correctness | performance | maintainability | compatibility | accessibility | documentation | licensing | packaging",
  "status": "passed | failed | inconclusive",
  "confidence": "number (0-1)",
  "findings": [ { "severity": "critical | high | medium | low | info", "description": "string", "location": "string | null" } ],
  "failure_type": "blocking | recoverable | null",
  "duration_ms": "number"
}
```

## Rules

- `status: inconclusive` is distinct from `failed` (e.g. a benchmark that
  timed out) — see `verifier-protocol.md`.
- A `blocking` failure in any required category prevents the Mission from
  reaching `Completed`; it may still reach `PartiallyCompleted` if other
  Artifacts passed.
- A `recoverable` failure surfaces as a finding but does not, by itself,
  prevent completion unless the Mission's `acceptance_criteria`
  (`MISSION_DSL.md`) explicitly elevates that category to blocking for this
  Mission.
- The Verifier never edits the Artifact to resolve a finding (Invariant 12) —
  findings are always routed back to re-planning/re-execution or surfaced to
  the user.
- Confidence below a configurable threshold (default 0.7) for probabilistic
  categories (Security, Performance) automatically downgrades `passed` to
  `inconclusive` rather than a false-positive pass.

## Extensibility

New categories may be added as a MINOR addition to the category enum,
provided they conform to the common envelope above and are registered with an
explicit blocking/recoverable default.
