# Tool Protocol

## Purpose

Governs how Agents invoke Capabilities and receive results (see `TOOL_SCHEMA.md`, `CAPABILITY_SCHEMA.md`).

## Message Types

- `tool.request` — Agent -> Capability Layer: invoke a capability
- `tool.progress` — Capability Layer -> Agent: optional progress update for long-running tools
- `tool.result` — Capability Layer -> Agent: invocation result
- `tool.cancel_request` — Agent/Orchestrator -> Capability Layer: cancel an in-flight call

## Request/Response Lifecycle

1. Agent emits `tool.request` with `capability_id`, `arguments`; Capability Layer emits `ToolRequested`.
2. If `requires_approval` (per `CAPABILITY_SCHEMA.md`), the call blocks pending Autonomous Decision Policy resolution before execution begins.
3. Capability Layer executes, optionally streaming `tool.progress`.
4. Capability Layer emits `tool.result` and the corresponding `ToolFinished`/`ToolFailed` event.

## Error Semantics

- Error codes: `capability_not_found`, `invalid_arguments`, `permission_denied`, `execution_error`, `timeout`, `cancelled`.
- `execution_error` includes the underlying tool's native error message, never swallowed.

## Retry Rules

- Idempotent capabilities (e.g. `workspace.read`) may be retried automatically up to 2 times.
- Non-idempotent capabilities (e.g. `terminal.exec`, `git.commit`) are never auto-retried by the protocol layer — retry is a Task-level, agent-driven decision.

## Timeouts

- Every `tool.request` MUST specify or inherit a timeout; the Capability Layer enforces it server-side (not just client-side) per `01_FOUNDATION/SYSTEM_INVARIANTS.md` scenario 9.

## Cancellation

- `tool.cancel_request` triggers best-effort cancellation; the Capability Layer confirms via `tool.result` with `status: cancelled` once torn down.

## Streaming

- Streaming capabilities (e.g. a long build/test run) emit `tool.progress` frames with a monotonically increasing `sequence` number so consumers can detect drops.

## Version Negotiation

- `tool.request` carries `protocol_version`; the Capability Layer rejects requests using an unsupported MAJOR version with `error.code: protocol_unsupported`.
