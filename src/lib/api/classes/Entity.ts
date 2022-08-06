import * as app from '..';

export class Entity {
  readonly address: bigint;
  readonly emitter = new EventTarget();
  readonly members: Record<string, app.EntityMember>;

  constructor(address: bigint, members: Array<app.Adapter<app.EntityMember>>) {
    this.address = address;
    this.members = toRecord(members.map(x => x.source));
  }

  receive(value: app.BasicSync | app.EntityUpdateEntity) {
    if (value instanceof app.EntityUpdateEntity) {
      this.handleUpdate(value);
    } else {
      this.handleSync(value);
    }
  }

  update(syncId: number) {
    const packets = Object.values(this.members)
      .map(x => x.update(syncId))
      .filter(Boolean)
      .map(x => x!);
    return packets.length
      ? new app.EntityChange(this.address, packets)
      : undefined;
  }

  private handleUpdate(update: app.EntityUpdateEntity) {
    this.emitter.dispatchEvent(new Event('preReceive'));
    update.members.forEach(x => this.members[x.offset.toString(16)]?.receive(x));
    this.emitter.dispatchEvent(new Event('postReceive'));
  }

  private handleSync(sync: app.BasicSync) {
    Object.values(this.members).forEach(x => x.receive(sync));
  }
}

function toRecord(members: Array<app.EntityMember>) {
  const result: Record<string, app.EntityMember> = {};
  for (const x of members) result[x.offset.toString(16)] ??= x;
  return result;
}
