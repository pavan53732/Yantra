# Mission Runtime Dependency Graph

```text
runMission
└── createRuntimeKernel (@yantra/core)
    └── MissionEngine
        ├── DefaultMissionParser
        ├── DefaultMissionPlanner
        ├── DefaultMissionCoordinator
        │   └── TaskScheduler
        ├── DefaultMissionVerifier
        └── InMemoryMissionPersistence
```

External dependencies:
- `@yantra/sdk`
- `@yantra/core`
