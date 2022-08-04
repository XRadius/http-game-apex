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
      const stream = new app.BinaryReader(new DataView(ev.data));
      while (stream.hasBytes()) {
        switch (stream.readUInt8() as app.PacketType) {
          case app.PacketType.EntityUpdate:
            this.tracker.receive(app.EntityUpdate.create(stream));
            break;
        }
      }
    }
  }

  private update() {
    const stream = new app.BinaryWriter();
    this.tracker.update(stream);
    if (!this.nextActiveTime || this.nextActiveTime < Date.now()) {
      stream.writeUInt8(app.PacketType.Activity);
      this.nextActiveTime = Date.now() + 10000;
      this.socket.send(stream.toBuffer());
    } else if (stream.hasBytes()) {
      this.socket.send(stream.toBuffer());
    }
  }
}
