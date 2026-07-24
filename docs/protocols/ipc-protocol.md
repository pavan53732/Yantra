# IPC Protocol

This protocol defines the expected message behavior across internal desktop boundaries so communication remains explicit, bounded, and reviewable.

## Purpose

IPC keeps internal module communication predictable while preserving privilege boundaries.

## Expectations

- message formats are explicit,
- sender and receiver boundaries are clear,
- unsafe or unsupported requests fail visibly,
- IPC never silently bypasses governance rules.
