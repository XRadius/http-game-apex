import * as app from '..';

export class Signifier extends app.api.Adapter<app.api.Entity> {
  constructor(address: bigint,
    private readonly signifierName = new app.CString(0, 60000, 32)) {
    super(new app.api.Entity(address, [signifierName]));
  }

  get value() {
    return this.signifierName.value;
  }
}
