/* ============================================================================
   LÓGICA DEL SITIO
   ----------------------------------------------------------------------------
   Sin dependencias externas. Todo lo que hace está listado abajo:
     1. Aplica los datos de js/config.js a los elementos del HTML.
     2. Oculta enlaces/botones cuyo dato todavía no está configurado.
     3. Avisa si quedan datos de ejemplo sin reemplazar (modo borrador).
     4. Menú móvil accesible.
     5. Header con sombra al desplazarse.
     6. Animaciones de aparición al hacer scroll (respetan "reducir movimiento").
     7. Validación del formulario con mensajes accesibles.
     8. Envío real si hay endpoint; si no, abre el correo con el texto armado.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var contact = cfg.contact || {};
  var identity = cfg.identity || {};
  var form = cfg.form || {};

  /* ------------------------------------------------------------------ */
  /* Utilidades                                                          */
  /* ------------------------------------------------------------------ */
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function byId(id) { return document.getElementById(id); }
  function isSet(v) { return typeof v === "string" && v.trim() !== ""; }

  // Quita un elemento sin dejar restos: si vive dentro de un contenedor de
  // lista que solo lo contiene (por ejemplo el <li> de un menú de contacto),
  // se elimina también ese contenedor para no dejar un hueco vacío.
  function removeClean(el) {
    if (!el || !el.parentNode) return;
    var parent = el.parentNode;
    var tag = parent.tagName ? parent.tagName.toLowerCase() : "";
    var isListWrapper = (tag === "li" || tag === "dt" || tag === "dd");
    if (isListWrapper && parent.children.length === 1) {
      parent.parentNode.removeChild(parent);
    } else {
      parent.removeChild(el);
    }
  }

  // Normaliza un número para usar en un enlace de WhatsApp.
  function whatsappHref(number, prefix) {
    var msg = prefix || "Hola, vi tu portfolio y quiero hacerte una consulta. ";
    return "https://wa.me/" + String(number).replace(/[^\d]/g, "") +
           "?text=" + encodeURIComponent(msg);
  }

  function mailtoHref(prefix) {
    var subject = "Consulta desde el portfolio";
    var body = prefix || "Hola, vi tu portfolio y quiero hacerte una consulta.\n\n";
    return "mailto:" + contact.email +
           "?subject=" + encodeURIComponent(subject) +
           "&body=" + encodeURIComponent(body);
  }

  /* ------------------------------------------------------------------ */
  /* 1 + 2. Inserción de configuración y ocultado de datos vacíos        */
  /* ------------------------------------------------------------------ */

  // Enlaces dinámicos: WhatsApp, mailto, LinkedIn, GitHub.
  qsa("[data-config-href]").forEach(function (el) {
    var kind = el.getAttribute("data-config-href");
    var prefix = el.getAttribute("data-config-href-prefix") || "";
    var href = "";

    if (kind === "whatsapp") {
      if (isSet(contact.whatsappNumber)) href = whatsappHref(contact.whatsappNumber, prefix);
    } else if (kind === "mailto") {
      if (isSet(contact.email)) href = mailtoHref(prefix);
    } else if (kind === "linkedin") {
      if (isSet(contact.linkedin)) href = contact.linkedin;
    } else if (kind === "github") {
      if (isSet(contact.github)) href = contact.github;
    }

    if (href) {
      el.setAttribute("href", href);
    } else if (el.hasAttribute("data-config-hide-if-empty")) {
      // Sin dato configurado se quita el elemento por completo: un <a> sin
      // href no es accesible ni indexable, y tampoco queremos dejar enlaces
      // rotos visibles.
      removeClean(el);
    }
    // Si no hay dato pero el enlace ya apunta a una sección interna
    // (por ejemplo #contacto), se deja tal cual: sigue siendo útil y
    // marcarlo como "deshabilitado" confundiría a los lectores de pantalla.
  });

  // Textos simples (nombre, email, ubicación, teléfono).
  var textMap = {
    name: identity.name,
    nameShort: identity.nameShort,
    location: identity.location,
    email: contact.email,
    phoneDisplay: contact.phoneDisplay
  };
  qsa("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    var val = textMap[key];
    if (isSet(val)) {
      el.textContent = val;
    } else if (key === "email" || key === "phoneDisplay") {
      removeClean(el);
    }
  });

  // Contenedores que quedan vacíos al faltar datos: en vez de dejar un hueco
  // con un borde o una fila flexible sin contenido, se quitan por completo.
  qsa("[data-config-container]").forEach(function (el) {
    if (!el.querySelector("a, button, input, textarea, select")) removeClean(el);
  });

  // La nota que explica que WhatsApp es el canal principal solo tiene sentido
  // si hay WhatsApp configurado; si no, se oculta para no confundir.
  var channelNote = byId("contact-channel-note");
  if (channelNote && !isSet(contact.whatsappNumber)) channelNote.hidden = true;

  // El atributo <html lang> y el año del pie.
  var yearEl = byId("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------ */
  /* 3. Aviso de modo borrador                                            */
  /* ------------------------------------------------------------------ */
  (function draftNotice() {
    var banner = byId("draft-banner");
    if (!banner) return;

    var placeholders = cfg.__placeholders || [];
    var pending = [];

    function check(value, label) {
      if (typeof value !== "string") return;
      for (var i = 0; i < placeholders.length; i++) {
        if (value.trim() === placeholders[i]) { pending.push(label); return; }
      }
    }
    check(identity.name, "nombre");
    check(identity.nameShort, "nombre corto");
    check(identity.siteUrl, "dominio");

    // El teléfono visible solo se muestra dentro del enlace de WhatsApp, así que
    // solo importa (y se revisa) si hay WhatsApp configurado.
    if (isSet(contact.whatsappNumber)) {
      check(contact.phoneDisplay, "teléfono visible (lo muestra el botón de WhatsApp)");
    }

    // WhatsApp, LinkedIn y GitHub son canales OPCIONALES: si faltan, el sitio los
    // oculta sin dejar enlaces rotos. Solo avisamos si no hay NINGÚN canal de contacto.
    if (!isSet(contact.whatsappNumber) && !isSet(contact.email) && !isSet(contact.linkedin)) {
      pending.push("algún canal de contacto (WhatsApp, email o LinkedIn)");
    }

    // Si quedan TODOS los canales vacíos o hay ejemplos sin reemplazar.
    if (pending.length) {
      banner.hidden = false;
      try {
        console.warn("[portfolio] Modo borrador activo. Datos pendientes: " +
          Array.from(new Set(pending)).join(", ") +
          ". Editá js/config.js antes de publicar.");
      } catch (e) { /* consola no disponible */ }

      var dismiss = byId("draft-dismiss");
      if (dismiss) {
        dismiss.addEventListener("click", function () {
          banner.hidden = true;
          try { sessionStorage.setItem("draft-banner-dismissed", "1"); } catch (e) {}
        });
      }
      try {
        if (sessionStorage.getItem("draft-banner-dismissed") === "1") banner.hidden = true;
      } catch (e) {}
    }
  })();

  /* ------------------------------------------------------------------ */
  /* 4. Menú móvil accesible                                             */
  /* ------------------------------------------------------------------ */
  (function mobileNav() {
    var toggle = byId("nav-toggle");
    var nav = byId("primary-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú de navegación");
    }
    function open() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú de navegación");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) close(); else open();
    });

    // Cerrar al elegir una opción.
    qsa("a", nav).forEach(function (a) { a.addEventListener("click", close); });

    // Cerrar con Escape y devolver el foco al botón.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });

    // Cerrar al pasar a escritorio.
    var mq = window.matchMedia("(min-width: 900px)");
    var onChange = function (ev) { if (ev.matches) close(); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  })();

  /* ------------------------------------------------------------------ */
  /* 5. Header al desplazarse                                            */
  /* ------------------------------------------------------------------ */
  (function stickyHeader() {
    var header = byId("site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ------------------------------------------------------------------ */
  /* 6. Animaciones de aparición                                         */
  /* ------------------------------------------------------------------ */
  (function reveal() {
    var targets = qsa(".card, .step, .section-head, .qa, .hero-copy, .hero-visual");
    if (!targets.length) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    targets.forEach(function (el) { el.classList.add("will-reveal"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });

    // Red de seguridad: si el observador no llega a reportar (pestaña en
    // segundo plano, navegador sin soporte real, etc.), se revela todo para
    // que el contenido nunca quede invisible.
    window.setTimeout(function () {
      if (!document.querySelector(".will-reveal.is-visible")) {
        targets.forEach(function (el) { el.classList.add("is-visible"); });
      }
    }, 2500);
  })();

  /* ------------------------------------------------------------------ */
  /* 7 + 8. Formulario                                                   */
  /* ------------------------------------------------------------------ */
  (function contactForm() {
    var formEl = byId("contact-form");
    if (!formEl) return;

    var statusEl = byId("form-status");
    var submitBtn = byId("form-submit");

    // Reglas de validación por campo.
    var rules = {
      "f-name": {
        validate: function (v) { return v.trim().length >= 2; },
        message: "Escribí tu nombre (al menos 2 caracteres)."
      },
      "f-email": {
        validate: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
        message: "Revisá el email: parece incompleto."
      },
      "f-service": {
        validate: function (v) { return v !== ""; },
        message: "Elegí el servicio que te interesa."
      },
      "f-msg": {
        validate: function (v) { return v.trim().length >= 20; },
        message: "Contame un poco más: al menos 20 caracteres."
      },
      "f-consent": {
        validate: function (v, el) { return el.checked; },
        message: "Necesito tu autorización para poder responderte."
      }
    };

    function fieldErrorEl(input) {
      var id = input.id + "-err";
      return byId(id);
    }

    function setError(input, message) {
      var errEl = fieldErrorEl(input);
      if (message) {
        input.setAttribute("aria-invalid", "true");
        input.classList.add("has-error");
        if (errEl) errEl.textContent = message;
      } else {
        input.removeAttribute("aria-invalid");
        input.classList.remove("has-error");
        if (errEl) errEl.textContent = "";
      }
    }

    function validateField(input) {
      var rule = rules[input.id];
      if (!rule) return true;
      var ok = rule.validate(input.value, input);
      setError(input, ok ? "" : rule.message);
      return ok;
    }

    // Validación en vivo después del primer intento de envío.
    var touched = false;
    Object.keys(rules).forEach(function (id) {
      var input = byId(id);
      if (!input) return;
      input.addEventListener("blur", function () {
        if (touched) validateField(input);
      });
      input.addEventListener("input", function () {
        if (touched && input.getAttribute("aria-invalid") === "true") validateField(input);
      });
      input.addEventListener("change", function () {
        if (touched) validateField(input);
      });
    });

    function setStatus(message, type) {
      if (!statusEl) return;
      statusEl.textContent = message || "";
      statusEl.className = "form-note" + (type ? " is-" + type : "");
    }

    function collect() {
      return {
        nombre: (byId("f-name") || {}).value || "",
        email: (byId("f-email") || {}).value || "",
        empresa: (byId("f-company") || {}).value || "",
        telefono: (byId("f-phone") || {}).value || "",
        servicio: (byId("f-service") || {}).value || "",
        mensaje: (byId("f-msg") || {}).value || "",
        origen: "portfolio-web"
      };
    }

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      touched = true;
      setStatus("");

      // Anti-spam: si el campo trampa tiene contenido, se descarta en silencio.
      var honeypot = byId("f-website");
      if (honeypot && honeypot.value.trim() !== "") {
        setStatus("No se pudo enviar la consulta. Escribinos por WhatsApp o email.", "error");
        return;
      }

      var valid = true;
      var firstInvalid = null;
      Object.keys(rules).forEach(function (id) {
        var input = byId(id);
        if (!input) return;
        var ok = validateField(input);
        if (!ok && !firstInvalid) firstInvalid = input;
        if (!ok) valid = false;
      });

      if (!valid) {
        setStatus("Revisá los campos marcados antes de enviar.", "error");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = collect();

      // Caso A: hay endpoint configurado -> envío real.
      if (isSet(form.endpoint)) {
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
        setStatus("Enviando…", "loading");

        fetch(form.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            formEl.reset();
            touched = false;
            setStatus("¡Listo! Recibí tu consulta y te respondo a la brevedad.", "success");
          })
          .catch(function () {
            setStatus("No se pudo enviar en este momento. Escribime por WhatsApp o email, " +
                      "que te respondo igual.", "error");
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.classList.remove("is-loading");
          });
        return;
      }

      // Caso B: sin endpoint -> NO simulamos un envío. Abrimos el correo.
      if (!isSet(contact.email)) {
        setStatus("El formulario todavía no está conectado. Usá WhatsApp para contactarme.", "error");
        return;
      }
      var body =
        "Nombre: " + data.nombre + "\n" +
        "Email: " + data.email + "\n" +
        "Empresa: " + (data.empresa || "-") + "\n" +
        "WhatsApp: " + (data.telefono || "-") + "\n" +
        "Servicio: " + data.servicio + "\n\n" +
        "Mensaje:\n" + data.mensaje + "\n";

      var mailUrl = "mailto:" + contact.email +
        "?subject=" + encodeURIComponent("Consulta desde el portfolio: " + data.servicio) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailUrl;
      setStatus("Se abrió tu cliente de correo con el mensaje ya redactado. " +
                "Si no se abrió, escribime directamente a " + contact.email + ".", "success");
    });
  })();

})();
