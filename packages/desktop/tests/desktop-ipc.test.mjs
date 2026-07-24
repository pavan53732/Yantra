import test from 'node:test';
import assert from 'node:assert/strict';
import { YantraDesktopApp } from '../runtime/app.mjs';

test('desktop app emits IPC events for boot, mission, and shutdown', () => {
  const app = new YantraDesktopApp();
  app.bootstrap();
  app.launchMission('mission-2');
  app.finishMission();
  app.shutdown();
  const channels = app.ipc.history().map((m) => m.channel);
  assert.deepEqual(channels, [
    'desktop.boot.completed',
    'desktop.mission.launch',
    'desktop.mission.complete',
    'desktop.shutdown'
  ]);
});
