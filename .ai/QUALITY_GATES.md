# Quality Gates — Yantra Implementation Authorisation Gates

## Purpose

All 7 mandatory quality gates below must pass before any implementation work
in Phase 3 is authorised. Each gate defines: trigger condition, pass criteria,
fail consequence, and verification method.

See also `04_GOVERNANCE/QualityGates/` for extended governance gate definitions.

---

## Gate 1 — Specification Completeness

**Trigger:** Before implementing any Phase 3 deliverable.

**Pass criteria:**
- The deliverable has a corresponding entry in `docs/roadmap/PHASE_3_ROADMAP.md`.
- A relevant domain specification exists in `02_SPECIFICATIONS/`.
- The specification is not a stub — it contains purpose, constraints,
  interface or schema definition, and at least one acceptance criterion.

**Fail consequence:** Implementation is blocked until the specification
is complete. Do not proceed.

**Verification:** Read the spec file. Confirm it is not a single paragraph
or pointer. Confirm it has an interface, schema, or contract section.

---

## Gate 2 — Architecture Alignment

**Trigger:** Before writing any new package, module, or architectural layer.

**Pass criteria:**
- The component exists in the layer model
  (`docs/architecture/PRODUCT_ARCHITECTURE.md`).
- No layer boundary violations are introduced
  (`02_SPECIFICATIONS/Architecture/system-overview.md`).
- IPC contracts are respected (`docs/architecture/IPC_ARCHITECTURE.md`).
- The component does not bypass the event bus
  (`02_SPECIFICATIONS/Architecture/event-driven-core.md`).

**Fail consequence:** Architecture review required before proceeding.

**Verification:** Trace the component to its canonical architecture doc.
Confirm no cross-layer imports in the proposed design.

---

## Gate 3 — PRD Alignment

**Trigger:** Before any feature or module is defined.

**Pass criteria:**
- The feature is explicitly listed in `docs/product/PRODUCT_REQUIREMENTS.md`
  or `docs/roadmap/PHASE_3_ROADMAP.md`.
- The feature does not conflict with any principle in
  `docs/product/PRODUCT_PRINCIPLES.md`.
- The feature does not introduce cross-platform scope.
- The feature does not make the editor the dominant product experience.

**Fail consequence:** Feature is out of scope. Do not implement.

**Verification:** Cross-reference the feature against the PRD module list
and the current phase deliverables in `PHASE_3_ROADMAP.md`.

---

## Gate 4 — Security Boundary Review

**Trigger:** Before any capability touching file system, terminal, network,
Git, package operations, or IPC privilege.

**Pass criteria:**
- The capability is listed in `allowed_capabilities` for the mission or task.
- Actions that modify persistent state have an explicit approval gate.
- IPC privilege boundaries are not bypassed
  (`docs/architecture/IPC_ARCHITECTURE.md`).
- Windows-first trust boundaries are respected
  (`docs/architecture/SECURITY_MODEL.md`).

**Fail consequence:** Capability is blocked until a security boundary
review approves it.

**Verification:** Check `docs/architecture/SECURITY_MODEL.md` and
`02_SPECIFICATIONS/Capabilities/` for the capability's declared scope.

---

## Gate 5 — Verification Framework Compliance

**Trigger:** Before a mission or task is marked complete.

**Pass criteria:**
- Every `acceptance_criteria` entry has been evaluated by its verification
  category (`02_SPECIFICATIONS/Verifier/VERIFICATION_FRAMEWORK.md`).
- No `blocking` verification failures remain unresolved.
- No `inconclusive` results are treated as `passed`.
- Confidence below 0.7 on probabilistic categories downgrades to `inconclusive`.

**Fail consequence:** Mission remains in `Verifying` state. Cannot transition
to `Completed`.

**Verification:** Review the verification result envelope per criterion.
Confirm `status: passed` and `failure_type` is not `blocking`.

---

## Gate 6 — Documentation Currency

**Trigger:** Before any commit that changes behaviour, interfaces, or contracts.

**Pass criteria:**
- All affected documentation has been updated to reflect the change.
- No stub documents have been introduced without a `> ⚠️ STUB` notice.
- The canonical documentation chain remains navigable end-to-end after
  the change.
- Cross-references in affected documents remain valid.

**Fail consequence:** Commit is not complete until documentation is current.

**Verification:** Confirm every changed interface has a corresponding
documentation update in the same commit or pull request.

---

## Gate 7 — Phase Boundary Enforcement

**Trigger:** At the start of any new work session or task.

**Pass criteria:**
- The work is within the scope of the current phase
  (`docs/roadmap/PHASE_3_ROADMAP.md`).
- No deliverables from future phases are being implemented ahead of their
  phase gate without explicit authorisation.
- Historical roadmap documents (`docs/roadmap/phase-*.md`) are not being
  used as current direction — they are superseded.
- Phase 3 means Windows desktop product. Headless-engine-only approaches
  contradict the current phase definition.

**Fail consequence:** Work is out of phase scope and must be deferred
or explicitly authorised.

**Verification:** Check the deliverable against the current phase section
in `PHASE_3_ROADMAP.md`. Confirm no future-phase items are in scope.
