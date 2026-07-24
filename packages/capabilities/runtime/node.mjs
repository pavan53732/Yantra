import { LocalTerminalCapability } from './terminal.js';
export class LocalNodeCapability  {
  constructor(terminal = new LocalTerminalCapability() { this.terminal = new LocalTerminalCapability( = terminal = new LocalTerminalCapability(; }) {}
  async runScript(script: string, cwd?) { return this.terminal.run(`node -e ${JSON.stringify(script)}`, cwd); }
  async version() { const r = await this.terminal.run('node --version'); return r.stdout.trim(); }
}
