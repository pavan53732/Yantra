# Yantra

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Yantra is an AI Engineering Operating System (AEOS)** — not a chat app with an LLM behind it.

Instead of:

```
User -> Chat -> LLM -> Answer
```

Yantra is architected as:

```
Mission -> Mission Planner -> Execution Graph -> Multi-Agent Orchestrator
        -> Capability Engine -> Verification Engine -> Knowledge & Memory -> Result
```

The chat interface is just one client of this engine. The same engine is designed to be reachable via CLI, headless server, CI/CD pipelines, and IDE integrations — see `ARCHITECTURE_PRINCIPLES.md`.

## Foundational Documents

- [`ARCHITECTURE_PRINCIPLES.md`](./ARCHITECTURE_PRINCIPLES.md) — layered architecture, roadmap phases, quality philosophy, event-driven core
- [`SYSTEM_INVARIANTS.md`](./SYSTEM_INVARIANTS.md) — non-negotiable rules every agent and subsystem must follow
- [`FAILURE_MODEL.md`](./FAILURE_MODEL.md) — anticipated failure classes and required system responses
- [`MISSION.md`](./MISSION.md) — the Mission lifecycle that all work in Yantra flows through

## The Specification-First Rule

> No code may be added until the corresponding subsystem has an approved specification.

See `docs/specifications/` and `docs/adr/` for how specifications and architectural decisions are recorded.

## Roadmap

Yantra is built in five phases — notably, Electron and the Desktop UI don't appear until Phase 4:

1. Phase 0 — Research
2. Phase 0.5 — Engineering Specification Freeze ([drafting complete](./docs/roadmap/PHASE_0_5_SPECIFICATION_FREEZE.md), pending review)
3. Phase 1 — Product Definition
4. Phase 2 — Architecture
5. Phase 3 — Core Engine
6. Phase 4 — Desktop Application

See [`docs/roadmap/`](./docs/roadmap/) for the full breakdown of each phase.

## Repository Layout

```
Yantra/
├── docs/
│   ├── architecture/     # System architecture docs
│   ├── specifications/   # Subsystem specifications (required before code)
│   ├── research/         # Research notes and technology evaluations
│   ├── adr/              # Architecture Decision Records
│   ├── api/              # Public engine API documentation
│   ├── schemas/          # Mission, Event, Artifact schemas
│   ├── protocols/        # Event Bus and inter-layer protocols
│   ├── examples/         # Worked Mission examples
│   ├── decisions/        # Non-architectural decision log
│   └── roadmap/          # Phase-by-phase roadmap
├── apps/
│   └── desktop/          # Electron Desktop UI (Phase 4 — a client of the engine)
├── packages/             # Core Engine packages (mission, planner, orchestrator, ...)
├── tools/                # Developer tooling
├── scripts/              # Build/dev/deploy scripts
├── tests/                # Cross-package integration tests
├── resources/            # Static resources/assets
└── examples/             # Example Missions and usage
```

## Getting Started

*Documentation is in progress. This repository is currently in Phase 0/1 (Research and Product Definition). See the roadmap for details.*

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details, and note the specification-first rule above before submitting implementation PRs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Desktop client built with [Electron](https://www.electronjs.org/) (Phase 4)
- Powered by multi-provider LLM and agent infrastructure
