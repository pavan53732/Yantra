# Capability Contracts

The Orchestrator and Agents depend only on **contracts**, never on concrete
implementations. This is what allows a Capability's backing implementation
(e.g. local filesystem vs. a remote workspace, or `git` CLI vs. a Git
library) to change without touching any code above the Capability Layer.

```
Capability
    |
Contract      <- what the Orchestrator/Agent depends on
    |
Implementation
    |
Provider      <- concrete backing (local FS, remote FS, git CLI, libgit2, ...)
```

## Filesystem Capability (`workspace.*`)

Contract:

- `read(path) -> { content, encoding }`
- `write(path, content, options) -> { bytes_written }` — MUST be reversible (Invariant 4); implementation snapshots prior content before writing
- `move(from, to) -> { }`
- `delete(path) -> { }` — MUST snapshot before deletion
- `watch(path, callback) -> { subscription_id }`
- `permissions(path) -> { mode, owner }`

Providers: local filesystem, sandboxed container filesystem, remote workspace
(future). All providers implement the same six methods above; the
Orchestrator never calls a provider-specific method.

## Terminal Capability (`terminal.*`)

Contract:

- `exec(command, options) -> { exit_code, stdout_ref, stderr_ref }` — MUST enforce `timeout_seconds` server-side (`FAILURE_MODEL.md` scenario 9)
- `kill(process_id) -> { }`
- `status(process_id) -> { state }`

Providers: local shell, sandboxed container shell.

## Git Capability (`git.*`)

Contract:

- `commit(message, files) -> { commit_sha }`
- `branch(name) -> { }`
- `merge(branch) -> { conflicts: [] }` — conflicts are returned as structured data, never thrown as an unhandled error (`FAILURE_MODEL.md` scenario 8)
- `diff(ref_a, ref_b) -> { patch }`
- `push(remote, branch) -> { }` — never force-pushes implicitly

Providers: git CLI wrapper, libgit2 binding (future).

## Contract Rules

- Every Capability registered in `CAPABILITY_SCHEMA.md` MUST reference a
  contract defined here (or a future `docs/architecture/contracts/*` file for
  larger contract sets).
- A Contract's method signatures are versioned identically to schemas
  (`MAJOR.MINOR`); Implementations MUST NOT expose methods outside the
  Contract to callers above the Capability Layer.
- New Providers for an existing Contract require no changes above the
  Capability Layer — this is the core test of whether a Contract boundary is
  correctly drawn.
