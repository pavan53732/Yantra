export function createPreloadBridge() {
  return {
    mission: { run: 'ipc:mission:run', list: 'ipc:mission:list' },
    events: { subscribe: 'ipc:events:subscribe' },
    capabilities: { execute: 'ipc:capability:execute' }
  };
}
