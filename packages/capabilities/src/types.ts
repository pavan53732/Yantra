export type Evidence = { id: string; type: string; summary: string; details?: Record<string, unknown> };
export interface FilesystemCapability { read(path: string): Promise<string>; write(path: string, content: string): Promise<void>; move(from: string, to: string): Promise<void>; delete(path: string): Promise<void>; }
export interface TerminalCapability { run(command: string, cwd?: string): Promise<{ code: number; stdout: string; stderr: string }>; }
export interface GitCapability { init(cwd: string): Promise<Evidence>; status(cwd: string): Promise<Evidence>; addAll(cwd: string): Promise<Evidence>; commit(cwd: string, message: string): Promise<Evidence>; }
export interface NodeCapability { runScript(script: string, cwd?: string): Promise<{ code: number; stdout: string; stderr: string }>; version(): Promise<string>; }
export interface PackageManagerCapability { initPackage(cwd: string, name: string): Promise<Evidence>; install(cwd: string, packages: string[]): Promise<Evidence>; test(cwd: string): Promise<Evidence>; }
