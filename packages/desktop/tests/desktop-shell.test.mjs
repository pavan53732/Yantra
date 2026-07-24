import test from 'node:test';
import assert from 'node:assert/strict';
import { bootstrapDesktopShell } from '../runtime/main.mjs';
import { createPreloadBridge } from '../runtime/preload.mjs';
import { createInitialShellState, renderShellHtml } from '../runtime/renderer-shell.mjs';

test('desktop shell bootstrap returns secure main window model', () => {
  const shell = bootstrapDesktopShell('/tmp/yantra-desktop');
  assert.equal(shell.processModel, 'single-main-window');
  assert.equal(shell.security.contextIsolation, true);
  assert.equal(shell.security.nodeIntegration, false);
});

test('preload bridge exposes mission, events, and capabilities channels', () => {
  const bridge = createPreloadBridge();
  assert.equal(bridge.mission.run, 'ipc:mission:run');
  assert.equal(bridge.events.subscribe, 'ipc:events:subscribe');
  assert.equal(bridge.capabilities.execute, 'ipc:capability:execute');
});

test('renderer shell initializes with home view and renders HTML', () => {
  const state = createInitialShellState();
  const html = renderShellHtml();
  assert.equal(state.activeView, 'home');
  assert.match(html, /Yantra Desktop/);
  assert.match(html, /data-view="missions"/);
});
