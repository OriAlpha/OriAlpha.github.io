/* ===========================================================
   Suhas Goravale Siddaramu — ML infrastructure

   ROLES and PROJECTS drive every panel on the page. Edit them
   and the timeline, the queue, the archive, the counters and
   the node map all rebuild.

   Every readout on the page is derived from this data — the
   counters, the elapsed times and the job states are computed,
   never hard-coded, and the real date sits next to each one.
   =========================================================== */

const ROLES = [
  {
    title: 'Computer Research Scientist, AI',
    org: 'Universitätsklinikum Tübingen',
    where: 'Tübingen',
    from: '2024-08',
    to: null,                       // null = current
    notes: [
      'Built and deployed a RAG chatbot with automated summarization to speed up study work.',
      'Wrote AutoTrainer, which detects the hardware and distributes training across local GPUs or a Slurm cluster.',
      'PyTorch DDP and FSDP, TensorFlow distributed training, AMP, TF32, and automated hyperparameter search.',
      'Ran and scaled ML workloads on Slurm-based HPC, plus CI/CD for testing, containerization and deployment.'
    ]
  },
  {
    title: 'Deep Learning Inference Engineer',
    org: 'Ella Lab GmbH',
    where: 'Köln',
    from: '2022-04',
    to: '2024-07',
    notes: [
      'NLP for summarization, paraphrasing and named entity recognition, fine-tuning LLMs with supervised and reinforcement learning via HuggingFace.',
      'Cut compute cost through pruning, quantization and hyperparameter tuning.',
      'Cross-framework conversion and deployment across PyTorch, ONNX and TensorFlow.',
      'Scalable training with DDP and FSDP, containerized on GCP through Argo Workflows.'
    ]
  },
  {
    title: 'Machine Learning Engineer, Innovation',
    org: 'Clinomic GmbH',
    where: 'Aachen',
    from: '2021-01',
    to: '2022-03',
    notes: [
      'Built an AI assistant over ICU patient data using time series models for clinical decision support.',
      'Data mining and feature engineering on clinical datasets; improved ultrasound image classification precision.',
      'End-to-end Python pipelines for preprocessing, training and evaluation.'
    ]
  },
  {
    title: 'Working Student, Data Science & AI',
    org: 'Aptiv Services Germany GmbH',
    where: 'Wuppertal',
    from: '2019-04',
    to: '2020-12',
    notes: [
      'Extracted features from vehicle RADAR data and optimized TensorFlow models for embedded ARM using graph transformations and Ambarella’s CV22 SDK.',
      'Improved model performance 2–4× through pruning and quantization, with TensorFlow profiling for benchmarking.'
    ]
  }
];

const PROJECTS = [
  { name: 'Autotrainer', lang: 'Python', updated: '2026-08-10', featured: true,
    url: 'https://github.com/OriAlpha/Autotrainer',
    what: 'Hand it a model and data. It finds the hardware, picks the distribution strategy, and infers the loss, optimizer and schedule. PyTorch DDP and Slurm multi-node through one API.' },

  { name: 'PivotDesk', lang: 'Python', updated: '2026-08-05', featured: true,
    url: 'https://github.com/OriAlpha/PivotDesk',
    what: 'Live pivot-point dashboard for NSE stocks. Daily pivots roll forward from each closed session, with a swing panel of moving averages, RSI, MACD and ATR.' },

  { name: 'Percentify', lang: 'Kotlin', updated: '2026-07-30', featured: true,
    url: 'https://github.com/OriAlpha/Percentify',
    what: 'A percentage tracker for Android.' },

  { name: 'The Vault', lang: 'Python', updated: '2026-06-19', featured: true,
    url: 'https://github.com/OriAlpha/Local-RAG-System',
    what: 'Local RAG that never leaves the machine. Ollama for generation, FAISS for millisecond retrieval, two models racing side by side, optional OCR for scans.' },

  { name: 'SlurmGenie', lang: 'Python', updated: '2026-06-19', featured: true,
    url: 'https://github.com/OriAlpha/SlurmGenie',
    what: 'An offline copilot for Slurm GPU clusters. Diagnoses failed jobs, watches GPU utilization, rewrites sbatch scripts. Installs air-gapped.' },

  { name: 'InfraSight', lang: 'JavaScript', updated: '2026-06-19', featured: true,
    url: 'https://github.com/OriAlpha/InfraSight',
    what: 'A transparent proxy that watches LLM, RAG and agent traffic. Request logs, PII masking, conversation replay, nested agent traces and LLM-as-a-judge scoring.' },

  { name: 'Pokerhoster', lang: 'JavaScript', updated: '2026-06-19', featured: true,
    url: 'https://github.com/OriAlpha/Pokerhoster',
    what: 'Chip and point tracking for home poker nights, with a Texas Hold’em rules reference. Vanilla JS and Vite, no framework.' },

  { name: 'Llama3 Finetune', lang: 'Jupyter', updated: '2026-06-19', featured: true,
    url: 'https://github.com/OriAlpha/Llama3_Finetune',
    what: 'Finetuning notebooks for Llama 3.' },

  { name: 'House_Price_Prediction', lang: 'Jupyter', updated: '2026-06-16', url: 'https://github.com/OriAlpha/House_Price_Prediction' },
  { name: 'Edge_Detection_Service', lang: 'Python',  updated: '2023-09-18', url: 'https://github.com/OriAlpha/Edge_Detection_Service' },
  { name: 'wand-cicd',              lang: 'Python',  updated: '2023-04-07', url: 'https://github.com/OriAlpha/wand-cicd' },
  { name: 'Video-Classification',   lang: 'Python',  updated: '2021-08-17', url: 'https://github.com/OriAlpha/Video-Classification' },
  { name: 'Adversarial_Examples',   lang: 'Python',  updated: '2020-11-04', url: 'https://github.com/OriAlpha/Adversarial_Examples' }
];

/* ───────────  thermal ramp: cyan (cold) → amber (hot)  ─────────── */

const STOPS = [
  [0.00, [0x2E, 0xE6, 0xD6]],
  [0.40, [0x7B, 0x5C, 0xFF]],
  [0.70, [0xFF, 0x3D, 0x8B]],
  [1.00, [0xFF, 0xB0, 0x20]]
];

function heatColor(t) {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [p0, c0] = STOPS[i], [p1, c1] = STOPS[i + 1];
    if (x <= p1) {
      const k = (x - p0) / (p1 - p0);
      return `rgb(${c0.map((c, j) => Math.round(c + (c1[j] - c) * k)).join(' ')})`;
    }
  }
  return `rgb(${STOPS[STOPS.length - 1][1].join(' ')})`;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const monthIndex = ym => { const [y, m] = ym.split('-').map(Number); return y * 12 + (m - 1); };
const label = ym => { const [y, m] = ym.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

const now = new Date();
const nowIdx = now.getFullYear() * 12 + now.getMonth();
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════  live clock  ═══════════ */

const clockEl = document.getElementById('clock');

function tick() {
  const d = new Date();
  const t = d.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour12: false });
  clockEl.textContent = t;
  clockEl.setAttribute('datetime', d.toISOString());
}
tick();
setInterval(tick, 1000);

/* ═══════════  counters  ═══════════ */

const firstStart = Math.min(...ROLES.map(r => monthIndex(r.from)));
const totalMonths = nowIdx - firstStart + 1;

const gauges = [
  { val: Math.floor(totalMonths / 12), unit: 'y ' + (totalMonths % 12) + 'm', lbl: 'Experience' },
  { val: PROJECTS.length, unit: '', lbl: 'Repositories' },
  { val: ROLES.length, unit: '', lbl: 'Positions' },
  { val: 4, unit: '×', lbl: 'Peak speedup' }
];

document.getElementById('gauges').innerHTML = gauges.map(g => `
  <div class="gauge">
    <p class="gauge__val">${g.val}<small>${esc(g.unit)}</small></p>
    <p class="gauge__lbl">${esc(g.lbl)}</p>
  </div>`).join('');

/* ═══════════  job history  ═══════════ */

const rolesEl = document.getElementById('roles');
const axisEl = document.getElementById('axis');

const spanLen = nowIdx - firstStart;

for (let y = Math.ceil(firstStart / 12); y <= Math.floor(nowIdx / 12); y++) {
  const tickEl = document.createElement('span');
  tickEl.className = 'axis__tick';
  tickEl.style.left = ((y * 12 - firstStart) / spanLen * 100) + '%';
  tickEl.textContent = String(y).slice(2);
  axisEl.appendChild(tickEl);
}

ROLES.forEach((r, i) => {
  const color = heatColor(ROLES.length === 1 ? 1 : 1 - i / (ROLES.length - 1));
  const startIdx = monthIndex(r.from);
  const endIdx = r.to ? monthIndex(r.to) : nowIdx;
  const left = (startIdx - firstStart) / spanLen * 100;
  const width = Math.max(1.5, (endIdx - startIdx) / spanLen * 100);

  const months = endIdx - startIdx + 1;
  const y = Math.floor(months / 12), m = months % 12;
  const elapsed = [y ? y + 'y' : '', m ? m + 'm' : ''].filter(Boolean).join(' ');

  const li = document.createElement('li');
  li.className = 'role' + (r.to ? '' : ' role--live');
  li.innerHTML = `
    <div class="role__head">
      <span class="role__led" style="background:${color}; color:${color}"></span>
      <div>
        <h3 class="role__title">${esc(r.title)}</h3>
        <p class="role__org">${esc(r.org)} &middot; <span class="role__where">${esc(r.where)}</span></p>
      </div>
      <div class="role__time">
        <span class="role__dates">${label(r.from)} &ndash; ${r.to ? label(r.to) : 'present'}</span>
        <span class="role__elapsed">${elapsed}</span>
      </div>
    </div>
    <div class="role__track" aria-hidden="true">
      <span class="role__span" style="left:${left}%; width:${width}%; background:${color}; color:${color}"></span>
    </div>
    <ul class="role__notes">${r.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>`;
  rolesEl.appendChild(li);
});

/* ═══════════  job queue  ═══════════ */

const items = [...PROJECTS].sort((a, b) => b.updated.localeCompare(a.updated));
const last = items.length - 1;
const DAY = 86400000;

items.forEach((p, i) => {
  p.color = heatColor(last === 0 ? 1 : 1 - i / last);
  const d = new Date(p.updated + 'T00:00:00Z');
  p.stamp = d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  p.year = d.getUTCFullYear();

  const days = (now - d) / DAY;
  p.state = days < 60 ? 'run' : days < 365 ? 'idle' : 'done';
  p.stateLabel = { run: 'RUNNING', idle: 'IDLE', done: 'COMPLETED' }[p.state];
});

const featured = items.filter(p => p.featured);
const archived = items.filter(p => !p.featured);

document.getElementById('queue').innerHTML = featured.map((p, i) => `
  <li><a class="job" href="${esc(p.url)}" data-job="${i}">
    <span class="job__id"><span class="job__swatch" style="background:${p.color}"></span>${String(i + 1).padStart(3, '0')}</span>
    <span class="job__name">${esc(p.name)}</span>
    <span class="job__what">${esc(p.what)}</span>
    <span class="job__lang">${esc(p.lang)}</span>
    <span class="job__state state--${p.state}"><i class="dot dot--${p.state}"></i>${p.stateLabel}</span>
    <span class="job__when">${p.stamp}</span>
  </a></li>`).join('');

document.getElementById('archive-list').innerHTML = archived.map(p => `
  <li><a class="arch" href="${esc(p.url)}">
    <span>${esc(p.name)}</span><span class="arch__year">${p.year}</span>
  </a></li>`).join('');

/* ═══════════  node map  ═══════════ */

const TOTAL = 96, PER_JOB = 8;
const rack = document.getElementById('rack');
const hint = document.getElementById('rack-hint');
const HINT_IDLE = 'One block per GPU. Hover to identify.';

document.getElementById('rack-meta').textContent =
  `${featured.length * PER_JOB} / ${TOTAL} allocated`;

const cells = [];
for (let i = 0; i < TOTAL; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.style.animationDelay = (reduced ? 0 : 0.1 + i * 0.009) + 's';

  const j = Math.floor(i / PER_JOB);
  if (j < featured.length) {
    cell.classList.add('cell--job');
    cell.style.background = featured[j].color;
    cell.style.color = featured[j].color;
    cell.dataset.job = String(j);
    cell.title = featured[j].name;
  }
  rack.appendChild(cell);
  cells.push(cell);
}

/* ═══════════  link the queue and the map  ═══════════ */

const rows = [...document.querySelectorAll('.job')];

function focusJob(i) {
  rack.classList.add('is-focused');
  cells.forEach(c => c.classList.toggle('is-lit', c.dataset.job === String(i)));
  hint.textContent = `${featured[i].name} — ${PER_JOB} GPUs, ${featured[i].stateLabel.toLowerCase()}`;
}

function clearJob() {
  rack.classList.remove('is-focused');
  cells.forEach(c => c.classList.remove('is-lit'));
  hint.textContent = HINT_IDLE;
}

rows.forEach((row, i) => {
  row.addEventListener('mouseenter', () => focusJob(i));
  row.addEventListener('focus', () => focusJob(i));
  row.addEventListener('mouseleave', clearJob);
  row.addEventListener('blur', clearJob);
});

cells.forEach(cell => {
  if (!cell.dataset.job) return;
  const i = Number(cell.dataset.job);
  cell.addEventListener('mouseenter', () => { focusJob(i); rows[i].classList.add('is-hot'); });
  cell.addEventListener('mouseleave', () => { clearJob(); rows[i].classList.remove('is-hot'); });
  cell.addEventListener('click', () => { location.href = featured[i].url; });
});
