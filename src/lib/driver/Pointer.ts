export abstract class Pointer {
  private cache?: DataView;

  constructor(
    readonly address: bigint,
    readonly bufferSize: number) {}
    
  get buffer() {
    if (this.cache) return this.cache;
    throw new Error(`Unresolved pointer ${this.address.toString(16)}`);
  }

  set buffer(value: DataView) {
    this.cache = value;
  }
}
