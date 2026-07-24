# Agent Protocol

## Purpose

Governs how the Orchestrator (Multi-Agent Runtime) spawns, assigns work to, and retires Agents (see `AGENT_SCHEMA.md`, `TASK_SCHEMA.md`).

## Message Types

- `agent.spawn_request` — Orchestrator -> Runtime: spawn an Agent for a Task
- `agent.spawn_ack` — Runtime -> Orchestrator: Agent spawned, includes `agent_id`
- `agent.task_assign` — Orchestrator -> Agent: assign a Task
- `agent.task_result` — Agent -> Orchestrator: Task output (Artifact refs + status)
- `agent.heartbeat` — Agent -> Runtime: liveness signal
- `agent.terminate_request` — Runtime -> Agent: graceful shutdown
- `agent.terminated` — Agent -> Runtime: shutdown complete

## Request/Response Lifecycle

1. Orchestrator emits `agent.spawn_request` with `task_id`, `role`, `capability_grants`.
2. Runtime spawns the process/sandbox, emits `agent.spawn_ack` with `agent_id` and emits `AgentSpawned` event.
3. Orchestrator sends `agent.task_assign`.
4. Agent works, optionally emits `tool.request` (see `tool-protocol.md`) during execution.
5. Agent emits `agent.task_result` on completion or failure.
6. Runtime terminates the agent (`agent.terminate_request` -> `agent.terminated`) unless `role: memory`.

## Error Semantics

- Errors are typed: `spawn_failed`, `task_timeout`, `capability_denied`, `provider_unavailable`, `crashed`.
- `capability_denied` is a hard error — never silently downgraded; the Task moves to `failed`.
- `crashed` MUST emit `AgentCrashed` and is contained per `01_FOUNDATION/SYSTEM_INVARIANTS.md` scenario 5-pattern (isolated, doesn't cascade).

## Retry Rules

- `spawn_request` retries up to 3 times with exponential backoff (1s, 4s, 16s) on transient Runtime errors.
- `task_assign` is not retried automatically — a Task that fails is either retried per its own `retry_policy` (see `TASK_SCHEMA.md`) or routed to re-planning.

## Timeouts

- Every Task carries `timeout_seconds`; the Runtime enforces this independently of the Agent's own behavior and force-terminates on expiry, emitting `task_timeout`.

## Cancellation

- `agent.terminate_request` may be sent mid-task for Mission pause/cancel; the Agent MUST persist partial progress via `MemoryUpdated` before acknowledging termination where feasible.

## Streaming

- Long-running Tasks MAY emit `agent.heartbeat` with progress payloads; this is advisory, not authoritative — task state is authoritative via `agent.task_result`.

## Version Negotiation

- The protocol version is negotiated at `agent.spawn_ack` time via a `protocol_version` field; the Runtime rejects spawn requests from an Orchestrator on an incompatible MAJOR version.
