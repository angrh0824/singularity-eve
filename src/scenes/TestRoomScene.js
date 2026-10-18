import Phaser from 'phaser';

const TILE = 32;
const COLS = 30;
const ROWS = 17;

// 開発の土台が動くか確かめるための仮の部屋。矢印キーかWASDで1マスずつ歩ける。
export class TestRoomScene extends Phaser.Scene {
  constructor() {
    super('TestRoom');
  }

  create() {
    this.makeTextures();

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const wall = x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1;
        this.add.image(x * TILE + TILE / 2, y * TILE + TILE / 2, wall ? 'wall' : 'floor');
      }
    }

    this.cell = { x: 15, y: 9 };
    this.player = this.add.image(0, 0, 'player');
    this.placePlayer();

    this.add.text(48, 44, 'AI yyyy', { fontFamily: 'monospace', fontSize: '28px', color: '#e8e4da' });
    this.add.text(48, 82, '開発中：矢印キーかWASDで歩けます', { fontSize: '16px', color: '#8c95a9' });

    this.keys = this.input.keyboard.addKeys('UP,DOWN,LEFT,RIGHT,W,A,S,D');
    this.moving = false;
  }

  makeTextures() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x141c2c).fillRect(0, 0, TILE, TILE);
    g.lineStyle(1, 0x27334b).strokeRect(0.5, 0.5, TILE - 1, TILE - 1);
    g.generateTexture('floor', TILE, TILE);
    g.clear();
    g.fillStyle(0x27334b).fillRect(0, 0, TILE, TILE);
    g.generateTexture('wall', TILE, TILE);
    g.clear();
    g.fillStyle(0xf1a646).fillRect(8, 6, 16, 22);
    g.fillStyle(0x0c1220).fillRect(12, 11, 3, 3).fillRect(18, 11, 3, 3);
    g.generateTexture('player', TILE, TILE);
    g.destroy();
  }

  placePlayer() {
    this.player.setPosition(this.cell.x * TILE + TILE / 2, this.cell.y * TILE + TILE / 2);
  }

  update() {
    if (this.moving) return;
    const k = this.keys;
    let dx = 0;
    let dy = 0;
    if (k.LEFT.isDown || k.A.isDown) dx = -1;
    else if (k.RIGHT.isDown || k.D.isDown) dx = 1;
    else if (k.UP.isDown || k.W.isDown) dy = -1;
    else if (k.DOWN.isDown || k.S.isDown) dy = 1;
    if (!dx && !dy) return;

    const nx = Phaser.Math.Clamp(this.cell.x + dx, 1, COLS - 2);
    const ny = Phaser.Math.Clamp(this.cell.y + dy, 1, ROWS - 2);
    if (nx === this.cell.x && ny === this.cell.y) return;

    this.cell = { x: nx, y: ny };
    this.moving = true;
    this.tweens.add({
      targets: this.player,
      x: nx * TILE + TILE / 2,
      y: ny * TILE + TILE / 2,
      duration: 140,
      onComplete: () => { this.moving = false; },
    });
  }
}
