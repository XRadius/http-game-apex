import * as app from '..';

export class Radar {
  private readonly context: CanvasRenderingContext2D;
  private centerX = 0;
  private centerY = 0;
  private outerRadius = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly maximumDistance = 200,
    private readonly numberOfRings = 8) {
    this.context = canvas.getContext('2d')!;
  }

  clear() {
    this.update();
    this.renderBackground();
    this.renderLines();
    this.renderRings();
  }

  renderAll(localPlayer: app.Player, players: Array<app.Player>) {
    for (const x of players) {
      if (!x.isLocal && !x.lifeState && x.localOrigin.x && x.localOrigin.y && x.localOrigin.z) {
        this.renderOne(localPlayer, x.localOrigin, localPlayer.teamNum === x.teamNum
          ? (x.bleedoutState ? '#FFFF00' : '#00FF00')
          : (x.bleedoutState ? '#FFA500' : '#FF0000'));
      }
    }
  }

  renderOne(localPlayer: app.Player, localOrigin: {x: number, y: number}, style: string | CanvasGradient | CanvasPattern) {
    const dx = (localPlayer.localOrigin.x - localOrigin.x) * 0.0254;
    const dy = (localPlayer.localOrigin.y - localOrigin.y) * 0.0254;
    const r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (r < this.maximumDistance) {
      const s = this.outerRadius / this.maximumDistance;
      const a = Math.sign(dy) * Math.acos(dx / r) - localPlayer.viewAngles.y * Math.PI / 180;
      const x = this.centerX + Math.sin(a) * r * s;
      const y = this.centerY + Math.cos(a) * r * s;
      this.context.beginPath();
      this.context.arc(x, y, this.outerRadius / 40, 0, Math.PI * 2);
      this.context.fillStyle = style;
      this.context.fill();
    }
  }

  private renderBackground() {
    this.context.beginPath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.arc(this.centerX, this.centerY, this.outerRadius, 0, Math.PI * 2);
    this.context.fillStyle = '#000';
    this.context.fill();
  }

  private renderLines() {
    this.context.strokeStyle = '#FFF';
    for (var i = 0; i < 8; i++) {
      const x = this.centerX + this.outerRadius * Math.cos(i * Math.PI * 0.25);
      const y = this.centerY + this.outerRadius * Math.sin(i * Math.PI * 0.25);
      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  }

  private renderRings() {
    this.context.strokeStyle = '#FFF';
    for (var i = 1; i <= this.numberOfRings; i++) {
      this.context.beginPath();
      this.context.arc(this.centerX, this.centerY, this.outerRadius * i / this.numberOfRings, 0, Math.PI * 2);
      this.context.stroke();
    }
  }

  private update() {
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.outerRadius = (this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width) / 2;
  }
}
