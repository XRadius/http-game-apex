import * as app from '..';
import {mp_rr_canyonlands_mu3} from './maps/mp_rr_canyonlands_mu3';
import {mp_rr_desertlands_mu3} from './maps/mp_rr_desertlands_mu3';
import {mp_rr_olympus_mu2} from './maps/mp_rr_olympus_mu2';
import {mp_rr_tropic_island_mu1} from './maps/mp_rr_tropic_island_mu1';

export class Map {
  private readonly context: CanvasRenderingContext2D;
  private readonly image = new Image();
  private data?: ReturnType<typeof getDataByLevelName>;
  private ratioX = 0;
  private ratioY = 0;
  private scaleR = 0;
  private scaleX = 0;
  private scaleY = 0;
  private shiftX = 0;
  private shiftY = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
  }

  refresh(levelName: app.CString) {
    this.fetch(levelName);
    this.update();
    this.renderBackground();
  }

  renderAll(localPlayer: app.Player, players: Array<app.Player>, mode?: string) {
    for (const x of players) {
      this.renderOne(x.localOrigin.value, x.createColor(localPlayer, mode));
    }
  }

  renderOne(localOrigin: app.Vector, style: string | CanvasGradient | CanvasPattern) {
    if (!this.data) return;
    const x = this.shiftX + (1 / this.image.width * this.scaleX) * (localOrigin.x - this.data.posX) / this.ratioX;
    const y = this.shiftY + (1 / this.image.height * this.scaleY) * (localOrigin.y - this.data.posY) / -this.ratioY;
    this.context.beginPath();
    this.context.arc(x, y, this.scaleR * 8, 0, Math.PI * 2);
    this.context.fillStyle = style;
    this.context.fill();
  }

  private fetch(levelName: app.CString) {
    this.data = getDataByLevelName(levelName);
    this.image.src = this.data ? `images/maps/${levelName}.webp` : 'images/maps.webp';
  }

  private renderBackground() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.image, 0,0, this.image.width, this.image.height, this.shiftX, this.shiftY, this.scaleX, this.scaleY);
  }

  private update() {
    if (!this.data) return;
    this.ratioX = (this.data.posY - this.data.posX) / this.image.width;
    this.ratioY = (this.data.posY - this.data.posX) / this.image.height;
    this.scaleR = Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);
    this.scaleX = this.image.width * this.scaleR;
    this.scaleY = this.image.height * this.scaleR;
    this.shiftX = (this.canvas.width - this.scaleX) / 2;
    this.shiftY = (this.canvas.height - this.scaleY) / 2;  
  }
}

function getDataByLevelName(levelName: app.CString) {
  switch (levelName) {
    case 'mp_rr_canyonlands_mu3':
      return mp_rr_canyonlands_mu3;
    case 'mp_rr_desertlands_mu3':
      return mp_rr_desertlands_mu3;
    case 'mp_rr_olympus_mu2':
      return mp_rr_olympus_mu2;
    case 'mp_rr_tropic_island_mu1':
      return mp_rr_tropic_island_mu1;
    default:
      return;
  }
}
