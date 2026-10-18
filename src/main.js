import Phaser from 'phaser';
import { TestRoomScene } from './scenes/TestRoomScene.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 544,
  pixelArt: true,
  backgroundColor: '#0c1220',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [TestRoomScene],
});

// 開発中だけ、ブラウザのコンソールからゲームの状態を見られるようにする
if (import.meta.env.DEV) window.__game = game;
