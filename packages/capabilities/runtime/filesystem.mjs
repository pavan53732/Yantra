import fs from 'node:fs/promises';
import path from 'node:path';
export class LocalFilesystemCapability {
  async read(p) { return fs.readFile(p, 'utf8'); }
  async write(p, content) { await fs.mkdir(path.dirname(p), { recursive: true }); await fs.writeFile(p, content); }
  async move(from, to) { await fs.mkdir(path.dirname(to), { recursive: true }); await fs.rename(from, to); }
  async delete(p) { await fs.rm(p, { force: true, recursive: true }); }
}
