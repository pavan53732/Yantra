import path from 'node:path';
import { createCapabilityRegistry } from './registry.mjs';
export async function executeCapabilityMission(baseDir) {
  const c = createCapabilityRegistry();
  const projectDir = path.join(baseDir, 'sample-capability-mission');
  const evidence = [];
  await c.filesystem.write(path.join(projectDir, 'src/index.js'), `export const main = () => console.log("hello from yantra");
`);
  evidence.push({ id: 'fs-write', type: 'filesystem', summary: 'Wrote project source file', details: { projectDir } });
  evidence.push(await c.packageManager.initPackage(projectDir, 'sample-capability-mission'));
  await c.filesystem.write(path.join(projectDir, 'sample.test.js'), `import test from "node:test"; import assert from "node:assert/strict"; test("truth", ()=> assert.equal(1,1));
`);
  evidence.push({ id: 'fs-write-test', type: 'filesystem', summary: 'Wrote sample test file', details: { projectDir } });
  evidence.push(await c.git.init(projectDir));
  evidence.push(await c.git.addAll(projectDir));
  evidence.push(await c.packageManager.test(projectDir));
  evidence.push(await c.git.commit(projectDir, 'Initial capability mission scaffold'));
  evidence.push(await c.git.status(projectDir));
  const nodeVersion = await c.node.version();
  evidence.push({ id: 'node-version', type: 'node', summary: 'Resolved node version', details: { nodeVersion } });
  return { success: true, projectDir, evidence };
}
