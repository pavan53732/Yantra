# Agent Model

> **Canonical document.** For agent lifecycle state machine see
> `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` (Agent section).
> For capability contracts see `02_SPECIFICATIONS/Capabilities/`.

## Purpose

Yantra's agent model defines the canonical set of specialised engineering
agents, their roles, capability boundaries, memory access rights, and
communication patterns. Agents are first-class product concepts — not
prompt wrappers. Each agent has an explicit contract.

## Layer Placement

```
Mission Layer
  └── Agent Layer   ← this document
        └── Capability Layer (tools agents are permitted to invoke)
        └── Knowledge Layer (memory agents can read/write)
        └── Provider Layer (AI models agents use)
```

## Canonical Agent Roster

| Agent | Role | Capabilities Allowed | Memory Access |
|---|---|---|---|
| **Planner** | Decompose mission into execution graph | Read workspace, read specs | Read-only |
| **Architect** | Design system and component structures | Read specs, read code | Read-only |
| **Researcher** | Gather information, search knowledge | Web search, read files, semantic search | Read-only |
| **Executor** | Implement tasks: write code, run commands | File write, terminal, git | Read + Write (scoped) |
| **Reviewer** | Review code and artifact quality | Read files, read test results | Read-only |
| **Verifier** | Run acceptance criteria against verification framework | Run tests, static analysis, build | Read-only |
| **Documentation** | Write and update documentation | File write (docs only) | Read + Write (docs scope) |
| **Release** | Package, sign, and publish releases | Build, package, deploy (with approval) | Read-only |

## Agent Lifecycle

```
Spawning → Idle → Busy → Terminating → Terminated
                    └──> Crashed → (escalated to Orchestrator)
```

The Memory Agent is the sole stateful role (`Idle ↔ Busy` cycles).
All other agents are ephemeral: `Spawning → Busy → Terminating → Terminated`
once per Task. See `STATE_MACHINES.md` (Agent section).

## Capability Boundaries

- Every agent has an explicit `allowed_capabilities` list.
- An agent may never invoke a capability not in its allowed list.
- Capability invocations with side effects (file write, terminal, git)
  require the parent Mission to have that capability in its
  `constraints.allowed_capabilities`.
- Privileged capabilities require human approval before first invocation
  in a mission. See `SECURITY_MODEL.md`.

## Inter-Agent Communication

- Agents communicate via the Event Bus — never via direct function calls
  across agent boundaries.
- The Orchestrator dispatches Tasks to agents and collects results.
- Agents do not call other agents directly; they emit events and the
  Orchestrator routes.
- See `02_SPECIFICATIONS/Architecture/event-driven-core.md` for event
  bus contract.

## Agent Visibility (Phase 3.5 UI)

Each agent exposes in the UI: status, current task, memory snapshot,
capability list, active tool invocations, logs, and history.

## Cross-References

- State machine: `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`
- Capability contracts: `02_SPECIFICATIONS/Capabilities/`
- Event bus: `02_SPECIFICATIONS/Architecture/event-driven-core.md`
- Provider model: `docs/architecture/PROVIDER_MODEL.md`
- Phase 3.5 deliverables: `docs/roadmap/PHASE_3_ROADMAP.md#phase-35--agents`
