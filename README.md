# orialpha.github.io

Source for my personal site, live at **[orialpha.github.io](https://orialpha.github.io)**.

Plain HTML, CSS and JS. No build step, no dependencies, no framework — it is
four files and a font link.

```
index.html    panel structure and copy
styles.css    console palette + layout
main.js       role data, project data, timeline, queue
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

Add `minor: true` to a role to list it quietly — dated and present, but
without bullets and at reduced weight. The student position uses it.

`PROJECTS` builds the job queue and the archive:

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

Every readout is computed from those two arrays — the elapsed times, the
axis, the job states. Nothing is hard-coded, so keeping `updated`
accurate is the only maintenance the page needs.

## Connecting the contact form

The form posts to [Formspree](https://formspree.io). Until it has an endpoint
it disables itself and says so, rather than silently swallowing messages.

1. Sign up at formspree.io and create a form (free tier: 50 submissions/month).
2. Copy the form id from the endpoint it gives you — `https://formspree.io/f/<id>`.
3. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` with that id.
4. Bump the `?v=` on both asset links, commit and push.

Formspree emails submissions to the address on the account, so my address stays
off the page. The hidden `_gotcha` field is a spam trap: bots fill it in,
people never see it, and Formspree drops anything that has it set.

With JavaScript off the form still submits as a normal HTML POST and lands on
Formspree's own confirmation page. With JavaScript on it posts in the
background and reports status inline.

## Design notes

The page is an instrument console, because scheduling work onto hardware is
what I spend my days on. Panels are the sections, the job history is `sacct`
and the queue is `squeue`.

The signal path panel is the headline claim drawn out: it shows the stack from
model down to metal, with the two layers I actually work on picked out of it.
Roles carry the same hierarchy — the three positions I want read sit at full
weight, and the student role is listed and dated but deliberately quiet.

Colour follows a cockpit convention: cyan is nominal, amber is active. The
ramp runs cyan → violet → magenta → amber and encodes recency wherever it
appears, across both roles and repositories, so one rule explains the whole
page.

Job state comes from a stated rule rather than a claim: pushed within 60 days
reads RUNNING, within the year IDLE, older COMPLETED. The real date sits in
the next column, so the state is a view over the data and never a substitute
for it. The axis is the same: it runs from my first start date to today and
extends itself, rather than being a fixed range I maintain.

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

If a change touches `index.html` together with `styles.css` or `main.js`, bump
the `?v=` on both asset links in `index.html`. Browsers cache the CSS and JS
harder than the HTML, and without the bump a visitor can end up running last
week's script against this week's markup.
