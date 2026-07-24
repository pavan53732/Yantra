# UI UX Guidelines

Yantra's interface must feel like a serious engineering workspace: minimal, fast, and highly legible. The UI should support long-form focus, controlled automation, and quick review of mission state.

## Interaction philosophy

- Keep the interface calm and structured.
- Use progressive disclosure instead of dumping everything at once.
- Make high-risk actions obvious and deliberate.
- Favor direct controls over hidden gestures.

## Navigation

- The workspace shell is the primary frame.
- Mission context should stay persistent while the user moves through detail views.
- Navigation should always make it clear where the user is and what belongs to the current workspace.
- Avoid deep, hidden nesting for common actions.

## Information hierarchy

- Surface the most important status first.
- Place execution state, approvals, and verification near the top of the hierarchy.
- Keep secondary details available but not dominant.
- Use typography, spacing, and structure before using color.

## Controls and actions

- Primary actions should be visible and unambiguous.
- Secondary actions should be quieter and grouped logically.
- Dangerous actions require explicit emphasis and confirmation.
- Control labels should describe the action, not the implementation.

## Feedback

- Show clear feedback for state changes, loading, completion, and failure.
- Inline feedback is preferred for validation and recoverable errors.
- Verification outcomes should be persistent and easy to review.
- Notifications should support awareness, not replace context.

## Workspace shell behavior

- The shell should support workspace switching, mission selection, and review without losing context.
- Panels and sections should stay aligned with the active mission.
- The layout should adapt cleanly to dense repository views.
- User focus should remain on the current engineering task.

## Empty and error states

- Empty states should explain what belongs there and what to do next.
- Error states should be calm, direct, and actionable.
- Recovery paths should be visible without requiring guesswork.
- System failures should preserve as much user context as possible.

## Accessibility and clarity

- Text should remain readable at a glance.
- Keyboard navigation should work throughout the interface.
- Interactive targets should be comfortable to use.
- Visual state should not rely on color alone.

## Implementation guidance

- Use the guidelines here to evaluate new components before merging them into the product shell.
- If a component makes the workflow harder to scan, it should be simplified.
- Any new pattern should be documented here before it becomes standard.
