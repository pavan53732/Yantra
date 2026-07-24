import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { LocalFilesystemCapability } from '../runtime/filesystem.mjs';
import { LocalTerminalCapability } from '../runtime/terminal.mjs';
import { LocalNodeCapability } from '../runtime/node.mjs';

test('filesystem capability writes and reads files', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yantra-fs-'));
  const cap = new LocalFilesystemCapability();
  const file = path.join(dir, 'a.txt');
  await cap.write(file, 'hello');
  assert.equal(await cap.read(file), 'hello');
});

test('terminal capability executes shell commands', async () => {
  const cap = new LocalTerminalCapability();
  const r = await cap.run('printf hello');
  assert.equal(r.code, 0);
  assert.equal(r.stdout, 'hello');
});

test('node capability reports node version', async () => {
  const cap = new LocalNodeCapability();
  const v = await cap.version();
  assert.match(v, /^v\d+/);
});
