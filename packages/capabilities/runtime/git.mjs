import { LocalTerminalCapability } from './terminal.mjs';
export class LocalGitCapability {
  constructor(terminal = new LocalTerminalCapability()) { this.terminal = terminal; }
  async init(cwd) { await this.terminal.run('git init', cwd); return { id: 'git-init', type: 'git', summary: 'Initialized git repository', details: { cwd } }; }
  async status(cwd) { const r = await this.terminal.run('git status --short', cwd); return { id: 'git-status', type: 'git', summary: 'Collected git status', details: { cwd, stdout: r.stdout.trim() } }; }
  async addAll(cwd) { await this.terminal.run('git add .', cwd); return { id: 'git-add', type: 'git', summary: 'Added files to git index', details: { cwd } }; }
  async commit(cwd, message) { const escaped = message.replace(/"/g, '\"'); const r = await this.terminal.run(`git -c user.name="Yantra" -c user.email="yantra@example.com" commit -m "${escaped}"`, cwd); return { id: 'git-commit', type: 'git', summary: 'Committed changes', details: { cwd, code: r.code, stdout: r.stdout.trim(), stderr: r.stderr.trim() } }; }
}
