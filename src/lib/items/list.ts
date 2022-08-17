import * as app from '.';

// TODO: Missing Heat Shield & Mobile Respawn Beacon
export const list: Array<app.All> = [{
  itemId: 1,
  itemType: 'Weapon',
  name: 'Kraber .50-Cal Sniper',
  ammoType: 'Special',
  weaponType: 'Sniper',
  slots: []
}, {
  itemId: 2,
  itemType: 'Weapon',
  name: 'Mastiff Shotgun',
  ammoType: 'Special',
  weaponType: 'Shotgun',
  slots: ['Optics']
}, {
  itemId: 7,
  itemType: 'Weapon',
  name: 'L-STAR EMG',
  ammoType: 'Energy',
  weaponType: 'Marksman',
  slots: ['BarrelStabilizer', 'ExtendedEnergyMag', 'Optics', 'StandardStock']
}, {
  itemId: 12,
  itemType: 'Weapon',
  name: 'HAVOC Rifle',
  ammoType: 'Energy',
  weaponType: 'AR',
  slots: ['ExtendedEnergyMag', 'Optics', 'StandardStock', 'Turbocharger']
}, {
  itemId: 17,
  itemType: 'Weapon',
  name: 'Devotion LMG',
  ammoType: 'Energy',
  weaponType: 'LMG',
  slots: ['BarrelStabilizer', 'ExtendedEnergyMag', 'Optics', 'StandardStock', 'Turbocharger']
}, {
  itemId: 22,
  itemType: 'Weapon',
  name: 'Triple Take',
  ammoType: 'Energy',
  weaponType: 'Marksman',
  slots: ['ExtendedEnergyMag', 'Optics', 'SniperStock', 'KineticFeeder']
}, {
  itemId: 27,
  itemType: 'Weapon',
  name: 'VK-47 Flatline',
  ammoType: 'Heavy',
  weaponType: 'AR',
  slots: ['ExtendedHeavyMag', 'Optics', 'StandardStock']
}, {
  itemId: 32,
  itemType: 'Weapon',
  name: 'Hemlok Burst AR',
  ammoType: 'Heavy',
  weaponType: 'AR',
  slots: ['BarrelStabilizer', 'ExtendedHeavyMag', 'Optics', 'StandardStock', 'BoostedLoader']
}, {
  itemId: 37,
  itemType: 'Weapon',
  name: 'G7 Scout',
  ammoType: 'Light',
  weaponType: 'Marksman',
  slots: ['BarrelStabilizer', 'ExtendedLightMag', 'Optics', 'SniperStock', 'DoubleTapTrigger']
}, {
  itemId: 42,
  itemType: 'Weapon',
  name: 'Alternator SMG',
  ammoType: 'Light',
  weaponType: 'SMG',
  slots: ['LaserLight', 'ExtendedLightMag', 'Optics', 'StandardStock']
}, {
  itemId: 47,
  itemType: 'Weapon',
  name: 'R-99 SMG',
  ammoType: 'Light',
  weaponType: 'SMG',
  slots: ['LaserLight', 'ExtendedLightMag', 'Optics', 'StandardStock']
}, {
  itemId: 52,
  itemType: 'Weapon',
  name: 'Prowler Burst PDW',
  ammoType: 'Heavy',
  weaponType: 'SMG',
  slots: ['LaserLight', 'ExtendedHeavyMag', 'Optics', 'StandardStock']
}, {
  itemId: 57,
  itemType: 'Weapon',
  name: 'Volt SMG',
  ammoType: 'Energy',
  weaponType: 'SMG',
  slots: ['LaserLight', 'ExtendedEnergyMag', 'Optics', 'StandardStock']
}, {
  itemId: 62,
  itemType: 'Weapon',
  name: 'Longbow DMR',
  ammoType: 'Sniper',
  weaponType: 'Sniper',
  slots: ['BarrelStabilizer', 'ExtendedSniperMag', 'Optics', 'SniperStock', 'SkullpiercerRifling']
}, {
  itemId: 67,
  itemType: 'Weapon',
  name: 'Charge Rifle',
  ammoType: 'Sniper',
  weaponType: 'Sniper',
  slots: ['Optics', 'SniperStock']
}, {
  itemId: 72,
  itemType: 'Weapon',
  name: 'M600 Spitfire',
  ammoType: 'Light',
  weaponType: 'LMG',
  slots: ['ExtendedLightMag', 'Optics', 'StandardStock']
}, {
  itemId: 77,
  itemType: 'Weapon',
  name: 'R-301 Carbine',
  ammoType: 'Light',
  weaponType: 'AR',
  slots: ['BarrelStabilizer', 'ExtendedLightMag', 'Optics', 'StandardStock']
}, {
  itemId: 82,
  itemType: 'Weapon',
  name: 'EVA-8 Auto',
  ammoType: 'Shotgun',
  weaponType: 'Shotgun',
  slots: ['ShotgunBolt', 'Optics', 'StandardStock', 'DoubleTapTrigger']
}, {
  itemId: 87,
  itemType: 'Weapon',
  name: 'Peacekeeper',
  ammoType: 'Shotgun',
  weaponType: 'Shotgun',
  slots: ['ShotgunBolt', 'Optics', 'KineticFeeder']
}, {
  itemId: 92,
  itemType: 'Weapon',
  name: 'Mozambique Shotgun',
  ammoType: 'Shotgun',
  weaponType: 'Shotgun',
  slots: ['ShotgunBolt', 'Optics', 'HammerpointRounds']
}, {
  itemId: 97,
  itemType: 'Weapon',
  name: 'Wingman',
  ammoType: 'Sniper',
  weaponType: 'Pistol',
  slots: ['ExtendedSniperMag', 'Optics', 'BoostedLoader']
}, {
  itemId: 102,
  itemType: 'Weapon',
  name: 'P2020',
  ammoType: 'Light',
  weaponType: 'Pistol',
  slots: ['LaserLight', 'ExtendedLightMag', 'Optics', 'HammerpointRounds']
}, {
  itemId: 107,
  itemType: 'Weapon',
  name: 'RE-45 Auto',
  ammoType: 'Light',
  weaponType: 'Pistol',
  slots: ['LaserLight', 'ExtendedLightMag', 'Optics', 'HammerpointRounds']
}, {
  itemId: 112,
  itemType: 'Weapon',
  name: 'Sentinel',
  ammoType: 'Sniper',
  weaponType: 'Sniper',
  slots: ['ExtendedSniperMag', 'Optics', 'SniperStock']
}, {
  itemId: 117,
  itemType: 'Weapon',
  name: 'Bocek Compound Bow',
  ammoType: 'Special',
  weaponType: 'Marksman',
  slots: ['Optics']
}, {
  itemId: 118,
  itemType: 'Weapon',
  name: '30-30 Repeater',
  ammoType: 'Heavy',
  weaponType: 'Marksman',
  slots: ['ExtendedHeavyMag', 'Optics', 'SniperStock', 'SkullpiercerRifling']
}, {
  itemId: 124,
  itemType: 'Ammo',
  name: 'Light Rounds',
  ammoType: 'Light'
}, {
  itemId: 125,
  itemType: 'Ammo',
  name: 'Energy Ammo',
  ammoType: 'Energy'
}, {
  itemId: 126,
  itemType: 'Ammo',
  name: 'Shotgun Shells',
  ammoType: 'Shotgun'
}, {
  itemId: 127,
  itemType: 'Ammo',
  name: 'Heavy Rounds',
  ammoType: 'Heavy'
}, {
  itemId: 128,
  itemType: 'Ammo',
  name: 'Sniper Ammo',
  ammoType: 'Sniper'
}, {
  itemId: 130,
  itemType: 'Weapon',
  name: 'Rampage LMG',
  ammoType: 'Special',
  weaponType: 'LMG',
  slots: ['Optics']
}, {
  itemId: 131,
  itemType: 'Weapon',
  name: 'C.A.R. SMG',
  ammoType: 'Heavy', // Or Light
  weaponType: 'SMG',
  slots: ['ExtendedHeavyMag', 'Optics', 'StandardStock']
}, {
  itemId: 160,
  itemType: 'Regen',
  name: 'Ultimate Accelerant'
}, {
  itemId: 161,
  itemType: 'Regen',
  name: 'Phoenix Kit'
}, {
  itemId: 162,
  itemType: 'Regen',
  name: 'Med Kit'
}, {
  itemId: 163,
  itemType: 'Regen',
  name: 'Syringe'
}, {
  itemId: 164,
  itemType: 'Regen',
  name: 'Shield Battery'
}, {
  itemId: 165,
  itemType: 'Regen',
  name: 'Shield Cell'
}, {
  itemId: 166,
  itemType: 'Gear',
  name: 'Helmet (Level 1 / White)',
  gearType: 'Helmet',
  level: 1
}, {
  itemId: 167,
  itemType: 'Gear',
  name: 'Helmet (Level 2 / Blue)',
  gearType: 'Helmet',
  level: 2
}, {
  itemId: 168,
  itemType: 'Gear',
  name: 'Helmet (Level 3 / Purple)',
  gearType: 'Helmet',
  level: 3
}, {
  itemId: 169,
  itemType: 'Gear',
  name: 'Helmet (Level 4 / Gold)',
  gearType: 'Helmet',
  level: 4
}, {
  itemId: 170,
  itemType: 'Gear',
  name: 'Body Shield (Level 1 / White)',
  gearType: 'BodyShield',
  level: 1
}, {
  itemId: 171,
  itemType: 'Gear',
  name: 'Body Shield (Level 2 / Blue)',
  gearType: 'BodyShield',
  level: 2
}, {
  itemId: 172,
  itemType: 'Gear',
  name: 'Body Shield (Level 3 / Purple)',
  gearType: 'BodyShield',
  level: 3
}, {
  itemId: 173,
  itemType: 'Gear',
  name: 'Body Shield (Level 4 / Gold)',
  gearType: 'BodyShield',
  level: 4
}, {
  itemId: 175,
  itemType: 'Gear',
  name: 'Evo Shield (Level 1 / White)',
  gearType: 'EvoShield',
  level: 1
}, {
  itemId: 176,
  itemType: 'Gear',
  name: 'Evo Shield (Level 2 / Blue)',
  gearType: 'EvoShield',
  level: 2
}, {
  itemId: 177,
  itemType: 'Gear',
  name: 'Evo Shield (Level 3 / Purple)',
  gearType: 'EvoShield',
  level: 3
}, {
  itemId: 178,
  itemType: 'Gear',
  name: 'Evo Shield (Level 4 / Red)',
  gearType: 'EvoShield',
  level: 4
}, {
  itemId: 180,
  itemType: 'Gear',
  name: 'Knockdown Shield (Level 1 / White)',
  gearType: 'KnockdownShield',
  level: 1
}, {
  itemId: 181,
  itemType: 'Gear',
  name: 'Knockdown Shield (Level 2 / Blue)',
  gearType: 'KnockdownShield',
  level: 2
}, {
  itemId: 182,
  itemType: 'Gear',
  name: 'Knockdown Shield (Level 3 / Purple)',
  gearType: 'KnockdownShield',
  level: 3
}, {
  itemId: 183,
  itemType: 'Gear',
  name: 'Knockdown Shield (Level 4 / Gold)',
  gearType: 'KnockdownShield',
  level: 4
}, {
  itemId: 184,
  itemType: 'Gear',
  name: 'Backpack (Level 1 / White)',
  gearType: 'Backpack',
  level: 1
}, {
  itemId: 185,
  itemType: 'Gear',
  name: 'Backpack (Level 2 / Blue)',
  gearType: 'Backpack',
  level: 2
}, {
  itemId: 186,
  itemType: 'Gear',
  name: 'Backpack (Level 3 / Purple)',
  gearType: 'Backpack',
  level: 3
}, {
  itemId: 187,
  itemType: 'Gear',
  name: 'Backpack (Level 4 / Gold)',
  gearType: 'Backpack',
  level: 4
}, {
  itemId: 188,
  itemType: 'Grenade',
  name: 'Thermite Grenade'
}, {
  itemId: 189,
  itemType: 'Grenade',
  name: 'Frag Grenade'
}, {
  itemId: 190,
  itemType: 'Grenade',
  name: 'Arc Star'
}, {
  itemId: 191,
  itemType: 'Attachment',
  name: '1x HCOG "Classic"',
  attachmentType: 'Optics',
  level: 1
}, {
  itemId: 192,
  itemType: 'Attachment',
  name: '2x HCOG "Bruiser"',
  attachmentType: 'Optics',
  level: 2
}, {
  itemId: 193,
  itemType: 'Attachment',
  name: '1x Holo',
  attachmentType: 'Optics',
  level: 1
}, {
  itemId: 194,
  itemType: 'Attachment',
  name: '1x-2x Variable Holo',
  attachmentType: 'Optics',
  level: 2
}, {
  itemId: 195,
  itemType: 'Attachment',
  name: '1x Digital Threat',
  attachmentType: 'Optics',
  weaponTypes: ['Pistol', 'Shotgun', 'SMG'],
  level: 4
}, {
  itemId: 196,
  itemType: 'Attachment',
  name: '3x HCOG "Ranger"',
  attachmentType: 'Optics',
  weaponTypes: ['AR', 'LMG', 'Marksman', 'Sniper'], // Except Bocek
  level: 3
}, {
  itemId: 197,
  itemType: 'Attachment',
  name: '2x-4x Variable AOG',
  attachmentType: 'Optics',
  weaponTypes: ['AR', 'LMG', 'Marksman', 'Sniper'],
  level: 3
}, {
  itemId: 198,
  itemType: 'Attachment',
  name: '6x Sniper',
  attachmentType: 'Optics',
  weaponTypes: ['Sniper'],
  level: 2
}, {
  itemId: 199,
  itemType: 'Attachment',
  name: '4x-8x Variable Sniper',
  attachmentType: 'Optics',
  weaponTypes: ['Sniper'],
  level: 3
}, {
  itemId: 200,
  itemType: 'Attachment',
  name: '4x-10x Digital Sniper Threat',
  attachmentType: 'Optics',
  weaponTypes: ['Sniper'],
  level: 4
}, {
  itemId: 201,
  itemType: 'Attachment',
  name: 'Barrel Stabilizer (Level 1 / White)',
  attachmentType: 'BarrelStabilizer',
  level: 1
}, {
  itemId: 202,
  itemType: 'Attachment',
  name: 'Barrel Stabilizer (Level 2 / Blue)',
  attachmentType: 'BarrelStabilizer',
  level: 2
}, {
  itemId: 203,
  itemType: 'Attachment',
  name: 'Barrel Stabilizer (Level 3 / Purple)',
  attachmentType: 'BarrelStabilizer',
  level: 3
}, {
  itemId: 205,
  itemType: 'Attachment',
  name: 'Laser Sight (Level 1 / White)',
  attachmentType: 'LaserLight',
  level: 1
}, {
  itemId: 206,
  itemType: 'Attachment',
  name: 'Laser Sight (Level 2 / Blue)',
  attachmentType: 'LaserLight',
  level: 2
}, {
  itemId: 207,
  itemType: 'Attachment',
  name: 'Laser Sight (Level 3 / Purple)',
  attachmentType: 'LaserLight',
  level: 3
}, {
  itemId: 208,
  itemType: 'Attachment',
  name: 'Extended Light Mag (Level 1 / White)',
  attachmentType: 'ExtendedLightMag',
  level: 1
}, {
  itemId: 209,
  itemType: 'Attachment',
  name: 'Extended Light Mag (Level 2 / Blue)',
  attachmentType: 'ExtendedLightMag',
  level: 2
}, {
  itemId: 210,
  itemType: 'Attachment',
  name: 'Extended Light Mag (Level 3 / Purple)',
  attachmentType: 'ExtendedLightMag',
  level: 3
}, {
  itemId: 211,
  itemType: 'Attachment',
  name: 'Extended Light Mag (Level 4 / Gold)',
  attachmentType: 'ExtendedLightMag',
  level: 4
}, {
  itemId: 212,
  itemType: 'Attachment',
  name: 'Extended Heavy Mag (Level 1 / White)',
  attachmentType: 'ExtendedHeavyMag',
  level: 1
}, {
  itemId: 213,
  itemType: 'Attachment',
  name: 'Extended Heavy Mag (Level 2 / Blue)',
  attachmentType: 'ExtendedHeavyMag',
  level: 2
}, {
  itemId: 214,
  itemType: 'Attachment',
  name: 'Extended Heavy Mag (Level 3 / Purple)',
  attachmentType: 'ExtendedHeavyMag',
  level: 3
}, {
  itemId: 215,
  itemType: 'Attachment',
  name: 'Extended Heavy Mag (Level 4 / Gold)',
  attachmentType: 'ExtendedHeavyMag',
  level: 4
}, {
  itemId: 216,
  itemType: 'Attachment',
  name: 'Extended Energy Mag (Level 1 / White)',
  attachmentType: 'ExtendedEnergyMag',
  level: 1
}, {
  itemId: 217,
  itemType: 'Attachment',
  name: 'Extended Energy Mag (Level 2 / Blue)',
  attachmentType: 'ExtendedEnergyMag',
  level: 2
}, {
  itemId: 218,
  itemType: 'Attachment',
  name: 'Extended Energy Mag (Level 3 / Purple)',
  attachmentType: 'ExtendedEnergyMag',
  level: 3
}, {
  itemId: 219,
  itemType: 'Attachment',
  name: 'Extended Energy Mag (Level 4 / Gold)',
  attachmentType: 'ExtendedEnergyMag',
  level: 4
}, {
  itemId: 220,
  itemType: 'Attachment',
  name: 'Extended Sniper Mag (Level 1 / White)',
  attachmentType: 'ExtendedSniperMag',
  level: 1
}, {
  itemId: 221,
  itemType: 'Attachment',
  name: 'Extended Sniper Mag (Level 2 / Blue)',
  attachmentType: 'ExtendedSniperMag',
  level: 2
}, {
  itemId: 222,
  itemType: 'Attachment',
  name: 'Extended Sniper Mag (Level 3 / Purple)',
  attachmentType: 'ExtendedSniperMag',
  level: 3
}, {
  itemId: 223,
  itemType: 'Attachment',
  name: 'Extended Sniper Mag (Level 4 / Gold)',
  attachmentType: 'ExtendedSniperMag',
  level: 4
}, {
  itemId: 224,
  itemType: 'Attachment',
  name: 'Shotgun Bolt (Level 1 / White)',
  attachmentType: 'ShotgunBolt',
  level: 1
}, {
  itemId: 225,
  itemType: 'Attachment',
  name: 'Shotgun Bolt (Level 2 / Blue)',
  attachmentType: 'ShotgunBolt',
  level: 2
}, {
  itemId: 226,
  itemType: 'Attachment',
  name: 'Shotgun Bolt (Level 3 / Purple)',
  attachmentType: 'ShotgunBolt',
  level: 3
}, {
  itemId: 227,
  itemType: 'Attachment',
  name: 'Standard Stock (Level 1 / White)',
  attachmentType: 'StandardStock',
  level: 1
}, {
  itemId: 228,
  itemType: 'Attachment',
  name: 'Standard Stock (Level 2 / Blue)',
  attachmentType: 'StandardStock',
  level: 2
}, {
  itemId: 229,
  itemType: 'Attachment',
  name: 'Standard Stock (Level 3 / Purple)',
  attachmentType: 'StandardStock',
  level: 3
}, {
  itemId: 230,
  itemType: 'Attachment',
  name: 'Sniper Stock (Level 1 / White)',
  attachmentType: 'SniperStock',
  level: 1
}, {
  itemId: 231,
  itemType: 'Attachment',
  name: 'Sniper Stock (Level 2 / Blue)',
  attachmentType: 'SniperStock',
  level: 2
}, {
  itemId: 232,
  itemType: 'Attachment',
  name: 'Sniper Stock (Level 3 / Purple)',
  attachmentType: 'SniperStock',
  level: 3
}, {
  itemId: 233,
  itemType: 'Attachment',
  name: 'Turbocharger',
  attachmentType: 'Turbocharger',
  level: 4
}, {
  itemId: 235,
  itemType: 'Attachment',
  name: 'Skullpiercer Rifling',
  attachmentType: 'SkullpiercerRifling',
  level: 4
}, {
  itemId: 237,
  itemType: 'Attachment',
  name: 'Hammerpoint Rounds',
  attachmentType: 'HammerpointRounds',
  level: 3
}, {
  itemId: 239,
  itemType: 'Attachment',
  name: 'Double Tap Trigger',
  attachmentType: 'DoubleTapTrigger',
  level: 3
}, {
  itemId: 246,
  itemType: 'Attachment',
  name: 'Kinetic Feeder',
  attachmentType: 'KineticFeeder',
  level: 3
}, {
  itemId: 247,
  itemType: 'Attachment',
  name: 'Boosted Loader',
  attachmentType: 'BoostedLoader',
  level: 3
}];
