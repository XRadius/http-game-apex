import * as app from '..';

export type Attachment = {
  itemId: number;
  itemType: 'Attachment';
  name: string;
  attachmentType: app.AttachmentType,
  weaponTypes?: Array<app.WeaponType>;
  level: 1 | 2 | 3 | 4;
};
