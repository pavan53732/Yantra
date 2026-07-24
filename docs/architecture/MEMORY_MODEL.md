# Memory Model

> **Canonical document.** For memory synchronisation state machine see
> `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` (Memory Synchronisation
> section). For knowledge graph schema see `02_SPECIFICATIONS/KnowledgeGraph/`.

## Purpose

Yantra's memory system provides persistent, queryable context for agents
across missions. It is local-first, workspace-scoped, and structured into
distinct memory types to prevent context pollution between layers.

## Layer Placement

```
Mission + Agent Layers
  └── Knowledge / Memory Layer   ← this document
        └── SQLite (structured storage)
        └── Vector Index (semantic search)
        └── File Index (workspace files)
```

## Memory Types

| Type | Description | Storage | Retention |
|---|---|---|---|
| **Repository Memory** | Indexed file content, symbols, and AST summaries | Vector Index + SQLite | Workspace lifetime |
| **Architecture Memory** | Decisions, ADRs, component relationships | SQLite | Workspace lifetime |
| **Conversation Memory** | Recent agent conversation turns | SQLite (rolling window) | Configurable window |
| **Workspace Context** | Active files, recent edits, git status | In-memory + SQLite | Session |
| **Mission Memory** | Per-mission artifacts, outputs, verification results | SQLite | Mission lifetime |

## Storage Bindings

- **SQLite** — structured metadata, mission records, agent logs, workspace
  state. Local file at `<workspace-root>/.yantra/memory.db`.
- **Vector Index** — semantic embeddings for repository files and
  architecture documents. Local file at `<workspace-root>/.yantra/vectors/`.
- No cloud sync in Phase 3. All storage is local-first.

## RAG Pipeline (Phase 3.4)

```
User intent / agent query
  → Query embedding
  → Vector similarity search → Top-K chunks retrieved
  → Structured SQLite lookup (metadata enrichment)
  → Context assembly
  → Agent prompt with retrieved context
```

## Synchronisation State

Memory sync state machine: `Synced → Pending → Syncing → Synced`
with `ConflictDetected → Resolving` branch. Conflicts are never
auto-resolved silently. See `STATE_MACHINES.md` (Memory Synchronisation).

## Key Design Rules

- Memory is workspace-scoped. One workspace cannot read another's memory.
- Agents have read access to all memory types within their workspace scope.
- Only the Executor and Documentation agents have write access to memory,
  and only within their capability scope.
- Vector index rebuilds are triggered by project indexing events.

## Cross-References

- State machine: `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`
- Knowledge graph schema: `02_SPECIFICATIONS/KnowledgeGraph/`
- Workspace model: `docs/architecture/WORKSPACE_MODEL.md`
- Phase 3.4 deliverables: `docs/roadmap/PHASE_3_ROADMAP.md#phase-34--knowledge`
