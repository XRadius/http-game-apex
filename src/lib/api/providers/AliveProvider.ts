import * as app from '..';

export class AliveProvider implements app.IPacketProvider {
  private nextActiveTime = this.getNextTime();

  update(stream: app.BinaryWriter) {
    if (this.nextActiveTime >= Date.now()) return;
    new app.BasicAlive().write(stream);
    this.nextActiveTime = this.getNextTime();
  }

  private getNextTime() {
    return Date.now() + 10000;
  }
}
