Status: Canonical
Owner: Architecture
Source of Truth: Yes
Review Cycle: Quarterly

# Workspace Model

The workspace is the durable operating context for Yantra. It anchors repository state, active missions, memory, knowledge access, and user continuity across sessions.

## Purpose

A workspace gives the user one stable place to open a repository, understand current engineering state, launch or resume missions, and review outputs without rebuilding context manually.

## Responsibilities

- Bind Yantra to a repository or working folder.
- Track current and recent mission context.
- Expose workspace-level navigation, search, and state.
- Coordinate access to memory, knowledge, verification, and agent activity.
- Restore relevant user context when the workspace is reopened.

## Core state

A workspace should model at least the following state categories:

- repository identity and location,
- indexing and discovery state,
- active mission references,
- recent activity and history,
- workspace settings and provider preferences,
- verification and review visibility.

## User-facing behavior

The workspace should make it easy to:

- open and switch repositories,
- inspect current status,
- resume interrupted work,
- navigate from repository context to mission context,
- review outputs and verification evidence.

## Boundaries

The workspace is not itself the mission runtime, memory engine, or provider implementation. It is the orchestration surface that exposes those capabilities coherently to the user.

## Verification expectations

Workspace behavior should be verified for restoration, navigation consistency, mission continuity, and safe handling of repository-level state transitions.

## See Also

- `MISSION_MODEL.md`
- `MEMORY_MODEL.md`
- `PRODUCT_ARCHITECTURE.md`
