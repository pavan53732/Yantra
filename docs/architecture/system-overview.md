# System Overview

Yantra is an AI Engineering Operating System (AEOS). It is not a chat client
with a language model attached; it is an engine that plans, executes,
verifies, and remembers engineering work, of which chat is one possible
front-end.

## Engine Flow

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

Each arrow above is a boundary that must be crossed through well-defined
contracts (see `docs/protocols/` and `docs/schemas/`), not ad hoc function
calls, once components live in separate packages.

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

- **Desktop UI** — Electron/React shell. A consumer of the engine, not part
  of it. Does not appear until Phase 4.
- **Mission Engine** — owns Mission lifecycle, goals, constraints,
  requirements, and completion criteria. See `MISSION.md`.
- **Multi-Agent Runtime** — spawns, schedules, and supervises agents
  executing an Execution Graph.
- **Capability Layer** — the set of tools/actions agents may invoke
  (filesystem, terminal, git, search, etc.), each with declared permissions.
- **Memory Layer** — durable knowledge and state, versioned and queryable;
  the only stateful agent role per `SYSTEM_INVARIANTS.md`.
- **AI Router** — abstracts model/provider selection (OpenAI, Claude,
  OpenRouter, local models) behind a single interface with failover.
- **Plugin System** — sandboxed extension points (including MCP-style
  plugins) that extend the Capability Layer without modifying core code.
- **Infrastructure** — process management, storage, logging, and the Event
  Bus transport itself.

Every layer must be independently testable and may only depend on the
layer(s) directly beneath it. See `ARCHITECTURE_PRINCIPLES.md` for the full
rule set.

## Long-Term Client Model

The engine (`packages/`) is designed to be reusable across multiple client
surfaces without modification:

| Client | Status |
|---|---|
| Desktop GUI (Electron) | Phase 4 |
| CLI | Planned |
| Headless server | Planned |
| CI/CD pipeline integration | Planned |
| IDE integration | Planned |
| Automation API | Planned |

No engine package may import from `apps/desktop` or assume an Electron
runtime is present.
