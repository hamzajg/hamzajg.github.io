# AGENTS.md — hamzajg.github.io

Guidance for AI agents (and humans) working in this repository.

## Project

Source of <https://hamzajg.github.io> — a static portfolio with a searchable
directory and a dedicated case-study page for each of 45 public repositories.
**Static site: no build step or generator.** GitHub Pages serves
`index.html` from `master`.

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
  index.html          selected-work portfolio landing page
  projects/
    index.html        searchable directory
    catalog.json      project metadata and media
    <slug>/index.html project case studies
  stylesheets/        portfolio.css plus unused legacy themes
  sass/               legacy SASS sources (not loaded)
  javascript/         portfolio.js plus unused legacy plugins (bootstrap.min.js etc.)
  fonts/              icon/web fonts (Font Awesome etc.)
  images/             photos/assets
  colors/             (color scheme assets?)
  LICENSE README.md
```

## Conventions

- **Static, no build** — edit the landing page, catalog, and project pages directly.
  Portfolio styles belong in `stylesheets/portfolio.css`; it has no SASS
  source. Legacy `sass/` files do not affect the current site.
- Keep interactions lightweight and dependency-free; the current portfolio
  uses vanilla JavaScript in `javascript/`.
- All asset paths are relative — keep them that way (GitHub Pages +
  local `http.server` both rely on it).
- Keep project claims aligned with their repository documentation and label
  illustrative previews clearly.

## Landmines

- **Default branch is `master`, not `main` — and GitHub Pages serves
  `master`.** Merging to any other branch does NOT deploy.
- **No build step** — `stylesheets/` is precompiled; editing `sass/`
  alone does nothing until compiled.
- Legacy CV assets remain in the repository but are no longer loaded by the
  portfolio.
- GitHub Pages serves whatever is committed — no preview deploys.

## Agent rules

- Branch from `master`; name branches `feat/*`, `fix/*`, `chore/*`, `docs/*`.
- Docs-only changes still go through a PR; never commit to `master` directly.
- Verify before claiming: `python3 -m http.server 8000` and check the
  page renders — report honestly.
- Keep changes minimal; content edits are the norm.
- Update AGENTS.md / docs/ARCHITECTURE.md when structure or deploy
  behaviour changes.
