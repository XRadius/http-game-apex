import * as app from '.';

export class MainViewModel {
  readonly areas = [
    new app.AreaViewModel(app.language.itemsAmmo, x => x.itemType === 'Ammo'),
    new app.AreaViewModel(app.language.itemsGearBackpack, x => x.itemType === 'Gear' && x.gearType === 'Backpack'),
    new app.AreaViewModel(app.language.itemsGearBodyShield, x => x.itemType === 'Gear' && x.gearType === 'BodyShield'),
    new app.AreaViewModel(app.language.itemsGearEvoShield, x => x.itemType === 'Gear' && x.gearType === 'EvoShield'),
    new app.AreaViewModel(app.language.itemsGearHelmet, x => x.itemType === 'Gear' && x.gearType === 'Helmet'),
    new app.AreaViewModel(app.language.itemsGearKnockdownShield, x => x.itemType === 'Gear' && x.gearType === 'KnockdownShield'),
    new app.AreaViewModel(app.language.itemsGrenade, x => x.itemType === 'Grenade'),
    new app.AreaViewModel(app.language.itemsRegen, x => x.itemType === 'Regen'),
    new app.AreaViewModel(app.language.itemsWeaponsEnergy, x => x.itemType === 'Weapon' && x.ammoType === 'Energy'),
    new app.AreaViewModel(app.language.itemsWeaponsHeavy, x => x.itemType === 'Weapon' && x.ammoType === 'Heavy'),
    new app.AreaViewModel(app.language.itemsWeaponsLight, x => x.itemType === 'Weapon' && x.ammoType === 'Light'),
    new app.AreaViewModel(app.language.itemsWeaponShotgun, x => x.itemType === 'Weapon' && x.ammoType === 'Shotgun'),
    new app.AreaViewModel(app.language.itemsWeaponsSniper, x => x.itemType === 'Weapon' && x.ammoType === 'Sniper'),
    new app.AreaViewModel(app.language.itemsWeaponsSpecial, x => x.itemType === 'Weapon' && x.ammoType === 'Special'),
    new app.AreaViewModel(app.language.itemsWeaponAttachments, x => x.itemType === 'Attachment')
  ];

  toItemSet(value: Set<number>) {
    for (const area of this.areas) {
      area.toItemSet(value);
    }
  }
}
