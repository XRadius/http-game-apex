import * as app from '..';

export class LevelName extends app.api.Adapter<app.api.Entity> {
  constructor(address: bigint,
    private readonly levelName = new app.CString(0, 1000, 32)) {
    super(new app.api.Entity(address, [levelName]));
  }

  get value() {
    return this.levelName.value;
  }
}
