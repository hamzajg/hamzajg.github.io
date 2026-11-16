# Hamza Jguerim — Portfolio

The source of <https://hamzajg.github.io> — a static, project-led portfolio
for software architecture, AI agent systems, backend platforms, and workflow
automation.

The portfolio is informed by Hamza's [GitHub profile README](https://github.com/hamzajg)
and documents all 45 public repositories in a searchable directory. It has no
build step or generator; GitHub Pages serves the files from the `master` branch.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Layout

```
index.html                         portfolio landing page
projects/
  index.html                       searchable directory of all repositories
  catalog.json                     project summaries and product metadata
  stream-weave/index.html          web workflow platform case study
  agentcraft/index.html            local-first developer tool case study
  orca-platform/index.html         local model gateway case study
  java-microservices-ddd/index.html
                                   DDD and microservices case study
  <41 additional repository pages>/ dedicated project case studies
stylesheets/portfolio.css          portfolio, directory, and case-study styles
javascript/portfolio.js            navigation and curated-page interactions
javascript/repository-catalog.js   directory search, filters, and cards
javascript/repository-project.js   shared renderer for repository pages
images/                             existing profile and site assets
```

Every repository has its own page, with product-type-specific presentations
for web, mobile, wearable, desktop, backend, developer tool, learning, and
concept projects. Pages include a summary, walkthrough, technical highlights,
source link, and available repository media. The four selected case studies
remain hand-authored; the rest are rendered from `projects/catalog.json`.

Illustrations based on public project documentation are labeled as such. Real
screenshots and diagrams are shown when repository READMEs link them. No public
video recordings are currently linked in the project materials.

## Editing

- Landing-page copy lives in `index.html`; project metadata lives in
  `projects/catalog.json`.
- Hand-authored case studies and generated project shells live in
  `projects/*/index.html`.
- Portfolio styles live in `stylesheets/portfolio.css`; the legacy CV theme
  stylesheets and SASS sources are no longer loaded by the site.
- Shared landing-page interactions live in `javascript/portfolio.js`.
- Directory and repository-page rendering live in
  `javascript/repository-catalog.js` and `javascript/repository-project.js`.
- Keep asset and page links relative so both GitHub Pages and the local static
  server work.

## License

MIT — see [LICENSE](LICENSE).
