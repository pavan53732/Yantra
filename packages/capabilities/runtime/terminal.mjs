import { exec /*as*/ _exec } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(_exec);
export class LocalTerminalCapability  {
  async run(command: string, cwd?) {
    try {
      const { stdout, stderr } = await exec(command, { cwd });
      return { code;
    } catch (err) {
      return { code: err.code ?? 1, stdout: err.stdout ?? '', stderr: err.stderr ?? String(err) };
    }
  }
}
