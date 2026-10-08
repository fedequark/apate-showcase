# APATE showcase

Static, bilingual showcase for [APATE](https://github.com/fedequark/Apate-Cyberdeception), a cyberdeception operation orchestration project.

**Live site:** https://fedequark.github.io/apate-showcase/

The English page is the default. On a first visit, `site.js` detects a Spanish browser language and opens the Spanish page. Visitors can switch between English and Spanish, and between dark and light themes; explicit choices are saved in local storage. The site uses relative paths so it also works under a GitHub Pages project URL.

The visual language uses dark graphite, a subtle grid, lime accents, and a schematic operation panel. The architecture image in Spanish comes from Archify; the English diagram is a translated vector adaptation. The hero model is conceptual and is labeled as such.

This repository contains only the static showcase (`index.html`, `es/`, `site.js`, `styles.css`, `.nojekyll`, and `assets/`). GitHub Pages publishes `main` from the repository root. No build step, framework, external font, or tracking service is required.

APATE and its community code are licensed under AGPL-3.0-or-later. See `LICENSE` for the license text. The Archify credit is included next to the architecture diagram.
