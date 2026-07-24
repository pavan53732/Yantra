# Phase 0 — Research

**Goal:** De-risk technology and design choices before committing to any architecture.

## Scope

- Survey existing multi-agent orchestration frameworks and their failure modes.
- Evaluate AI provider APIs (OpenAI, Claude, OpenRouter, Qwen, Black Box AI) for capability, cost, and reliability characteristics relevant to the AI Router.
- Evaluate vector DB / memory backends (Qdrant, LanceDB, SQLite+embeddings) against the Memory Layer's consistency and recovery requirements from `FAILURE_MODEL.md`.
- Survey event-bus / message-queue options suitable for a single-machine desktop deployment that can later scale to a headless server.

## Exit Criteria

- Research findings written up in `docs/research/`.
- No architecture or code decisions are finalized in this phase — only options and trade-offs.
