# Legacy Retirement Audit

## Root Summary

- Root markdown files: 17
- docs markdown files: 72

## Root File Classification

| File | Action |
|---|---|
| `AGENTS.md` | KEEP_ADAPTER |
| `ARCHITECTURE_PRINCIPLES.md` | REMOVE_AFTER_PHASE_1_3 |
| `CLAUDE.md` | KEEP_ADAPTER |
| `CODE_OF_CONDUCT.md` | KEEP |
| `CONTRIBUTING.md` | KEEP |
| `FAILURE_MODEL.md` | REMOVE_AFTER_PHASE_1_3 |
| `GEMINI.md` | KEEP_ADAPTER |
| `KILO.md` | KEEP_ADAPTER |
| `MISSION.md` | REMOVE_AFTER_PHASE_1_3 |
| `OPENAI.md` | KEEP_ADAPTER |
| `OPENHANDS.md` | KEEP_ADAPTER |
| `README.md` | KEEP |
| `REPOSITORY_TREE.md` | KEEP |
| `ROO.md` | KEEP_ADAPTER |
| `ROOT_INDEX.md` | KEEP |
| `SECURITY.md` | KEEP |
| `SYSTEM_INVARIANTS.md` | REMOVE_AFTER_PHASE_1_3 |

## Recommendations

- Keep only true root entrypoints, community files, and agent adapters at the repository root.
- Retire compatibility-era root files after Phase 1.3 verification.
- Reduce `docs/` to explicit compatibility aliases only, then archive or remove duplicated legacy authored markdown.