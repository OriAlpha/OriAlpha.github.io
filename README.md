# orialpha.github.io

Personal site. Plain HTML, CSS and JS — no build step, no dependencies.

```
index.html    structure and copy
styles.css    design tokens + layout
main.js       CV data, project data, the timeline, the node map
.nojekyll     tells GitHub Pages to serve the files as-is
```

## Deploying

The site needs a repo named exactly `OriAlpha.github.io` — that name is what
makes GitHub serve it at the root domain. It is a *different* repo from your
existing `OriAlpha` one, which holds your profile README.

1. Create a new **public** repo called `OriAlpha.github.io`.
2. From this folder:

```bash
git init && git add . && git commit -m "Personal site" && git branch -M main && git remote add origin https://github.com/OriAlpha/OriAlpha.github.io.git && git push -u origin main
```

3. In the repo: **Settings → Pages → Source → Deploy from a branch**, pick
   `main` and `/ (root)`.

Live at `https://orialpha.github.io` within a minute or two.

## Editing

Two arrays at the top of `main.js` drive everything.

**`ROLES`** builds the experience timeline. Bars are positioned on one shared
axis that runs from your earliest start date to today, so the spans stay
comparable and the axis extends itself as time passes:

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

**`PROJECTS`** builds the queue, the archive and the node map:

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

Both lists sort newest-first, and colour follows that order — most recent runs
hot orange, oldest runs cold blue. Keep `updated` current when you push to a
project and the page stays honest on its own.

`featured: true` items each claim 8 blocks in the node map. Nine or more
featured projects will overflow the 96-block grid — either raise `TOTAL` or
lower `PER_JOB` in `main.js` if you get there.

## What I left off the page

Your CV carries several things that belong in a job application but not on a
public URL, so they are deliberately absent:

- **Phone number** — scraped constantly, and easy to hand out privately.
- **Street address** — no reason for it to be public.
- **Date of birth** — normal on a German CV, an identity-theft vector online.
- **Photo and signature** — the signature especially; never publish one.

Email and LinkedIn *are* on the page, since a contact section needs a way to
reach you. If you would rather not have the address scraped, delete the
`mailto:` line in `index.html` and let LinkedIn carry it.

## Notes on the design

Colour is a thermal ramp (blue → violet → magenta → orange) where warmth means
recency — applied to both the roles and the repos, so one rule explains the
whole page. Exact dates sit next to every entry, so the colour is a signal and
the text is the truth.

Section labels are `--partition=` directives because the page is laid out as a
Slurm allocation: the node map is the cluster, the queue is the job list, and
hovering either one highlights the other. The experience section is
`--partition=history`, after `sacct`, the command that shows finished jobs.

Dark mode follows the system setting. Contrast passes WCAG AA in both themes,
animation respects `prefers-reduced-motion`, and every project row is
keyboard-focusable.
