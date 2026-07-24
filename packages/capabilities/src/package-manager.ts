import type { PackageManagerCapability, Evidence } from './types.js';
import { LocalFilesystemCapability } from './filesystem.js';
import { LocalTerminalCapability } from './terminal.js';
export class LocalPackageManagerCapability implements PackageManagerCapability {
  constructor(private fs = new LocalFilesystemCapability(), private terminal = new LocalTerminalCapability()) {}
  async initPackage(cwd: string, name: string): Promise<Evidence> {
    await this.fs.write(`${cwd}/package.json`, JSON.stringify({ name, version: '1.0.0', type: 'module', scripts: { test: 'node --test' } }, null, 2));
    return { id: 'pkg-init', type: 'package-manager', summary: 'Initialized package.json', details: { cwd, name } };
  }
  async install(cwd: string, packages: string[]): Promise<Evidence> {
    return { id: 'pkg-install', type: 'package-manager', summary: 'Recorded package installation request', details: { cwd, packages } };
  }
  async test(cwd: string): Promise<Evidence> {
    const r = await this.terminal.run('npm test', cwd);
    return { id: 'pkg-test', type: 'package-manager', summary: 'Executed package tests', details: { cwd, code: r.code, stdout: r.stdout.trim(), stderr: r.stderr.trim() } };
  }
}
