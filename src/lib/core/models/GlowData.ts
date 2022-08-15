import * as app from '..';

export class GlowData {
  constructor(
    readonly inside: number,
    readonly outline: number,
    readonly outlineRadius: number,
    readonly customState: number,
    readonly isDrawn: boolean,
    readonly isPostProcess: boolean) {}

  static fromUInt32(value: number) {
    const inside = value & 0xFF;
    const outline = value >> 8 & 0xFF;
    const outlineRadius = value >> 16 & 0xFF;
    const customState = value >> 24 & 0x3F;
    const isDrawn = Boolean(value >> 24 & 0x40);
    const isPostProcess = Boolean(value >> 24 & 0x80);
    return new GlowData(inside, outline, outlineRadius, customState, isDrawn, isPostProcess);
  }

  isSame(otherGlow: GlowData) {
    return this.inside === otherGlow.inside
      && this.outline === otherGlow.outline
      && this.outlineRadius === otherGlow.outlineRadius
      && this.customState === otherGlow.customState
      && this.isDrawn === otherGlow.isDrawn
      && this.isPostProcess === otherGlow.isPostProcess;
  }

  toUInt32() {
    let result = 0;
    result |= Math.min(0xFF, this.inside);
    result |= Math.min(0xFF, this.outline) << 8;
    result |= Math.min(0xFF, this.outlineRadius) << 16;
    result |= Math.min(0x3F, this.customState) << 24;
    result |= this.isDrawn ? 0x40 << 24 : 0;
    result |= this.isPostProcess ? 0x80 << 24 : 0;
    return result;
  }

  toString() {
    return app.serialize(this);
  }
}
