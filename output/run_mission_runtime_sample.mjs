
import fs from 'node:fs';
import { MissionEngine, MemoryEventBus } from '/root/Yantra/packages/mission/runtime/engine.mjs';
const kernel = { events: new MemoryEventBus() };
const engine = new MissionEngine({ kernel });
const result = await engine.run({
  id: 'mission-sample-cli',
  objective: 'Create a new TypeScript CLI project with tests',
  priority: 'high'
});
fs.writeFileSync('/root/Yantra/output/mission-runtime-sample-result.json', JSON.stringify({ result, history: kernel.events.history() }, null, 2));
console.log(JSON.stringify({ success: result.success, finalState: result.finalState, evidenceCount: result.evidence.length, eventCount: result.events.length }, null, 2));
