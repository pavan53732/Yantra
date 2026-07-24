# AI Provider Contract

Every AI provider registered with the AI Router (`packages/router`) MUST
implement this common interface. This is what makes providers interchangeable
and prevents vendor lock-in — the Router, Planner, and Agents never call a
provider-specific SDK method directly.

## Interface

| Method | Signature | Purpose |
|--------|-----------|---------|
| `initialize()` | `() -> void` | Load configuration, prepare client, negotiate `protocol_version` |
| `authenticate()` | `() -> { authenticated: boolean }` | Validate credentials |
| `listModels()` | `() -> Model[]` | Enumerate available models and their capabilities |
| `stream()` | `(request) -> AsyncIterator<Chunk>` | Token-streamed generation, per `provider-protocol.md` |
| `generate()` | `(request) -> Response` | Non-streamed generation |
| `embed()` | `(texts) -> Vector[]` | Generate embeddings, if supported |
| `tokenize()` | `(text) -> Token[]` | Tokenize text for cost/context estimation |
| `estimateCost()` | `(request) -> { estimated_usd }` | Pre-flight cost estimate before execution |
| `cancel()` | `(request_id) -> void` | Best-effort cancellation of an in-flight call |
| `health()` | `() -> { status }` | Health check, feeds `MODEL_PROVIDER_SCHEMA.md` `status` field |
| `shutdown()` | `() -> void` | Graceful teardown |

## Rules

- A provider that does not support a method (e.g. `embed()` for a
  text-only chat model) MUST declare this explicitly at `listModels()` /
  registration time via a capability flag (`supports_embeddings: false` in
  `MODEL_PROVIDER_SCHEMA.md`) rather than failing at call time with an opaque
  error.
- `estimateCost()` MUST be callable without side effects (no billed usage) and
  MUST be implemented even for providers with unpredictable pricing (best-effort
  estimate, clearly flagged as an estimate).
- `cancel()` is best-effort; providers that cannot cancel server-side MUST at
  minimum stop consuming/billing further tokens client-side immediately.
- The Router treats all providers uniformly through this interface — no
  provider-specific branching is permitted in `packages/router`'s core
  selection/failover logic (provider-specific quirks are isolated inside each
  provider's own implementation, behind this interface).
- See `docs/protocols/provider-protocol.md` for the wire-level message
  contract this interface is built on.
