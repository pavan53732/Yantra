import test from 'node:test';
import assert from 'node:assert/strict';
import { YantraDesktopApp } from '../runtime/app.mjs';

test('desktop app bootstraps main window and session', () => {
  const app = new YantraDesktopApp();
  const launch = app.bootstrap();
  const snap = app.snapshot();
  assert.equal(launch.route, '/missions');
  assert.equal(snap.state, 'ready');
  assert.equal(snap.windows[0].state, 'visible');
});

test('desktop app launches and completes mission lifecycle', () => {
  const app = new YantraDesktopApp();
  app.bootstrap();
  const launched = app.launchMission('mission-1');
  assert.equal(launched.state, 'running-mission');
  const ready = app.finishMission();
  assert.equal(ready.state, 'ready');
});
