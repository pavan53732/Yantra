import path from 'node:path';
import type { DesktopWindowConfig } from './types.js';

export function createDesktopConfig(baseDir: string): DesktopWindowConfig {
  return {
    title: 'Yantra',
    width: 1440,
    height: 960,
    preload: path.join(baseDir, 'preload.js'),
    entry: path.join(baseDir, 'renderer/index.html')
  };
}

export function bootstrapDesktopShell(baseDir: string) {
  return {
    window: createDesktopConfig(baseDir),
    processModel: 'single-main-window',
    security: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  };
}
