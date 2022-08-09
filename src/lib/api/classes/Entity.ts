import * as app from '..';

export class Entity {
  readonly address: bigint;
  readonly emitter = new EventTarget();
  readonly members: Record<string, app.EntityMember>;
  readonly options?: IOptions;

  constructor(address: bigint, members: Array<app.Adapter<app.EntityMember>>, options?: IOptions) {
    this.address = address;
    this.members = toRecord(members.map(x => x.source));
    this.options = options;
  }

  receive(value: app.BasicSync | app.EntityUpdateEntity) {
    if (value instanceof app.EntityUpdateEntity) {
      this.handleUpdate(value);
    } else {
      this.handleSync(value);
    }
  }

  update(id: number, syncId: number) {
    const packets: Array<app.EntityChangeMember> = [];
    for (const member of Object.values(this.members)) {
      const packet = member.update(syncId);
      if (!packet) continue;
      packets.push(packet);
    }
    return packets.length
      ? new app.EntityChange(id, packets)
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

type IOptions = {
  disableUpdate?: boolean;
  requestBatch?: boolean;
}
