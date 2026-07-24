# Provider Model

> **Canonical document.** For provider lifecycle state machine see
> `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md` (Model Provider section).
> For the AI provider capability contract see
> `02_SPECIFICATIONS/Capabilities/AI_PROVIDER_CONTRACT.md`.

## Purpose

Yantra exposes an AI platform layer rather than a simple provider list.
Providers are abstracted behind a stable internal model that supports
routing, streaming, tool calling, cost visibility, and role-based model
selection. Agents interact with the Provider abstraction, never with
individual provider SDKs directly.

## Layer Placement

```
Agent Layer
  └── Provider Layer   ← this document
        └── AI Router
        └── Provider Adapters (OpenAI, Claude, Gemini, Ollama, OpenRouter)
        └── Cost Tracker
        └── Model Selector
```

## Supported Providers (Phase 3.2)

| Provider | Type | Streaming | Tool Calling |
|---|---|---|---|
| OpenAI | Cloud | ✓ | ✓ |
| Anthropic Claude | Cloud | ✓ | ✓ |
| Google Gemini | Cloud | ✓ | ✓ |
| Ollama | Local | ✓ | ✓ (model-dependent) |
| OpenRouter | Cloud gateway | ✓ | ✓ |

## Abstraction Contract

Every provider adapter must implement the canonical provider interface:

```typescript
interface AIProvider {
  id: string;
  name: string;
  models(): Promise<ModelDescriptor[]>;
  complete(request: CompletionRequest): Promise<CompletionResponse>;
  stream(request: CompletionRequest): AsyncIterable<CompletionChunk>;
  health(): Promise<ProviderHealth>;
}
```

See `02_SPECIFICATIONS/Capabilities/AI_PROVIDER_CONTRACT.md` for full
contract including `CompletionRequest`, `CompletionResponse`, `ModelDescriptor`,
and `ProviderHealth` type definitions.

## Provider State Machine

```
Registered → Healthy ↔ Degraded → Unavailable → Healthy (on recovery)
```

`Unavailable` causes the AI Router to skip the provider until a health
check returns `Healthy`. See `STATE_MACHINES.md` (Model Provider section).

## Routing Rules

- The AI Router selects the provider and model for each agent task based on:
  role requirements, configured model preference, provider health, and cost budget.
- Fallback order is configurable per workspace.
- Cost tracking is real-time; agents receive a budget signal and can
  request a cheaper model if the budget is near exhaustion.

## Key Design Rules

- API keys are stored encrypted; never written to plain text or logs.
- Provider adapters are isolated; a crash in one adapter does not affect others.
- Streaming responses are delivered via AsyncIterable, not buffered.

## Cross-References

- Provider contract: `02_SPECIFICATIONS/Capabilities/AI_PROVIDER_CONTRACT.md`
- Provider state machine: `02_SPECIFICATIONS/Architecture/STATE_MACHINES.md`
- API key management: `docs/architecture/SECURITY_MODEL.md`
- Phase 3.2 deliverables: `docs/roadmap/PHASE_3_ROADMAP.md#phase-32--ai-platform`
