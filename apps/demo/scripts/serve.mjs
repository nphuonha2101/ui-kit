import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT || 3100);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  let file = path.join(root, pathname);

  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  } else if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) {
    file = `${file}.html`;
  }

  if (!fs.existsSync(file)) {
    const notFound = path.join(root, "404.html");
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { "Content-Type": types[".html"] });
      fs.createReadStream(notFound).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`Serving out/ at http://localhost:${port}`);
});
