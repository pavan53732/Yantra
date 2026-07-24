# Verifier Protocol

## Purpose

Governs how the Orchestrator submits completed Task outputs to the Verification Engine, and how results feed back into the Mission lifecycle (see `VERIFICATION_FRAMEWORK.md`).

## Message Types

- `verify.request` — Orchestrator -> Verification Engine: verify an Artifact/Task output
- `verify.result` — Verification Engine -> Orchestrator: pass/fail/inconclusive per category
- `verify.inconclusive_notice` — Verification Engine -> Orchestrator: a category timed out or couldn't reach a determination

## Request/Response Lifecycle

1. Orchestrator emits `verify.request` referencing an Artifact and required verification categories.
2. Verification Engine runs each category's checks (see `VERIFICATION_FRAMEWORK.md`) independently.
3. Verification Engine emits `verify.result` with a per-category outcome and overall status, plus `VerificationPassed`/`VerificationFailed` events.

## Error Semantics

- `VerificationFailed` MUST include which category failed and why — never a bare boolean.
- The Verifier never patches code to force a pass (Invariant 12) — a failing check is always reported, never silently fixed.

## Retry Rules

- Flaky categories (e.g. performance benchmarks with noise) may be retried up to 2 times before being marked `inconclusive` rather than `failed`.

## Timeouts

- Each verification category has its own configurable timeout (see `VERIFICATION_FRAMEWORK.md`); a category timeout produces `verify.inconclusive_notice`, distinct from `failed`.

## Cancellation

- `verify.request` may be cancelled if the underlying Mission is cancelled; partial category results already computed are still recorded for audit purposes.

## Streaming

- Long verification runs (e.g. full test suites) may stream category-level `verify.result` frames incrementally rather than waiting for all categories to finish.

## Version Negotiation

- `protocol_version` negotiation follows the same pattern as other protocols; an incompatible Verification Engine version blocks Mission completion rather than silently skipping verification.
