/* ============================================================================
   SERVIDOR LOCAL DE DESARROLLO  (solo para probar en tu máquina)
   ----------------------------------------------------------------------------
   No se publica en producción y no tiene dependencias: usa Node puro.

   Uso:
     node server.js            -> http://localhost:4173
     node server.js 8080       -> cambia el puerto

   Qué hace:
     • Sirve los archivos estáticos del directorio del proyecto.
     • Aplica los mismos encabezados de seguridad que netlify.toml.
     • Devuelve 404.html cuando la ruta no existe (igual que en Netlify).
     • No cachea, para que veas los cambios al recargar.
   ========================================================================== */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json"
};

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Cache-Control": "no-store"
};

function send(res, status, filePath, headers) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Error interno al leer el archivo.");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(status, Object.assign(
      { "Content-Type": MIME[ext] || "application/octet-stream" },
      SECURITY_HEADERS,
      headers || {}
    ));
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const reqPath = new URL(req.url, "http://localhost").pathname;

  /* ------------------------------------------------------------------
     Endpoint FALSO solo para desarrollo.
     Sirve para probar el envío del formulario antes de conectar un
     servicio real. No existe en producción ni se publica.

     Para probarlo, en js/config.js:
       form: { endpoint: "http://localhost:4173/__mock-contact" }

     Devuelve 200 y muestra en consola lo que habría recibido.
     ------------------------------------------------------------------ */
  if (reqPath === "/__mock-contact") {
    if (req.method !== "POST") {
      res.writeHead(405, { Allow: "POST", "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: "Use POST" }));
      return;
    }
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) req.destroy();   // límite defensivo de 1 MB
    });
    req.on("end", () => {
      console.log("[__mock-contact] Consulta recibida:");
      console.log(body);
      res.writeHead(200, Object.assign(
        { "Content-Type": "application/json" },
        SECURITY_HEADERS
      ));
      res.end(JSON.stringify({ ok: true, message: "Recibido (entorno de prueba)" }));
    });
    return;
  }

  // Método no soportado.
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" });
    res.end("Método no permitido.");
    return;
  }

  let pathname = decodeURIComponent(reqPath);

  // Evita salir del directorio del proyecto (path traversal).
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    send(res, 403, path.join(ROOT, "404.html"));
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.existsSync = fs.existsSync || (() => true);

    const notFound = () => send(res, 404, path.join(ROOT, "404.html"));

    if (err && !filePath.endsWith("index.html")) {
      // Puede ser una ruta sin extensión, ej. /privacidad -> privacidad.html
      const withHtml = filePath + ".html";
      if (fs.existsSync(withHtml)) {
        send(res, 200, withHtml);
      } else {
        notFound();
      }
      return;
    }

    fs.readFile(filePath, (readErr) => {
      if (readErr) {
        notFound();
      } else {
        send(res, 200, filePath);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log("");
  console.log("  Portfolio servido localmente:");
  console.log("  -> http://localhost:" + PORT);
  console.log("");
  console.log("  Ctrl+C para detener.");
  console.log("");
});
