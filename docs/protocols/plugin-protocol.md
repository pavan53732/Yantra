# Plugin Protocol

## Purpose

Governs how the Plugin System loads, sandboxes, and communicates with third-party/MCP plugins (see `PLUGIN_SCHEMA.md`).

## Message Types

- `plugin.register_request` — Plugin -> Plugin System: announce capabilities on startup
- `plugin.register_ack` — Plugin System -> Plugin: registration confirmed or rejected
- `plugin.invoke_request` — Plugin System -> Plugin: invoke a provided capability
- `plugin.invoke_result` — Plugin -> Plugin System: capability result
- `plugin.crash_notice` — Plugin System -> Orchestrator: plugin process died

## Request/Response Lifecycle

1. Plugin starts in its sandbox, emits `plugin.register_request` with its manifest (`PLUGIN_SCHEMA.md`).
2. Plugin System validates checksum/sandbox requirements, emits `plugin.register_ack`.
3. Capability invocations flow as `plugin.invoke_request` / `plugin.invoke_result`, wrapping the same semantics as `tool-protocol.md` at the Capability Layer boundary.
4. On process crash, Plugin System detects via heartbeat loss, emits `plugin.crash_notice` and `PluginCrashed`, sets `status: crashed`.

## Error Semantics

- Error codes: `checksum_mismatch`, `sandbox_violation`, `capability_conflict` (two plugins claim the same `capability_id`), `crashed`.
- `capability_conflict` is rejected at registration time — first-registered wins, conflicting plugin registration fails loudly.

## Retry Rules

- A crashed plugin is not automatically restarted mid-Mission; it is disabled for the remainder of the Mission (per `FAILURE_MODEL.md` scenario 5) and may be manually re-enabled for future Missions.

## Timeouts

- `plugin.invoke_request` inherits the timeout of the underlying capability call (see `tool-protocol.md`).

## Cancellation

- `plugin.invoke_request` supports cancellation identically to `tool.cancel_request`.

## Streaming

- Plugins providing long-running capabilities may stream progress via the same `tool.progress` mechanism, relayed through the Plugin System.

## Version Negotiation

- `protocol_version` is part of the registration manifest; incompatible plugins are registered but left `disabled` with a clear reason.
