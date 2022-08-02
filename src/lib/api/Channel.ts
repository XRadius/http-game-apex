import * as app from '.';

export class Channel {
  private readonly tracker: app.Tracker;
  private readonly socket: WebSocket;
  private nextActiveTime?: number;

  constructor(pid: number) {
    this.socket = new WebSocket(`ws://${location.host}/ws/direct/${pid}`);
    this.socket.binaryType = 'arraybuffer';
    this.socket.addEventListener('message', x => this.receive(x));
    this.tracker = new app.Tracker();
  }

  create(adapter: app.Adapter<app.Entity>) {
    this.tracker.create(adapter.source);
  }

  delete(adapter: app.Adapter<app.Entity>) {
    this.tracker.delete(adapter.source);
  }

  async runAsync(renderFrame: () => void) {
    while (true) {
      switch (this.socket.readyState) {
        case this.socket.CONNECTING:
          await new Promise(requestAnimationFrame);
          break;
        case this.socket.OPEN:
          renderFrame();
          this.update();
          await new Promise(requestAnimationFrame);
          break;
        default:
          throw new Error('Invalid channel state!');
      }
    }
  }

  private receive(ev: MessageEvent) {
    if (ev.data instanceof ArrayBuffer) {
      const reader = new app.BinaryReader(new DataView(ev.data));
      while (reader.hasBytes()) {
        switch (reader.readUInt8() as app.PacketType) {
          case app.PacketType.Update:
            this.tracker.receive(app.UpdateArray.create(reader));
            break;
        }
      }
    }
  }

  private update() {
    const writer = new app.BinaryWriter();
    this.tracker.update(writer);
    if (!this.nextActiveTime || this.nextActiveTime < Date.now()) {
      writer.writeUInt8(app.PacketType.Activity);
      this.nextActiveTime = Date.now() + 10000;
      this.socket.send(writer.toBuffer());
    } else if (writer.hasBytes()) {
      this.socket.send(writer.toBuffer());
    }
  }
}
