import { defineConfig } from 'vite';

// 相対パスで出力して、GitHub Pages のサブパス（/リポジトリ名/）でもそのまま動くようにする
export default defineConfig({
  base: './',
  server: { port: 5173, strictPort: true },
  // Phaser 本体だけで約1.2MBあるので、警告の基準を上げておく
  build: { chunkSizeWarningLimit: 1600 },
});
