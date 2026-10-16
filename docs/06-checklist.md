# Checklist final de publicación

> Responde al punto 8 de la entrega final y a los criterios de aceptación del pedido.
> Marcá cada casilla. Si algo queda sin marcar, el sitio no está listo.
> Leyenda: ✅ ya está hecho · ⬜ lo tenés que hacer vos · 🧪 verificado automáticamente

---

## A. Contenido y honestidad

- [ ] ⬜ No hay proyectos, clientes ni resultados inventados.
- [ ] ⬜ Ninguna demo está marcada como disponible si no funciona.
- [ ] ⬜ Los datos de ejemplo de las demos no usan datos personales reales.
- [ ] ⬜ No quedan textos de ejemplo, lorem ipsum ni marcadores `[pendiente]`.
- [ ] ✅ Las demos se identifican como propias ("Demo propia · sin cliente asociado").
- [ ] ✅ El sitio aclara que no hay un portfolio comercial de clientes todavía.
- [ ] ⬜ Revisaste cada afirmación del sitio y podrías sostenerla en una reunión.
- [ ] ⬜ No se prometen plazos ni precios universales.

## B. Propuesta de valor y mensajes

- [ ] ✅ El titular comunica qué hacés y a quién en menos de 5 segundos.
- [ ] ✅ El problema del cliente se enuncia antes que la tecnología.
- [ ] ✅ Cada servicio explica: problema, cuándo, incluye, entregables y CTA propio.
- [ ] ✅ Cada llamada a la acción tiene un propósito concreto.
- [ ] ✅ Tono profesional, humano y consultivo (sin clichés corporativos).

## C. Datos comerciales configurables

- [ ] ⬜ `identity.name` y `identity.nameShort` completos.
- [ ] ⬜ `contact.whatsappNumber` con código de país, solo dígitos.
- [ ] ⬜ `contact.phoneDisplay` con el formato visible.
- [ ] ⬜ `contact.email` válido.
- [ ] ⬜ `contact.linkedin` con URL completa.
- [ ] ⬜ `contact.github` completo o vacío (si está vacío, el enlace se oculta solo).
- [ ] ⬜ `identity.siteUrl` con el dominio real y barra final.
- [ ] ✅ Los enlaces sin dato configurar se ocultan (no quedan enlaces rotos).
- [ ] ⬜ Ya no aparece el cartel amarillo de "Modo borrador".

## D. Diseño y experiencia

- [ ] ✅ Jerarquía visual clara y espaciado consistente (sistema de tokens en CSS).
- [ ] ✅ Paleta sobria con un único acento; contraste suficiente.
- [ ] ✅ Tipografía legible con escala fluida (se adapta, no se rompe).
- [ ] ✅ Componentes reutilizables (`.btn`, `.card`, `.chip`, `.tag`, `.ticks`).
- [ ] ✅ Animaciones sutiles y respetan `prefers-reduced-motion`.
- [ ] ✅ Sin gradientes excesivos ni efectos gratuitos.
- [ ] ⬜ Revisaste el sitio en un celular real (no solo en el emulador).

## E. Responsive y accesibilidad

- [ ] 🧪 Sin desbordamiento horizontal a 375 px, 768 px y 1280 px.
- [ ] 🧪 Menú móvil funcional (abre, cierra con Escape y al elegir una opción).
- [ ] 🧪 Etiquetas semánticas (`header`, `main`, `nav`, `footer`, `section`).
- [ ] 🧪 Un solo `H1` y jerarquía de encabezados ordenada.
- [ ] 🧪 Todos los campos del formulario tienen `<label>` asociado.
- [ ] 🧪 Todos los enlaces y botones tienen nombre accesible.
- [ ] 🧪 Sin IDs duplicados ni referencias ARIA rotas.
- [ ] 🧪 Enlace "saltar al contenido" presente.
- [ ] 🧪 Lighthouse Accesibilidad: **100**.

## F. SEO y metadatos

- [ ] ✅ `<title>` y `<meta name="description">` únicos y descriptivos.
- [ ] ⬜ `canonical` con el dominio real.
- [ ] ⬜ `og:url`, `og:image`, `twitter:image` con el dominio real.
- [ ] ⬜ `robots.txt` con la URL correcta del sitemap.
- [ ] ⬜ `sitemap.xml` con las URLs y fechas correctas.
- [ ] ✅ Datos estructurados JSON-LD (`ProfessionalService` con catálogo de servicios).
- [ ] ✅ `lang="es-AR"` correcto.
- [ ] 🧪 Lighthouse SEO: **100**.
- [ ] ⬜ (Opcional) Imagen social exportada a PNG y actualizada en el HTML.

## G. Formulario y llamadas a la acción

- [ ] 🧪 Validación en el navegador con mensajes claros por campo.
- [ ] 🧪 Foco automático en el primer campo con error.
- [ ] 🧪 Estado de "enviando", éxito y error implementados.
- [ ] 🧪 Protección anti-spam (campo trampa) funcionando.
- [ ] ⬜ Formulario conectado a un endpoint real **o** decisión consciente de usar el
      respaldo por correo (el formulario no simula un envío exitoso).
- [ ] ⬜ Probaste el botón de WhatsApp desde el teléfono y abre tu conversación.
- [ ] ⬜ Probaste el enlace de email y de LinkedIn.

## H. Técnico y rendimiento

- [ ] 🧪 Sin errores de JavaScript en consola.
- [ ] 🧪 Sin dependencias externas (0 peticiones a terceros).
- [ ] 🧪 Iconografía con SVG embebido (32 referencias verificadas).
- [ ] ⬜ Imágenes optimizadas (hoy solo hay SVG: livianos por definición).
- [ ] ⬜ `node --check js/main.js` sin errores.
- [ ] 🧪 Rutas inexistentes devuelven la página 404 correcta.

## I. Seguridad

- [ ] ✅ Sin claves de API, contraseñas ni tokens en el código.
- [ ] ✅ Encabezados de seguridad definidos (`netlify.toml` / `vercel.json`).
- [ ] ✅ El servidor local bloquea intentos de salir del directorio del proyecto.
- [ ] ⬜ Si conectás un formulario externo, actualizaste la `Content-Security-Policy`.
- [ ] ⬜ Revisaste `privacidad.html` (o lo validaste con un profesional).

## J. Despliegue

- [ ] ⬜ Elegiste la plataforma (recomendado: Netlify).
- [ ] ⬜ Publicaste el sitio y la URL responde (código 200).
- [ ] ⬜ Dominio propio configurado y HTTPS forzado.
- [ ] ⬜ Actualizaste el dominio en las 4 ubicaciones (HTML, robots, sitemap, config).
- [ ] ⬜ Verificaste la página 404 en producción.
- [ ] ⬜ Comprimiste la vista previa del enlace en WhatsApp y LinkedIn.

## K. Comercial

- [ ] ⬜ Perfil de LinkedIn actualizado (titular + "Acerca de" + destacado).
- [ ] ✅ Existe un plan comercial de 30 días (`docs/05-plan-30-dias.md`).
- [ ] ⬜ Definiste valor hora objetivo y proyecto mínimo.
- [ ] ⬜ Armaste la lista inicial de 40 empresas objetivo.
- [ ] ⬜ Avisaste a tu red personal que estás tomando clientes.
- [ ] ⬜ Enviaste los primeros 10 mensajes de contacto personalizados.

---

## Criterios de aceptación del pedido original

| Criterio | Estado |
|---|:--:|
| La propuesta de valor se entiende en pocos segundos | ✅ |
| Diseño visual consistente y premium | ✅ |
| Servicios explicados desde la perspectiva del cliente | ✅ |
| Las llamadas a la acción funcionan | 🧪 |
| Los datos comerciales son configurables | ✅ (un solo archivo) |
| No hay proyectos, clientes ni resultados inventados | ✅ |
| La experiencia móvil es correcta | 🧪 |
| El código se ejecuta y despliega con las instrucciones | 🧪 |
| Los errores detectados están corregidos o documentados | ✅ |
| Existe una estrategia concreta para presentar el portfolio | ✅ |

> **Pendiente de tu parte:** los ítems ⬜ de configuración, publicación y actividad
> comercial. Nada de eso se puede automatizar sin tus datos, tus cuentas y tu criterio.
