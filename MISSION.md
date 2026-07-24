# Mission Model

A **Mission** is the fundamental unit of work in Yantra. Everything the
system does — from a one-line chat request to a multi-day autonomous
refactor — is represented as a Mission. Chat is simply one of several ways to
create a Mission; it is not a separate code path.

## Mission Lifecycle

```
Mission
  -> Goals
  -> Constraints
  -> Requirements
  -> Plan
  -> Execution Graph
  -> Agent Tasks
  -> Verification
  -> Artifacts
  -> Completion
```

### Mission

The top-level object: a durable record with an id, a stated intent, and a
status (`created`, `planning`, `executing`, `verifying`, `waiting`,
`degraded`, `completed`, `failed`, `cancelled`).

### Goals

What the Mission is trying to achieve, expressed as concrete, checkable
outcomes rather than vague intent. A Mission may have multiple goals.

### Constraints

Hard limits the Mission must respect: budget, time, allowed tools, forbidden
files/paths, provider restrictions, security boundaries. Constraints are
enforced by the Orchestrator and Capability Layer, not left to agent
discretion.

### Requirements

Concrete, verifiable conditions derived from Goals and Constraints. This is
the bridge between "what the user wants" and "what a Planner can turn into
steps."

### Plan

Produced by the Mission Planner: an ordered or partially-ordered set of steps
that satisfy the Requirements. The Plan is a reviewable artifact, not a
hidden chain-of-thought.

### Execution Graph

The Plan compiled into a directed graph of Agent Tasks with explicit
dependencies, enabling parallel execution where steps are independent and
correct sequencing where they are not.

### Agent Tasks

Individual units of work assigned to specific agents (Coder, Architect,
Verifier, etc.), each scoped to the capabilities that agent role is permitted
to use (see `SYSTEM_INVARIANTS.md`).

### Verification

Every Agent Task's output is checked against its Requirements by the
Verification Engine before it is accepted into the Mission's artifact set.
Verification failures route back to planning/execution, not straight to
completion.

### Artifacts

The durable outputs of a Mission: code changes, test results, generated
documents, decisions, logs. Artifacts are what persist after a Mission ends
and what feed Memory.

### Completion

A Mission completes when all Requirements are verified and satisfied, or is
explicitly marked failed/cancelled with a recorded reason. There is no silent
"it just stopped" state.

## Mission Creation Surfaces

A Mission can be created from:

- The chat interface (a user message is parsed into goals/constraints).
- The CLI (`yantra mission create ...`).
- A headless server API call.
- A CI/CD pipeline trigger.
- An IDE integration action.

All of these converge on the same Mission object and the same
Planner -> Orchestrator -> Verification pipeline. No surface gets a shortcut
that bypasses planning or verification.

## Relationship to the Event Bus

Mission state transitions are the backbone of the events described in
`docs/architecture/event-driven-core.md` (`MissionCreated`, `PlannerFinished`,
`ExecutionStarted`, ..., `MissionCompleted`). The Mission object is the
subject of nearly every event Yantra emits.
