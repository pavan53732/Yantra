import type { DesktopSessionState, DesktopWindowState } from './types.js';
const sessionTransitions: Record<DesktopSessionState, DesktopSessionState[]> = {
  idle: ['booting', 'shutdown'],
  booting: ['ready', 'error'],
  ready: ['running-mission', 'shutdown', 'error'],
  'running-mission': ['ready', 'error', 'shutdown'],
  error: ['shutdown'],
  shutdown: []
};
const windowTransitions: Record<DesktopWindowState, DesktopWindowState[]> = {
  created: ['ready', 'closed'],
  ready: ['visible', 'closed'],
  visible: ['closed'],
  closed: []
};
export function transitionSession(from: DesktopSessionState, to: DesktopSessionState) { if (!sessionTransitions[from].includes(to)) throw new Error(`Invalid desktop session transition: ${from} -> ${to}`); return to; }
export function transitionWindow(from: DesktopWindowState, to: DesktopWindowState) { if (!windowTransitions[from].includes(to)) throw new Error(`Invalid desktop window transition: ${from} -> ${to}`); return to; }
