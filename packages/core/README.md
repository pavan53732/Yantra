# @yantra/core

Yantra runtime kernel.

## Responsibilities
- Event bus
- Service registry and dependency injection
- Lifecycle management
- Runtime bootstrap
- Configuration loading
- Logging
- Error handling
- Runtime context
- Extension registration
- Health monitoring
- Deterministic startup and shutdown ordering

## Rules
- Imports contracts only from `@yantra/sdk`
- Does not define mission/planner/agent/capability business logic
- Provides the infrastructure used by later runtime phases
