# Etapa 2 (parte) — Estrategia de evidencia y proyectos demostrativos

> Responde al punto 7 de la entrega final y a la sección C del pedido.
> **Principio rector:** es mejor tener tres demos chicas que funcionan de verdad que
> un sistema enorme a medio terminar. Una demo a medio hacer genera más dudas que no
> tener ninguna.

---

## 1. El problema a resolver

Hoy no hay evidencia pública de tus capacidades. El sitio no puede decir "mira lo que
le hice a este cliente" porque ese cliente no existe. Eso **no es un problema de
marketing: es un problema de producto**. Se resuelve construyendo evidencia propia,
funcional y verificable. Una demo bien hecha cumple tres funciones a la vez:

1. **Demuestra que sabés construir** (no que sabés hablar de construcción).
2. **Da material concreto para el contacto comercial** ("mirá, esto funciona así").
3. **Se convierte en el punto de partida del proyecto del cliente** (mismo dominio,
   mismo código, rehecho a su medida).

---

## 2. Codenames, orden de publicación y orden de construcción

| Orden en el sitio | Codename | Tema | Estado inicial | Servicio que prueba |
|:--:|---|---|---|---|
| Demo 01 | **Núcleo** | Gestión de pedidos y stock | Propuesta | Software de gestión a medida |
| Demo 02 | **Puente** | Altas automáticas y sincronización | Propuesta | Integración / automatización |
| Demo 03 | **Base** | API con pruebas automatizadas y CI | Propuesta | QA, buenas prácticas |

### Orden de construcción recomendado: **Puente → Núcleo → Base**

**Empezá por "Puente" (Demo 02)**, aunque en el sitio aparezca segunda. Motivos:

1. Es la que **se termina más rápido** (estimado: 5 a 10 días de trabajo efectivo).
   Primero necesitás evidencia, no perfección.
2. Coincide con tu **cuña de entrada comercial**: automatizar la carga de datos es el
   problema más urgente y más fácil de vender de la lista.
3. El mensaje de contacto y la demo hablan de lo mismo. Coherencia = credibilidad.
4. Genera un **antes/después visual** (alguien cargaba a mano → ahora no), que es lo
   que más convence en una conversación.

Después "Núcleo", que es el proyecto de **mayor valor comercial** y el que más te van
a pedir. Por último "Base", que refuerza el discurso de calidad y te sirve para
vender QA y para entrar a agencias.

> **Regla de publicación:** no cambies el estado de una demo a "Publicada" hasta que
> esté desplegada y funcione. Mientras tanto, "Propuesta". Cuando la empieces,
> "En desarrollo". Este es el punto donde es más fácil mentirse a uno mismo.

---

## 3. Demo 01 — «Núcleo» · Gestión de pedidos y stock

### Problema que resuelve
Pedidos, clientes y stock repartidos en planillas que se desactualizan y no dan una
visión confiable del negocio. Nadie sabe con certeza cuánto hay ni qué se entregó.

### Público objetivo (a quién le habla esta demo)
Comercios, distribuidoras, mayoristas y talleres chicos que venden productos y
controlan inventario con Excel y WhatsApp.

### Funcionalidades mínimas (MVP — sin esto no está terminada)
1. **Clientes:** alta, edición, búsqueda.
2. **Productos:** alta, precio, stock actual.
3. **Pedidos:** cabecera (cliente, fecha, estado) y detalle (productos y cantidades).
4. **Stock:** descuento automático al confirmar un pedido y bloqueo si no hay stock.
5. **Estados del pedido:** pendiente → confirmado → entregado → cancelado.
6. **Reportes básicos:** ventas por período y productos más vendidos.
7. **Exportación a CSV** para que el cliente no quede encerrado en el sistema.
8. **Datos de ejemplo** cargables con un comando, para que cualquiera pueda probarlo.

### Fuera de alcance (decirlo explícitamente)
Facturación electrónica, integraciones con AFIP, app móvil nativa, multi-sucursal,
permisos avanzados, pagos online.

### Stack propuesto
- **Backend:** C# / .NET (ASP.NET Core) con API REST.
- **Datos:** SQL Server (o SQLite para que la demo se pueda correr sin instalar nada).
- **Frontend:** HTML, CSS y JavaScript (sin framework, para que se entienda todo).
- **Testing:** proyecto de pruebas sobre las reglas de stock y pedidos.

### Desafío técnico (de qué se trata realmente)
La parte difícil no son las pantallas: es **mantener el stock consistente**. Hay que
decidir qué pasa cuando dos personas confirman pedidos al mismo tiempo, qué pasa si
un pedido se cancela después de descontar stock, y cómo evitar stock negativo. Estas
decisiones se documentan en el caso de estudio: demuestran criterio, que es lo que se
vende.

### Decisiones importantes a documentar
- Dónde vive la regla de negocio (servicio de dominio, no en el controller).
- Transacciones y concurrencia sobre el stock.
- Por qué un monolito modular y no microservicios (escala real del problema).
- Cómo se generan los datos de ejemplo y por qué es clave para una demo.

### Qué se muestra (demostración esperada)
- Un video corto de 60–90 segundos recorriendo el flujo completo.
- El repositorio público con el README y las instrucciones para correrlo.
- Una captura de la pantalla de pedidos (que además puede ir en el sitio).
- El resultado de las pruebas automatizadas.

### Cómo se verifica
- Pruebas automáticas de reglas: no se puede vender más stock del disponible; cancelar
  un pedido devuelve el stock; el total del pedido es correcto.
- Datos de ejemplo que permiten reproducir el flujo completo desde cero.
- README con pasos exactos de instalación y ejecución.

### Valor comercial
Es el tipo de trabajo que más pymes piden y el que mejor paga. Sirve para responder
"¿alguna vez hiciste algo parecido?" con algo concreto en pantalla. Además habilita la
venta posterior de mantenimiento, que es el ingreso recurrente.

**Alcance estimado:** 3 a 5 semanas de trabajo efectivo.

---

## 4. Demo 02 — «Puente» · Altas automáticas y sincronización

### Problema que resuelve
Los pedidos o las altas llegan por distintos canales (formulario, WhatsApp, planilla)
y alguien los transcribe a mano a un sistema central. Hay demoras, errores de tipeo y
nadie sabe qué se cargó y qué no.

### Público objetivo
Cualquier empresa donde una persona dedica horas por semana a "pasar datos": comercios
con venta online + gestión separada, estudios con planillas, áreas administrativas.

### Funcionalidades mínimas (MVP)
1. **Recepción por webhook** de un pedido o alta (formulario web o POST a una API).
2. **Validación** de campos obligatorios, formatos y duplicados.
3. **Alta en base de datos** central con el registro del origen.
4. **Notificación** al responsable (email o mensaje) con el resultado.
5. **Registro de cada ejecución** (tabla de log: qué entró, qué se procesó, qué falló).
6. **Reintento ante fallas** para no perder información.
7. **Un panel simple** que muestre el estado de las últimas sincronizaciones.

### Fuera de alcance
Integraciones con sistemas propietarios reales (se simulan), facturación, alta
disponibilidad, escalado horizontal.

### Stack propuesto
- **Orquestación:** n8n (flujo visual, fácil de mostrar).
- **Lógica y validaciones:** Python.
- **Datos:** SQL Server o PostgreSQL.
- **Entrada:** un formulario web mínimo + endpoint POST.
- **Notificaciones:** email.

### Desafío técnico
**Que un error no pierda datos ni duplique registros.** Eso obliga a pensar en
idempotencia, cola de reintentos y trazabilidad. Es exactamente la pregunta que un
cliente serio va a hacer: *"¿y si falla?"*. Tener la respuesta demostrada es una
ventaja enorme en la reunión.

### Decisiones importantes a documentar
- Qué es la idempotencia y cómo se evita duplicar un pedido reenviado.
- Por qué n8n y no código a medida (o al revés): criterio de elección.
- Cómo se representan y se reintentan los errores.
- Qué se registra para poder auditar después.

### Qué se muestra
- **Un "antes/después" muy claro:** un pedido enviado desde un formulario que aparece
  en la base y dispara una notificación, sin intervención humana.
- Registro de ejecuciones visible, incluido un caso de error manejado.
- Video corto del flujo completo.

### Cómo se verifica
- Casos de prueba con datos **válidos e inválidos** (campo vacío, formato incorrecto,
  pedido duplicado).
- Verificar que un fallo del destino deja el pedido en cola y **no** se pierde.
- Verificar que reenviar el mismo pedido no genera un duplicado.

### Valor comercial
Es la demo que **abre puertas**: se explica en una frase, se entiende en 30 segundos y
resuelve el problema que el cliente ya sabe que tiene. Es también la más rápida de
producir, así que genera tracción comercial sin esperar semanas.

**Alcance estimado:** 5 a 10 días de trabajo efectivo.

---

## 5. Demo 03 — «Base» · API con pruebas automatizadas y CI

### Problema que resuelve
Muchos equipos no tienen forma de verificar que un cambio no rompió nada. Cada entrega
depende de probar a mano y los errores aparecen en producción.

### Público objetivo
Este caso es distinto: le habla a **referentes técnicos** (CTOs, líderes de desarrollo,
agencias y software houses). Es una credencial para vender QA, mantenimiento y para
que te tercericen trabajo.

### Funcionalidades mínimas (MVP)
1. **API REST** pequeña y real (por ejemplo, gestión de tareas o de productos) con
   validación de entrada y manejo de errores coherente.
2. **Documentación OpenAPI** autogenerada.
3. **Suite de pruebas:** unitarias de la lógica y de integración sobre los endpoints.
4. **Pipeline de CI** (GitHub Actions) que corre las pruebas en cada push.
5. **Configuración por variables de entorno** (sin credenciales en el código).
6. **Cobertura real reportada**, sin inflar.

### Fuera de alcance
Autenticación con proveedores externos, pagos, escalado, frontend elaborado.

### Stack propuesto
- **API:** .NET (minimal API) — coherente con el resto del portfolio.
- **Pruebas:** framework de testing de .NET + pruebas de integración.
- **CI:** GitHub Actions.
- **Calidad estática:** formateo y análisis en el pipeline.

### Desafío técnico
**Hacer que las pruebas sean útiles y no decorativas.** Es fácil tener 90 % de
cobertura sin probar nada que importe. El desafío es elegir qué probar y documentar
por qué. Mostrar *qué no* se cubrió es tan valioso como mostrar lo que sí.

### Decisiones importantes a documentar
- Diferencia entre prueba unitaria y de integración, y cuándo usar cada una.
- Cómo se aislan las pruebas (base de datos en memoria o contenedor).
- Cómo se evitan credenciales en el repositorio.
- Qué significa "pipeline verde" para el negocio: menos bugs en producción.

### Qué se muestra
- El **badge del pipeline** (verde) en el README.
- Una captura del pipeline ejecutándose.
- El reporte de cobertura, explicado con honestidad.
- El JSON de OpenAPI / la documentación navegable.

### Cómo se verifica
- El pipeline se pone **rojo** al introducir un cambio que rompe una prueba (probarlo
  a propósito y mostrarlo demuestra que las pruebas sirven de verdad).
- El reporte de cobertura se reproduce localmente con un comando.

### Valor comercial
Refuerza el servicio de **QA y testing** y el de **mantenimiento**. Es la demo que
convence a un comprador técnico de que tu código se puede heredar sin miedo, que es
exactamente el miedo que tiene una empresa cuando el proveedor anterior la dejó.

**Alcance estimado:** 1 a 2 semanas de trabajo efectivo.

---

## 6. Cómo presentar la evidencia (plantilla de caso de estudio)

Para cada demo terminada, publicá un caso de estudio con esta estructura fija. Da
consistencia y hace que el visitante técnico confíe.

```
Título
Problema        — 2 o 3 líneas, en el idioma del cliente, no del programador.
Público         — a quién le sirve esto.
Solución        — qué se construyó, en una frase.
Cómo funciona   — 3 o 4 decisiones técnicas clave, explicadas simple.
Desafío         — qué fue lo difícil y cómo se resolvió.
Cómo verificarlo— el comando o el paso exacto para comprobarlo.
Qué queda afuera— limitaciones reales de la demo.
Stack y enlaces — repo, demo en vivo (si existe), video.
```

El campo **"cómo verificarlo"** es el que te distingue de la mayoría de los portfolios:
no pedís que te crean, das la forma de comprobarlo.

---

## 7. Reglas que no se rompen

1. **Nunca inventar** clientes, métricas, testimonios ni resultados empresariales.
2. **Nunca marcar como disponible** algo que no está desplegado y funcionando.
3. **No usar datos personales reales** de nadie en los datos de ejemplo.
4. **No publicar credenciales** ni datos de producción en los repositorios.
5. **No mezclar** una demo propia con un proyecto comercial: el sitio lo aclara
   explícitamente y debe seguir así.
6. Si una demo se abandona, **bajarla** del sitio o volverla a marcar como propuesta.
   Un enlace muerto cuesta más confianza que la ausencia del proyecto.

---

## 8. Plan de construcción sugerido (compatible con el plan de 30 días)

| Semana | Foco | Entregable verificable |
|:--:|---|---|
| 1 | **Puente** — flujo, validaciones, log, manejo de errores | Flujo funcionando localmente + video de 60 s |
| 2 | **Puente** — idempotencia, panel de estado, datos de prueba, README | Repo público + caso de estudio redactado |
| 3–4 | **Núcleo** — clientes, productos, pedidos, stock | Sistema usable con datos de ejemplo |
| 5 | **Núcleo** — reportes, exportación, pruebas, capturas | Repo + video + caso de estudio |
| 6 | **Base** — API, pruebas, CI con badge | Pipeline verde + reporte de cobertura |

> Este plan es paralelo al comercial: **no esperes a terminar las tres demos para
> empezar a contactar clientes**. La Demo "Puente" ya alcanza para tener una
> conversación comercial seria.
