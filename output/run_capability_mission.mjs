import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { executeCapabilityMission } from '/root/Yantra/packages/capabilities/runtime/mission-executor.mjs';
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yantra-cap-run-'));
const result = await executeCapabilityMission(dir);
fs.writeFileSync('/root/Yantra/output/capability-mission-sample-result.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify({ success: result.success, evidenceCount: result.evidence.length, projectDir: result.projectDir }, null, 2));
