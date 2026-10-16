/* ============================================================================
   CONFIGURACIÓN DEL SITIO
   ----------------------------------------------------------------------------
   Este es el ÚNICO archivo que tenés que editar para publicar tu portfolio.
   Todos los datos comerciales del sitio se toman de acá.

   CÓMO USARLO
   1. Reemplazá cada valor de ejemplo por tu dato real.
   2. Dejá vacío ("") cualquier dato que todavía no tengas: el sitio oculta
      automáticamente los botones y enlaces que dependan de ese dato, en lugar
      de mostrar un enlace roto.
   3. Cuando ya no quede ningún valor de ejemplo, desaparece el cartel
      "Modo borrador" que aparece abajo de todo.

   IMPORTANTE: este archivo se publica junto con el sitio. No pongas acá
   contraseñas, tokens ni claves de API. Solo datos que querés que sean
   públicos.
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------------------------------------------------------------------
     1) IDENTIDAD
     --------------------------------------------------------------------- */
  identity: {
    // Nombre y apellido tal como querés figurar profesionalmente.
    name: "Bruno Gentile",

    // Nombre corto para el encabezado (nombre de pila o marca personal).
    nameShort: "Bruno Gentile",

    // Ciudad / país. Se muestra en el pie de página.
    location: "Argentina",

    // Dominio final, con barra al final. Se usa en el sitemap y en los
    // metadatos de index.html (esos hay que editarlos a mano, ver README).
    siteUrl: "https://tu-dominio.com/"
  },

  /* ---------------------------------------------------------------------
     2) CONTACTO
     --------------------------------------------------------------------- */
  contact: {
    // Número de WhatsApp en formato internacional, SOLO dígitos.
    // Argentina, Buenos Aires: 54 9 11 1234-5678  ->  "5491112345678"
    // Si lo dejás vacío, se ocultan todos los botones de WhatsApp.
    whatsappNumber: "",

    // Cómo querés que se vea el número en pantalla.
    phoneDisplay: "+54 9 11 0000-0000",

    // Email de contacto.
    email: "consultas.proyectos.software@gmail.com",

    // Perfil de LinkedIn (URL completa).
    linkedin: "https://www.linkedin.com/in/brunoagustingentile/",

    // Perfil de GitHub (URL completa). Opcional.
    github: ""
  },

  /* ---------------------------------------------------------------------
     3) FORMULARIO DE CONTACTO
     ---------------------------------------------------------------------
     El formulario valida los datos en el navegador siempre.

     Si dejás endpoint vacío (""):  el formulario NO finge enviar nada.
       Abre el cliente de correo del visitante con el mensaje ya redactado,
       y avisa en pantalla que se usó ese medio. Requiere que 'email'
       esté configurado.

     Si completás endpoint: el formulario envía un POST con JSON a esa URL y
     muestra confirmación solo si el servicio responde bien. Opciones:
       • Formspree:  "https://formspree.io/f/TU_ID"
       • Netlify Forms / Vercel: endpoints propios (ver docs/04-publicacion.md)
       • Tu propio backend: cualquier URL que acepte POST JSON.

     Nota: no incluyas claves secretas acá; un endpoint público siempre es
     visible en el navegador.
     --------------------------------------------------------------------- */
  form: {
    endpoint: ""
  },

  /* ---------------------------------------------------------------------
     4) ENLACES A REDES Y OTROS DESTINOS
     ---------------------------------------------------------------------
     Se derivan de la sección "contact". No hace falta editar nada acá.
     --------------------------------------------------------------------- */
  links: {},

  /* ---------------------------------------------------------------------
     5) VALORES DE EJEMPLO A DETECTAR (no editar)
     ---------------------------------------------------------------------
     Si alguno de estos valores sigue presente, el sitio muestra el aviso de
     "Modo borrador". Es a propósito: evita publicar datos falsos sin darte
     cuenta.
     --------------------------------------------------------------------- */
  __placeholders: [
    "Tu Nombre Completo",
    "Tu Nombre",
    "tu@email.com",
    "+54 9 11 0000-0000",
    "https://tu-dominio.com/"
  ]
};
