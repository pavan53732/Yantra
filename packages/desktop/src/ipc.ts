import type { IPCMessage } from './types.js';
export class MemoryIPC {
  private messages: IPCMessage[] = [];
  send<T>(channel: string, payload: T) { this.messages.push({ channel, payload } as IPCMessage); }
  history() { return [...this.messages]; }
}
