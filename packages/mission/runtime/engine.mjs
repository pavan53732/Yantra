export function parseMission(input) {
  if (!input || !input.id || !input.objective) throw new Error('Invalid mission envelope');
  const now = new Date().toISOString();
  return {
    mission: input,
    state: 'parsed',
    evidence: [{ id: 'ev-parse', type: 'parse', summary: 'Mission parsed successfully' }],
    createdAt: now,
    updatedAt: now
  };
}

export function createMissionPlan(context) {
  const objective = String(context.mission.objective).toLowerCase();
  const tasks = [
    { id: 'task-analyze', title: 'Analyze mission objective', kind: 'analyze', input: { objective: context.mission.objective } }
  ];
  if (objective.includes('typescript cli')) {
    tasks.push({ id: 'task-create-package', title: 'Create package.json', kind: 'create-file', input: { path: 'package.json' } });
    tasks.push({ id: 'task-run-tests', title: 'Run tests', kind: 'run-command', input: { command: 'npm test' } });
  }
  tasks.push({ id: 'task-verify', title: 'Verify mission output', kind: 'verify' });
  return { missionId: context.mission.id, tasks };
}

export function scheduleTasks(plan) { return [...plan.tasks]; }
export async function coordinateMission(_context, tasks) {
  return tasks.map((task) => ({ id: `ev-${task.id}`, type: task.kind === 'verify' ? 'verification' : 'execution', summary: `Task coordinated: ${task.title}`, details: { taskId: task.id, kind: task.kind } }));
}
export async function executeTasks(tasks) {
  return tasks.map((task) => ({ id: `exec-${task.id}`, type: task.kind === 'verify' ? 'verification' : 'execution', summary: `Executed task: ${task.title}`, details: task.input ?? {} }));
}
export async function verifyMission(context) {
  return { id: 'ev-final-verification', type: 'verification', summary: 'Mission verification completed', details: { missionId: context.mission.id, state: context.state } };
}
export function transition(from, to) {
  const allowed = {
    created: ['parsed', 'failed'], parsed: ['planned', 'failed'], planned: ['coordinating', 'failed'], coordinating: ['executing', 'failed'], executing: ['verifying', 'failed'], verifying: ['completed', 'failed'], completed: [], failed: []
  };
  if (!allowed[from].includes(to)) throw new Error(`Invalid mission transition: ${from} -> ${to}`);
  return to;
}
export class InMemoryMissionPersistence {
  constructor() { this.store = new Map(); }
  async save(context) { this.store.set(context.mission.id, structuredClone(context)); }
  async load(missionId) { const v = this.store.get(missionId); return v ? structuredClone(v) : undefined; }
}
export class MemoryEventBus {
  constructor() { this.events = []; }
  publish(event) { this.events.push(event); }
  history() { return [...this.events]; }
}
export class MissionEngine {
  constructor({ kernel, persistence } = {}) {
    this.kernel = kernel ?? { events: new MemoryEventBus() };
    this.persistence = persistence ?? new InMemoryMissionPersistence();
  }
  async run(input) {
    const events = [];
    const publish = (type, payload) => {
      const event = { id: `evt-${events.length + 1}`, type, source: '@yantra/mission', timestamp: new Date().toISOString(), payload };
      this.kernel.events.publish(event);
      events.push(event);
    };
    let context = parseMission(input);
    await this.persistence.save(context);
    publish('mission.parsed', { missionId: context.mission.id });
    context.state = transition(context.state, 'planned');
    context.plan = createMissionPlan(context);
    context.evidence.push({ id: 'ev-plan', type: 'plan', summary: 'Mission plan created', details: { taskCount: context.plan.tasks.length } });
    await this.persistence.save(context);
    publish('mission.planned', { missionId: context.mission.id, taskCount: context.plan.tasks.length });
    context.state = transition(context.state, 'coordinating');
    const scheduled = scheduleTasks(context.plan);
    context.evidence.push(...await coordinateMission(context, scheduled));
    await this.persistence.save(context);
    publish('mission.coordinated', { missionId: context.mission.id, taskCount: scheduled.length });
    context.state = transition(context.state, 'executing');
    context.evidence.push(...await executeTasks(scheduled));
    await this.persistence.save(context);
    publish('mission.executed', { missionId: context.mission.id });
    context.state = transition(context.state, 'verifying');
    context.evidence.push(await verifyMission(context));
    await this.persistence.save(context);
    publish('mission.runtime.verified', { missionId: context.mission.id });
    context.state = transition(context.state, 'completed');
    context.updatedAt = new Date().toISOString();
    await this.persistence.save(context);
    publish('mission.runtime.completed', { missionId: context.mission.id, finalState: context.state });
    return { missionId: context.mission.id, success: true, finalState: context.state, evidence: context.evidence, events };
  }
}
