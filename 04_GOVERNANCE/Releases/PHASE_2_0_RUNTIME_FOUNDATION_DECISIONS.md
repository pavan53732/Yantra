# Phase 2.0 — Runtime Foundation Decisions

## Approved Decisions

### Repository Freeze
- Approved.
- No directory restructuring.
- No moving canonical documents.
- No new top-level folders.
- Structural changes require an ADR and repository-manifest version bump.

### Minimum Viable Yantra (MVY)
Smallest complete engineering loop:
- User
- Mission
- Planner
- Coordinator
- Coding Agent
- Filesystem
- Git
- Verifier
- Result

MVY components:
- Desktop: Electron, React, Tailwind, Monaco, Terminal
- Runtime: Mission Engine, Planner, Coordinator, one Coding Agent, Verifier
- Capabilities: Filesystem, Terminal, Git, Node, Package Manager
- Memory: SQLite, Session Memory
- Provider: OpenAI

### Agent Strategy
- Hybrid architecture.
- Keep multi-agent runtime architecture.
- Start operationally with a single execution agent behind Planner and Coordinator.

### Provider Strategy
Implementation order:
1. OpenAI
2. OpenRouter
3. Ollama
4. Anthropic
5. Gemini

### Capability Strategy
- Built-in core capabilities behind stable interfaces.
- Plugin-compatible later.
- Do not require plugins for core functionality in first release.

### UI Strategy
- Build Electron shell immediately.
- Keep UI thin.
- UI consumes runtime events and avoids embedded business logic.

## Phase 2.0 Workstreams

### Workstream A — Architecture SDK
- TypeScript interfaces
- JSON Schemas
- Validators
- Event definitions
- Error enums
- Capability interfaces

### Workstream B — Runtime Kernel
- packages/core
- Event bus
- Dependency injection
- Lifecycle
- Service registry
- Configuration
- Logging

### Workstream C — Mission Runtime
- Mission Engine
- Planner
- Coordinator
- Execution pipeline

### Workstream D — Capability Layer
- Filesystem
- Terminal
- Git
- Node
- Package Manager

### Workstream E — Desktop
- Electron shell
- React app
- Monaco editor
- Embedded terminal
- Mission view
- Activity log

### Workstream F — Verification
- Contract validation
- Mission verification
- Test orchestration
- Evidence collection

## Success Criterion
A user can create a mission such as: “Create a new TypeScript CLI project with tests.”
Yantra should plan, execute, create files, run commands, initialize Git, run tests, verify results, and present evidence of success.
