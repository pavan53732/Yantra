# Design System

Yantra's design system is a minimal, Windows-first product system built for dense engineering workflows. It supports a single-window desktop application with clear hierarchy, restrained color, and high information density.

## Design goals

- Keep the interface calm, precise, and mission-focused.
- Reduce cognitive load while surfacing state clearly.
- Make actions, approvals, and verification easy to distinguish.
- Preserve consistency across workspace, mission, agent, and governance surfaces.

## Visual principles

- Use neutral surfaces as the default canvas.
- Use one accent color for primary actions and selected states.
- Avoid decorative gradients, loud shadows, and novelty effects.
- Use spacing and structure to express hierarchy before color does.

## Typography

- Primary UI text should be clear, compact, and highly legible.
- Use a single body font across the app and a distinct display style only where needed.
- Titles should remain functional, not theatrical.
- Body copy must support fast scanning and sustained reading.

## Layout

- Prefer one clear primary action per view.
- Use cards, panels, and sections to separate workspace state.
- Keep controls aligned to a predictable grid.
- Let important state occupy stable, repeatable positions.

## Color usage

- Neutral backgrounds and surfaces are the baseline.
- Accent color marks interactive priority, active navigation, and confirmation states.
- Error and warning colors are reserved for real system states.
- Status colors must never become decorative noise.

## Components

- Buttons: primary, secondary, ghost, destructive.
- Inputs: text field, search field, multiline editor, select, checkbox, switch.
- Navigation: sidebar item, top bar action, breadcrumb, tab.
- Feedback: badge, toast, inline validation, empty state, loading state.
- Panels: cards, drawers, modals, command surfaces.

## Spacing and density

- Use a small, consistent spacing scale.
- Keep compact density for operational views.
- Allow more whitespace only where it improves clarity.
- Avoid oversized gaps that slow down workflow scanning.

## Interaction rules

- Focus states must be visible and consistent.
- Hover states should support discovery, not carry meaning alone.
- Disabled states must be obviously inactive.
- Destructive actions should require explicit confirmation where risk is high.

## State guidance

- Loading states should show progress or skeletons where the wait is meaningful.
- Empty states should explain the next step.
- Error states should say what failed and how to recover.
- Verification states should clearly distinguish pending, passed, failed, and blocked.

## Accessibility

- Maintain strong contrast for all text and controls.
- Keep interactive targets easy to click or tap.
- Use semantic structure for headings, landmarks, and forms.
- Support keyboard navigation across the full interface.

## Implementation notes

- The design system should be applied consistently across the workspace shell and all mission surfaces.
- New UI patterns should be added here before they are used broadly.
- Any deviation from the system should be intentional and documented.
