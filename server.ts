import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

export function app(): Hono {
  const app = new Hono();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  // json を返す hello API
  app.get('/hello', (c) =>
    c.json({
      hello: 'world!',
    })
  );

  // SSRするパスを指定
  app.get('/', async (c) => {
    const url = c.req.url;
    try {
      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${url}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: '' }],
      });
      return c.html(html);
    } catch (err) {
      console.error('Error:', err);
      // エラー時にもレスポンスを返す
      return c.html(
        `<html><body><h1>Server Error</h1><p>${err}</p></body></html>`,
        500
      );
    }
  });

  // 静的ファイルのパスを指定
  app.use(
    '/*',
    serveStatic({
      root: './dist/angular-hono-starter/browser',
      index: 'index.html',
      onNotFound: (path, c) => {
        console.log(`${path} is not found, request to ${c.req.path}`);
      },
    })
  );

  return app;
}

function run(): void {
  const server = app();
  const port = +process.env['PORT']! || 4001;

  serve({
    fetch: server.fetch,
    port: port,
  });

  console.log(`Server is running on http://localhost:${port}`);
}

run();
