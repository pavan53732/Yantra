import type { DesktopShellState } from './types.js';

export function createInitialShellState(): DesktopShellState {
  return {
    ready: true,
    activeView: 'home'
  };
}

export function renderShellHtml() {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Yantra</title></head>
<body>
  <div id="app">
    <header><h1>Yantra Desktop</h1></header>
    <nav>
      <button data-view="home">Home</button>
      <button data-view="missions">Missions</button>
      <button data-view="events">Events</button>
      <button data-view="settings">Settings</button>
    </nav>
    <main><p>Desktop shell initialized.</p></main>
  </div>
</body>
</html>`;
}
