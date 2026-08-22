/* ===========================================================
   Suhas Goravale Siddaramu — ML infrastructure

   ROLES and PROJECTS drive every panel on the page. Edit them
   and the timeline, the queue and the archive all rebuild.

   Every readout is derived from this data — the elapsed times,
   the axis and the job states are computed, never typed in,
   and the real date sits next to each one.
   =========================================================== */

const ROLES = [
  {
    title: 'Computer Research Scientist, AI',
    org: 'Universitätsklinikum Tübingen',
    where: 'Tübingen',
    from: '2024-08',
    to: null,                       // null = current
    notes: [
      'Architected and deployed private agentic RAG and automated summarization pipelines for clinical studies.',
      'Engineered AutoTrainer to automate hardware detection and distribute training across multi-GPU setups and Slurm HPC clusters.',
      'Scaled workloads using PyTorch DDP/FSDP, mixed precision (AMP/TF32), and automated hyperparameter optimization.',
      'Orchestrated large-scale ML workloads on Slurm HPC clusters with containerized CI/CD deployment.'
    ]
  },
  {
    title: 'Deep Learning Inference Engineer',
    org: 'Ella Lab GmbH',
    where: 'Köln',
    from: '2022-04',
    to: '2024-07',
    notes: [
      'Fine-tuned LLMs with supervised and reinforcement learning via HuggingFace for summarization, paraphrasing, and named entity recognition.',
      'Reduced inference latency and compute costs through structured pruning, quantization, and graph optimization.',
      'Cross-framework conversion and deployment across PyTorch, ONNX, and TensorFlow.',
      'Scaled distributed training using DDP and FSDP, containerized on GCP with Argo Workflows.'
    ]
  },
  {
    title: 'Machine Learning Engineer, Innovation',
    org: 'Clinomic GmbH',
    where: 'Aachen',
    from: '2021-01',
    to: '2022-03',
    notes: [
      'Developed predictive time-series models over ICU patient telemetry for clinical decision support systems.',
      'Engineered feature pipelines on clinical datasets and improved ultrasound image classification accuracy.',
      'Constructed end-to-end ML pipelines for automated preprocessing, training, and model evaluation.'
    ]
  },
  {
    // student role: listed for completeness, deliberately not featured
    minor: true,
    title: 'Working Student, Data Science & AI',
    org: 'Aptiv Services Germany GmbH',
    where: 'Wuppertal',
    from: '2019-04',
    to: '2020-12',
    notes: []
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
    what: 'Minimalist percentage and proportion calculator for Android built with Kotlin and Jetpack Compose.' },

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
    what: 'Fine-tunes Llama 3 for topic modelling. KeyBERT pulls keywords to build an instruction dataset, then LoRA adapters train on it in 4-bit through PEFT and BitsAndBytes.' },

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

/* ═══════════  live clock  ═══════════ */

const clockEl = document.getElementById('clock');
if (clockEl) {
  const tick = () => {
    const d = new Date();
    clockEl.textContent = d.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour12: false });
    clockEl.setAttribute('datetime', d.toISOString());
  };
  tick();
  setInterval(tick, 1000);
}

/* ═══════════  projects  ═══════════ */

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

/* firstStart also anchors the history axis below */
const firstStart = Math.min(...ROLES.map(r => monthIndex(r.from)));

/* ═══════════  job history  ═══════════ */

const rolesEl = document.getElementById('roles');
const axisEl = document.getElementById('axis');
const spanLen = nowIdx - firstStart;

for (let y = axisEl ? Math.ceil(firstStart / 12) : Infinity; y <= Math.floor(nowIdx / 12); y++) {
  const t = document.createElement('span');
  t.className = 'axis__tick';
  t.style.left = ((y * 12 - firstStart) / spanLen * 100) + '%';
  t.textContent = String(y).slice(2);
  axisEl.appendChild(t);
}

/* colour ramps across the featured roles only, so the student
   entry never competes with them for attention */
const featuredRoles = ROLES.filter(r => !r.minor);

if (rolesEl) ROLES.forEach(r => {
  const fi = featuredRoles.indexOf(r);
  const color = r.minor
    ? 'var(--faint)'
    : heatColor(featuredRoles.length === 1 ? 1 : 1 - fi / (featuredRoles.length - 1));

  const startIdx = monthIndex(r.from);
  const endIdx = r.to ? monthIndex(r.to) : nowIdx;
  const left = (startIdx - firstStart) / spanLen * 100;
  const width = Math.max(1.5, (endIdx - startIdx) / spanLen * 100);

  const months = endIdx - startIdx + 1;
  const y = Math.floor(months / 12), m = months % 12;
  const elapsed = [y ? y + 'y' : '', m ? m + 'm' : ''].filter(Boolean).join(' ');

  const li = document.createElement('li');
  li.className = 'role' + (r.to ? '' : ' role--live') + (r.minor ? ' role--minor' : '');
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
    ${r.notes.length ? `<ul class="role__notes">${r.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}`;
  rolesEl.appendChild(li);
});

/* ═══════════  job queue  ═══════════ */

const queueEl = document.getElementById('queue');
if (queueEl) queueEl.innerHTML = featured.map((p, i) => `
  <li><a class="job" href="${esc(p.url)}">
    <span class="job__id"><span class="job__swatch" style="background:${p.color}"></span>${String(i + 1).padStart(3, '0')}</span>
    <span class="job__name">${esc(p.name)}</span>
    <span class="job__what">${esc(p.what)}</span>
    <span class="job__lang">${esc(p.lang)}</span>
    <span class="job__state state--${p.state}"><i class="dot dot--${p.state}"></i>${p.stateLabel}</span>
    <span class="job__when">${p.stamp}</span>
  </a></li>`).join('');

const archiveEl = document.getElementById('archive-list');
if (archiveEl) archiveEl.innerHTML = archived.map(p => `
  <li><a class="arch" href="${esc(p.url)}">
    <span>${esc(p.name)}</span><span class="arch__year">${p.year}</span>
  </a></li>`).join('');
