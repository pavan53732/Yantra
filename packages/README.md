# Packages

Shared packages and libraries that make up the Yantra engine — the AI
Engineering Operating System (AEOS) core. Every package here is independently
testable and communicates with other layers only through the
[Event Bus](../docs/architecture/EVENT_BUS.md), per
[`ARCHITECTURE_PRINCIPLES.md`](../docs/architecture/ARCHITECTURE_PRINCIPLES.md).

## Packages

| Package | Layer | Status |
|---------|-------|--------|
| [`@yantra/core`](./core) | Infrastructure | planned |
| [`@yantra/shared`](./shared) | Infrastructure | planned |
| [`@yantra/telemetry`](./telemetry) | Infrastructure | planned |
| [`@yantra/plugins`](./plugins) | Plugin System | planned |
| [`@yantra/router`](./router) | AI Router | planned |
| [`@yantra/memory`](./memory) | Memory Layer | planned |
| [`@yantra/capabilities`](./capabilities) | Capability Layer | planned |
| [`@yantra/terminal`](./terminal) | Capability Layer | planned |
| [`@yantra/git`](./git) | Capability Layer | planned |
| [`@yantra/workspace`](./workspace) | Capability Layer | planned |
| [`@yantra/runtime`](./runtime) | Multi-Agent Runtime | planned |
| [`@yantra/orchestrator`](./orchestrator) | Multi-Agent Runtime | planned |
| [`@yantra/planner`](./planner) | Mission Engine | planned |
| [`@yantra/mission`](./mission) | Mission Engine | planned |
| [`@yantra/verifier`](./verifier) | (cross-cutting, invoked by Orchestrator) | planned |
| [`@yantra/ui`](./ui) | Desktop UI (shared primitives) | planned |

See [`docs/architecture/LAYERED_ARCHITECTURE.md`](../docs/architecture/LAYERED_ARCHITECTURE.md)
for the full layer diagram and dependency rules.
