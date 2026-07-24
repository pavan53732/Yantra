# Autonomous Decision Policy

## Purpose

Defines what Yantra's engine may decide and execute autonomously, what always
requires explicit user/operator approval, and how risk is classified —
independent of any particular model or provider. This policy is the
authoritative source the Capability Layer (`requires_approval` in
`CAPABILITY_SCHEMA.md`) and IPC layer (`ipc-protocol.md`) enforce against.

## Risk Levels

| Risk Level | Definition | Example Capabilities |
|------------|------------|------------------------|
| Low | Read-only, fully reversible, no external side effects | `workspace.read`, `memory.query_request` |
| Medium | Reversible, workspace-local side effects | `workspace.write`, `git.commit` (local) |
| High | Reversible but with broader blast radius, or irreversible-but-contained | `terminal.exec`, `git.merge` |
| Critical | Irreversible and/or externally visible/costly | `git.push` (to shared remote), deleting a branch, spending above a Mission's `budget`, calling paid external APIs beyond estimated cost |

## Autonomy Rules

- **May decide autonomously:** any action classified Low or Medium risk,
  within the Mission's `constraints.allowed_capabilities` and budget, may be
  executed without a synchronous approval step.
- **Always requires approval:** any Critical-risk action, and any High-risk
  action that is irreversible (e.g. `terminal.exec` commands matching a
  configured destructive-command pattern list) requires explicit user or
  operator approval before execution, regardless of Mission-level settings.
- **Reversibility determines default autonomy tier:** an action's
  `reversible` flag (`CAPABILITY_SCHEMA.md`) is the primary signal —
  reversible actions default to autonomous, irreversible actions default to
  requiring approval, regardless of risk level, unless explicitly
  whitelisted for a specific Mission.
- **Budget is a hard boundary:** the engine MUST NOT autonomously take any
  action that would exceed a Mission's `constraints.budget`
  (`MISSION_SCHEMA.md`), even if the action itself is Low risk — cost
  overruns always require approval.

## Escalation Rules

1. A Capability invocation with `requires_approval: true` blocks (per
   `tool-protocol.md`) and emits an approval-request event to all subscribed
   clients (`ipc-protocol.md`).
2. If no response is received within a configurable timeout (default 15
   minutes), the Mission transitions to `Waiting` (`STATE_MACHINES.md`) rather
   than proceeding with a default action.
3. Repeated approval timeouts for the same Mission (default: 3) escalate the
   Mission to `Blocked` and require operator intervention to resume.
4. Rejection of an approval request is treated as a `VerificationFailed`-style
   signal to the Planner, routing to re-planning with the rejected action
   excluded, not a silent Mission failure.

## Model Independence

This policy is enforced structurally by the Capability Layer and Mission
Engine, not by prompting a model to "be careful." No model output is trusted
to self-classify risk — every Capability's risk level is a static, reviewed
property in `CAPABILITY_SCHEMA.md`, and the policy engine checks against that
static classification before any invocation proceeds, regardless of which
provider or model requested the action.

## Auditability

Every approval, rejection, and timeout is recorded in the Audit Trail
(`OBSERVABILITY.md`) with full context: the requesting Task/Agent, the
Capability and arguments, the decision, and who/what made it.
