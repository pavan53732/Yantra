# Provider Protocol

## Purpose

Governs how the AI Router communicates with AI Providers implementing the common interface (see `MODEL_PROVIDER_SCHEMA.md`, `AI_PROVIDER_CONTRACT.md`).

## Message Types

- `provider.generate_request` / `provider.generate_response`
- `provider.stream_request` / `provider.stream_chunk` / `provider.stream_end`
- `provider.embed_request` / `provider.embed_response`
- `provider.health_check` / `provider.health_status`
- `provider.cancel_request`

## Request/Response Lifecycle

1. Router selects a provider by `priority` and `status: healthy` (see `MODEL_PROVIDER_SCHEMA.md`).
2. Router emits `provider.generate_request` or `provider.stream_request`.
3. On success, provider returns `provider.generate_response` or a `provider.stream_chunk`* sequence terminated by `provider.stream_end`.
4. On failure, Router fails over to the next-priority provider per `FAILURE_MODEL.md` scenarios 1-2, emitting `ProviderFailed`.

## Error Semantics

- Error codes: `auth_failed`, `rate_limited`, `model_unavailable`, `context_length_exceeded`, `provider_timeout`, `provider_unreachable`.
- `rate_limited` includes a `retry_after_seconds` hint the Router respects before retrying the same provider.

## Retry Rules

- Transient errors (`provider_timeout`, `provider_unreachable`) retry on the same provider up to 2 times with backoff, then fail over.
- `auth_failed` and `context_length_exceeded` never auto-retry on the same provider — they fail over immediately or surface to the caller.

## Timeouts

- Default request timeout: 60s for non-streaming `generate`, 10s to first token for `stream`.

## Cancellation

- `provider.cancel_request` is supported for both streaming and non-streaming calls; providers that cannot cancel server-side MUST at minimum stop consuming/billing further tokens client-side.

## Streaming

- `stream()` is a first-class method (Priority 5); chunks carry a `sequence` number and a `finish_reason` on the final chunk.

## Version Negotiation

- `protocol_version` negotiation happens at `initialize()`; the Router refuses to register a provider whose supported protocol version doesn't overlap with the Router's supported range.
