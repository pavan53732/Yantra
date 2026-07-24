import type { NodeCapability } from './types.js';
import { LocalTerminalCapability } from './terminal.js';
export class LocalNodeCapability implements NodeCapability {
  constructor(private terminal = new LocalTerminalCapability()) {}
  async runScript(script: string, cwd?: string) { return this.terminal.run(`node -e ${JSON.stringify(script)}`, cwd); }
  async version() { const r = await this.terminal.run('node --version'); return r.stdout.trim(); }
}
