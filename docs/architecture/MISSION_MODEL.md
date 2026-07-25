Status: Canonical
Owner: Architecture
Source of Truth: Yes
Review Cycle: Quarterly

# Mission Model

A mission is the primary unit of intentional engineering work in Yantra. It represents a bounded goal with explicit scope, planning, approval, execution, verification, and completion states.

## Purpose

The mission model ensures work is structured, reviewable, and traceable instead of being reduced to ad hoc prompts or disconnected actions.

## Mission lifecycle

A mission should move through these logical stages:

1. Defined
2. Planned
3. Approved
4. Executing
5. Verifying
6. Completed or Blocked

## Responsibilities

- Capture the goal, scope, and relevant repository context.
- Link planning outputs to execution intent.
- Preserve approval checkpoints before risky steps.
- Record execution progress and important events.
- Attach verification outcomes before completion.

## Core attributes

A mission should include at least:

- a clear objective,
- scope and constraints,
- planning artifacts,
- approval state,
- execution state,
- verification state,
- final outcome summary.

## Boundaries

A mission is not the same as a raw task list or chat thread. It is a governed execution container that coordinates multiple system capabilities toward one engineering outcome.

## Verification expectations

Mission behavior should be verified for lifecycle transitions, scope preservation, approval enforcement, interruption handling, and completion criteria.

## See Also

- `WORKSPACE_MODEL.md`
- `AGENT_MODEL.md`
- `VERIFICATION_MODEL.md`
- `PRODUCT_ARCHITECTURE.md`
