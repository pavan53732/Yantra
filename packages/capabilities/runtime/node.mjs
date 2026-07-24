import { LocalTerminalCapability } from './terminal.mjs';
export class LocalNodeCapability {
  constructor(terminal = new LocalTerminalCapability()) { this.terminal = terminal; }
  async runScript(script, cwd) { return this.terminal.run(`node -e ${JSON.stringify(script)}`, cwd); }
  async version() { const r = await this.terminal.run('node --version'); return r.stdout.trim(); }
}
