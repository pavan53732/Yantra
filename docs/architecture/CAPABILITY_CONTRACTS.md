# Capability Contracts

Capability contracts define how reusable product capabilities are exposed to the rest of Yantra in a controlled, reviewable way.

## Purpose

A capability contract exists to prevent hidden coupling and to keep execution surfaces stable as the product grows.

## Expectations

- Each capability has a defined purpose.
- Inputs and outputs are explicit.
- Side effects are documented.
- Failure modes are visible and bounded.
- Interaction with missions, agents, and verification is traceable.

## Boundaries

Capabilities support product workflows, but they do not replace canonical mission, workspace, or governance models.

## Verification expectations

Capability contracts should be checked for interface clarity, dependency discipline, and correct use inside governed workflows.
