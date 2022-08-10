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

  refresh() {
    this.update();
    this.renderBackground();
    this.renderLines();
    this.renderRings();
  }

  renderItems(localPlayer: app.core.Player, items: Iterable<app.core.Item>) {
    for (const item of items) {
      if (!item.hasColor) continue;
      const position = this.calculatePosition(localPlayer, item.localOrigin);
      if (position) {
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.outerRadius / 80, 0, Math.PI * 2);
        this.context.fillStyle = item.createColor() ?? '#FFF';
        this.context.fill();
      }
    }
  }
  
  renderNpcs(localPlayer: app.core.Player, npcs: Iterable<app.core.NPC>) {
    for (const npc of npcs) {
      const position = this.calculatePosition(localPlayer, npc.localOrigin);
      if (position) {
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.outerRadius / 40, 0, Math.PI * 2);
        this.context.fillStyle = npc.createColor();
        this.context.fill();
      }
    }
  }

  renderPlayers(localPlayer: app.core.Player, players: Iterable<app.core.Player>) {
    for (const player of players) {
      if (!player.isValid || player === localPlayer) continue;
      const position = this.calculatePosition(localPlayer, player.localOrigin);
      if (position) {
        this.context.beginPath();
        this.context.arc(position.x, position.y, this.outerRadius / 40, 0, Math.PI * 2);
        this.context.fillStyle = player.createColor(localPlayer);
        this.context.fill();
      }
    }
  }

  private calculatePosition(localPlayer: app.core.Player, origin: app.core.Vector) {
    const dx = (localPlayer.localOrigin.value.x - origin.value.x) * 0.0254;
    const dy = (localPlayer.localOrigin.value.y - origin.value.y) * 0.0254;
    const r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (r < this.maximumDistance) {
      const s = this.outerRadius / this.maximumDistance;
      const a = Math.sign(dy) * Math.acos(dx / r) - localPlayer.viewAngles.value.y * Math.PI / 180;
      const x = this.centerX + Math.sin(a) * r * s;
      const y = this.centerY + Math.cos(a) * r * s;
      return {x, y};
    } else {
      return;
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
    for (let i = 0; i < 8; i++) {
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
    for (let i = 1; i <= this.numberOfRings; i++) {
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
