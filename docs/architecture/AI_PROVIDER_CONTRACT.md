# AI Provider Contract

This document defines the contract between Yantra and external AI providers.

## Purpose

The contract ensures provider integration remains predictable, inspectable, and compatible with the mission workflow.

## Contract expectations

- Inputs must be explicit and bounded.
- Outputs must be attributable to the active provider and request context.
- Streaming or incremental responses must remain coherent.
- Provider failures must surface clearly to the user and the mission system.

## Responsibilities

- Encode provider requests in a stable form.
- Receive and normalize provider responses.
- Handle errors, retries, and unsupported capability cases.
- Preserve traceability across requests and responses.

## Boundaries

The provider contract must not become a hidden policy layer. It supports execution, but it does not override canonical product, mission, or verification rules.

## Verification expectations

The contract should be checked for request shape stability, error handling, compatibility with mission steps, and response traceability.
