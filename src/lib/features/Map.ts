import * as app from '.';

export class Map {
  private readonly context: CanvasRenderingContext2D;
  private readonly image = new Image();
  private map?: ReturnType<typeof getDataByLevelName>;
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

  refresh(levelName: string) {
    this.fetch(levelName);
    this.update();
    this.renderBackground();
  }

  renderPlayers(localPlayer: app.core.Player, players: Iterable<app.core.Player>) {
    if (!this.map) return;
    for (const player of players) {
      if (!player.isValid) continue;
      const x = this.shiftX + (1 / this.image.width * this.scaleX) * (player.localOrigin.value.x - this.map.x) / this.ratioX;
      const y = this.shiftY + (1 / this.image.height * this.scaleY) * (player.localOrigin.value.y - this.map.y) / -this.ratioY;
      this.context.beginPath();
      this.context.arc(x, y, this.scaleR * 8, 0, Math.PI * 2);
      this.context.fillStyle = player.createColor(localPlayer);
      this.context.fill();
    }
  }

  private fetch(levelName: string) {
    this.map = getDataByLevelName(levelName);
    this.image.src = this.map ? `images/maps/${levelName}.webp` : 'images/maps.webp';
  }

  private renderBackground() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.image, 0,0, this.image.width, this.image.height, this.shiftX, this.shiftY, this.scaleX, this.scaleY);
  }

  private update() {
    if (!this.map) return;
    this.ratioX = (this.map.y - this.map.x) / this.image.width;
    this.ratioY = (this.map.y - this.map.x) / this.image.height;
    this.scaleR = Math.min(this.canvas.width / this.image.width, this.canvas.height / this.image.height);
    this.scaleX = this.image.width * this.scaleR;
    this.scaleY = this.image.height * this.scaleR;
    this.shiftX = (this.canvas.width - this.scaleX) / 2;
    this.shiftY = (this.canvas.height - this.scaleY) / 2;  
  }
}

function getDataByLevelName(levelName: string) {
  switch (levelName) {
    case 'mp_rr_canyonlands_mu3':
      return {x: -37541, y: 43886};
    case 'mp_rr_desertlands_mu3':
      return {x: -45056, y: 45055};
    case 'mp_rr_olympus_mu2':
      return {x: -52024, y: 48025};
    case 'mp_rr_tropic_island_mu1':
      return {x: -50606, y: 52139};
    default:
      return;
  }
}
