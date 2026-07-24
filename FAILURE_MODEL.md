# Failure Model

Autonomous systems are defined as much by how they fail as by how they
succeed. This document enumerates known failure modes Yantra must anticipate
and states the intended behavior for each. It is a living document — new
failure modes discovered in production must be added here, not just patched
silently in code.

Every row below should eventually link to a specification, an ADR, or a
regression test that proves the described behavior.

| Failure | Expected Behavior |
|---|---|
| OpenAI API fails / rate-limits | AI Router fails over to the next configured provider per Mission's routing policy; Mission pauses (not aborts) if no provider is available, and resumes when one becomes reachable. |
| Claude / any single provider fails | Same as above — no subsystem may hard-code a single provider as a dependency. |
| Internet disappears | Router surfaces a `ProviderUnreachable` event; any locally available model (Ollama/LM Studio) becomes the fallback path if configured; Mission enters a `waiting-for-connectivity` state rather than failing outright. |
| SQLite corrupts | Memory Layer detects integrity failure on read, quarantines the corrupted store, and restores from the last known-good checkpoint/backup; the Mission that was in-flight is marked `degraded` and flagged for manual review rather than silently continuing on bad data. |
| Plugin crashes | Plugin System runs plugins in an isolated process/sandbox; a crash emits `PluginCrashed`, disables that plugin for the remainder of the Mission, and the Mission continues without it if the plugin was non-critical, or pauses if it was required. |
| Electron crashes | Core Engine (packages/*) is a separate process/runtime from the desktop shell; an Electron crash does not kill in-progress Mission execution in the engine. On relaunch, the UI reattaches to the running or checkpointed Mission state. |
| Windows restarts | All Mission state is checkpointed to durable storage on every state transition; on next launch, Yantra detects incomplete Missions and offers to resume them. |
| Git merge fails | Git capability surfaces the conflict as a structured artifact for the Coder/human to resolve; it never auto-resolves conflicts silently or force-pushes over conflicting history. |
| Terminal hangs | Every terminal/command capability invocation has an enforced timeout and is killable; a hang triggers `ToolTimedOut`, and the Orchestrator marks that task step failed rather than blocking the Mission indefinitely. |
| Model hallucinates | Verification Engine independently checks agent outputs against tests, schemas, or explicit acceptance criteria before an artifact is accepted; hallucinated claims that fail verification are rejected, not merged. |
| Tests never finish | Verification runs under a Mission-level timeout budget; exceeding it produces a `VerificationTimedOut` result treated as a failure, not a silent pass. |
| Memory becomes inconsistent | Memory Layer versions its records; conflicting writes are resolved through explicit conflict-resolution rules (last-writer-wins with audit trail, or flagged for review), never silently merged without a trace. |

## Design Consequences

These failure modes are why Yantra's core rejects a few tempting shortcuts:

- No subsystem may assume a single AI provider is always available (see AI
  Router layer).
- No subsystem may treat in-memory state as durable; Mission state must be
  checkpointed.
- No agent action may be irreversible by default (ties directly to
  `SYSTEM_INVARIANTS.md` #4).
- Every long-running operation needs an explicit timeout and a defined
  "stuck" behavior, because "wait forever" is not an acceptable failure mode
  in an autonomous system.

## Open Failure Modes (Unresolved)

This list intentionally starts incomplete. Additional failure modes will
surface during Phase 0/1 research and must be triaged into this table rather
than left as tribal knowledge:

- Behavior when two Missions concurrently request the same workspace lock.
- Behavior when a plugin's declared capability schema is malformed at load
  time.
- Behavior when a Verification Engine check itself throws an exception
  (verifier bug, not implementation bug).
