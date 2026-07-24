import fs from 'node:fs/promises';
import path from 'node:path';
import type { FilesystemCapability } from './types.js';
export class LocalFilesystemCapability implements FilesystemCapability {
  async read(p: string) { return fs.readFile(p, 'utf8'); }
  async write(p: string, content: string) { await fs.mkdir(path.dirname(p), { recursive: true }); await fs.writeFile(p, content); }
  async move(from: string, to: string) { await fs.mkdir(path.dirname(to), { recursive: true }); await fs.rename(from, to); }
  async delete(p: string) { await fs.rm(p, { force: true, recursive: true }); }
}
