export interface DesktopWindowConfig {
  title: string;
  width: number;
  height: number;
  preload: string;
  entry: string;
}

export interface DesktopShellState {
  ready: boolean;
  activeView: 'home' | 'missions' | 'events' | 'settings';
}
