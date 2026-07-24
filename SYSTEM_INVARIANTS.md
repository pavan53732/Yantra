# System Invariants

Invariants are rules that must hold true at every point in Yantra's
execution, regardless of which agent, mission, or subsystem is involved. They
exist to prevent architectural drift in an autonomous, multi-agent system
where many independent pieces of code and many LLM-driven decisions interact
over time.

Any change that violates an invariant listed here is a bug, even if it
otherwise "works." Invariants are enforced through code review, runtime
assertions, and (where feasible) automated tests.

## Execution Invariants

1. **An agent cannot execute without a Mission.** There is no code path that
   spawns agent work outside of a Mission context. A "quick chat message" is
   itself wrapped in an implicit Mission before any agent touches it.
2. **Every tool execution must be observable.** Every capability invocation
   emits a `ToolRequested` / `ToolFinished` event pair on the Event Bus,
   including duration, inputs (redacted if sensitive), and outcome.
3. **Every decision must be explainable.** Any agent decision (plan step,
   tool choice, verification verdict) must be traceable back to the reasoning
   or rule that produced it. "The model decided" is not an acceptable audit
   trail on its own — the prompt, context, and output must be retrievable.
4. **Every modification must be reversible.** File writes, git operations,
   and workspace mutations are checkpointed before they happen so they can be
   undone.
5. **Every workflow is resumable.** A Mission that is interrupted (crash,
   restart, network loss) can be resumed from its last durable checkpoint
   without re-executing already-completed steps.
6. **Every task produces structured outputs.** No agent task is considered
   complete based on free-text output alone; it must produce a typed,
   schema-validated artifact.

## Agent Role Invariants

7. **Every agent is stateless except the Memory Agent.** Agents do not carry
   private, undeclared state between invocations. Anything that must persist
   goes through Memory explicitly.
8. **Memory never modifies source code.** The Memory Agent reads and writes
   knowledge/state records only. It has no filesystem write access to
   workspace source files.
9. **Planner never edits files.** The Planner produces plans and execution
   graphs. It has no tool access that mutates the workspace.
10. **Coder never changes architecture.** The Coder agent implements against
    an approved specification. It cannot alter package boundaries, layer
    contracts, or specification documents.
11. **Architect never executes terminal commands.** The Architect agent
    produces and revises specifications and designs. It has no execution
    capability.
12. **Verifier never changes implementation.** The Verifier agent runs tests,
    checks, and validations, and reports pass/fail with evidence. It cannot
    modify the code it is verifying.

## Why These Rules Exist

Multi-agent systems fail silently when responsibilities blur — a "helpful"
agent that edits architecture while fixing a bug, or a planner that
occasionally writes a file "just this once," is how autonomous systems drift
into unmaintainable, unauditable states. These invariants are the boundaries
that keep each agent's blast radius small and predictable.

## Adding a New Invariant

New invariants must be proposed as an ADR (see `docs/adr/`) and require
explicit approval before being added here. Invariants are not added casually
— they are meant to be a short, stable list.
