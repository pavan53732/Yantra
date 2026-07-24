# Product Requirements Document

## Purpose

This document is the canonical source of truth for Yantra as a product. It defines what Yantra is, who it is for, how it should behave, what principles constrain it, and how implementation work must be derived from product intent rather than from disconnected feature requests or infrastructure preferences.[cite:18][cite:21][cite:27]

## Product identity

Yantra is a Windows-native autonomous software engineering operating system that enables developers to plan, build, test, verify, package, and manage software through coordinated AI agents from a single engineering workspace.[cite:18]

Yantra is not a cross-platform IDE, a chat application, an Electron demo, or an AI wrapper. It is a Windows desktop product whose core value is mission-oriented software engineering through governed multi-agent execution.[cite:18][cite:30]

## Problem solved

Software engineering work is split across too many disconnected tools and workflows: planning in one place, editing in another, verification elsewhere, deployment elsewhere again, and AI support trapped inside isolated prompt windows. This fragmentation increases cognitive load, weakens traceability, and makes autonomous or semi-autonomous engineering unreliable and hard to supervise.[cite:21][cite:27]

Yantra solves this by creating a single engineering workspace where missions, agents, memory, verification, capabilities, and user approvals all participate in one operating model. The goal is not to expose internal engine complexity but to reduce engineering complexity for the user.[cite:18][cite:21]

## Product principles

- Windows desktop first.
- Product-first execution.
- Mission-first workflow design.
- AI-agent-first orchestration.
- Minimal UI.
- Local-first operation.
- Human-supervised autonomy.
- Verification before completion.
- Every feature must reduce engineering complexity for the user, not expose internal system complexity.[cite:18]

## UX direction

Yantra should not be designed as an IDE clone and should not be reduced to a chat application. The UI direction should be closer to Lovable, Linear, Raycast, Arc, and Vercel than to traditional docking-heavy IDEs.[cite:18]

The intended interface should be clean, dark-first, typography-first, spacious, lightly animated, mission-oriented, and low-noise. Cards and focused workflows should be preferred over crowded panel systems where appropriate.[cite:18]

The editor is a supporting tool, not the center of the product. The center of the product is the engineering workflow built around workspaces, missions, agents, and knowledge.[cite:18]

## Platform strategy

Yantra should target Windows only for the first release. Cross-platform ambitions should not shape the first product architecture in ways that increase complexity or reduce product quality. macOS and Linux can be addressed later once the Windows product is mature.[cite:18]

## Product modules

Navigation should remain focused and uncluttered. The primary top-level product modules should be:

- Home
- Workspace
- Missions
- Agents
- Knowledge
- Terminal
- Settings[cite:18]

Other concepts should remain contextual rather than becoming top-level clutter:

- Provider Manager inside Settings.
- Verification inside Mission details.
- Logs inside Mission details.
- Git inside Workspace.
- Memory inside Knowledge.[cite:18]

## Technical direction

### Desktop

- Electron
- Electron Builder[cite:18]

### Frontend

- React 19
- Vite
- TypeScript[cite:18]

### UI

- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion for lightweight, subtle motion[cite:18]

### Editor

- Monaco Editor
- External VS Code or Cursor handoff when needed[cite:18]

### State and data

- Zustand
- TanStack Query
- SQLite for local metadata
- IndexedDB as renderer cache where appropriate
- SQLite plus vector index for memory expansion in later Phase 3 work[cite:18]

## Phase 3 structure

### Phase 3.0 — Product Foundation

Goal: transform Yantra into a real Windows application.[cite:18]

Deliverables:

- Electron
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Electron Builder
- Secure IPC
- Windows packaging
- Installer
- Single-window shell
- Provider Manager
- Workspace Manager
- Navigation
- Settings[cite:18]

### Phase 3.1 — Workspace

Deliver:

- Workspace Home
- Recent Projects
- Open Folder
- Repository Explorer
- Search
- Git Status
- Terminal
- Monaco Editor
- File Tabs
- Project Indexing[cite:18]

### Phase 3.2 — AI Platform

Deliver:

- Provider abstraction
- OpenAI
- Claude
- Gemini
- Ollama
- OpenRouter
- Streaming
- Tool Calling
- Model selector
- API key management
- Cost tracking[cite:18]

### Phase 3.3 — Mission Center

Deliver:

- Mission Dashboard
- Create Mission
- Mission Templates
- Mission Timeline
- Live Logs
- Progress Graph
- Verification Status
- Execution Queue

This should become the application's home screen.[cite:18]

### Phase 3.4 — Knowledge

Deliver:

- Workspace Index
- Semantic Search
- Repository Memory
- Architecture Memory
- Conversation Memory
- RAG
- SQLite
- Vector Index[cite:18]

### Phase 3.5 — Agents

Deliver canonical agents:

- Planner
- Architect
- Researcher
- Executor
- Reviewer
- Verifier
- Documentation
- Release

Each agent should expose status, memory, capabilities, current task, logs, and history.[cite:18]

### Phase 3.6 — Production

Deliver:

- Windows Installer (`.exe`)
- Auto Update
- Code Signing
- Crash Reporting
- Release Pipeline
- Performance Profiling
- Production Build Optimisation[cite:18]

## Pre-implementation repository tasks

Before UI implementation begins, the repository should complete one final preparation stage:

1. Promote `PRODUCT_REQUIREMENTS.md` to the canonical specification.
2. Rewrite the root `README.md` so it presents Yantra as a product.
3. Create missing product and architecture documents.
4. Consolidate or archive duplicate specifications.
5. Restructure documentation under a unified `docs/` hierarchy while preserving historical material.
6. Lock the detailed Phase 3.0–3.6 roadmap with objectives, deliverables, dependencies, acceptance criteria, verification requirements, and out-of-scope boundaries.
7. Audit the repository for obsolete files, duplicate documentation, stale artifacts, dead code, and inconsistent naming.[cite:18]
