# Capability Schema

## Purpose

Defines a Capability — a registered, contract-bound tool exposed to agents via the Capability Layer.

## Schema

```json
{
  "schema_version": "1.0", "capability_id": "string (e.g. 'workspace.write')",
  "contract_ref": "string (path to contract doc)", "provider": "builtin | plugin", "plugin_id": "string | null",
  "risk_level": "low | medium | high | critical", "reversible": "boolean", "requires_approval": "boolean",
  "allowed_roles": ["agent_role"], "version": "semver string"
}
```

## Required Fields

- `schema_version`, `capability_id`, `contract_ref`, `provider`, `risk_level`, `reversible`, `requires_approval`, `allowed_roles`, `version`

## Optional Fields

- `plugin_id` (required only when `provider: plugin`)

## Validation Rules

- `capability_id` MUST be unique, dot-namespaced.
- `risk_level: critical` MUST have `requires_approval: true`.
- `allowed_roles` MUST be consistent with `SYSTEM_INVARIANTS.md`.

## Versioning Strategy

All schemas in `docs/specifications/` are versioned independently using a
`schema_version` field of the form `MAJOR.MINOR`. This document defines
`schema_version: "1.0"`.

- **MAJOR** increments on breaking changes (removed/renamed required fields,
  changed semantics of an existing field).
- **MINOR** increments on additive, backward-compatible changes (new optional
  fields, new enum values that consumers can ignore safely).
- Producers MUST stamp every payload with the `schema_version` they were
  written against. Consumers MUST reject payloads with a MAJOR version they
  do not support, and MAY ignore unknown fields on MINOR version mismatches.

## Forward/Backward Compatibility

- New capabilities additive/MINOR. Raising `risk_level` for an existing capability is MAJOR (changes approval behavior).

## Example Payload

```json
{
  "schema_version": "1.0", "capability_id": "terminal.exec",
  "contract_ref": "docs/architecture/CAPABILITY_CONTRACTS.md", "provider": "builtin", "plugin_id": null,
  "risk_level": "high", "reversible": false, "requires_approval": false,
  "allowed_roles": ["coder", "verifier"], "version": "1.0.0"
}
```
