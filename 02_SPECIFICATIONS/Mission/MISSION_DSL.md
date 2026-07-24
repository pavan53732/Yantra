# Mission DSL

## Purpose

A structured mission format the Planner consumes directly, instead of relying
solely on conversational free-form text. Chat, CLI, API, and CI/CD clients all
compile user intent down to this DSL before a Mission is created (see
`MISSION_SCHEMA.md`, `01_FOUNDATION/MISSION.md`). This is a key differentiator: Yantra
treats mission intent as structured data, not just a prompt string.

## Format

```yaml
mission:
  objective: string                 # what success looks like, one sentence
  constraints:
    budget: { currency: string, amount: number }
    timeout_seconds: number
    allowed_capabilities: [string]
    security_boundary: string
  acceptance_criteria:
    - id: string
      description: string
      verification_category: string   # see VERIFICATION_FRAMEWORK.md
  resources:
    - type: repo | file | url | dataset
      ref: string
  priority: low | normal | high | urgent
  budget:
    currency: string
    amount: number
  timeout: number                     # seconds, mirrors constraints.timeout_seconds
  deliverables:
    - type: code | doc | report | artifact
      description: string
```

## Compilation to Mission Schema

| DSL Field | Mission Schema Field |
|-----------|----------------------|
| `objective` | `objective` |
| `constraints.*` | `constraints.*` |
| `acceptance_criteria` | `requirements` (each criterion becomes a Requirement) |
| `resources` | attached as `context_refs` on the initial Task(s) |
| `priority` | scheduling hint consumed by the Orchestrator, not persisted on the Mission itself |
| `deliverables` | expected `artifacts` shape, validated at Verification time |

## Validation Rules

- `objective` is required and MUST be non-empty.
- `acceptance_criteria` MUST contain at least one entry; a Mission with zero
  acceptance criteria cannot leave `created` (mirrors `goals` requirement in
  `MISSION_SCHEMA.md`).
- Each `acceptance_criteria` entry's `verification_category` MUST reference a
  category defined in `VERIFICATION_FRAMEWORK.md`.
- `budget.amount` and `timeout` MUST be positive numbers if present.

## Free-Form Text Compatibility

Chat clients MAY still accept free-form conversational input; the Mission
Engine (with Planner assistance) compiles this into the DSL above before
creating a Mission. A Mission created this way MUST still validate against
the DSL's rules — free-form input is never used to bypass structured
validation. If compilation cannot produce a valid `objective` and at least one
`acceptance_criteria` entry, the client MUST prompt the user for the missing
structured fields rather than creating an underspecified Mission.

## Example

```yaml
mission:
  objective: "Add per-key rate limiting to the API gateway"
  constraints:
    budget: { currency: USD, amount: 5.00 }
    timeout_seconds: 3600
    allowed_capabilities: [workspace, terminal, git]
    security_boundary: "repo:api-gateway"
  acceptance_criteria:
    - id: r1
      description: "No single API key can exceed 100 req/min"
      verification_category: correctness
    - id: r2
      description: "Existing API tests still pass"
      verification_category: correctness
  resources:
    - type: repo
      ref: "github.com/org/api-gateway"
  priority: normal
  budget: { currency: USD, amount: 5.00 }
  timeout: 3600
  deliverables:
    - type: code
      description: "Rate limiter middleware"
    - type: report
      description: "Summary of changes and test results"
```
