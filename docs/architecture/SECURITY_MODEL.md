# Security Model

> **Canonical document.** For IPC privilege boundaries see
> `docs/architecture/IPC_ARCHITECTURE.md`. For capability contracts see
> `02_SPECIFICATIONS/Capabilities/`. For system invariants see
> `01_FOUNDATION/SYSTEM_INVARIANTS.md`.

## Purpose

Yantra operates with human-supervised autonomy. The security model defines
trust boundaries, capability approval requirements, IPC privilege levels,
secret management rules, and the threat surface for a local-first
Windows desktop product with AI agent execution.

## Trust Boundary Model

```
[ User ] → approves privileged actions
    ↓
[ Product Shell / IPC Boundary ] → enforced by contextBridge
    ↓
[ Main Process ] → privileged: file system, terminal, git, network
    ↓
[ Agent Capability Layer ] → scoped to mission allowed_capabilities
    ↓
[ External: AI Providers, Package Registry, Git Remotes ]
```

## Privileged Action Approval Matrix

| Action | Approval Required | Scope |
|---|---|---|
| File write / delete | Yes (first time per mission) | Workspace root |
| Terminal command execution | Yes (per command class) | Workspace root |
| Package install / remove | Yes (always) | Workspace |
| Git commit / push / merge | Yes (always) | Repository |
| Deployment / publish | Yes (always) | Declared security boundary |
| Read-only file access | No | Workspace root |
| Semantic search / indexing | No | Workspace root |
| AI provider API call | No (cost tracked) | Provider boundary |

## IPC Privilege Levels

- **Renderer process:** sandboxed, no Node.js access, communicates only via
  `contextBridge` exposed API. See `IPC_ARCHITECTURE.md`.
- **Main process:** privileged, owns file system, terminal, and git access.
- **Preload script:** bridge layer, exposes only explicitly declared channels.

## Secret Management

- API keys, tokens, and credentials are stored using the Windows Credential
  Store (via `keytar` or equivalent).
- Secrets are never written to SQLite, log files, or telemetry.
- Secrets are never passed to renderer process or included in IPC payloads.
- Secrets are loaded into memory for the duration of a provider request and
  cleared immediately after.

## Threat Surface

| Threat | Mitigation |
|---|---|
| Malicious agent escaping sandbox | Capability allow-list enforced at dispatch |
| Secret exfiltration via logs | Secrets excluded from all logging pipelines |
| Renderer XSS leading to privilege | contextBridge exposes minimal typed API only |
| Uncontrolled terminal execution | User approval gate per command class |
| Supply chain via package install | Approval required; lockfile enforced |

## Key Design Rules

- Default posture is human-supervised. Autonomous action is opt-in per mission.
- No capability can be invoked that is not in the mission's
  `allowed_capabilities` list.
- The Verifier agent never modifies artifacts — it only reports findings.

## Cross-References

- IPC boundary: `docs/architecture/IPC_ARCHITECTURE.md`
- Capability contracts: `02_SPECIFICATIONS/Capabilities/`
- System invariants: `01_FOUNDATION/SYSTEM_INVARIANTS.md`
- SECURITY.md (vulnerability reporting): `/SECURITY.md`
