# Architecture — hamzajg.github.io

Current-state map for the static portfolio.

## Shape

```
hamzajg.github.io/       static site — GitHub Pages
├── index.html           selected-work portfolio landing page
├── projects/
│   ├── index.html       searchable directory of all 45 public repositories
│   ├── catalog.json     project summaries, product types, stacks, and media
│   └── <slug>/index.html
│                       dedicated case-study page per repository
├── stylesheets/
│   └── portfolio.css    portfolio, directory, and project-page styles
├── javascript/
│   ├── portfolio.js     navigation and walkthrough tabs
│   ├── repository-catalog.js  directory search, filters, and cards
│   └── repository-project.js  shared case-study renderer
├── images/              existing profile and site assets
└── README.md
```

## How it works

- GitHub Pages serves `index.html` from `master`.
- `projects/catalog.json` is the content source for the searchable all-repository
  directory and the shared case-study renderer.
- Each public repository has a standalone page under `projects/<slug>/index.html`.
- Four selected projects retain hand-authored case studies; other project pages
  use the shared renderer and product-type-specific previews.
- Shared styles and progressive-enhancement interactions use relative paths.
- There is no build step, backend, or project-content API.
- The legacy CV stylesheets, scripts, and SASS sources remain in the
  repository but are not loaded by the portfolio.

## Project presentations

Case studies reflect public repository documentation and the GitHub profile
README. Presentation varies by product type, including mobile and wearable
devices, desktop windows, web interfaces, API/service maps, developer tools,
and learning/code views.

Visual previews are original documentation-based illustrations unless a real
image or diagram is linked from a repository README. They are not live
application states. Public video recordings are not currently linked from the
project materials; case-study video sections identify this rather than
implying recordings exist.

## Deployment

The site is static and all internal links are relative. Preview it with
`python3 -m http.server 8000` from the repository root.
