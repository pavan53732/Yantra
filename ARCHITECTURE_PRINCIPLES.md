# Architecture Principles

Yantra is an **AI Engineering Operating System (AEOS)** — not a chat application
with an AI feature bolted on. Every architectural decision must be made in
service of that identity.

## The Core Shift

Yantra is not:

```
User -> Chat -> LLM -> Answer
```

Yantra is:

```
Mission
  -> Mission Planner
  -> Execution Graph
  -> Multi-Agent Orchestrator
  -> Capability Engine
  -> Verification Engine
  -> Knowledge & Memory
  -> Result
```

The chat interface is one client of this engine, not the engine itself.
The desktop application (Electron) is one surface among several possible
surfaces: Desktop GUI, CLI, headless server, CI/CD pipeline integration, IDE
plugin, or automation API. None of these surfaces may leak into the core
engine's design.

## The Governing Rule

> **No code may be added until the corresponding subsystem has an approved
> specification.**

This is a specification-first workflow. It exists because autonomous,
multi-agent systems accumulate architectural drift faster than any other kind
of software — every agent that writes code is also a source of entropy if it
is not constrained by a written contract. A specification is the contract.

Practical enforcement:

- Every package in `packages/` must have a corresponding document in
  `docs/specifications/` before its first line of implementation code is
  merged.
- Pull requests that introduce a new subsystem without a linked specification
  must be rejected in review.
- Specifications may be incomplete drafts in Phase 0/1, but they must exist
  and be reviewable before Phase 3 (Core Engine) implementation begins on that
  subsystem.

## Layered Architecture

```
+-----------------------------+
| Desktop UI                  |
+-----------------------------+
| Mission Engine               |
+-----------------------------+
| Multi-Agent Runtime          |
+-----------------------------+
| Capability Layer             |
+-----------------------------+
| Memory Layer                 |
+-----------------------------+
| AI Router                    |
+-----------------------------+
| Plugin System                |
+-----------------------------+
| Infrastructure               |
+-----------------------------+
```

Rules for this stack:

1. Every layer must be independently testable without booting the layers
   above it.
2. A layer may only depend on the layer(s) directly beneath it. No layer may
   reach upward.
3. No layer may assume Electron, a specific chat UI, or any particular
   presentation surface exists. The Desktop UI layer is a consumer, never a
   dependency, of anything below it.
4. Cross-layer communication happens through the Event Bus (see
   `docs/architecture/event-driven-core.md`), not direct method calls,
   wherever the interaction crosses a subsystem boundary.

## Quality Philosophy

Every subsystem in Yantra must satisfy all of the following, evaluated
independently of any specific technology choice:

- **Reliable** — behaves correctly under expected and adverse conditions.
- **Deterministic where possible** — same inputs produce same outputs unless
  non-determinism is an explicit, documented design choice (e.g. LLM
  sampling).
- **Observable** — internal state and decisions can be inspected without
  modifying behavior.
- **Recoverable** — can resume or roll back cleanly after failure.
- **Replaceable** — can be swapped for an alternative implementation without
  rewriting its consumers.
- **Testable** — has a test surface that does not require the full system to
  be running.
- **Extensible** — new capabilities can be added without modifying existing,
  stable code.
- **Secure** — assumes hostile input and untrusted plugins by default.
- **Documented** — has a specification, not just inline comments.
- **Versioned** — changes are tracked and backward compatibility is an
  explicit decision, not an accident.

These qualities outlive any framework, library, or model provider Yantra
currently depends on.

## Roadmap Phases

See `docs/roadmap/README.md` for the full five-phase roadmap. The short
version: **Electron does not appear until Phase 4.** The engine is designed,
specified, and built before any desktop shell is written around it.
