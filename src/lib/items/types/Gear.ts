import * as app from '..';

export type Gear = {
  itemId: number;
  itemType: 'Gear';
  name: string;
  gearType: app.GearType;
  level: 1 | 2 | 3 | 4;
};
