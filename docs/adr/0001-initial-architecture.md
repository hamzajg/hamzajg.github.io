# ADR 0001 — Initial architecture

Date: 2026-11-13 (baseline recorded retroactively)
Status: accepted (describes what is built)

## Context

A personal CV/resume site on GitHub Pages — minimal tooling, maximum
simplicity.

## Decisions

1. **Static site, no build.** `index.html` + precompiled assets served
   directly by GitHub Pages. Rationale: a CV page needs zero tooling —
   KISS.
2. **Bootstrap 3 + Materialize + jQuery plugins.** Era-typical static
   stack. Rationale: worked at the time; still renders fine.
3. **SASS sources kept but not built.** `sass/` documents intent;
   `stylesheets/` is committed precompiled. Rationale: keeps styling
   editable without a build pipeline.
4. **Relative paths throughout.** Works on `hamzajg.github.io` and any
   local static server. Rationale: portability.
5. **`master` branch is the deploy branch.** GitHub Pages serves it.
   Rationale: Pages' default for user sites.

## Consequences / open questions

- No CI/preview — changes go live on merge to `master`.
- Old stack (Bootstrap 3, jQuery) — fine for a CV; modernisation is
  optional, not needed.
- `sass/` can drift from `stylesheets/` — if you edit SASS, compile and
  commit the CSS in the same PR.
