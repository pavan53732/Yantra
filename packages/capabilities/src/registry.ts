import { LocalFilesystemCapability } from './filesystem.js';
import { LocalTerminalCapability } from './terminal.js';
import { LocalGitCapability } from './git.js';
import { LocalNodeCapability } from './node.js';
import { LocalPackageManagerCapability } from './package-manager.js';
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
