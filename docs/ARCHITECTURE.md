# Architecture — hamzajg.github.io

Current-state map. Descriptive, not aspirational; see `docs/adr/` for why.

## Shape

```
hamzajg.github.io/       static site — GitHub Pages
├── index.html           single-page CV/resume (~1000 lines)
├── stylesheets/         precompiled CSS (bootstrap.min.css, …)
├── sass/                SASS sources (not served)
├── javascript/          jQuery + plugins + site scripts
├── fonts/               Font Awesome / web fonts
├── images/              photos, assets
├── colors/              colour-scheme assets
├── LICENSE README.md
└── (no build system)
```

## How it works

- GitHub Pages serves `index.html` from `master` at
  `hamzajg.github.io`.
- `index.html` links `stylesheets/*.css`, `javascript/*.js`, `fonts/`,
  `images/` — all relative paths.
- jQuery plugins enhance the page (scroll reveal, swipe, retina, map).
- `sass/` is source-only; `stylesheets/` is what the browser loads.

## Content

Personal CV/resume — single page, sections for experience/skills/etc.
Content edits are the primary change type.

## State

None — fully static, no backend, no build.
