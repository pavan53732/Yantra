Status: Historical
Superseded By: `docs/roadmap/PHASE_3_ROADMAP.md`

> [!WARNING]
> Superseded historical document. This file is retained for traceability only and is not authoritative for current planning. Use `docs/roadmap/PHASE_3_ROADMAP.md` and the PRD as the canonical source.

# Phase 4 — Desktop Application

**Goal:** Build the Electron-based Desktop UI as one client of the already-working Core Engine.

## Scope

- Implement `apps/desktop` on top of the stable engine API from Phase 3.
- The Desktop UI subscribes to Event Bus events for real-time Mission visibility; it does not embed engine logic.
- Package and distribute the Windows-native build.

## Exit Criteria

- Desktop app fully functional using only the public engine API/Event Bus — no direct imports of internal engine packages that bypass the Mission API.
- The same Core Engine remains independently usable via CLI, headless server, CI/CD, and IDE integrations, per the long-term vision in `01_FOUNDATION/ARCHITECTURE_PRINCIPLES.md`.
