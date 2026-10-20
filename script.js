/* Motosul — interações mínimas, sem dependências */
(function () {
  "use strict";

  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- ano no footer ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- vídeo do hero: carrega só depois de decidir o formato ---------- */
  var video = document.querySelector(".hero-video-bg");
  if (video) {
    var conexao = navigator.connection || {};
    var economizar = conexao.saveData === true || /(^|-)2g$/.test(conexao.effectiveType || "");
    var telaPequena = window.matchMedia("(max-width: 900px)").matches;

    if (!reduzirMovimento.matches && !economizar) {
      var origem = telaPequena ? video.dataset.srcMobile : video.dataset.srcDesktop;
      if (origem) {
        var source = document.createElement("source");
        source.src = origem;
        source.type = "video/mp4";
        video.appendChild(source);
        video.load();
        var play = video.play();
        if (play && typeof play.catch === "function") play.catch(function () {});
      }
    }
  }

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    var fecharMenu = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };

    toggle.addEventListener("click", function () {
      var aberto = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
      toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        fecharMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) fecharMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) fecharMenu();
    });
  }

  /* ---------- header com borda ao rolar ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- botão flutuante: só aparece depois que o CTA do hero sai da tela ---------- */
  var flutuante = document.querySelector(".floating-whatsapp");
  var ctaHero = document.querySelector(".hero-cta-group");
  if (flutuante) {
    if (ctaHero && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        flutuante.classList.toggle("is-visible", !entries[0].isIntersecting);
      }).observe(ctaHero);
    } else {
      flutuante.classList.add("is-visible");
    }
  }

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

    var abrir = function (src, alt, fallback) {
      ultimoFoco = document.activeElement;
      lbImg.onerror = function () {
        if (fallback && lbImg.src !== fallback) lbImg.src = fallback;
        lbImg.onerror = null;
      };
      lbImg.src = src;
      lbImg.alt = alt || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    var fechar = function () {
      lightbox.hidden = true;
      lbImg.src = "";
      lbImg.onerror = null;
      document.body.style.overflow = "";
      if (ultimoFoco) ultimoFoco.focus();
    };

    document.querySelectorAll(".shot").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        abrir(btn.dataset.full, img ? img.alt : "", btn.dataset.fullFallback);
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
