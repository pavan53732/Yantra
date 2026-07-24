# User Journeys

This document describes the primary user journeys for Yantra. The focus is on a Windows desktop workflow that helps a user move from repository context to mission execution and verification.

## Journey 1: Open a workspace

1. The user launches Yantra.
2. Yantra restores the last workspace or shows a workspace selector.
3. The user opens a repository or workspace folder.
4. Yantra indexes the workspace and shows the current state.
5. The user can immediately inspect recent missions, files, and agent activity.

## Journey 2: Start a mission

1. The user chooses a goal, such as a refactor, feature, audit, or bug fix.
2. The user creates a mission with a clear objective and scope.
3. Yantra asks for any required context or approval.
4. The mission is planned and then executed through governed steps.
5. The user reviews outcomes before completion.

## Journey 3: Review a plan

1. Yantra generates or assembles a plan from repository context.
2. The user reads the proposed steps, dependencies, and risks.
3. The user approves, edits, or rejects the plan.
4. Approved work proceeds only within the agreed scope.
5. Rejected work is revised or stopped.

## Journey 4: Monitor execution

1. The user watches mission progress in a focused workspace view.
2. Yantra shows active agents, current step, and important events.
3. The user can inspect logs, artifacts, and intermediate results.
4. Interruptions or blockers are surfaced clearly.
5. Execution remains traceable from task to outcome.

## Journey 5: Verify completion

1. Yantra gathers test and verification results.
2. The user reviews pass, fail, or blocked status.
3. If verification fails, Yantra explains the issue and next step.
4. If verification passes, the mission can be marked complete.
5. Completion leaves a readable record of what changed and why.

## Journey 6: Resume work later

1. The user returns to the same workspace.
2. Yantra restores the previous state and mission history.
3. The user continues from the last meaningful point.
4. Important context remains discoverable without restarting analysis.
5. The workspace stays the long-lived anchor for ongoing work.

## Journey rules

- Every journey should reduce ambiguity.
- Users should know what the system is doing, why, and what happens next.
- Approval gates must be visible before risky steps.
- Verification must always be easy to find after execution.
