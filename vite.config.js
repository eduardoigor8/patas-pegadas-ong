import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      input: {
        index: resolve(projectRoot, 'html/index.html'),
        sobre: resolve(projectRoot, 'html/sobre.html'),
        animais: resolve(projectRoot, 'html/animais.html'),
        adocao: resolve(projectRoot, 'html/adocao.html'),
        resgate: resolve(projectRoot, 'html/resgate.html'),
      },
    },
  },
});
