# Rules — Yantra AI Agent Behavioural Constraints

## 1. Specification Authority

- `docs/product/PRODUCT_REQUIREMENTS.md` is the source of truth for all product
  decisions. No agent may override it.
- Documents in `02_SPECIFICATIONS/` are immutable contracts. Treat them as
  read-only unless an explicit change authorisation exists in the current task.
- If a specification and an implementation diverge, the specification is correct
  and the implementation must be corrected — not the other way around.
- Do not modify `01_FOUNDATION/SYSTEM_INVARIANTS.md` under any circumstances.
  System invariants are absolute.

## 2. Architecture Constraints

- Do not invent architecture. Every architectural decision must trace to an
  existing specification in `02_SPECIFICATIONS/` or `docs/architecture/`.
- Do not create new packages, layers, or modules without a supporting spec.
- Do not introduce cross-platform abstractions. Yantra is Windows-first. Any
  cross-platform work requires explicit authorisation from the PRD.
- Layer boundaries are enforced. No cross-layer imports. No bypass of the
  IPC contract defined in `docs/architecture/IPC_ARCHITECTURE.md`.
- The editor is a tool inside the product, not the product itself. Do not
  design UI that makes the editor the dominant experience.

## 3. Fabrication Prevention

- Never fabricate repository state, file contents, test results, build outputs,
  commits, pushes, or evidence.
- Never present an assumption as a verified fact.
- Always distinguish between:
  - **Observed** — seen in the repository file listing
  - **Inspected** — file content has been read in detail
  - **Executed** — a command or process was run and output confirmed
  - **Externally Verified** — confirmed by a source outside the repository
- If evidence is missing for a claim, state explicitly: "Evidence unavailable."

## 4. Phase Boundaries

- Work only within the approved phase. The current active phase is defined in
  `docs/roadmap/PHASE_3_ROADMAP.md`.
- Do not implement deliverables from future phases without explicit authorisation.
- Historical roadmap documents in `docs/roadmap/phase-*.md` are superseded
  records. Do not use them as current direction. They are marked SUPERSEDED.
- Phase 3 means Windows desktop product. It does not mean headless engine.

## 5. Memory and Context

- Use repository knowledge as the source of truth, not chat memory or prior
  conversation context that is not reflected in the repository.
- If a fact is needed that is not in the repository, state it is not available
  rather than recalling it from prior conversation.
- Reload context at the start of each new work session.

## 6. Quality Gates

- All mandatory quality gates in `.ai/QUALITY_GATES.md` must pass before
  implementation is authorised.
- A gate that cannot be confirmed as passed is treated as a hard blocker.
- Do not self-certify gate passage. Gates must be objectively verifiable.
- See `04_GOVERNANCE/QualityGates/` for extended gate definitions.

## 7. Documentation

- Update documentation whenever behaviour, interfaces, or contracts change.
- Never leave a document stub without marking it `> ⚠️ STUB — not yet
  implementation-grade`.
- When creating new documentation, link it into the nearest parent document
  and the canonical chain.
- Every new architecture document must include: purpose, layer placement,
  component inventory, interface/contract summary, and cross-references.

## 8. Reporting

- Report only verified facts.
- Structure every engineering report with: scope, observations, findings,
  evidence, confidence level, and recommended action.
- Do not stop work mid-phase unless: the phase is complete, a genuine blocker
  exists, or execution limits are reached.
- Clearly separate what is done from what is deferred.
