# Mission Model

> **Canonical document.** For the full lifecycle state machine see
> `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` (Mission section).
> For the mission data format see `02_SPECIFICATIONS/Mission/MISSION_DSL.md`.

## Purpose

A Mission is the primary unit of engineering work in Yantra. It encapsulates
user intent, an execution plan, agent collaboration, artifact outputs, approval
gates, and verification status through a governed lifecycle. Everything an
engineer asks Yantra to do becomes a Mission.

## Layer Placement

```
Workspace Layer
  └── Mission Layer   ← this document
        └── Agent Layer (Planner, Executor, Verifier, ...)
        └── Knowledge Layer (context for planning)
        └── Capability Layer (tools agents invoke)
```

## Lifecycle States

```
Created → Planning → Waiting (approval) → Executing → Verifying → Completed
                                                  ↓             ↓
                                              Paused/Resuming  PartiallyCompleted
Terminal exception states: Blocked | Cancelled | Archived
```

See `STATE_MACHINES.md` for full transition table and trigger conditions.

## Components

| Component | Responsibility |
|---|---|
| Mission Dashboard | List, filter, and navigate all missions in the workspace |
| Mission Creator | Accept natural language, template, or DSL input; compile to MISSION_DSL |
| Mission Planner (Agent) | Decompose mission into execution graph of tasks |
| Execution Orchestrator | Schedule and dispatch tasks to agents; track graph state |
| Approval Gate | Surface plan to user when approval is required; block until approved |
| Mission Timeline | Real-time log, progress graph, and agent activity view |
| Verification Coordinator | Run acceptance criteria through the Verification Framework |
| Artifact Store | Persist and surface mission outputs |

## Approval Model

The Planner agent generates an execution plan. If the plan contains any
actions with a security boundary or privileged capability, it enters
`Waiting` state and the user must approve before execution proceeds.
Approval is explicit; it is never assumed or auto-granted.

## Verification Hook

On transition to `Verifying`, the Verification Coordinator evaluates each
`acceptance_criteria` entry against the relevant category from
`VERIFICATION_FRAMEWORK.md`. A `blocking` failure routes the mission back
to `Executing` via re-planning. `Completed` is only reachable when all
required criteria pass.

## Key Design Rules

- A mission without a defined objective and at least one acceptance criterion
  cannot leave `Created` state.
- Free-form natural language input is compiled to MISSION_DSL before execution;
  it never bypasses structured validation.
- Mission state is persisted durably; restarts resume from the last
  checkpointed state (`Paused → Resuming`).

## Cross-References

- State machine: `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`
- Mission DSL format: `02_SPECIFICATIONS/Mission/MISSION_DSL.md`
- Verification framework: `02_SPECIFICATIONS/Verifier/VERIFICATION_FRAMEWORK.md`
- Phase 3.3 deliverables: `docs/roadmap/PHASE_3_ROADMAP.md#phase-33--mission-center`
- Agent model: `docs/architecture/AGENT_MODEL.md`
