# Mission Runtime Design

## Pipeline
Mission -> Parse -> Plan -> Coordinate -> Execute -> Verify -> Complete

## Components
- MissionEngine
- Parser
- Planner
- Coordinator
- Scheduler
- Execution Pipeline
- Verification integration
- Persistence
- State machine

## Notes
- Uses `@yantra/sdk` for shared contract types.
- Uses `@yantra/core` for runtime infrastructure.
- Keeps execution intentionally simple for MVY validation.
