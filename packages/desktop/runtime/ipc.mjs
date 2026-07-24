export class MemoryIPC { constructor(){ this.messages=[]; } send(channel,payload){ this.messages.push({channel,payload}); } history(){ return [...this.messages]; } }
