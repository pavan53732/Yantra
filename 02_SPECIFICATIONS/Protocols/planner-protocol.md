# Planner Protocol

## Purpose

Governs how the Mission Engine requests a Plan/Execution Graph from the Planner (see `MISSION_SCHEMA.md`, `EXECUTION_GRAPH_SCHEMA.md`, `WORKFLOW_SCHEMA.md`).

## Message Types

- `planner.plan_request` — Mission Engine -> Planner: produce an Execution Graph for a Mission
- `planner.plan_result` — Planner -> Mission Engine: resulting Execution Graph
- `planner.replan_request` — Orchestrator/Mission Engine -> Planner: revise the graph mid-Mission (e.g. after `VerificationFailed`)
- `planner.replan_result` — Planner -> caller: revised Execution Graph

## Request/Response Lifecycle

1. Mission Engine emits `planner.plan_request` with the Mission's Goals/Constraints/Requirements.
2. Planner matches against known `WORKFLOW_SCHEMA.md` templates or plans from scratch, emits `PlannerFinished` and `planner.plan_result`.
3. On verification failure or blocked execution, `planner.replan_request` triggers a scoped revision (not necessarily a full re-plan).

## Error Semantics

- Error codes: `unsatisfiable_constraints`, `no_matching_workflow`, `planning_timeout`.
- `unsatisfiable_constraints` surfaces to the user/operator rather than silently relaxing constraints.

## Retry Rules

- Planning is retried once automatically on `planning_timeout`; repeated timeout escalates to `Mission Blocked`.

## Timeouts

- Default planning timeout: 120s for template-matched workflows, 600s for from-scratch planning.

## Cancellation

- `planner.plan_request` may be cancelled if the Mission is cancelled by the user before planning completes.

## Streaming

- Planning is not a streaming operation; it emits one result. Progress may be surfaced via `PlannerFinished`'s absence rather than intermediate frames.

## Version Negotiation

- `protocol_version` is included in both request/result; incompatible MAJOR versions cause the Mission Engine to reject the Planner as unavailable, falling back to the AI Router's failure semantics.
