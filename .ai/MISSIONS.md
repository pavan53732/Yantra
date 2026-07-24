# Missions — Yantra Mission Execution Protocol

## Purpose

This file defines how AI agents load, validate, and execute mission packs.
It references the canonical mission contracts in the specification layer.
Do not execute any mission without first reading the canonical contracts below.

## Canonical Mission Contracts

Before executing any mission, load:

- `02_SPECIFICATIONS/Mission/MISSION_DSL.md` — the structured mission format
  that all missions must conform to before execution
- `02_SPECIFICATIONS/Verifier/VERIFICATION_FRAMEWORK.md` — the 10 verification
  categories and their pass/fail criteria that missions reference in
  `acceptance_criteria`
- `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` — the Mission lifecycle
  state machine: Created → Planning → Waiting → Executing → Verifying →
  Completed, including all terminal and exception states

## Mission Format (Summary)

Every mission must contain at minimum:

```yaml
mission:
  objective: string          # required — what success looks like, one sentence
  acceptance_criteria:       # required — at least one entry
    - id: string
      description: string
      verification_category: string   # must match a category in VERIFICATION_FRAMEWORK.md
  constraints:
    allowed_capabilities: [string]
    timeout_seconds: number
    security_boundary: string
  priority: low | normal | high | urgent
  deliverables:
    - type: code | doc | report | artifact
      description: string
```

A mission with no `objective` or zero `acceptance_criteria` entries cannot
be executed. Return it to the user for completion before proceeding.

See `02_SPECIFICATIONS/Mission/MISSION_DSL.md` for full format including
resources, budget, timeout, and compilation-from-free-text rules.

## Mission Pack Location

Mission packs live in `missions/`. Each pack is a directory containing:

- `mission.yaml` — the mission definition in MISSION_DSL format
- `context/` — supporting files and references (optional)
- `artifacts/` — expected output location, created during execution (optional)

## Execution Lifecycle

1. Load mission pack from `missions/<mission-name>/`.
2. Validate `mission.yaml` against `MISSION_DSL.md` rules. Reject if invalid.
3. Confirm all `acceptance_criteria[].verification_category` entries are valid
   categories from `VERIFICATION_FRAMEWORK.md`.
4. Confirm all quality gates in `.ai/QUALITY_GATES.md` pass.
5. Execute the mission state machine:
   `Created → Planning → [Waiting for approval if required] → Executing
   → Verifying → Completed`
6. At Verifying: run each acceptance criterion through its verifier category.
   Blocking failures prevent `Completed` and route to re-planning.
7. Report outcomes: artifact locations, verification envelope per criterion,
   confidence scores, and any unresolved findings.

## Actions Requiring Human Approval

These actions always require explicit human approval before proceeding:

- File modification or deletion in any non-scratch area
- Terminal execution of build, test, or deployment commands
- Package installation or removal
- Git operations (commit, push, merge, rebase)
- Any action touching the `security_boundary` declared in the mission

## Failure Handling

| Failure Type | Handling |
|---|---|
| `blocking` verification failure | Route back to re-planning. Cannot complete. |
| `recoverable` failure | Surface as finding. Does not prevent completion unless mission elevates it. |
| `inconclusive` result | Never treated as `passed`. Retry or escalate. |
| Mission `Blocked` state | Unsatisfiable constraints or repeated failure. Escalate to user. |
| Mission `Cancelled` | Explicit user/operator action. Archive and report final state. |
