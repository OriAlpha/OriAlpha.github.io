# orialpha.github.io

Source for my personal site, live at **[orialpha.github.io](https://orialpha.github.io)**.

Plain HTML, CSS and JS. No build step, no dependencies, no framework — it is
four files and a font link.

```
index.html    structure and copy
styles.css    design tokens + layout
main.js       role data, project data, the timeline, the node map
.nojekyll     serve the files as-is, skip Jekyll
```

## Editing

Two arrays at the top of `main.js` drive the whole page.

`ROLES` builds the experience timeline. Bars sit on one shared axis running
from my earliest start date to today, so the spans stay comparable and the
axis extends itself as time passes:

```js
{
  title: 'Computer Research Scientist, AI',
  org:   'Universitätsklinikum Tübingen',
  where: 'Tübingen',
  from:  '2024-08',
  to:    null,          // null = current role, bar runs to today
  notes: ['...']
}
```

`PROJECTS` builds the queue, the archive and the node map:

```js
{
  name: 'Autotrainer',
  what: 'Hand it a model and data...',
  lang: 'Python',
  updated: '2026-08-10',
  url: 'https://github.com/OriAlpha/Autotrainer',
  featured: true        // omit or set false to drop it into the archive
}
```

Both lists sort newest-first and colour follows that order, so keeping
`updated` accurate is the only maintenance the page needs.

Each `featured: true` project claims 8 blocks in the node map. Past eight
featured projects the 96-block grid overflows — raise `TOTAL` or lower
`PER_JOB` to fit.

## Design notes

The page is laid out as a Slurm allocation, which is what I spend my days on.
The node map is the cluster, the queue is the job list, and hovering either
one highlights the other. Section labels are `--partition=` directives, and
the experience section is `--partition=history` after `sacct`.

Colour is a thermal ramp — blue, violet, magenta, orange — where warmth means
recency. The same rule covers roles and repositories, so one legend explains
everything. Exact dates sit beside every entry: the colour is a signal, the
text is the record.

Type is Archivo for display at expanded width, IBM Plex Sans and Plex Mono for
body and data.

Dark mode follows the system setting. Contrast passes WCAG AA in both themes,
animation respects `prefers-reduced-motion`, and every project row is
keyboard-focusable.

## Deploying

Pushing to `main` is the deploy. GitHub Pages serves this repo from the branch
root and rebuilds in well under a minute.

```bash
git add -A && git commit -m "Update" && git push
```
