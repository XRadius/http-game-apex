import * as app from '..';

export class EntityProvider implements app.IPacketProvider {
  private readonly createEntities = new Map<number, app.Entity>();
  private readonly deleteEntities = new Map<number, app.Entity>();
  private readonly livingEntities = new Map<number, app.Entity>();
  private readonly lookupEntities = new Map<app.Entity, number>();
  private readonly releasedIds: Array<number> = [];
  private nextId = 0;

  create(entity: app.Entity) {
    const id = this.releasedIds.pop();
    if (typeof id !== 'undefined') {
      this.createEntities.set(id, entity);
      this.lookupEntities.set(entity, id);
    } else {
      const id = this.nextId;
      this.createEntities.set(id, entity);
      this.lookupEntities.set(entity, id);
      this.nextId++;
    }
  }

  delete(entity: app.Entity) {
    const id = this.lookupEntities.get(entity);
    if (typeof id === 'undefined') {
      throw new Error();
    } else if (this.createEntities.has(id)) {
      this.createEntities.delete(id);
      this.lookupEntities.delete(entity);
    } else if (this.livingEntities.has(id)) {
      this.deleteEntities.set(id, entity);
      this.livingEntities.delete(id);
      this.lookupEntities.delete(entity);
    }
  }

  receive(packet: app.BasicSync | app.EntityUpdate) {
    if (packet instanceof app.EntityUpdate) {
      this.receiveUpdate(packet);
    } else {
      this.receiveSync(packet);
    }
  }

  update(stream: app.BinaryWriter, syncId: number) {
    for (const id of this.deleteEntities.keys()) {
      const packet = new app.EntityDelete(id);
      this.deleteEntities.delete(id);
      this.releasedIds.push(id);
      packet.write(stream);
    }
    for (const [id, entity] of this.createEntities) {
      const packet = new app.EntityCreate(id, entity.address, convertMembers(entity.members), Boolean(entity.options?.requestBatch));
      this.createEntities.delete(id);
      this.livingEntities.set(id, entity);
      packet.write(stream);
    }
    for (const [id, entity] of this.livingEntities) {
      if (!entity.options || !entity.options.enableUpdate) continue;
      const packet = entity.update(id, syncId);
      if (!packet) continue;
      packet.write(stream);
    }
  }

  private receiveUpdate(packet: app.EntityUpdate) {
    for (const child of packet.entities) {
      const entity = this.livingEntities.get(child.id);
      if (!entity) continue;
      entity.receive(child);
    }
  }

  private receiveSync(packet: app.BasicSync) {
    for (const entity of this.livingEntities.values()) {
      if (!entity.options || !entity.options.enableUpdate) continue;
      entity.receive(packet);
    }
  }
}

function convertMembers(members: Map<number, app.EntityMember>) {
  const result: Array<app.EntityCreateMember> = [];
  for (const [id, member] of members) result.push(new app.EntityCreateMember(id, member.interval, member.buffer.byteLength));
  return result;
}
