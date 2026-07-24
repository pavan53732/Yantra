import fs from 'node:fs';
import { VerificationEngine } from '/root/Yantra/packages/verification/runtime/engine.mjs';
const sample = JSON.parse(fs.readFileSync('/root/Yantra/output/capability-mission-sample-result.json', 'utf8'));
const engine = new VerificationEngine();
const report = engine.run({ evidence: sample.evidence, docs: ['README.md'] });
fs.writeFileSync('/root/Yantra/output/verification-sample-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary, null, 2));
