# Mission Runtime Design

## Flow
Mission -> Parser -> Planner -> Coordinator -> Verifier -> Result

## Components
- `MissionEngine`: orchestration entrypoint
- `DefaultMissionParser`: envelope normalization
- `DefaultMissionPlanner`: deterministic task plan generation
- `DefaultMissionCoordinator`: ordered task execution and evidence collection
- `DefaultMissionVerifier`: result synthesis from evidence
- `InMemoryMissionPersistence`: persistence abstraction baseline
