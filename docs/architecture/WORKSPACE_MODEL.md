# Workspace Model

> **Canonical document.** For state machine details see
> `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` (Workspace section).
> For invariants see `01_FOUNDATION/SYSTEM_INVARIANTS.md`.

## Purpose

A Workspace is the primary operational container in Yantra. Every engineering
action — mission creation, agent execution, knowledge indexing, provider
configuration, verification — occurs within the context of an active Workspace.

## Layer Placement

```
Product Shell
  └── Workspace Layer   ← this document
        └── Mission Layer
              └── Agent + Knowledge + Capability Layers
```

## Components

| Component | Responsibility |
|---|---|
| Workspace Manager | Create, open, close, switch workspaces |
| Project Indexer | Crawl and index repository files into the knowledge layer |
| Repository Explorer | File tree, search, git status surface |
| Workspace State Store | Persist workspace metadata, recent missions, provider config |
| Snapshot Engine | Write-before-commit snapshots for reversibility (Invariant 4) |
| Terminal | Scoped terminal sessions attached to the workspace root |
| Monaco Editor | File editing surface — a tool within the workspace, not the product |

## State Model

Workspace file state machine: `Clean → Dirty → Snapshotting → Snapshotted → Dirty`.
Every write or delete transitions `Clean → Dirty` and triggers a snapshot
before the operation is durable. See `STATE_MACHINES.md` (Workspace section).

## Persistence

- Workspace metadata persisted to SQLite via the Knowledge layer.
- Snapshots stored in a workspace-local `.yantra/snapshots/` directory.
- Provider configuration stored encrypted; keys never written to plain disk.

## Key Design Rules

- One active workspace per application session.
- Workspace switching requires saving or discarding pending mission state.
- The editor and terminal are subordinate tools; the mission workflow is the
  primary workspace experience.
- Project indexing runs on open and on file change events; it is non-blocking.

## Cross-References

- State machine: `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`
- Invariants: `01_FOUNDATION/SYSTEM_INVARIANTS.md`
- Phase 3.1 deliverables: `docs/roadmap/PHASE_3_ROADMAP.md#phase-31--workspace`
- Knowledge layer: `docs/architecture/MEMORY_MODEL.md`
