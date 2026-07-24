import path from 'node:path';
export function createDesktopConfig(baseDir) {
  return {
    title: 'Yantra',
    width: 1440,
    height: 960,
    preload: path.join(baseDir, 'preload.js'),
    entry: path.join(baseDir, 'renderer/index.html')
  };
}
export function bootstrapDesktopShell(baseDir) {
  return {
    window: createDesktopConfig(baseDir),
    processModel: 'single-main-window',
    security: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  };
}
