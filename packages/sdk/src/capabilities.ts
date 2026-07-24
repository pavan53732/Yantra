export interface FilesystemCapability {
  read(path: string): Promise<string>;
  write(path: string, content: string): Promise<void>;
  move(from: string, to: string): Promise<void>;
  delete(path: string): Promise<void>;
}

export interface TerminalCapability {
  run(command: string, cwd?: string): Promise<{ exitCode: number; stdout: string; stderr: string }>;
}

export interface GitCapability {
  init(cwd: string): Promise<void>;
  status(cwd: string): Promise<string>;
  add(cwd: string, paths?: string[]): Promise<void>;
  commit(cwd: string, message: string): Promise<void>;
}
