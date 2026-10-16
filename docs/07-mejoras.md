# Próximas mejoras, ordenadas por impacto y costo

> Responde al punto 10 de la entrega final.
> Orden pensado para un desarrollador solo, sin presupuesto de publicidad.
> **Regla:** no avanzar al bloque 2 hasta tener el bloque 1 terminado. Cada bloque
> depende del anterior.

---

## Bloque 1 — Impacto alto · costo nulo · hacer primero

Estas cuatro acciones valen más que cualquier rediseño. Sin ellas, el resto no sirve.

| # | Mejora | Por qué | Esfuerzo |
|:--:|---|---|---|
| 1.1 | **Completar `js/config.js` con los datos reales** | Sin esto el sitio no tiene botón de WhatsApp ni contacto. Es la base de todo. | 15 min |
| 1.2 | **Publicar el sitio en Netlify** | Un portfolio sin URL no existe en una conversación comercial. | 15 min |
| 1.3 | **Terminar la demo "Puente"** (automatización) | Es la prueba que hace creíble todo el discurso. Se termina en días. | 1–2 semanas |
| 1.4 | **Ejecutar el plan de 30 días** | El mejor "feature" del portfolio es que alguien lo conozca. | continuo |

**Resultado esperado:** el sitio es real, está publicado y tenés una demo funcionando
para mostrar. Con esto ya podés vender.

---

## Bloque 2 — Impacto alto · costo bajo

| # | Mejora | Por qué | Esfuerzo |
|:--:|---|---|---|
| 2.1 | **Conectar el formulario a Netlify Forms o Formspree** | Deja de depender del cliente de correo del visitante y centraliza las consultas. | 30 min |
| 2.2 | **Terminar la demo "Núcleo"** (gestión + stock) | Es el proyecto de mayor valor comercial; responde "¿hiciste algo así?". | 3–5 semanas |
| 2.3 | **Video de 60–90 s por demo** | Un video convence más que 20 capturas y se ve en el celular. | 2 h por demo |
| 2.4 | **Repositorios públicos con README impecable** | Los compradores técnicos (y las agencias) miran el código antes que el sitio. | 1 día |
| 2.5 | **Escribir los 3 casos de estudio** con la plantilla de `docs/03-proyectos.md` | Convierte "una demo" en "un caso verificable". | 1 día |
| 2.6 | **Imagen social en PNG + favicon definitivo** | Mejora cómo se ve el enlace al compartirlo. Detalle chico, efecto visible. | 1 h |

---

## Bloque 3 — Impacto medio · costo bajo

| # | Mejora | Por qué | Esfuerzo |
|:--:|---|---|---|
| 3.1 | **Sección de "Resultados / métricas" por demo** | Números concretos (aunque sean de tus demos) refuerzan la credibilidad. Sin inflar nada. | 2 h |
| 3.2 | **Aviso por email cuando llega una consulta** | Responder en horas, no en días, duplica la tasa de conversión. | 1 h |
| 3.3 | **Analítica sin cookies** (GoatCounter o Plausible) | Saber qué página miran y de dónde vienen, sin invadir la privacidad. | 1 h |
| 3.4 | **Terminar la demo "Base"** (API + pruebas + CI) | Habilita vender QA y que te tercericen agencias. | 1–2 semanas |
| 3.5 | **Publicar un artículo técnico por mes** | SEO y autoridad: te encuentra quien tiene el problema. | 3 h/mes |
| 3.6 | **Testimonios reales** (cuando existan) | El primer testimonio verdadero vale más que cualquier rediseño. **No inventarlos.** | cuando llegue |

---

## Bloque 4 — Impacto medio · costo medio (segunda etapa)

| # | Mejora | Por qué | Cuándo |
|:--:|---|---|---|
| 4.1 | **Versión en inglés del sitio** | Abre el mercado remoto internacional. Ver `docs/04-publicacion.md` §5. | Después del 1.er cliente internacional |
| 4.2 | **Página por servicio** (`/servicios/integraciones`) | Más superficie de SEO y mejor posicionamiento por intención de búsqueda. | Con 2–3 casos publicados |
| 4.3 | **Formulario con más calificación** (presupuesto estimado, urgencia) | Filtra consultas antes de la llamada y ahorra tiempo. | Cuando lleguen muchas consultas |
| 4.4 | **Caso de estudio extendido por proyecto destacado** | Pieza de venta reutilizable en propuestas y correos. | Con el 1.er proyecto real |
| 4.5 | **Blog propio (no LinkedIn)** | Traes el tráfico a tu casa en lugar de a la de otro. | Mes 3–6 |

---

## Bloque 5 — Impacto bajo o discutible · no hacer todavía

| Mejora | Por qué **no** ahora |
|---|---|
| Framework (React/Astro/Next) | El sitio pesa unos pocos KB y Lighthouse da 100. Un framework agrega herramientas, dependencias y tiempo de build sin mejorar nada visible. |
| Backend propio y panel de administración | Administrar proyectos desde un panel es un problema que todavía no tenés. Editás el HTML en 2 minutos. |
| Base de datos | No hay datos que persistir. El formulario lo resuelve un servicio externo. |
| Chat en vivo | Genera expectativa de respuesta inmediata que un desarrollador solo no puede sostener. WhatsApp cumple mejor. |
| Animaciones más elaboradas | Restan rendimiento y no venden. El contenido convence; el efecto no. |
| Modo claro/oscuro | Duplica el trabajo de diseño y pruebas por un beneficio marginal. |
| Publicidad paga | Con cero casos y cero testimonios, la conversión es baja. Primero referidos y contacto directo. |
| Precio publicado en el sitio | Sin datos reales puede dejar plata en la mesa o espantar clientes. Recién con 3 proyectos cerrados. |

---

## Resumen ejecutivo

| Si podés hacer solo **una** cosa más | Terminá la **demo "Puente"** |
| Si podés hacer **dos** | Además, publicá el sitio y ejecutá la semana 1 del plan de 30 días |
| Si podés hacer **tres** | Sumá la demo "Núcleo" y los casos de estudio |

El cuello de botella no es el sitio: **ya está terminado y cumple con 100 en
accesibilidad, buenas prácticas y SEO**. El cuello de botella es la **evidencia** y el
**contacto**. Todo lo demás es refinamiento.
