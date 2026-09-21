import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2" };
try { await stat(root); } catch { console.error("Run npm run build before starting the preview."); process.exit(1); }
createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method || "")) { response.writeHead(405); response.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
    let file = resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    let status = 200;
    try { if ((await stat(file)).isDirectory()) file = resolve(file, "index.html"); await stat(file); }
    catch { file = resolve(root, "404.html"); status = 404; }
    const bytes = await readFile(file);
    response.writeHead(status, { "Content-Type": types[extname(file)] || "application/octet-stream", "Content-Length": bytes.length });
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch { response.writeHead(400); response.end("Bad request"); }
}).listen(port, "0.0.0.0", () => console.log(`Natural Kitchen preview: http://localhost:${port}`));
