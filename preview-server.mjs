import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let filePath = normalize(join(root, pathname));
    if (!filePath.startsWith(root)) throw new Error("Invalid path");
    const details = await stat(filePath).catch(() => null);
    if (details?.isDirectory()) filePath = join(filePath, "index.html");
    const body = await readFile(filePath);
    response.writeHead(200, { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => {
  console.log("Local URL: http://127.0.0.1:4173/");
});
