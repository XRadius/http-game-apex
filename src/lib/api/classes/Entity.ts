import * as app from '..';

export class Entity {
  readonly address: bigint;
  readonly members: Map<number, app.EntityMember>;
  readonly options?: IOptions;

  constructor(address: bigint, members: Iterable<app.Adapter<app.EntityMember>>, options?: IOptions) {
    this.address = address;
    this.members = convertMembers(members);
    this.options = options;
  }

  receive(packet: app.BasicSync | app.EntityUpdateEntity) {
    if (packet instanceof app.EntityUpdateEntity) {
      this.receiveUpdate(packet);
    } else {
      this.receiveSync(packet);
    }
  }

  update(id: number, syncId: number) {
    const packets: Array<app.EntityChangeMember> = [];
    this.createUpdate(packets, syncId);
    return packets.length ? new app.EntityChange(id, packets) : undefined;
  }

  private createUpdate(packets: Array<app.EntityChangeMember>, syncId: number) {
    for (const member of this.members.values()) {
      const packet = member.update(syncId);
      if (!packet) continue;
      packets.push(packet);
    }
  }

  private receiveUpdate(packet: app.EntityUpdateEntity) {
    for (const child of packet.members) {
      const member = this.members.get(child.offset);
      if (!member) continue;
      member.receive(child);
    }
  }

  private receiveSync(packet: app.BasicSync) {
    for (const member of this.members.values()) {
      member.receive(packet);
    }
  }
}

function convertMembers(members: Iterable<app.Adapter<app.EntityMember>>) {
  const result = new Map<number, app.EntityMember>();
  for (const member of members) result.set(member.source.offset, member.source);
  return result;
}

type IOptions = {
  enableUpdate?: boolean;
  requestBatch?: boolean;
}
