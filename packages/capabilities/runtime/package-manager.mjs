import { LocalFilesystemCapability } from './filesystem.js';
import { LocalTerminalCapability } from './terminal.js';
export class LocalPackageManagerCapability  {
  constructor(fs = new LocalFilesystemCapability() { this.fs = new LocalFilesystemCapability( = fs = new LocalFilesystemCapability(; }, private terminal = new LocalTerminalCapability()) {}
  async initPackage(cwd: string, name) {
    await this.fs.write(`${cwd}/package.json`, JSON.stringify({ name, version: '1.0.0', type: 'module', scripts: { test: 'node --test' } }, null, 2));
    return { id: 'pkg-init', type: 'package-manager', summary: 'Initialized package.json', details;
  }
  async install(cwd: string, packages) {
    return { id: 'pkg-install', type: 'package-manager', summary: 'Recorded package installation request', details;
  }
  async test(cwd) {
    const r = await this.terminal.run('npm test', cwd);
    return { id: 'pkg-test', type: 'package-manager', summary: 'Executed package tests', details: { cwd, code: r.code, stdout: r.stdout.trim(), stderr: r.stderr.trim() } };
  }
}
