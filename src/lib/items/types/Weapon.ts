import * as app from '..';

export type Weapon = {
  itemId: number;
  itemType: 'Weapon';
  name: string;
  ammoType: app.AmmoType;
  weaponType: app.WeaponType;
  slots: Array<app.AttachmentType>;
};
