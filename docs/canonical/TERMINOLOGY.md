# Terminology Registry

This file is the single canonical vocabulary for Yantra. All other documents
must use these exact terms and must not introduce synonyms.

## Core Terms

- Mission: the top-level unit of work.
- Task: an atomic unit of work within a Mission.
- Workflow: a reusable plan template.
- Execution Graph: the DAG of Tasks used to execute a Mission.
- Capability: a contract-bound operation exposed to agents.
- Tool: a capability invocation record.
- Provider: a concrete implementation backing a capability or model interface.
- Plugin: an external extension that provides capabilities.
- Agent: a runtime worker assigned to a Task.
- Memory: persistent structured state and knowledge graph records.
- Workspace: the mutable filesystem-backed project environment.
- Session: a runtime instance of interaction or execution.
- Artifact: a durable output produced by a Task or Mission.
- Checkpoint: a recoverable persistence point for execution state.
- Coordinator: the runtime component that schedules and supervises execution.
- Orchestrator: the component responsible for Mission execution flow.
- Planner: the component that transforms Missions into Execution Graphs.
- Verifier: the component that validates outputs against acceptance criteria.

## Naming Rules

- Use snake_case for schema fields.
- Use SCREAMING_SNAKE_CASE only for registry codes and error codes.
- Use immutable IDs for all runtime objects.
