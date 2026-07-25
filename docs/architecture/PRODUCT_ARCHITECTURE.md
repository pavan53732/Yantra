Status: Canonical
Owner: Architecture
Source of Truth: Yes
Review Cycle: Quarterly

# Product Architecture

> **Canonical overview document.** For detailed state machines see
> `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`. For domain specifications
> see `02_SPECIFICATIONS/`. For system invariants see
> `01_FOUNDATION/SYSTEM_INVARIANTS.md`.

## Purpose

Yantra is a Windows desktop product composed of six layers, each with a
distinct responsibility. This document defines those layers, their components,
technology bindings, and dependency rules. It is the map from which all
more detailed architecture documents navigate.

## System Layer Model

```
┌──────────────────────────────────────────────────────────┐
│  Layer 1: Product Shell (Electron, React, Vite, TypeScript)         │
│  Single-window, dark-first, mission-oriented UI                     │
└──────────────────────────────────────────────────────────┘
                 ↓ IPC (contextBridge)
┌──────────────────────────────────────────────────────────┐
│  Layer 2: Workspace Layer                                           │
│  Workspace Manager, Project Indexer, Snapshot Engine               │
└──────────────────────────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────────┐
│  Layer 3: Mission Layer                                             │
│  Mission Engine, Orchestrator, Planner, Approval Gate              │
└──────────────────────────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────────┐
│  Layer 4: Agent Layer                                               │
│  Planner, Architect, Researcher, Executor, Reviewer,               │
│  Verifier, Documentation, Release                                  │
└──────────────────────────────────────────────────────────┘
        ↓ Memory/RAG            ↓ Tool invocation      ↓ AI calls
┌──────────────┐  ┌──────────────┐  ┌───────────────────┐
│ Layer 5:       │  │ Layer 5:       │  │ Layer 5:              │
│ Knowledge/     │  │ Capability     │  │ Provider Layer        │
│ Memory Layer   │  │ Layer          │  │ AI Router + Adapters  │
│ SQLite, Vectors│  │ File,Terminal, │  │ OpenAI,Claude,Gemini  │
│                │  │ Git, Search    │  │ Ollama,OpenRouter     │
└──────────────┘  └──────────────┘  └───────────────────┘
                 ↓ (all layers)
┌──────────────────────────────────────────────────────────┐
│  Layer 6: Verification Layer                                        │
│  10 verification categories, blocking/recoverable gate model       │
└──────────────────────────────────────────────────────────┘
```

## Technology Binding

| Layer | Primary Technologies |
|---|---|
| Product Shell | Electron, React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| Workspace | Node.js file system APIs, chokidar (file watching), simple-git |
| Mission | Custom mission engine (TypeScript), event bus |
| Agent | LangChain or custom agent loop (TypeScript), Provider abstraction |
| Knowledge/Memory | SQLite (better-sqlite3), vector index (local embeddings) |
| Capability | Node.js child_process, simple-git, custom tool adapters |
| Provider | OpenAI SDK, Anthropic SDK, Google AI SDK, Ollama client |
| Verification | Custom verifier framework (TypeScript) |

## Layer Dependency Rules

- Layers may only depend on layers **below** them in the stack above.
- No upward dependencies (e.g., Mission layer must not import Product Shell).
- Cross-layer communication flows through the Event Bus, not direct imports.
- The IPC boundary between Product Shell (renderer) and all lower layers
  (main process) is enforced by the contextBridge contract.

## Cross-References

- IPC boundary: `docs/architecture/IPC_ARCHITECTURE.md`
- Workspace: `docs/architecture/WORKSPACE_MODEL.md`
- Mission: `docs/architecture/MISSION_MODEL.md`
- Agents: `docs/architecture/AGENT_MODEL.md`
- Memory: `docs/architecture/MEMORY_MODEL.md`
- Providers: `docs/architecture/PROVIDER_MODEL.md`
- Security: `docs/architecture/SECURITY_MODEL.md`
- Verification: `02_SPECIFICATIONS/Verifier/VERIFICATION_FRAMEWORK.md`
- State machines: `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`

## See Also

- `WORKSPACE_MODEL.md`
- `MISSION_MODEL.md`
- `AGENT_MODEL.md`
- `PROVIDER_MODEL.md`
