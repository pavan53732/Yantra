export type DesktopWindowState = 'created' | 'ready' | 'visible' | 'closed';
export type DesktopSessionState = 'idle' | 'booting' | 'ready' | 'running-mission' | 'error' | 'shutdown';
export interface DesktopWindow { id: string; title: string; state: DesktopWindowState; route: string; }
export interface DesktopSession { id: string; state: DesktopSessionState; windows: DesktopWindow[]; activeMissionId?: string; }
export interface IPCMessage<T = Record<string, unknown>> { channel: string; payload: T; }
export interface DesktopLaunchResult { sessionId: string; mainWindowId: string; route: string; }
