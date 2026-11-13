# hamzajg.github.io

The source of <https://hamzajg.github.io> — a single-page CV/resume site built
on Bootstrap 3, Materialize, Font Awesome and a set of small jQuery plugins
(scroll reveal, touch swipe, retina, a map with labels).

It is a static site: GitHub Pages serves `index.html` from the `master`
branch, and there is no build step or generator. The SASS sources are kept in
`sass/`, but the site loads the precompiled CSS in `stylesheets/`.

## Preview locally

Any static file server works, because all paths are relative:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Layout

```
index.html                 the whole page: loader, menu, profile, about,
                           experience, skills, portfolio, interest, contact
javascript/
  custom.js                menu, modals, scroll reveal, scroll-to-top, theme hook
  *.min.js                 jQuery, Bootstrap, Materialize, and plugins
stylesheets/
  style.css                the stylesheet the page loads
  style_<colour>.css       alternative palettes (blue, brown, dark, gray,
                           green, pink, purple, red, teal)
  style.scss, style.css.map
sass/                      the partials behind the compiled stylesheet
images/, fonts/, colors/   assets and palette notes
```

## Editing

- Text, sections and links are all in `index.html`.
- Styles are authored in `sass/` and compiled into `stylesheets/style.css`.
  If you change a partial, recompile it; the page does not read `sass/`.
- The alternate palettes in `stylesheets/style_<colour>.css` are not wired
  to anything yet: the page's stylesheet link has `id="switch_style"`, but no
  code swaps it. Point that link at one of them to try a palette.

## License

MIT — see [LICENSE](LICENSE).
