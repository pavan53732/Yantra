# @yantra/mission

Yantra Mission Runtime.

## Responsibilities
- Mission engine
- Mission parser
- Mission context
- Planner
- Coordinator
- Execution pipeline
- Task scheduler
- Mission state machine
- Mission persistence
- Mission lifecycle
- Initial verification integration

## Rules
- Imports shared contracts only from `@yantra/sdk`
- Uses `@yantra/core` as the runtime infrastructure layer
- Avoids provider-specific implementations and UI concerns

## Verification
- Node test suite added for structural and behavior validation.
- Sample mission runtime execution artifact generated in `output/mission-runtime-sample-result.json`.
