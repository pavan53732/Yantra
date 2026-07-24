# Plugin Schema

## Purpose

Defines a Plugin manifest — how third-party/MCP-provided capabilities register with the Plugin System.

## Schema

```json
{
  "schema_version": "1.0", "plugin_id": "string", "name": "string", "version": "semver string",
  "protocol": "mcp | native", "provides_capabilities": ["capability_id"],
  "sandbox": { "isolation": "process | container", "network_access": "boolean" },
  "status": "registered | enabled | disabled | crashed", "author": "string", "checksum": "string"
}
```

## Required Fields

- `schema_version`, `plugin_id`, `name`, `version`, `protocol`, `provides_capabilities`, `sandbox`, `status`, `checksum`

## Optional Fields

- `author`

## Validation Rules

- Every plugin MUST run under `sandbox.isolation` of at least `process`.
- `provides_capabilities` entries MUST be registered before the plugin may be `enabled`.
- On crash, `status` transitions to `crashed` and plugin excluded for remainder of Mission.

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

- New `protocol` values additive (MINOR). Raising sandbox minimums is MAJOR, requires migration window.

## Example Payload

```json
{
  "schema_version": "1.0", "plugin_id": "yantra-plugin-jira", "name": "Jira Integration", "version": "0.3.1",
  "protocol": "mcp", "provides_capabilities": ["jira.create_ticket", "jira.query"],
  "sandbox": { "isolation": "process", "network_access": true }, "status": "enabled",
  "author": "community", "checksum": "sha256:abcd1234..."
}
```
