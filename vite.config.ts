import { resolve } from 'path';
import { defineConfig, type ViteDevServer } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const handlebarsReloadPlugin = () => ({
  name: 'handlebars-reload',
  handleHotUpdate({ file, server }: { file: string; server: ViteDevServer }) {
    const normalizedPath = file.replace(/\\/g, '/');

    if (
      normalizedPath.includes('/templates/') ||
      normalizedPath.includes('/sections/')
    ) {
      server.ws.send({
        type: 'full-reload',
        path: '*',
      });
      return [];
    }

    return;
  },
  configureServer(server: ViteDevServer) {
    server.watcher.add([
      resolve(__dirname, 'src/templates'),
      resolve(__dirname, 'src/sections'),
    ]);
  },
});

export default defineConfig({
  base: './',
  root: 'src',
  envDir: __dirname,
  publicDir: '../public',
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, 'src/templates'),
        resolve(__dirname, 'src/sections'),
      ],
      reloadOnPartialChange: true,
    }),
    handlebarsReloadPlugin(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
    outDir: '../dist/',
    emptyOutDir: true,
  },
  server: {
    host: true,
    open: true,
  },
});
