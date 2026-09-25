import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = path.resolve('dist');
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

createServer(async (request, response) => {
  try {
    const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let filePath = path.join(root, urlPath);
    if (!filePath.startsWith(root)) throw new Error('Invalid path');
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = path.join(filePath, 'index.html');
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(4173, '127.0.0.1', () => {
  console.log('Agrotech preview running at http://127.0.0.1:4173/');
});
