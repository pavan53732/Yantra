# Product Principles

These principles define the non-negotiable product constraints for Yantra. They are used to evaluate roadmap choices, architecture decisions, and implementation details.

## 1. Windows desktop first

Yantra is designed first as a Windows desktop product. Product and technical decisions must optimise for a polished Windows experience before any broader platform ambition is considered.

## 2. Mission-first workflow

The primary user workflow is not chat, code editing, or settings management. The main workflow is workspace to mission to planning to approval to execution to verification to completion.

## 3. Workspace-first continuity

The workspace is the durable operating surface. It should preserve context, history, active state, and recoverability across sessions.

## 4. Governed autonomy

Autonomous behavior is valuable only when it remains visible, bounded, and reviewable. Approval gates, verification gates, and explicit operator control are mandatory.

## 5. Verification before completion

No engineering task is complete merely because an agent finished execution. Work reaches completion only after verification evidence is available and outcomes can be reviewed.

## 6. Product over exposed internals

The user should interact with a coherent product, not with the internal complexity of the orchestration system. Internal subsystems may be powerful, but the interface should stay calm, intentional, and minimal.

## 7. Architecture integrity over speed

Shortcuts that erode boundaries, package structure, or long-term maintainability should be rejected. The repository should remain clean, understandable, and releasable.

## 8. Canonical documentation discipline

The PRD and canonical documentation chain must remain authoritative. Derived documents, agent instructions, and implementation notes must support the canonical chain rather than drift away from it.

## 9. Local-first engineering context

Repository state, mission history, and supporting context should stay close to the desktop workflow so the user can work with continuity, trust, and speed.

## 10. Minimal interface, maximal clarity

The interface should remove noise without hiding meaning. A minimal UI is successful only if execution state, approvals, risks, and verification remain easy to understand.
