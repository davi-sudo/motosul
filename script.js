/* Motosul — interações mínimas, sem dependências */
(function () {
  "use strict";

  /* ---------- ano no footer ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var aberto = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
      toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- header com borda ao rolar ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal ao entrar na viewport ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- lightbox da galeria ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var ultimoFoco = null;

    var abrir = function (src, alt) {
      ultimoFoco = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    var fechar = function () {
      lightbox.hidden = true;
      lbImg.src = "";
      document.body.style.overflow = "";
      if (ultimoFoco) ultimoFoco.focus();
    };

    document.querySelectorAll(".shot").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        abrir(btn.dataset.full, img ? img.alt : "");
      });
    });

    closeBtn.addEventListener("click", fechar);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) fechar();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) fechar();
    });
  }
})();
