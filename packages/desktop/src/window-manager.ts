import type { DesktopWindow } from './types.js';
import { transitionWindow } from './state-machine.js';
export class DesktopWindowManager {
  private windows = new Map<string, DesktopWindow>();
  createMainWindow(route = '/'): DesktopWindow {
    const win: DesktopWindow = { id: 'win-main', title: 'Yantra', state: 'created', route };
    this.windows.set(win.id, win);
    return win;
  }
  ready(windowId: string) { const win = this.windows.get(windowId)!; win.state = transitionWindow(win.state, 'ready'); return win; }
  show(windowId: string) { const win = this.windows.get(windowId)!; win.state = transitionWindow(win.state, 'visible'); return win; }
  close(windowId: string) { const win = this.windows.get(windowId)!; win.state = transitionWindow(win.state, 'closed'); return win; }
  list() { return [...this.windows.values()]; }
}
