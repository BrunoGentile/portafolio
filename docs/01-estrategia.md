# Etapa 1 — Diagnóstico comercial y posicionamiento

> Este documento responde a la Etapa 1 y al punto 1 de la entrega final.
> Contiene decisiones de negocio, no de diseño. Las decisiones de precio están
> marcadas como **supuestos a validar**: no hay datos reales de tu mercado todavía.

---

## 1. Situación de partida (lo que es verdad hoy)

| Hecho | Consecuencia para la estrategia |
|---|---|
| No tenés portfolio comercial de clientes para mostrar | El sitio **no puede** apoyarse en casos de éxito. Debe demostrar capacidad con demos propias verificables. |
| Tu stack es fuerte en backend y datos (.NET, C#, SQL Server, Java, C++, Python) | Conviene vender **sistemas y automatizaciones**, no diseño ni producto de consumo. |
| Manejás n8n y automatización | Tenés una **cuña de entrada barata y rápida**: resolver un problema puntual en días, no en meses. |
| Trabajás solo | Los proyectos largos y de muchas direcciones te exponen. Priorizar alcances acotados con entregas por etapa. |
| Mercado objetivo: Argentina + remoto internacional | El sitio debe estar en español y dejar preparado el inglés para la segunda etapa. |
| Presupuesto de adquisición ≈ 0 | La captación debe ser por contacto directo, LinkedIn, referidos y SEO. Nada de publicidad paga al inicio. |

---

## 2. Análisis de segmentos

Escala de 1 (bajo) a 5 (alto). El total pondera los siete criterios por igual
para no esconder el problema de ninguno.

| # | Segmento | Urgencia | Puede pagar | Fácil de contactar | Encaja con mi stack | Alcance acotado | Ingreso recurrente | Total |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| A | **Pymes con procesos manuales** (planillas, tareas repetitivas, sin sistema propio) | 5 | 4 | 4 | 5 | 4 | 4 | **30** |
| B | **Empresas con sistemas desconectados** (CRM, ERP, tienda, planillas que no se hablan) | 5 | 4 | 3 | 5 | 5 | 3 | **30** |
| E | **Empresas con software en uso** que necesita mantenimiento, mejoras o QA | 4 | 4 | 3 | 5 | 5 | 5 | **31** |
| F | **Agencias y software houses** que necesitan capacidad extra de desarrollo | 4 | 3 | 5 | 4 | 4 | 5 | **30** |
| C | **Startups / emprendedores que necesitan un MVP** | 4 | 2 | 4 | 4 | 2 | 3 | **23** |
| D | **Negocios que necesitan una web** (institucional, catálogo, landing) | 3 | 3 | 4 | 3 | 5 | 2 | **24** |
| G | **Profesionales independientes** que quieren una solución digital | 2 | 2 | 5 | 3 | 4 | 1 | **21** |

### Lectura de la tabla

- **A y B son en realidad el mismo comprador** visto desde dos ángulos: la pyme que
  hoy trabaja con planillas y sistemas que no se comunican. Venderlos juntos permite
  entrar por el problema más urgente (una integración) y crecer hacia un sistema de
  gestión completo, que es un proyecto mucho más rentable.
- **E tiene el mejor puntaje individual** por el ingreso recurrente, pero es difícil
  de encontrar en frío: no hay un lugar donde las empresas publiquen "busco quién me
  mantenga el sistema". Se consigue **como consecuencia** de A, B o F, no como punto
  de entrada.
- **F es la fuente de leads más barata y rápida**: las agencias publican pedidos
  abiertos y siempre necesitan manos. No es el objetivo final (margen más bajo), pero
  genera flujo de caja y casos reales que después alimentan el portfolio.
- **C (startups) y D (webs) son trampas de tiempo al inicio**: poco presupuesto,
  mucho ida y vuelta, y competencia por precio. No se rechazan, pero no se persiguen.

---

## 3. Posicionamiento elegido

### Segmento principal
**Pymes y empresas medianas (aproximadamente 10 a 150 empleados) que sostienen su
operación con planillas, tareas manuales y sistemas que no se comunican entre sí.**

Sectores donde aparece casi siempre el mismo problema: distribución y logística,
comercio mayorista, servicios profesionales, talleres y producción, salud y
laboratorios, empresas de servicios con agenda.

### Segmentos secundarios
1. **Empresas con software existente** que necesitan mantenimiento, mejoras o QA
   (ingreso recurrente, se capta por continuidad de los anteriores).
2. **Agencias y software houses** que tercerizan desarrollo (flujo de caja rápido y
   casos reales desde el primer mes).

### Por qué esta elección
Porque es el único segmento donde se cumplen las cuatro condiciones al mismo tiempo:
el problema **duele todos los días**, el comprador **puede decidir y pagar sin
comité**, se lo puede **contactar de forma directa y gratuita** (LinkedIn, mail,
teléfono), y encaja **exactamente** con tu stack. Además permite una cuña de entrada
muy barata (automatizar o integrar algo puntual) que después se expande a un sistema
de gestión y finalmente a mantenimiento recurrente.

### A quién NO le vamos a hablar
A "cualquier empresa que necesite software". Un sitio que le habla a todos no le
vende a nadie: el visitante tiene que reconocerse en el problema en los primeros
cinco segundos. Ese es el motivo de que el sitio arranque hablando de **planillas y
tareas manuales** y no de tecnología.

---

## 4. Qué hacer si los primeros contactos no dan resultado

Plan de contingencia, en orden. Aplicar de a un escalón por vez, con dos o tres
semanas de ejecución cada uno antes de subir.

1. **Medir antes de cambiar.** Revisá el embudo (`docs/05-plan-30-dias.md`): ¿nadie
   responde, o responden y no avanzan? Si nadie responde, el problema es el mensaje
   o la lista. Si responden y no avanzan, el problema es la oferta.
2. **Reducir la oferta a una sola frase.** En lugar de "desarrollo software", ofrecer
   *"Automatizo la carga de pedidos: desde el formulario o la planilla directo a tu
   sistema, sin pasar datos a mano"*. Un problema, un resultado, un precio de entrada.
3. **Elegir un vertical y repetir el mensaje.** Concentrar el contacto en un solo
   rubro (por ejemplo, distribuidoras) para poder hablar su idioma y reutilizar
   el mismo caso de uso en cada conversación.
4. **Convertir el relevamiento en un producto pago.** Ofrecer un **Diagnóstico y
   propuesta** de precio bajo y alcance cerrado (ver §6). Baja el riesgo del cliente
   y te paga por el trabajo de venta.
5. **Cambiar el segmento secundario a primario.** Si a las 3–4 semanas el contacto
   directo no responde, pasar a **agencias y software houses**, donde la demanda es
   visible y publicada. Es menos rentable por hora, pero consigue clientes y casos
   reales.
6. **Subir la frecuencia, no bajar el precio.** Duplicar el volumen de contacto
   personalizado antes que abaratar. Competir por precio destruye el posicionamiento
   que este sitio construye.

---

## 5. Propuesta de valor

### Versión principal (la que está en el sitio)
> **Software a medida para ordenar tu operación y eliminar tareas manuales.**
>
> Diseño y construyo sistemas, integraciones y automatizaciones para pymes y equipos
> que hoy dependen de planillas y necesitan ordenar su información, conectar sus
> herramientas y reducir el trabajo repetitivo.

### Cómo se mejoró la frase de partida
| Punto de partida | Mejora | Por qué |
|---|---|---|
| «Desarrollo software y automatizaciones para que tu negocio trabaje mejor» | «Software a medida para ordenar tu operación y eliminar tareas manuales» | "Trabaje mejor" es una promesa vacía que no se puede verificar. "Ordenar la operación" y "eliminar tareas manuales" son resultados observables. |
| Habla de lo que hacés | Habla del problema del cliente | El visitante se reconoce en su problema, no en tu lista de tecnologías. |
| "y automatizaciones" genérico | "conectar sus herramientas" | Concreto y visualizable: se entiende qué cambia en su día a día. |

### Variantes para usar según el canal
- **30 segundos (WhatsApp/LinkedIn):** "Ayudo a pymes a dejar de cargar datos a mano:
  conecto sus sistemas y automatizo las tareas repetitivas, con software a medida
  cuando hace falta."
- **Una línea (firma de mail):** "Desarrollo software a medida e integraciones para
  pymes que quieren reducir el trabajo manual."
- **Técnica (para colegas y agencias):** "Desarrollador .NET/C# con SQL Server.
  Construyo sistemas de gestión, integro APIs y automatizo procesos con Python y n8n.
  También hago QA automatizado."

### Qué NO promete el sitio (a propósito)
- Plazos o precios fijos sin relevamiento.
- "Transformación digital", "soluciones innovadoras", "sinergia".
- Clientes, métricas o testimonios que no existen.
- Ser experto en todo.

---

## 6. Modelo de oferta y presupuestación

### Producto de entrada: «Diagnóstico y propuesta»
Estrategia de bajo riesgo para el primer contacto. Alcance cerrado:

- Una o dos reuniones de relevamiento (45–60 minutos en total).
- Análisis del proceso actual y de los sistemas implicados.
- Documento de 2 a 4 páginas: alcance por etapas, prioridades, supuestos y riesgos.
- Estimación de esfuerzo y una propuesta económica.

**Por qué conviene cobrarlo (aunque sea poco):** filtra curiosos, te paga por el
trabajo de preventa y convierte una reunión gratis en un compromiso mutuo. Si el
cliente avanza al proyecto, se descuenta del total.

> **A definir por vos:** el precio. Ponelo donde puedas sostenerlo y donde el cliente
> sienta que es una decisión fácil comparado con el proyecto completo.

### Cómo se arma el precio de un proyecto
Se cotiza **por etapas**, no por "puntos". Estas son las variables que mueven el
número. Usalas como checklist en cada presupuesto:

| Variable | Impacta en |
|---|---|
| Cantidad de funciones y pantallas del alcance | Horas de desarrollo |
| Número de sistemas a integrar y calidad de sus datos | Horas de análisis y tratamiento de casos borde |
| Migración de datos existentes y su desorden | Trabajo de limpieza y validación |
| Cantidad de usuarios, roles y permisos | Complejidad de seguridad |
| Requisitos de auditoría, respaldo o normativa | Infraestructura y pruebas |
| Urgencia / plazos exigidos | Recargo o paralelización |
| Estado del software existente a continuar | Riesgo e incertidumbre |
| Nivel de servicio posterior (tiempos de respuesta) | Valor del abono recurrente |

### Método
1. Relevamiento (reunión o escrito).
2. Documento de alcance: qué entra, qué queda afuera, supuestos.
3. Estimación de esfuerzo en horas.
4. **Precio fijo por etapa** (o bolsa de horas cuando el alcance es difuso).
5. Anticipo para iniciar + pagos contra entregas.
6. Los cambios fuera de alcance se cotizan aparte, por escrito, y se aprueban
   **antes** de ejecutarlos.

### Dos números que tenés que definir antes de publicar
1. **Valor hora objetivo.** Calculalo desde atrás: gastos mensuales + ingreso deseado
   + impuestos + tiempo no facturable (ventas, administración, propuestas).
   Regla práctica: solo entre el **50 % y el 65 %** de tu tiempo es facturable.
2. **Proyecto mínimo.** El piso por debajo del cual no aceptás un trabajo. Sin este
   número vas a llenar la agenda de proyectos chicos que no dejan margen y te quitan
   tiempo de vender.

> Registrá estos dos valores en un lugar privado (no en el repositorio), y solo
> considerá publicar precios "desde" cuando tengas al menos **tres proyectos reales
> cerrados** para saber que el número es cierto.

---

## 7. Presentación profesional breve (usar en LinkedIn, mails y reuniones)

### Versión para LinkedIn (acerca de)
> Desarrollador de software. Ayudo a pymes a dejar de sostener su operación con
> planillas y tareas manuales.
>
> Construyo sistemas de gestión a medida (.NET / C# / SQL Server), integro sistemas y
> APIs, y automatizo procesos con Python y n8n. Cuando el proyecto lo requiere, sumo
> QA y pruebas automatizadas para que las entregas no rompan lo que ya funciona.
>
> Cómo trabajo: entiendo el proceso antes de escribir código, entrego por etapas con
> avances visibles, dejo el alcance y los adicionales por escrito, y el código y los
> accesos quedan en poder del cliente.
>
> Trabajo de forma remota desde Argentina, en español y en inglés.
>
> Si tu equipo pierde horas cargando datos a mano o pegado planillas entre sistemas,
> escribime y lo vemos. La primera conversación no tiene costo.

### Versión para mail de presentación (párrafo de apertura)
> Hola [Nombre]: vi que [empresa] trabaja con [planilla/sistema X] y quería
> consultarte algo puntual. Ayudo a empresas como la tuya a automatizar la carga de
> datos entre sistemas para que nadie tenga que hacerlo a mano. Si te interesa, te
> cuento en cinco minutos cómo lo resolví en un caso similar y qué necesitaría saber
> para darte un número.

### Versión de 15 segundos (reunión / llamada)
> "Soy desarrollador de software. Lo que hago es sacarle a las empresas el trabajo
> manual de encima: automatizo procesos, conecto sistemas que no se hablan y, cuando
> hace falta, desarrollo el sistema a medida. Trabajo por etapas, con entregas
> visibles y presupuesto cerrado por escrito."
