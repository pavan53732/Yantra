Status: Canonical
Owner: Architecture
Source of Truth: Yes
Review Cycle: Quarterly

# Agent Model

Agents in Yantra are specialised execution roles that contribute to mission progress within governed boundaries. They are first-class product concepts, but they operate in support of the mission workflow rather than as free-standing autonomous personalities.

## Purpose

The agent model defines how specialised roles such as planning, execution, review, verification, documentation, and release support are structured and coordinated.

## Responsibilities

- Accept bounded work from the current mission context.
- Operate within documented contracts and capability limits.
- Produce outputs that are attributable and reviewable.
- Surface progress, blockers, and handoff points.
- Respect approval and verification gates.

## Coordination model

Agents should coordinate through explicit mission state, structured inputs, and reviewable outputs. Hidden state transfer or undocumented side effects should be avoided.

## Core attributes

An agent should have at least:

- a defined role,
- an input contract,
- an output contract,
- capability constraints,
- observable execution state,
- handoff expectations.

## Boundaries

Agents do not own product truth. Canonical specifications, repository state, and governance rules remain authoritative over agent behavior.

## Verification expectations

Agent behavior should be verified for role isolation, contract compliance, traceable output generation, and correct gate handling.

## See Also

- `MISSION_MODEL.md`
- `CAPABILITY_CONTRACTS.md`
- `PRODUCT_ARCHITECTURE.md`
