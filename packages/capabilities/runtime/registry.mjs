import { LocalFilesystemCapability } from './filesystem.mjs';
import { LocalTerminalCapability } from './terminal.mjs';
import { LocalGitCapability } from './git.mjs';
import { LocalNodeCapability } from './node.mjs';
import { LocalPackageManagerCapability } from './package-manager.mjs';
export function createCapabilityRegistry() {
  const terminal = new LocalTerminalCapability();
  const filesystem = new LocalFilesystemCapability();
  return {
    filesystem,
    terminal,
    git: new LocalGitCapability(terminal),
    node: new LocalNodeCapability(terminal),
    packageManager: new LocalPackageManagerCapability(filesystem, terminal)
  };
}
