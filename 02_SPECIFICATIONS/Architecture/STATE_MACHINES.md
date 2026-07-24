# State Machines

Every subsystem with a lifecycle has an explicit, finite state machine.
Ambiguous or implicit state transitions are treated as a specification bug.
Every transition below MUST emit a corresponding event on the
[Event Bus](../architecture/EVENT_BUS.md) (Invariant 2).

## Mission

```
Created
  |
Planning
  |
Waiting        (blocked on external input/approval)
  |
Executing
  |
Paused         (interrupted: crash, restart, network loss - Invariant 5)
  |
Resuming
  |
Verifying
  |
Completed
  |
Archived
```

Additional terminal/exception states: `Blocked` (unsatisfiable constraints or
repeated verification failure), `Cancelled` (explicit user/operator action),
`PartiallyCompleted` (some but not all required Artifacts verified).

| From | To | Trigger |
|------|----|---------|
| Created | Planning | Goals + Constraints set, `planner.plan_request` sent |
| Planning | Waiting | Plan requires approval (see `AUTONOMOUS_DECISION_POLICY.md`) |
| Planning | Executing | Plan approved / no approval required |
| Executing | Paused | Crash, restart, network loss, explicit pause |
| Paused | Resuming | Resume triggered (auto or manual) |
| Resuming | Executing | Resume completed, Execution Graph state reconciled |
| Executing | Verifying | All graph nodes report `succeeded` |
| Verifying | Completed | All required Artifacts pass verification |
| Verifying | Executing | `VerificationFailed`, routed back to re-planning/re-execution |
| Verifying | PartiallyCompleted | Some but not all Artifacts verified, no further progress possible |
| Any | Blocked | Unsatisfiable constraints / repeated failure |
| Any | Cancelled | Explicit user/operator cancellation |
| Completed / PartiallyCompleted / Blocked / Cancelled | Archived | Retention period elapsed or explicit archive |

## Agent

```
Spawning -> Idle -> Busy -> Terminating -> Terminated
                       |
                     Crashed
```

- `Idle` <-> `Busy` cycles only for the Memory Agent (the sole stateful role, Invariant 7); all other roles go `Spawning -> Busy -> Terminating -> Terminated` once per Task.
- `Crashed` is reachable from `Busy` only, and always emits `AgentCrashed`/`ToolFailed`.

## Tool (Capability Invocation)

```
Requested -> Running -> Succeeded
                |    \-> Failed
                |    \-> TimedOut
                \-> Cancelled
```

- `TimedOut` and `Failed` are distinct terminal states (see `01_FOUNDATION/SYSTEM_INVARIANTS.md` scenario 9) — never collapsed.

## Plugin

```
Registered -> Enabled -> Disabled
                 |
              Crashed -> Disabled
```

- `Crashed` always transitions to `Disabled` for the remainder of the Mission (`01_FOUNDATION/SYSTEM_INVARIANTS.md` scenario 5); re-enabling requires a new Mission or explicit operator action.

## Workspace

```
Clean -> Dirty -> Snapshotting -> Snapshotted -> Dirty
                                        |
                                   RolledBack -> Clean
```

- Every `write`/`delete`/`move` transitions `Clean -> Dirty` and triggers a `Snapshotting -> Snapshotted` cycle before the operation is considered durable (Invariant 4: reversibility).

## Terminal Session

```
Starting -> Running -> Completed
               |    \-> Failed
               |    \-> TimedOut
               \-> Killed
```

- `TimedOut` triggers forced process kill per `01_FOUNDATION/SYSTEM_INVARIANTS.md` scenario 9; `Killed` is reserved for explicit cancellation.

## Model Provider

```
Registered -> Healthy <-> Degraded -> Unavailable
                                          |
                                      Healthy (after successful health check)
```

- `Unavailable` causes the AI Router to skip the provider (`01_FOUNDATION/SYSTEM_INVARIANTS.md` scenarios 1-2) until a `provider.health_check` reports `Healthy` again.

## Memory Synchronization

```
Synced -> Pending -> Syncing -> Synced
             |            \-> ConflictDetected -> Resolving -> Synced
             \-> Degraded (store unavailable) -> Syncing (on recovery)
```

- `ConflictDetected` emits `MemoryConflict` and requires explicit resolution (see `KNOWLEDGE_GRAPH_SCHEMA.md` merge/conflict rules) — never auto-resolved silently.
