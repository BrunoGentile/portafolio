# Etapa 6 — Publicación, dominio, formulario y mantenimiento

> Responde al punto 6 de la entrega final.
> **Aclaración importante:** en este entorno no hay credenciales ni acceso a tu cuenta
> de hosting, así que **el sitio no está publicado**. Todo lo de abajo son los pasos
> exactos para que lo publiques vos en menos de 15 minutos.

---

## 1. Comparación de plataformas

| Criterio | GitHub Pages | **Netlify** | Vercel |
|---|---|---|---|
| Costo | Gratis | **Gratis** | Gratis |
| Despliegue sin línea de comandos | No (requiere Git) | **Sí (arrastrar carpeta)** | Sí (panel) |
| HTTPS automático | Sí | **Sí** | Sí |
| Dominio propio | Sí | **Sí** | Sí |
| Encabezados de seguridad personalizados | Muy limitado | **Sí (`netlify.toml`)** | Sí (`vercel.json`) |
| Formularios integrados | No | **Sí (Netlify Forms)** | Requiere código |
| Página 404 personalizada | Sí | **Sí, automática** | Sí |
| Rollback de despliegues | Manual | **Sí, un clic** | Sí |
| IDE integrado | Requiere Git | **Sí** | Sí |

### Recomendación: **Netlify**

Porque es la que menos fricción tiene para tu caso: podés publicar **arrastrando la
carpeta**, sin usar Git ni la terminal, resuelve el **formulario de contacto sin
backend** (Netlify Forms), aplica los **encabezados de seguridad** que ya están en
`netlify.toml`, tiene rollback de un clic y no cuesta nada. Si más adelante preferís
Vercel o GitHub Pages, el proyecto funciona igual sin cambiar una línea de código.

**Vercel** es una alternativa igual de buena si ya usás su ecosistema.
**GitHub Pages** solo tiene sentido si querés que el repositorio sea también el
portfolio de código; el formulario requeriría un servicio externo.

---

## 2. Publicar en Netlify

### Opción A — Sin Git (la más rápida)
1. Entrá a <https://app.netlify.com/drop>.
2. Arrastrá la carpeta `portafolio` completa (no un zip).
3. Esperá unos segundos: obtenés una URL del tipo `https://algo.netlify.app`.
4. **Antes de compartirla**, completá `js/config.js` y volvé a arrastrar.
   (Podés arrastrar de nuevo las veces que quieras; cada arrastre es un despliegue.)

> ⚠️ Para actualizar el sitio hay que volver a arrastrar la carpeta entera. Si preferís
> actualizar con un `git push`, usá la opción B.

### Opción B — Con Git (recomendada para el largo plazo)
1. Creá un repositorio en GitHub y subí el proyecto:
   ```powershell
   git init
   git add .
   git commit -m "Portfolio inicial"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/portfolio.git
   git push -u origin main
   ```
2. En Netlify: **Add new site → Import an existing project → GitHub**.
3. Elegí el repositorio. Configuración de build:
   - **Build command:** *(dejar vacío)*
   - **Publish directory:** `.`
4. **Deploy site.** Desde ahora, cada `git push` republica solo.

### Verificar el despliegue
```powershell
# Respuesta esperada: 200
Invoke-WebRequest https://TU-SITIO.netlify.app -Method Head | Select-Object StatusCode
```

---

## 3. Dominio propio

1. Comprá el dominio (Namecheap, Cloudflare, NIC.ar para `.com.ar`, etc.).
2. En Netlify: **Domain management → Add custom domain**.
3. Configurá el DNS según te indique Netlify:
   - Subdominio `www` → CNAME al sitio de Netlify.
   - Dominio raíz → registro A a la IP de Netlify (o ALIAS/ANAME si tu proveedor lo permite).
4. Netlify emite el **certificado HTTPS** automáticamente (Let's Encrypt).
5. Forzá HTTPS: **Domain management → HTTPS → Force HTTPS**.

### Después de configurar el dominio, actualizá estas 4 ubicaciones
| Archivo | Qué cambiar |
|---|---|
| `index.html` | `canonical`, `og:url`, `og:image`, `twitter:image` y el JSON-LD (`url`) |
| `robots.txt` | La línea del `Sitemap` |
| `sitemap.xml` | Los `<loc>` y la fecha `<lastmod>` |
| `js/config.js` | `identity.siteUrl` |

> Un dominio equivocado en el `canonical` es una de las causas más comunes de que una
> web nueva no aparezca en Google. Revisalo antes de compartir el enlace.

---

## 4. Formulario de contacto

El formulario **ya valida** en el navegador y funciona en tres modos, según lo que
configures en `js/config.js`:

### Modo 1 — Sin configurar (por defecto)
Abre el cliente de correo del visitante con el mensaje ya redactado. **No simula un
envío exitoso.** Sirve para empezar hoy, pero depende de que la persona tenga correo
configurado.

### Modo 2 — Formspree (rápido, sirve en cualquier hosting)
1. Creá una cuenta en <https://formspree.io> y un formulario.
2. Copiá el endpoint (`https://formspree.io/f/XXXXXXX`).
3. En `js/config.js`: `form: { endpoint: "https://formspree.io/f/XXXXXXX" }`.
4. **Actualizá la CSP** en `netlify.toml`, porque el navegador bloquea los envíos a
   dominios no declarados:
   ```
   Content-Security-Policy = "... connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; ..."
   ```

### Modo 3 — Netlify Forms (sin servicios externos, solo en Netlify)
1. En `index.html`, agregá al `<form>`: `name="contacto"` y `data-netlify="true"`,
   más un `<input type="hidden" name="form-name" value="contacto">`.
2. Quitá la lectura por `fetch` de `js/main.js` (o dejá `endpoint` apuntando a `/`),
   porque Netlify intercepta el POST del formulario directamente.
3. Las consultas aparecen en **Netlify → Forms** y podés activar avisos por email.

> **Nunca pongas claves de API en `js/config.js`**: todo lo que está ahí es público y
> visible desde el navegador. Un endpoint público no es un secreto.

### Probarlo localmente antes de conectar nada
`server.js` incluye un endpoint falso solo para desarrollo:
```js
form: { endpoint: "http://localhost:4173/__mock-contact" }
```
Devuelve éxito y muestra en la consola del servidor lo que habría recibido.
**Este endpoint no existe en producción.**

---

## 5. Versión en inglés: recomendación

**Recomendación: hacerla en una segunda etapa, no ahora.**

Motivos:
- El mercado donde vas a conseguir los **primeros** clientes es el hispanohablante:
  contactos directos, LinkedIn en español, agencias locales.
- Una mala traducción automática resta más credibilidad de la que suma una versión en
  inglés. Traducir bien el sitio completo es trabajo real (contenido + revisión).
- Mantener dos idiomas desde el día uno **duplica el costo de cada cambio** de texto.

**Cuándo hacerla:** cuando tengas la primera demo publicada, el sitio estable y al
menos un contacto internacional concreto. Ahí la inversión se justifica.

**Cómo hacerla bien cuando llegue el momento** (la estructura ya está preparada):
1. Crear `en/index.html` reutilizando los mismos `css/styles.css` y `js/main.js`.
2. Traducir el contenido (no usar traductores automáticos para los textos comerciales).
3. Agregar `hreflang` en ambas páginas:
   ```html
   <link rel="alternate" hreflang="es" href="https://tu-dominio.com/">
   <link rel="alternate" hreflang="en" href="https://tu-dominio.com/en/">
   <link rel="alternate" hreflang="x-default" href="https://tu-dominio.com/">
   ```
4. Agregar un selector de idioma en el encabezado (enlace, no botón con JavaScript).
5. Sumar la URL en inglés a `sitemap.xml`.

Esto da dos páginas indexables por separado (mejor SEO) en vez de una sola que cambia
con JavaScript (peor SEO y peor accesibilidad).

---

## 6. Mantenimiento

### Rutina mensual (15 minutos)
- Revisar que el sitio cargue y que los enlaces de contacto funcionen.
- Mirar si llegaron consultas al formulario y responder ese mismo día.
- Actualizar el estado de las demos si avanzaste.

### Cuando termines una demo
1. Cambiar el `<span class="status …">` a `status-live` → "Publicada".
2. Agregar el enlace al repositorio y, si existe, a la demo en vivo.
3. Actualizar la fecha `<lastmod>` en `sitemap.xml`.

### Cuando cambies textos
- Nada de compilación: editás el HTML y volvés a desplegar.
- Los textos comerciales están centralizados en `docs/02-copy.md`; conviene mantener
  la costumbre de actualizar el documento cuando cambia el sitio.

### Recomendaciones técnicas
- **No agregues dependencias** salvo que aporten algo concreto. El sitio hoy no tiene
  ninguna y eso es una ventaja de mantenimiento.
- **No agregues analítica invasiva.** Si querés medir, usá algo sin cookies
  (por ejemplo Plausible o GoatCounter) y actualizá la CSP en consecuencia.
- **Versioná con Git** aunque publiques arrastrando la carpeta: te permite volver atrás.
- **Respaldo:** como todo es texto plano, un repositorio remoto es respaldo suficiente.

---

## 7. Datos que DEBÉS reemplazar antes de publicar

Checklist concreto. Si algo de esto queda sin hacer, el sitio no está listo.

- [ ] `js/config.js`
  - [ ] `identity.name` (nombre completo)
  - [ ] `identity.nameShort` (nombre para el encabezado)
  - [ ] `identity.location`
  - [ ] `identity.siteUrl`
  - [ ] `contact.whatsappNumber` (solo dígitos, con código de país)
  - [ ] `contact.phoneDisplay` (formato visible)
  - [ ] `contact.email`
  - [ ] `contact.linkedin`
  - [ ] `contact.github` (o dejar vacío)
  - [ ] `form.endpoint` (o dejarlo vacío y usar el respaldo por correo)
- [ ] `index.html` — `<title>` y `<meta name="description">` si querés ajustar el tono
- [ ] `index.html` — `canonical`, `og:url`, `og:image`, `twitter:image` y JSON-LD
- [ ] `robots.txt` — URL del sitemap
- [ ] `sitemap.xml` — URLs y fechas
- [ ] `assets/social-card.svg` — reemplazar "Tu Nombre" por el tuyo
- [ ] `assets/social-card.html` — exportar a `assets/social-card.png` y actualizar las
      etiquetas `og:image` / `twitter:image` (las redes no siempre renderizan SVG)
- [ ] `privacidad.html` — revisarlo (o pedir asesoramiento si facturás como empresa)
- [ ] Revisar **todos** los textos y quitar lo que no puedas sostener
- [ ] Confirmar que ya no aparece el cartel amarillo de "Modo borrador"

---

## 8. Antes de compartir el enlace con un cliente

- [ ] El sitio abre en el celular y el menú funciona.
- [ ] El botón de WhatsApp abre la conversación correcta (probarlo de verdad).
- [ ] El email y LinkedIn responden.
- [ ] El formulario muestra el mensaje correcto al enviar.
- [ ] No hay lorem ipsum, textos de ejemplo ni datos de prueba.
- [ ] Las tres demos dicen su estado real.
- [ ] La imagen de vista previa se ve bien al pegar el enlace en WhatsApp y LinkedIn.
