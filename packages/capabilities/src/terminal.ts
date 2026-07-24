import { exec as _exec } from 'node:child_process';
import { promisify } from 'node:util';
import type { TerminalCapability } from './types.js';
const exec = promisify(_exec);
export class LocalTerminalCapability implements TerminalCapability {
  async run(command: string, cwd?: string) {
    try {
      const { stdout, stderr } = await exec(command, { cwd });
      return { code: 0, stdout, stderr };
    } catch (err) {
      return { code: err.code ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? String(err) };
    }
  }
}
