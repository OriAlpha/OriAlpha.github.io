/* ===========================================================
   Suhas Goravale Siddaramu - ML infrastructure

   Two data blocks drive the whole page: ROLES and PROJECTS.
   Edit those and the timeline, the queue, the archive and the
   node map all rebuild themselves.

   One rule runs throughout: warmth means recency. Most recent
   is hot orange, oldest is cold blue, and the real dates are
   always printed alongside so the colour is a signal, not a
   substitute for the facts.
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
  {
    name: 'Autotrainer',
    what: 'Hand it a model and data. It finds the hardware, picks the distribution strategy, and infers the loss, optimizer and schedule. PyTorch DDP and Slurm multi-node, TensorFlow, scikit-learn, XGBoost through one API.',
    lang: 'Python',
    updated: '2026-08-10',
    url: 'https://github.com/OriAlpha/Autotrainer',
    featured: true
  },
  {
    name: 'PivotDesk',
    what: 'Live pivot-point dashboard for NSE stocks. Daily pivots roll forward from each closed session, with a swing panel of moving averages, RSI, MACD, Supertrend and ATR for multi-day context.',
    lang: 'Python',
    updated: '2026-08-05',
    url: 'https://github.com/OriAlpha/PivotDesk',
    featured: true
  },
  {
    name: 'Percentify',
    what: 'A percentage tracker for Android.',
    lang: 'Kotlin',
    updated: '2026-07-30',
    url: 'https://github.com/OriAlpha/Percentify',
    featured: true
  },
  {
    name: 'The Vault',
    what: 'Local RAG that never leaves the machine. Ollama for generation, FAISS for millisecond retrieval, two models racing side by side, and optional OCR for scanned documents.',
    lang: 'Python',
    updated: '2026-06-19',
    url: 'https://github.com/OriAlpha/Local-RAG-System',
    featured: true
  },
  {
    name: 'SlurmGenie',
    what: 'An offline copilot for Slurm GPU clusters. Diagnoses failed jobs, watches GPU utilization, and rewrites sbatch scripts. Installs air-gapped, sends nothing to the cloud.',
    lang: 'Python',
    updated: '2026-06-19',
    url: 'https://github.com/OriAlpha/SlurmGenie',
    featured: true
  },
  {
    name: 'InfraSight',
    what: 'A transparent proxy that watches LLM, RAG and agent traffic. Live request logs, PII masking, conversation replay, nested agent traces and LLM-as-a-judge scoring against any OpenAI-compatible API.',
    lang: 'JavaScript',
    updated: '2026-06-19',
    url: 'https://github.com/OriAlpha/InfraSight',
    featured: true
  },
  {
    name: 'Pokerhoster',
    what: 'Chip and point tracking for home poker nights, with a Texas Hold’em rules reference alongside. Vanilla JS and Vite, no framework.',
    lang: 'JavaScript',
    updated: '2026-06-19',
    url: 'https://github.com/OriAlpha/Pokerhoster',
    featured: true
  },
  {
    name: 'Llama3 Finetune',
    what: 'Finetuning notebooks for Llama 3.',
    lang: 'Jupyter',
    updated: '2026-06-19',
    url: 'https://github.com/OriAlpha/Llama3_Finetune',
    featured: true
  },

  /* ---- archive: earlier work, listed by name and year only ---- */
  { name: 'House_Price_Prediction', lang: 'Jupyter', updated: '2026-06-16', url: 'https://github.com/OriAlpha/House_Price_Prediction' },
  { name: 'Edge_Detection_Service', lang: 'Python',  updated: '2023-09-18', url: 'https://github.com/OriAlpha/Edge_Detection_Service' },
  { name: 'wand-cicd',              lang: 'Python',  updated: '2023-04-07', url: 'https://github.com/OriAlpha/wand-cicd' },
  { name: 'Video-Classification',   lang: 'Python',  updated: '2021-08-17', url: 'https://github.com/OriAlpha/Video-Classification' },
  { name: 'Adversarial_Examples',   lang: 'Python',  updated: '2020-11-04', url: 'https://github.com/OriAlpha/Adversarial_Examples' }
];

/* ---------------  thermal ramp  ---------------
   t = 0 dormant (blue) .. 1 most recent (orange).
   Stops match the --t0..--t3 custom properties in styles.css. */

const STOPS = [
  [0.00, [0x2F, 0x4B, 0xE0]],
  [0.40, [0x7B, 0x3F, 0xD4]],
  [0.70, [0xE0, 0x34, 0x7E]],
  [1.00, [0xFF, 0x6B, 0x2C]]
];

function heatColor(t) {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [p0, c0] = STOPS[i];
    const [p1, c1] = STOPS[i + 1];
    if (x <= p1) {
      const k = (x - p0) / (p1 - p0);
      const rgb = c0.map((c, j) => Math.round(c + (c1[j] - c) * k));
      return `rgb(${rgb.join(' ')})`;
    }
  }
  return `rgb(${STOPS[STOPS.length - 1][1].join(' ')})`;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const monthIndex = ym => { const [y, m] = ym.split('-').map(Number); return y * 12 + (m - 1); };
const label = ym => { const [y, m] = ym.split('-').map(Number); return `${MONTHS[m - 1]} ${y}`; };

/* ═══════════════  experience timeline  ═══════════════ */

const now = new Date();
const nowIdx = now.getFullYear() * 12 + now.getMonth();

const rolesEl = document.getElementById('roles');
const axisEl = document.getElementById('axis');

const spanStart = Math.min(...ROLES.map(r => monthIndex(r.from)));
const spanEnd = nowIdx;
const spanLen = spanEnd - spanStart;

/* year ticks across the shared axis */
const firstYear = Math.ceil(spanStart / 12);
const lastYear = Math.floor(spanEnd / 12);
for (let y = firstYear; y <= lastYear; y++) {
  const tick = document.createElement('span');
  tick.className = 'axis__tick';
  tick.style.left = ((y * 12 - spanStart) / spanLen * 100) + '%';
  tick.textContent = String(y).slice(2);
  axisEl.appendChild(tick);
}

ROLES.forEach((r, i) => {
  const t = ROLES.length === 1 ? 1 : 1 - i / (ROLES.length - 1);
  const color = heatColor(t);

  const startIdx = monthIndex(r.from);
  const endIdx = r.to ? monthIndex(r.to) : nowIdx;
  const left = (startIdx - spanStart) / spanLen * 100;
  const width = Math.max(1.5, (endIdx - startIdx) / spanLen * 100);

  const months = endIdx - startIdx + 1;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const elapsed = [years ? years + 'y' : '', rem ? rem + 'm' : ''].filter(Boolean).join(' ');

  const li = document.createElement('li');
  li.className = 'role' + (r.to ? '' : ' role--live');

  const notes = r.notes.map(n => `<li>${n}</li>`).join('');

  li.innerHTML = `
    <div class="role__head">
      <span class="role__marker" style="background:${color}"></span>
      <div class="role__who">
        <h3 class="role__title">${r.title}</h3>
        <p class="role__org">${r.org} &middot; <span class="role__where">${r.where}</span></p>
      </div>
      <div class="role__time">
        <span class="role__dates">${label(r.from)} &ndash; ${r.to ? label(r.to) : 'present'}</span>
        <span class="role__elapsed">${elapsed}</span>
      </div>
    </div>
    <div class="role__track" aria-hidden="true">
      <span class="role__span" style="left:${left}%; width:${width}%; background:${color}"></span>
    </div>
    <ul class="role__notes">${notes}</ul>`;

  rolesEl.appendChild(li);
});

/* ═══════════════  projects  ═══════════════ */

const items = [...PROJECTS].sort((a, b) => b.updated.localeCompare(a.updated));
const last = items.length - 1;

items.forEach((p, i) => {
  p.t = last === 0 ? 1 : 1 - i / last;
  p.color = heatColor(p.t);
  const d = new Date(p.updated + 'T00:00:00Z');
  p.stamp = d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  p.year = d.getUTCFullYear();
});

const featured = items.filter(p => p.featured);
const archived = items.filter(p => !p.featured);

const queue = document.getElementById('queue');

featured.forEach((p, i) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.className = 'job';
  a.href = p.url;
  a.dataset.job = String(i);

  a.innerHTML = `
    <span class="job__id">
      <span class="job__swatch" style="background:${p.color}"></span>${String(i + 1).padStart(3, '0')}
    </span>
    <span class="job__name">${p.name}<span class="job__arrow" aria-hidden="true">&#8599;</span></span>
    <span class="job__what">${p.what}</span>
    <span class="job__lang">${p.lang}</span>
    <span class="job__when">${p.stamp}</span>`;

  li.appendChild(a);
  queue.appendChild(li);
});

const archiveList = document.getElementById('archive-list');

archived.forEach(p => {
  const li = document.createElement('li');
  li.innerHTML = `
    <a class="arch" href="${p.url}">
      <span class="arch__name">${p.name}</span>
      <span class="arch__year">${p.year}</span>
    </a>`;
  archiveList.appendChild(li);
});

/* ═══════════════  the node map  ═══════════════
   96 blocks. Each featured project holds a contiguous run of 8,
   so the map is an index of the queue rather than a metric. */

const TOTAL = 96;
const PER_JOB = 8;

const map = document.getElementById('rack-map');
const hint = document.getElementById('rack-hint');
const meta = document.getElementById('rack-meta');
const HINT_IDLE = 'One block per GPU. Hover a block to find its job.';

const allocated = featured.length * PER_JOB;
meta.textContent = `${allocated} / ${TOTAL} GPUs · ${featured.length} jobs`;

const cells = [];

for (let i = 0; i < TOTAL; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';

  const jobIndex = Math.floor(i / PER_JOB);
  if (jobIndex < featured.length) {
    const p = featured[jobIndex];
    cell.classList.add('cell--job');
    cell.style.background = p.color;
    cell.dataset.job = String(jobIndex);
    cell.title = p.name;
  }

  map.appendChild(cell);
  cells.push(cell);
}

/* stagger them on, like a scheduler filling the allocation */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

cells.forEach((cell, i) => {
  if (reduced) { cell.classList.add('is-on'); return; }
  setTimeout(() => cell.classList.add('is-on'), 120 + i * 11);
});

/* ---------------  link the queue and the map  --------------- */

const rows = [...document.querySelectorAll('.job')];

function focusJob(index) {
  map.classList.add('is-focused');
  cells.forEach(c => c.classList.toggle('is-lit', c.dataset.job === String(index)));
  hint.textContent = `${featured[index].name} · ${PER_JOB} GPUs`;
}

function clearJob() {
  map.classList.remove('is-focused');
  cells.forEach(c => c.classList.remove('is-lit'));
  hint.textContent = HINT_IDLE;
}

rows.forEach(row => {
  const i = Number(row.dataset.job);
  row.addEventListener('mouseenter', () => focusJob(i));
  row.addEventListener('focus', () => focusJob(i));
  row.addEventListener('mouseleave', clearJob);
  row.addEventListener('blur', clearJob);
});

cells.forEach(cell => {
  if (!cell.dataset.job) return;
  const i = Number(cell.dataset.job);
  cell.addEventListener('mouseenter', () => {
    focusJob(i);
    rows[i].classList.add('is-hot');
  });
  cell.addEventListener('mouseleave', () => {
    clearJob();
    rows[i].classList.remove('is-hot');
  });
  cell.addEventListener('click', () => { window.location.href = featured[i].url; });
});
