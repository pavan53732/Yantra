# Model Provider Schema

## Purpose

Defines the registration record for an AI Provider integrated with the AI Router.

## Schema

```json
{
  "schema_version": "1.0", "provider_id": "string", "vendor": "openai | anthropic | openrouter | qwen | local | other",
  "models": [ { "model_id": "string", "context_window": "number", "supports_streaming": "boolean", "supports_embeddings": "boolean" } ],
  "auth_method": "api_key | oauth | none", "status": "healthy | degraded | unavailable", "priority": "number",
  "cost_per_1k_input_tokens": "number | null", "cost_per_1k_output_tokens": "number | null",
  "last_health_check_at": "ISO-8601 timestamp | null"
}
```

## Required Fields

- `schema_version`, `provider_id`, `vendor`, `models`, `auth_method`, `status`, `priority`

## Optional Fields

- `cost_per_1k_input_tokens`, `cost_per_1k_output_tokens`, `last_health_check_at`

## Validation Rules

- `priority` determines fallback order; lower tried first.
- `status: unavailable` MUST cause Router to skip and emit `ProviderFailed`.
- Every provider MUST implement the full common interface (see `AI_PROVIDER_CONTRACT.md`) or declare unsupported methods explicitly.

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

- New `vendor` values additive (MINOR). Changing required interface methods is MAJOR, affects all providers, requires ADR.

## Example Payload

```json
{
  "schema_version": "1.0", "provider_id": "openrouter-main", "vendor": "openrouter",
  "models": [ { "model_id": "anthropic/claude-3.5-sonnet", "context_window": 200000, "supports_streaming": true, "supports_embeddings": false } ],
  "auth_method": "api_key", "status": "healthy", "priority": 1,
  "cost_per_1k_input_tokens": 0.003, "cost_per_1k_output_tokens": 0.015, "last_health_check_at": "2026-07-25T00:00:00Z"
}
```
