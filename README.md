# orialpha.github.io

Source for my personal site, live at **[orialpha.github.io](https://orialpha.github.io)**.

Plain HTML, CSS and JS. No build step, no dependencies, no framework — it is
four files and a font link.

```
index.html    panel structure and copy
styles.css    console palette + layout
main.js       role data, project data, counters, timeline, node map
.nojekyll     serve the files as-is, skip Jekyll
```

## Editing

Two arrays at the top of `main.js` drive every panel.

`ROLES` builds the job history. Bars sit on one shared axis running from my
earliest start date to today, so the spans stay comparable and the axis
extends itself as time passes:

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

Every readout is computed from those two arrays — the counters, the elapsed
times, the axis, the job states. Nothing is hard-coded, so keeping `updated`
accurate is the only maintenance the page needs.

Each `featured: true` project claims 8 blocks in the node map. Past eight
featured projects the 96-block grid overflows — raise `TOTAL` or lower
`PER_JOB` to fit.

## Design notes

The page is an instrument console, because scheduling work onto hardware is
what I spend my days on. Panels are the sections, the node map is the cluster,
and the queue is the job list — hovering either one highlights the other. Job
history is `sacct`, the queue is `squeue`.

Colour follows a cockpit convention: cyan is nominal, amber is active. The
ramp runs cyan → violet → magenta → amber and encodes recency wherever it
appears, across both roles and repositories, so one rule explains the whole
page.

Job state comes from a stated rule rather than a claim: pushed within 60 days
reads RUNNING, within the year IDLE, older COMPLETED. The real date sits in
the next column, so the state is a view over the data and never a substitute
for it. Same for the counters — experience is computed from my first start
date, not typed in.

Type is Saira, one variable family carrying both the condensed instrument
labels and the body text, with JetBrains Mono for telemetry.

Contrast passes WCAG AA throughout, animation respects
`prefers-reduced-motion`, and every project row is keyboard-focusable.

## Deploying

Pushing to `main` is the deploy. GitHub Pages serves this repo from the branch
root and rebuilds in well under a minute.

```bash
git add -A && git commit -m "Update" && git push
```
