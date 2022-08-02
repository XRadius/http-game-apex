import * as app from '..';

export class Entity {
  readonly address: bigint;
  readonly emitter = new EventTarget();
  readonly members: Record<string, app.EntityMember>;

  constructor(address: bigint, members: Array<app.Adapter<app.EntityMember>>) {
    this.address = address;
    this.members = toRecord(members.map(x => x.source));
  }

  receive(update: app.UpdateEntity) {
    this.emitter.dispatchEvent(new Event('preReceive'));
    update.members.forEach(x => this.members[x.offset.toString(16)]?.receive(x));
    this.emitter.dispatchEvent(new Event('postReceive'));
  }

  update() {
    const packets = Object.values(this.members)
      .map(x => x.update())
      .filter(Boolean)
      .map(x => x!);
    return packets.length
      ? new app.ChangeEntity(this.address, packets)
      : undefined;
  }
}

function toRecord(members: Array<app.EntityMember>) {
  const result: Record<string, app.EntityMember> = {};
  for (const x of members) result[x.offset.toString(16)] ??= x;
  return result;
}
