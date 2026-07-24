# IPC Protocol

## Purpose

Governs inter-process communication between the Yantra engine process (`packages/*`) and any UI client process (e.g. the Electron main/renderer split in `apps/desktop`), keeping the engine UI-agnostic per `ARCHITECTURE_PRINCIPLES.md`.

## Message Types

- `ipc.subscribe_request` — Client -> Engine: subscribe to Event Bus events for a Mission (or all Missions)
- `ipc.event` — Engine -> Client: a forwarded Event Bus event
- `ipc.command_request` — Client -> Engine: issue a command (create Mission, pause, cancel, approve)
- `ipc.command_result` — Engine -> Client: command acknowledgement/result
- `ipc.disconnect_notice` — either side: clean or unclean disconnect

## Request/Response Lifecycle

1. Client connects and emits `ipc.subscribe_request` with an optional `mission_id` filter.
2. Engine begins forwarding matching Event Bus events as `ipc.event` frames.
3. Client issues `ipc.command_request` for user-initiated actions; Engine validates against the Autonomous Decision Policy before executing anything requiring approval.
4. Engine responds with `ipc.command_result`.

## Error Semantics

- Error codes: `unauthorized`, `mission_not_found`, `command_rejected` (policy violation), `engine_unavailable`.
- A UI client crash or disconnect (per `FAILURE_MODEL.md` scenario 6, Electron crash) MUST NOT affect an in-progress Mission — the engine continues running headlessly and the client resumes its subscription on reconnect.

## Retry Rules

- `ipc.subscribe_request` reconnects automatically with exponential backoff on transient disconnects; the client replays missed events using the last received `event_id` as a resume cursor.
- `ipc.command_request` is not automatically retried — duplicate command submission risk is handled via client-supplied idempotency keys.

## Timeouts

- No implicit timeout on `ipc.subscribe_request` (it's a long-lived stream); `ipc.command_request` defaults to a 30s timeout.

## Cancellation

- Clients may cancel their own subscription (`ipc.unsubscribe_request`) or a specific in-flight command.

## Streaming

- `ipc.event` is inherently a streaming channel; delivery is at-least-once with `event_id` used for client-side deduplication.

## Version Negotiation

- `protocol_version` is negotiated at connect time; the Engine supports at least N-1 client protocol versions to allow independent client/engine upgrade cadences.
