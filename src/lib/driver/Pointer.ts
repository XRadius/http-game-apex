export class Pointer {
  private result?: DataView;

  constructor(
    readonly address: bigint,
    readonly size: number) {}
    
  get buffer() {
    if (this.result) return this.result;
    throw new Error(`Unresolved pointer ${this.address.toString(16)}`);
  }

  resolve(result: DataView) {
    this.result = result;
  }
}
