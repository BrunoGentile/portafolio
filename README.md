# Portfolio profesional de desarrollo de software

Sitio estático (HTML, CSS y JavaScript puro) pensado como **herramienta comercial** para
conseguir clientes de desarrollo de software en Argentina y en el mercado remoto
internacional.

No tiene frameworks, ni backend, ni base de datos, ni proceso de compilación.
Se publica tal cual, no depende de `npm` y carga en milisegundos.

---

## 1. Puesta en marcha rápida

### Ver el sitio en tu máquina

No hace falta instalar nada. Solo necesitás Node.js (probado con **v24.15.0**).

```powershell
node server.js
```

Abrí <http://localhost:4173> en el navegador.

Para usar otro puerto:

```powershell
node server.js 8080
```

> También podés abrir `index.html` con doble clic, pero conviene usar `server.js`:
> reproduce los encabezados de seguridad y la página 404 igual que en producción.

### Antes de mostrar el sitio a alguien

Editá **`js/config.js`** y reemplazá los valores de ejemplo por tus datos reales
(nombre, WhatsApp, email, LinkedIn, GitHub). Es el único archivo obligatorio.

Mientras queden datos de ejemplo vas a ver un cartel amarillo de **"Modo borrador"**
abajo de la página, y los enlaces de contacto sin configurar quedan ocultos
(nunca se muestra un enlace roto).

---

## 2. Estructura del proyecto

```
portafolio/
├── index.html              Página principal (todo el contenido comercial)
├── 404.html                Página de error personalizada
├── privacidad.html         Política de privacidad (revisar antes de publicar)
├── robots.txt              Directivas para buscadores (actualizar el dominio)
├── sitemap.xml             Mapa del sitio (actualizar el dominio)
├── netlify.toml            Configuración de despliegue en Netlify
├── vercel.json             Configuración de despliegue en Vercel
├── .nojekyll               Necesario solo si publicás en GitHub Pages
├── server.js               Servidor local de desarrollo (no se publica)
├── css/
│   └── styles.css          Sistema de diseño completo (tokens + componentes)
├── js/
│   ├── config.js           ⚠️ TUS DATOS COMERCIALES (único archivo a editar)
│   └── main.js             Interacciones: menú, animaciones, formulario
├── assets/
│   ├── favicon.svg         Ícono del sitio
│   ├── social-card.svg     Imagen para compartir en redes (1200×630)
│   └── social-card.html    Herramienta para exportar la imagen social a PNG
└── docs/
    ├── 01-estrategia.md    Posicionamiento comercial y segmentos
    ├── 02-copy.md          Todos los textos + LinkedIn + mensajes de WhatsApp
    ├── 03-proyectos.md     Especificación de las 3 demos a construir
    ├── 04-publicacion.md   Cómo publicar, dominio propio y mantenimiento
    ├── 05-plan-30-dias.md  Plan comercial para conseguir clientes
    ├── 06-checklist.md     Checklist final antes de publicar
    └── 07-mejoras.md       Próximas mejoras por impacto y costo
```

---

## 3. Comandos útiles

```powershell
# Verificar que el JavaScript no tenga errores de sintaxis
node --check js/main.js
node --check js/config.js
node --check server.js

# Levantar el servidor local
node server.js

# Comprobar que responde (con el servidor levantado)
Invoke-WebRequest http://localhost:4173/ -Method Head | Select-Object StatusCode
```

> **Nota sobre npm en Windows:** si al ejecutar `npm` aparece el error
> *"la ejecución de scripts está deshabilitada en este sistema"*, es la política de
> PowerShell del equipo, no un problema del proyecto. Este sitio **no necesita npm**.
> Si en algún momento sí lo necesitás, abrí PowerShell como administrador y ejecutá
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

---

## 4. Cómo actualizar el contenido

### Cambiar mis datos de contacto
Todo está en `js/config.js`. Dejá vacío (`""`) lo que no tengas: el sitio oculta
esos enlaces de forma automática.

### Publicar una demo o agregar un proyecto
En `index.html`, buscá el bloque de proyectos (`<section id="proyectos">`).
Cada proyecto es un `<article class="proj card">` independiente: copiá uno completo,
pegalo debajo del último y reemplazá el contenido. Mantené el `id` para que los
enlaces directos sigan funcionando.

**Regla importante:** cambiá el estado (`<span class="status ...">`) según la realidad:
- `<span class="status status-plan">Propuesta</span>` → todavía no existe.
- `<span class="status status-dev">En desarrollo</span>` → lo estás construyendo.
- Cuando esté publicado y funcionando, agregá un `status status-live`
  (`<span class="status status-live">Publicada</span>`) y el enlace al sistema.
  **No marques nada como disponible hasta que funcione de verdad.**

### Conectar el formulario a un servicio real
Ver `docs/04-publicacion.md`, sección "Formulario de contacto".

### Cambiar el dominio
Reemplazá `https://tu-dominio.com` en **cuatro** lugares:
`index.html` (canonical, og:url, og:image, twitter:image, JSON-LD),
`robots.txt`, `sitemap.xml` y `js/config.js` (`identity.siteUrl`).

---

## 5. Qué está verificado y qué falta

**Verificado en este entorno:**
- Sin errores de JavaScript en consola.
- Lighthouse: **Accesibilidad 100, Buenas prácticas 100, SEO 100**.
- Sin enlaces rotos ni anclas sin `href` (comprobadas todas las del documento,
  tanto en modo borrador como con datos completos).
- Sin IDs duplicados ni referencias ARIA rotas.
- Sin enlaces o botones sin nombre accesible.
- Sin desbordamiento horizontal en 375 px, 768 px y 1280 px.
- Formulario: validación, estados de error, éxito y anti-spam comprobados.
- Degradación correcta cuando faltan datos de contacto.

**Requiere tu configuración antes de publicar (no se puede automatizar):**
- `js/config.js` con tus datos reales.
- Dominio real en los metadatos.
- Endpoint del formulario (o dejarlo con el respaldo por correo).
- Imagen social en PNG (ver `assets/social-card.html`).
- Publicación real en el hosting elegido (ver `docs/04-publicacion.md`).

**No verificado:** la animación de aparición al hacer scroll no pudo comprobarse
visualmente en este entorno porque la pestaña del navegador estaba en segundo plano
(el navegador congela las animaciones en pestañas ocultas). El mecanismo está
revisado y tiene una red de seguridad que garantiza que el contenido siempre se vea,
incluso si el navegador no dispara la animación.

---

## 6. Despliegue

Recomendación: **Netlify** (ver justificación en `docs/04-publicacion.md`).
El archivo `netlify.toml` ya incluye encabezados de seguridad y redirección a 404.

### Publicar en Netlify sin línea de comandos
1. Entrá a <https://app.netlify.com/drop>.
2. Arrastrá la carpeta `portafolio` completa.
3. Listo: obtenés una URL pública en segundos.
4. Desde **Site settings → Domain management** conectá tu dominio propio.

### Publicar en Vercel
```powershell
npx vercel --prod
```
(o arrastrá la carpeta en el panel de Vercel). `vercel.json` ya está configurado.)

### Publicar en GitHub Pages
1. Subí el proyecto a un repositorio de GitHub.
2. **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. El archivo `.nojekyll` evita que GitHub procese el sitio con Jekyll.

---

## 7. Seguridad

- No hay credenciales, tokens ni claves en el código.
- El endpoint del formulario es público por naturaleza: no pongas secretos ahí.
- Al conectar un servicio externo de formularios, actualizá la
  `Content-Security-Policy` de `netlify.toml` (ver `docs/04-publicacion.md`).
- El servidor local bloquea intentos de salir del directorio del proyecto.

---

## 8. Próximos pasos

1. Completar `js/config.js`.
2. Elegir hosting y publicar.
3. Empezar las demos de `docs/03-proyectos.md` (una por vez).
4. Ejecutar el plan de 30 días de `docs/05-plan-30-dias.md`.
5. Evaluar la versión en inglés recién en la segunda etapa (ver `docs/07-mejoras.md`).
