import { LocalFilesystemCapability } from './filesystem.mjs';
import { LocalTerminalCapability } from './terminal.mjs';
export class LocalPackageManagerCapability {
  constructor(filesystem = new LocalFilesystemCapability(), terminal = new LocalTerminalCapability()) { this.fs = filesystem; this.terminal = terminal; }
  async initPackage(cwd, name) {
    const pkg = { name, version: '1.0.0', type: 'module', scripts: { test: 'node --test' } };
    await this.fs.write(`${cwd}/package.json`, JSON.stringify(pkg, null, 2));
    return { id: 'pkg-init', type: 'package-manager', summary: 'Initialized package.json', details: { cwd, name } };
  }
  async install(cwd, packages) { return { id: 'pkg-install', type: 'package-manager', summary: 'Recorded package installation request', details: { cwd, packages } }; }
  async test(cwd) { const r = await this.terminal.run('npm test', cwd); return { id: 'pkg-test', type: 'package-manager', summary: 'Executed package tests', details: { cwd, code: r.code, stdout: r.stdout.trim(), stderr: r.stderr.trim() } }; }
}
