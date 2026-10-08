// Preferencias de idioma y tema para las dos páginas estáticas del showcase.
(() => {
  "use strict";

  const root = document.documentElement;
  const languageKey = "apate-showcase-language";
  const themeKey = "apate-showcase-theme";
  const siteBase = document.currentScript && document.currentScript.src
    ? new URL(".", document.currentScript.src)
    : new URL(".", window.location.href);

  function readPreference(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function savePreference(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // El selector sigue funcionando aunque file:// bloquee localStorage.
    }
  }

  const savedLanguage = readPreference(languageKey);
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  const browserIsSpanish = browserLanguage.toLowerCase().split("-")[0] === "es";
  const effectiveLanguage = requestedLanguage === "en" || requestedLanguage === "es"
    ? requestedLanguage
    : savedLanguage === "en" || savedLanguage === "es"
      ? savedLanguage
      : browserIsSpanish ? "es" : "en";

  if (root.lang === "en" && effectiveLanguage === "es") {
    const destination = new URL("es/index.html", siteBase);
    destination.hash = window.location.hash;
    window.location.replace(destination.href);
    return;
  }

  const savedTheme = readPreference(themeKey);
  let theme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : "dark";
  function applyTheme() {
    root.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#080d12" : "#edf4f4");
    updateThemeButton();
  }

  function updateThemeButton() {
    const button = document.querySelector("[data-theme-toggle]");
    if (button) button.setAttribute("aria-pressed", String(theme === "dark"));
  }

  applyTheme();

  function activateControls() {

    document.querySelectorAll("[data-language-choice]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const language = link.dataset.languageChoice;
        savePreference(languageKey, language);
        if (window.location.hash) {
          event.preventDefault();
          const destination = new URL(link.href);
          destination.hash = window.location.hash;
          window.location.assign(destination.href);
        }
      });
    });

    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
      button.addEventListener("click", () => {
        theme = theme === "dark" ? "light" : "dark";
        savePreference(themeKey, theme);
        applyTheme();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", activateControls);
  } else {
    activateControls();
  }
})();
