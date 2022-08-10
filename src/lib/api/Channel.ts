import * as app from '.';

export class Channel {
  private readonly alive: app.AliveProvider;
  private readonly entities: app.EntityProvider;
  private readonly socket: WebSocket;
  private syncId = 0;

  constructor(pid: number) {
    this.alive = new app.AliveProvider();
    this.entities = new app.EntityProvider();
    this.socket = new WebSocket(`ws://${location.host}/ws/direct/${pid}`);
    this.socket.binaryType = 'arraybuffer';
    this.socket.addEventListener('message', x => this.receive(x));
  }

  create(adapter: app.Adapter<app.Entity>) {
    this.entities.create(adapter.source);
  }

  delete(adapter: app.Adapter<app.Entity>) {
    this.entities.delete(adapter.source);
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
      const stream = new app.BinaryReader(ev.data);
      while (stream.hasBytes()) {
        switch (stream.readUInt8() as app.PacketType) {
          case app.PacketType.BasicSync:
            this.entities.receive(app.BasicSync.create(stream));
            break;
          case app.PacketType.EntityUpdate:
            this.entities.receive(app.EntityUpdate.create(stream));
            break;
        }
      }
    }
  }

  private update() {
    const stream = new app.BinaryWriter();
    this.alive.update(stream);
    this.entities.update(stream, this.syncId);
    if (stream.hasBytes()) {
      new app.BasicSync(this.syncId).write(stream);
      this.socket.send(stream.toBuffer());
      this.syncId = this.syncId !== 255 ? this.syncId + 1 : 0;
    }
  }
}
