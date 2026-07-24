# Quality Gates

All implementation work in Yantra must pass these mandatory gates before merge or release.

## Mandatory gates

1. Product alignment
   - Change aligns with `docs/product/PRODUCT_REQUIREMENTS.md`.
   - No behavior contradicts the canonical Phase 3 roadmap.
   - Any unresolved ambiguity is recorded explicitly instead of guessed.

2. Architecture alignment
   - Change preserves documented package and boundary intent.
   - New interfaces, models, or workflows are reflected in the relevant architecture documents.
   - No undocumented cross-boundary coupling is introduced.

3. Verification
   - Tests are added or updated when behavior changes.
   - Existing test suites pass for affected areas.
   - Manual verification steps are recorded when automation is not yet available.

4. Documentation
   - User-visible or developer-visible behavior changes are documented.
   - Navigation and cross-references are updated when canonical paths change.
   - Historical or superseded documents are labelled clearly.

5. Security and governance
   - No secrets, tokens, or credentials are committed.
   - Privileged workflows, approvals, and gates remain explicit.
   - Risky assumptions are recorded for human review.

6. Release readiness
   - Working tree is clean except for intentional changes.
   - Changes are grouped into logical commits with descriptive messages.
   - Repository remains in a releasable state after the change.
