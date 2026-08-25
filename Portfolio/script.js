/* ============================
   LOADER
============================ */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 400);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page-transition");
  if (page) {
    setTimeout(() => {
      page.classList.add("show");
    }, 50);
  }
});

/* ============================
   MENU BURGER (Responsive)
============================ */

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });
}

/* ============================
   FONCTIONS UTILES
============================ */

// Afficher un message dans la console proprement
function log(msg) {
  console.log(`🔧 ${msg}`);
}

// Sélecteur rapide
function $(selector) {
  return document.querySelector(selector);
}

// Création rapide d’un élément
function create(tag, text = "", className = "") {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (className) el.classList.add(className);
  return el;
}

/* ============================
   MINI-APPS (si présentes)
============================ */

// Exemple : compteur
function initCompteur() {
  const plus = $("#plus");
  const moins = $("#moins");
  const reset = $("#reset");
  const valeur = $("#valeur");

  if (!plus || !moins || !reset || !valeur) return;

  let count = 0;

  plus.addEventListener("click", () => {
    count++;
    valeur.textContent = count;
  });

  moins.addEventListener("click", () => {
    count--;
    valeur.textContent = count;
  });

  reset.addEventListener("click", () => {
    count = 0;
    valeur.textContent = count;
  });

  log("Compteur initialisé");
}

// Exemple : citations aléatoires
function initCitations() {
  const btn = $("#citation-btn");
  const zone = $("#citation-zone");

  if (!btn || !zone) return;

  const citations = [
    "Le code, c’est la poésie du futur.",
    "Chaque bug est une leçon.",
    "Un bon développeur simplifie, pas complique.",
    "La pratique vaut mieux que la théorie."
  ];

  btn.addEventListener("click", () => {
    const random = Math.floor(Math.random() * citations.length);
    zone.textContent = citations[random];
  });

  log("Citations initialisées");
}

/* ============================
   INITIALISATION MINI-APPS
============================ */

function detectMiniApp() {
  const body = document.body;

  if (document.querySelector("#valeur")) return "compteur";
  if (document.querySelector("#citation-zone")) return "citations";
  if (document.querySelector("#slider")) return "slider";
  if (document.querySelector("#calc-display")) return "calculatrice";
  if (document.querySelector("#dark-toggle")) return "darkmode";
  if (document.querySelector("#form")) return "form";

  return null;
}

function initMiniApp(app) {
  switch(app) {
    case "compteur":
      initCompteur();
      break;
    case "citations":
      initCitations();
      break;
    case "slider":
      initSlider();
      break;
    case "calculatrice":
      initCalculatrice();
      break;
    case "darkmode":
      initDarkMode();
      break;
    case "form":
      initForm();
      break;
  }
}

/* ============================
   FIX TRANSITIONS POUR MINI-APPS
============================ */

document.querySelectorAll("a").forEach(link => {
  const href = link.getAttribute("href");

  // Ignorer transitions dans les mini-apps
  if (
    link.closest(".miniapp") ||
    link.classList.contains("no-transition") ||
    !href ||
    href.startsWith("#") ||
    href.startsWith("http")
  ) {
    return;
  }

  link.addEventListener("click", e => {
    e.preventDefault();

    const page = document.querySelector(".page-transition");
    if (page) {
      page.classList.add("page-exit");
      setTimeout(() => window.location.href = href, 300);
    } else {
      window.location.href = href;
    }
  });
});

/* ============================
   INITIALISATION GLOBALE
============================ */

function init() {
  const app = detectMiniApp();
  if (app) {
    console.log("Mini-app détectée :", app);
    initMiniApp(app);
  } else {
    console.log("Page standard chargée");
  }
}

init();
function initSlider() {
  const img = $("#slider");
  const prev = $("#prev");
  const next = $("#next");

  if (!img || !prev || !next) return;

  const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
  let index = 0;

  function update() {
    img.src = images[index];
  }

  prev.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    update();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % images.length;
    update();
  });

  update();
}
function initCalculatrice() {
  const display = $("#calc-display");
  const buttons = document.querySelectorAll(".calc-btn");

  if (!display || !buttons.length) return;

  let current = "";

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.textContent;

      if (val === "=") {
        current = eval(current).toString();
      } else {
        current += val;
      }

      display.textContent = current;
    });
  });
}
function initDarkMode() {
  const btn = $("#dark-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}
function initForm() {
  const form = $("#form");
  const result = $("#form-result");

  if (!form || !result) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = $("#name").value;
    const email = $("#email").value;
    const msg = $("#msg").value;

    result.textContent = `Merci ${name}, votre message a été envoyé !`;
  });
}

