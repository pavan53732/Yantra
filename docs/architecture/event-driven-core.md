# Event-Driven Core

Yantra uses an event-driven core to coordinate state changes, execution progress, and reviewable system activity across the product.

## Purpose

The event-driven core keeps important state transitions observable and helps connect workspace activity, missions, agents, and verification flows without relying on hidden implicit behavior.

## Expectations

- Important product events are explicit.
- Event producers and consumers remain bounded.
- Events support observability and traceability.
- Event handling does not bypass approval or verification rules.

## Verification expectations

The event-driven core should be checked for event clarity, ordering where required, safe failure handling, and compatibility with product governance.
