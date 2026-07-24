import type { GitCapability, Evidence } from './types.js';
import { LocalTerminalCapability } from './terminal.js';
export class LocalGitCapability implements GitCapability {
  constructor(private terminal = new LocalTerminalCapability()) {}
  async init(cwd: string): Promise<Evidence> { await this.terminal.run('git init', cwd); return { id: 'git-init', type: 'git', summary: 'Initialized git repository', details: { cwd } }; }
  async status(cwd: string): Promise<Evidence> { const r = await this.terminal.run('git status --short', cwd); return { id: 'git-status', type: 'git', summary: 'Collected git status', details: { cwd, stdout: r.stdout.trim() } }; }
  async addAll(cwd: string): Promise<Evidence> { await this.terminal.run('git add .', cwd); return { id: 'git-add', type: 'git', summary: 'Added files to git index', details: { cwd } }; }
  async commit(cwd: string, message: string): Promise<Evidence> { const r = await this.terminal.run(`git -c user.name="Yantra" -c user.email="yantra@example.com" commit -m "${message.replace(/"/g, '\"')}"`, cwd); return { id: 'git-commit', type: 'git', summary: 'Committed changes', details: { cwd, code: r.code, stdout: r.stdout.trim(), stderr: r.stderr.trim() } }; }
}
