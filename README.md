# Yantra

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An **AI Engineering Operating System (AEOS)** — an autonomous platform for planning, orchestrating, building, testing, and managing software with intelligent multi-agent workflows.

Yantra is not an AI app. It is a layered, event-driven engine that powers autonomous engineering workflows. The desktop GUI is one client of this engine; the same engine is reusable through CLI, headless server, CI/CD pipelines, IDE integrations, and automation APIs.

## Architecture

Yantra is organized as a layered, independently testable architecture:

```
┌─────────────────────────────┐
│ Desktop UI                  │
├─────────────────────────────┤
│ Mission Engine              │
├─────────────────────────────┤
│ Multi-Agent Runtime         │
├─────────────────────────────┤
│ Capability Layer            │
├─────────────────────────────┤
│ Memory Layer                │
├─────────────────────────────┤
│ AI Router                   │
├─────────────────────────────┤
│ Plugin System               │
├─────────────────────────────┤
│ Infrastructure              │
└─────────────────────────────┘
```

Every layer communicates through an **Event Bus**, enabling extensibility and observability.

## Core Principles

- **Mission-driven**: Everything revolves around Missions — goals, constraints, requirements, plans, execution, verification, and artifacts.
- **Specification-first**: No code may be added until the corresponding subsystem has an approved specification.
- **Invariant-enforced**: Agents cannot execute without a Mission. Every tool execution must be observable. Every decision must be explainable. Every modification must be reversible. Every workflow is resumable.
- **Failure-aware**: The system anticipates and handles failures at every layer — model failures, infrastructure failures, plugin crashes, and more.

## Project Structure

```
Yantra/
├── docs/
│   ├── architecture/
│   ├── specifications/
│   ├── research/
│   ├── adr/
│   ├── api/
│   ├── protocols/
│   ├── schemas/
│   ├── examples/
│   ├── decisions/
│   └── roadmap/
├── apps/
│   └── desktop/
├── packages/
│   ├── core/
│   ├── mission/
│   ├── planner/
│   ├── orchestrator/
│   ├── runtime/
│   ├── memory/
│   ├── router/
│   ├── verifier/
│   ├── capabilities/
│   ├── plugins/
│   ├── telemetry/
│   ├── workspace/
│   ├── terminal/
│   ├── git/
│   ├── ui/
│   └── shared/
├── tools/
├── scripts/
├── tests/
├── resources/
└── examples/
```

## Quality Philosophy

Every subsystem should satisfy:

- **Reliable** — operates correctly under expected conditions
- **Deterministic where possible** — reproducible results
- **Observable** — every action is traceable
- **Recoverable** — failures can be detected and recovered from
- **Replaceable** — subsystems can be swapped independently
- **Testable** — every layer has independent test coverage
- **Extensible** — new capabilities plug in without modifying core
- **Secure** — least privilege, bounded capabilities
- **Documented** — every subsystem has specifications and invariants
- **Versioned** — APIs and interfaces are versioned

## Getting Started

*Documentation is in progress. This repository is currently in early planning stages.*

See the [Roadmap](docs/roadmap/) for the five-phase development plan.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.