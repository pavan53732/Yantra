# Desktop Application

This directory is reserved for the shipped Windows desktop product boundary.

## Purpose

- Host the Electron application shell.
- Own the user-facing product experience.
- Separate shipped product code from reusable packages.

## Status

- Reserved boundary for Phase 3.0.
- No implementation code added during repository consolidation.

## Relationship to packages

Reusable engine and domain logic should remain in `packages/`. The desktop app should depend on those packages rather than absorbing their responsibilities.
