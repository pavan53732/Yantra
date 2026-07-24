# Tool Protocol

This protocol defines how tools are invoked and how their outputs are surfaced inside governed Yantra workflows.

## Purpose

Tools extend Yantra with bounded capabilities that remain visible to missions, planning, and verification.

## Expectations

- tool invocation stays explicit,
- inputs are bounded,
- outputs are attributable,
- failures are visible,
- tools do not bypass mission or governance rules.

## Verification

Tool behavior should be checked for contract stability, traceable output, and safe error handling.
