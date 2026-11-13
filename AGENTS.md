# AGENTS.md — hamzajg.github.io

Guidance for AI agents (and humans) working in this repository.

## Project

Source of <https://hamzajg.github.io> — a single-page **CV/resume site**
built on Bootstrap 3, Materialize, Font Awesome, and small jQuery plugins
(scroll reveal, touch swipe, retina, map with labels).
**Static site: no build step or generator.** GitHub Pages serves
`index.html` from `master`; SASS sources live in `sass/` but the site
loads precompiled CSS from `stylesheets/`.

## Commands

No build, no tests, no CI.

| Task | Command |
|---|---|
| Preview locally | `python3 -m http.server 8000` in repo root → `http://localhost:8000/` (all paths relative) |
| Deploy | push to `master` — GitHub Pages serves it automatically |

If you edit `sass/`, compile it and commit the output to
`stylesheets/` — the site does **not** build CSS at runtime.

## Architecture

```
hamzajg.github.io/
  index.html          the whole site (single page)
  stylesheets/        precompiled CSS (bootstrap.min.css etc.)
  sass/               SASS sources (not loaded directly)
  javascript/         jQuery + plugins + site scripts (bootstrap.min.js etc.)
  fonts/              icon/web fonts (Font Awesome etc.)
  images/             photos/assets
  colors/             (color scheme assets?)
  LICENSE README.md
```

## Conventions

- **Static, no build** — edit `index.html` + `stylesheets/` +
  `javascript/` directly; keep `sass/` in sync if you change styles.
- jQuery-era plugins — don't introduce a framework/bundler; match the
  existing script style.
- All asset paths are relative — keep them that way (GitHub Pages +
  local `http.server` both rely on it).
- KISS: it's a CV page — content changes, not architecture.

## Landmines

- **Default branch is `master`, not `main` — and GitHub Pages serves
  `master`.** Merging to any other branch does NOT deploy.
- **No build step** — `stylesheets/` is precompiled; editing `sass/`
  alone does nothing until compiled.
- jQuery + Bootstrap 3 + Materialize mix — old stack; don't modernise
  without need.
- `index.html` is large (~1000+ lines) — edit carefully, it's the whole
  site.
- GitHub Pages serves whatever is committed — no preview deploys.

## Agent rules

- Branch from `master`; name branches `feat/*`, `fix/*`, `chore/*`, `docs/*`.
- Docs-only changes still go through a PR; never commit to `master` directly.
- Verify before claiming: `python3 -m http.server 8000` and check the
  page renders — report honestly.
- Keep changes minimal; content edits are the norm.
- Update AGENTS.md / docs/ARCHITECTURE.md when structure or deploy
  behaviour changes.
