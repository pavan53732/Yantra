# IPC Architecture

> **Canonical document.** For privilege levels see
> `docs/architecture/SECURITY_MODEL.md`. For event bus see
> `02_SPECIFICATIONS/Architecture/event-driven-core.md`.

## Purpose

Yantra's Electron IPC architecture defines how the renderer process (React UI)
communicates with the main process (Node.js, privileged desktop capabilities).
All renderer access to privileged APIs flows through audited IPC contracts
defined in the preload bridge. Direct Node.js or file system access from the
renderer is forbidden.

## Process Architecture

```
┌────────────────────┐       contextBridge        ┌────────────────────┐
│  Renderer Process     │ ←─────────────── │  Main Process        │
│  React + Vite + TS    │   preload.ts bridge   │  Node.js privileged  │
│  sandboxed            │                       │  file, terminal, git │
└────────────────────┘                       └────────────────────┘
```

## IPC Channel Inventory

| Channel | Direction | Description | Privilege |
|---|---|---|---|
| `workspace:open` | Renderer → Main | Open a workspace folder | Low |
| `workspace:index` | Main → Renderer | Indexing progress events | Low |
| `mission:create` | Renderer → Main | Create a new mission | Low |
| `mission:update` | Main → Renderer | Mission state change events | Low |
| `agent:dispatch` | Main internal | Dispatch task to agent | Privileged |
| `capability:invoke` | Main internal | Invoke a capability tool | Privileged |
| `terminal:exec` | Renderer → Main | Execute terminal command (approval required) | High |
| `terminal:output` | Main → Renderer | Stream terminal output | Low |
| `fs:read` | Renderer → Main | Read file content | Low |
| `fs:write` | Renderer → Main | Write file (approval required) | High |
| `git:status` | Renderer → Main | Read git status | Low |
| `git:commit` | Renderer → Main | Commit (approval required) | High |
| `provider:complete` | Main internal | AI provider completion request | Medium |
| `provider:stream` | Main → Renderer | Stream AI response tokens | Low |
| `settings:get` | Renderer → Main | Read settings | Low |
| `settings:set` | Renderer → Main | Write settings | Low |

## contextBridge Contract Rules

- The preload script exposes **only** the channels listed above.
- No raw `ipcRenderer` or `ipcMain` is exposed to the renderer.
- All channel names are string-typed enums — no dynamic channel names.
- High-privilege channels (`terminal:exec`, `fs:write`, `git:commit`) check
  for an active human approval token before dispatching to Main.
- The renderer never receives raw file system handles or process references.

## Security Constraints

- `nodeIntegration: false` on all BrowserWindow instances.
- `contextIsolation: true` on all BrowserWindow instances.
- `sandbox: true` on all BrowserWindow instances.
- CSP headers set on all renderer pages.
- webSecurity: never disabled.

## Cross-References

- Security model: `docs/architecture/SECURITY_MODEL.md`
- Event bus: `02_SPECIFICATIONS/Architecture/event-driven-core.md`
- Phase 3.0 deliverables: `docs/roadmap/PHASE_3_ROADMAP.md#phase-30--product-foundation`
