/**
 * 《测测你的宿命恋人在哪个城市》核心交互与评分引擎
 * 功能：逐题作答、进度持久化、六维标准化评分、SVG雷达图、纯Canvas高清海报生成、十六城图鉴
 */

(function () {
  'use strict';

  const { DIMENSIONS, CHAPTERS, QUESTIONS, CITIES } = window.TEST_DATA;
  const DIM_KEYS = DIMENSIONS.map((d) => d.key);
  const STORAGE_KEY = 'destined_city_lover_progress_v1';

  // ==================== 数学统计预处理（零偏差标准化） ====================
  // 1. 计算40道题在均匀随机作答下，每个维度的理论均值与标准差
  const QUESTION_DIM_STATS = {};
  DIM_KEYS.forEach((key) => {
    let mean = 0;
    let variance = 0;
    let minPossible = 0;
    let maxPossible = 0;
    QUESTIONS.forEach((q) => {
      const vals = q.options.map((o) => o.weights[key] || 0);
      const m = vals.reduce((a, b) => a + b, 0) / vals.length;
      const v = vals.reduce((a, b) => a + Math.pow(b - m, 2), 0) / vals.length;
      mean += m;
      variance += v;
      minPossible += Math.min(...vals);
      maxPossible += Math.max(...vals);
    });
    QUESTION_DIM_STATS[key] = {
      mean,
      std: Math.sqrt(variance) || 1,
      minPossible,
      maxPossible
    };
  });

  // 2. 计算16座城市在各维度上的均值与标准差，并构建单位方向向量
  const CITY_DIM_STATS = {};
  DIM_KEYS.forEach((key) => {
    const vals = CITIES.map((c) => c.profile[key]);
    const m = vals.reduce((a, b) => a + b, 0) / vals.length;
    const v = vals.reduce((a, b) => a + Math.pow(b - m, 2), 0) / vals.length;
    CITY_DIM_STATS[key] = { mean: m, std: Math.sqrt(v) || 1 };
  });

  const CITY_VECTORS = CITIES.map((city) => {
    const z = DIM_KEYS.map((k) => (city.profile[k] - CITY_DIM_STATS[k].mean) / CITY_DIM_STATS[k].std);
    const norm = Math.sqrt(z.reduce((acc, val) => acc + val * val, 0)) || 1;
    return {
      city,
      unitVec: z.map((val) => val / norm)
    };
  });

  // ==================== 应用状态 ====================
  const state = {
    currentView: 'home',
    currentIndex: 0,
    answers: new Array(QUESTIONS.length).fill(null),
    isTransitioning: false,
    lastResult: null
  };

  // ==================== DOM 引用 ====================
  const el = {
    views: {
      home: document.getElementById('view-home'),
      quiz: document.getElementById('view-quiz'),
      calculating: document.getElementById('view-calculating'),
      result: document.getElementById('view-result')
    },
    btnStart: document.getElementById('btn-start'),
    btnResume: document.getElementById('btn-resume'),
    resumeQNum: document.getElementById('resume-q-num'),

    quizChapterNumeral: document.getElementById('quiz-chapter-numeral'),
    quizChapterTitle: document.getElementById('quiz-chapter-title'),
    quizChapterSubtitle: document.getElementById('quiz-chapter-subtitle'),
    quizCurrentNum: document.getElementById('quiz-current-num'),
    quizProgressbar: document.getElementById('quiz-progressbar'),
    quizProgressFill: document.getElementById('quiz-progress-fill'),
    milestones: Array.from(document.querySelectorAll('.progress-milestones .milestone')),
    questionCard: document.getElementById('question-card'),
    questionCategory: document.getElementById('question-category'),
    questionOrdinal: document.getElementById('question-ordinal'),
    questionText: document.getElementById('question-text'),
    optionsList: document.getElementById('options-list'),
    btnPrev: document.getElementById('btn-prev'),
    btnBackHome: document.getElementById('btn-back-home'),

    calcStatus: document.getElementById('calc-status'),

    resCoords: document.getElementById('res-coords'),
    resGeozone: document.getElementById('res-geozone'),
    resRegion: document.getElementById('res-region'),
    resCityName: document.getElementById('res-city-name'),
    resSeal: document.getElementById('res-seal'),
    resPinyin: document.getElementById('res-pinyin'),
    resArchetype: document.getElementById('res-archetype'),
    resEmblem: document.getElementById('res-emblem'),
    resMatchPct: document.getElementById('res-match-pct'),
    resQuote: document.getElementById('res-quote'),
    resTraits: document.getElementById('res-traits'),
    legendCityName: document.getElementById('legend-city-name'),
    radarSvg: document.getElementById('radar-svg'),
    dimensionBars: document.getElementById('dimension-bars'),
    resMatchReason: document.getElementById('res-match-reason'),
    resHiddenStrength: document.getElementById('res-hidden-strength'),
    resEggScene: document.getElementById('res-egg-scene'),
    resEggToken: document.getElementById('res-egg-token'),
    resEggCode: document.getElementById('res-egg-code'),
    resRunnerups: document.getElementById('res-runnerups'),

    btnPoster: document.getElementById('btn-poster'),
    btnCopyShare: document.getElementById('btn-copy-share'),
    btnAtlas: document.getElementById('btn-atlas'),
    btnAtlasTop: document.getElementById('btn-atlas-top'),
    btnRetest: document.getElementById('btn-retest'),

    modalPoster: document.getElementById('modal-poster'),
    posterCanvas: document.getElementById('poster-canvas'),
    posterPreviewImg: document.getElementById('poster-preview-img'),
    btnDownloadPoster: document.getElementById('btn-download-poster'),

    modalAtlas: document.getElementById('modal-atlas'),
    atlasContent: document.getElementById('atlas-content'),

    toast: document.getElementById('toast')
  };

  // ==================== 评分算法 ====================
  function evaluateAnswers(answers) {
    const raw = {};
    DIM_KEYS.forEach((k) => {
      raw[k] = 0;
    });

    answers.forEach((optIdx, qIdx) => {
      const safeIdx = typeof optIdx === 'number' && optIdx >= 0 ? optIdx : 0;
      const weights = QUESTIONS[qIdx].options[safeIdx].weights;
      DIM_KEYS.forEach((k) => {
        raw[k] += weights[k] || 0;
      });
    });

    // 用户标准化向量（消除维度间权重总量差异）
    const zScores = {};
    DIM_KEYS.forEach((k) => {
      zScores[k] = (raw[k] - QUESTION_DIM_STATS[k].mean) / QUESTION_DIM_STATS[k].std;
    });

    const zArr = DIM_KEYS.map((k) => zScores[k]);
    const zNorm = Math.sqrt(zArr.reduce((acc, v) => acc + v * v, 0));
    const userUnitVec = zNorm > 1e-6 ? zArr.map((v) => v / zNorm) : DIM_KEYS.map(() => 1 / Math.sqrt(DIM_KEYS.length));

    // 用户可视化0-100分（基于正态Z值平滑映射至 24–98 区间，避免极端0分显得生硬）
    const displayScores = {};
    DIM_KEYS.forEach((k) => {
      const scaled = Math.round(62 + zScores[k] * 14.5);
      displayScores[k] = Math.max(22, Math.min(98, scaled));
    });

    // 与16座城市逐一计算相似度（余弦相似度）
    const ranked = CITY_VECTORS.map(({ city, unitVec }) => {
      const cosine = unitVec.reduce((acc, v, i) => acc + v * userUnitVec[i], 0);
      // 将余弦相似度 [-1, 1] 转换为直观契合度百分比 [68%, 99%]
      const matchPct = Math.max(68, Math.min(99, Math.round(82 + cosine * 16.5)));
      return { city, cosine, matchPct };
    }).sort((a, b) => b.cosine - a.cosine);

    return {
      primary: ranked[0],
      runnerUps: ranked.slice(1, 3),
      allRanked: ranked,
      raw,
      zScores,
      displayScores
    };
  }

  // ==================== 视图切换与进度存储 ====================
  function switchView(viewName) {
    Object.keys(el.views).forEach((key) => {
      el.views[key].classList.toggle('is-active', key === viewName);
    });
    state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveProgress() {
    try {
      const answeredCount = state.answers.filter((a) => a !== null).length;
      if (answeredCount > 0 && answeredCount < QUESTIONS.length) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            currentIndex: state.currentIndex,
            answers: state.answers
          })
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (_) {
      // 忽略隐私模式下 localStorage 限制
    }
  }

  function clearProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      // ignore
    }
  }

  function checkSavedProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        el.btnResume.classList.add('hidden');
        return;
      }
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.answers) &&
        parsed.answers.length === QUESTIONS.length &&
        typeof parsed.currentIndex === 'number' &&
        parsed.currentIndex >= 0 &&
        parsed.currentIndex < QUESTIONS.length
      ) {
        const answeredCount = parsed.answers.filter((a) => a !== null).length;
        if (answeredCount > 0 && answeredCount < QUESTIONS.length) {
          el.resumeQNum.textContent = String(parsed.currentIndex + 1);
          el.btnResume.classList.remove('hidden');
          return;
        }
      }
    } catch (_) {
      // ignore
    }
    el.btnResume.classList.add('hidden');
  }

  // ==================== 答题逻辑与渲染 ====================
  function startNewQuiz() {
    state.currentIndex = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    state.isTransitioning = false;
    clearProgress();
    renderQuestion();
    switchView('quiz');
  }

  function resumeQuiz() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (parsed && Array.isArray(parsed.answers) && parsed.answers.length === QUESTIONS.length) {
        state.answers = parsed.answers;
        state.currentIndex = Math.min(Math.max(0, parsed.currentIndex || 0), QUESTIONS.length - 1);
        renderQuestion();
        switchView('quiz');
        return;
      }
    } catch (_) {
      // fallback
    }
    startNewQuiz();
  }

  function getChapterForQuestion(q) {
    return CHAPTERS.find((c) => c.id === q.chapter) || CHAPTERS[0];
  }

  function renderQuestion() {
    const q = QUESTIONS[state.currentIndex];
    const chapter = getChapterForQuestion(q);
    const numStr = String(state.currentIndex + 1).padStart(2, '0');
    const progressPct = ((state.currentIndex + 1) / QUESTIONS.length) * 100;

    el.quizChapterNumeral.textContent = chapter.numeral;
    el.quizChapterTitle.textContent = chapter.title;
    el.quizChapterSubtitle.textContent = chapter.subtitle;
    el.quizCurrentNum.textContent = numStr;
    el.quizProgressFill.style.width = `${progressPct}%`;
    el.quizProgressbar.setAttribute('aria-valuenow', String(state.currentIndex + 1));

    el.milestones.forEach((dot) => {
      const chId = Number(dot.dataset.chapter);
      dot.classList.toggle('is-reached', chapter.id >= chId);
    });

    el.questionCategory.textContent = q.category;
    el.questionOrdinal.textContent = `第 ${numStr} 题`;
    el.questionText.textContent = q.text;

    const currentAnswer = state.answers[state.currentIndex];
    el.optionsList.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn' + (currentAnswer === idx ? ' is-selected' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', currentAnswer === idx ? 'true' : 'false');
      btn.dataset.index = String(idx);

      const badge = document.createElement('span');
      badge.className = 'option-badge';
      badge.textContent = opt.label;

      const text = document.createElement('span');
      text.className = 'option-text';
      text.textContent = opt.text;

      btn.appendChild(badge);
      btn.appendChild(text);
      btn.addEventListener('click', () => handleSelectOption(idx));
      el.optionsList.appendChild(btn);
    });

    el.btnPrev.disabled = state.currentIndex === 0;

    // 触发卡片进入动效
    el.questionCard.classList.remove('is-leaving', 'is-leaving-back', 'is-entering');
    void el.questionCard.offsetWidth;
    el.questionCard.classList.add('is-entering');
  }

  function handleSelectOption(optionIdx) {
    if (state.isTransitioning) return;
    state.isTransitioning = true;
    state.answers[state.currentIndex] = optionIdx;

    // 视觉高亮当前选中项
    const buttons = el.optionsList.querySelectorAll('.option-btn');
    buttons.forEach((b, i) => {
      const selected = i === optionIdx;
      b.classList.toggle('is-selected', selected);
      b.setAttribute('aria-checked', selected ? 'true' : 'false');
    });

    saveProgress();

    setTimeout(() => {
      if (state.currentIndex < QUESTIONS.length - 1) {
        el.questionCard.classList.add('is-leaving');
        setTimeout(() => {
          state.currentIndex += 1;
          renderQuestion();
          state.isTransitioning = false;
        }, 190);
      } else {
        clearProgress();
        state.isTransitioning = false;
        runCalculationAndShowResult();
      }
    }, 220);
  }

  function goToPrevQuestion() {
    if (state.isTransitioning || state.currentIndex === 0) return;
    state.isTransitioning = true;
    el.questionCard.classList.add('is-leaving-back');
    setTimeout(() => {
      state.currentIndex -= 1;
      renderQuestion();
      state.isTransitioning = false;
    }, 180);
  }

  // ==================== 推演过渡动画 ====================
  function runCalculationAndShowResult() {
    const result = evaluateAnswers(state.answers);
    state.lastResult = result;
    switchView('calculating');

    const messages = [
      '正在梳理四十重生活微光…',
      '正在丈量山河六维契合度…',
      '宿命之城的灯火已为你点亮…'
    ];
    el.calcStatus.textContent = messages[0];

    setTimeout(() => {
      el.calcStatus.textContent = messages[1];
    }, 480);

    setTimeout(() => {
      el.calcStatus.textContent = messages[2];
    }, 980);

    setTimeout(() => {
      renderResult(result);
      switchView('result');
    }, 1450);
  }

  // ==================== 城市风物 SVG 纹样生成 ====================
  function createCityEmblemSVG(city) {
    const c1 = city.accent;
    const c2 = city.secondary;
    const zone = city.geoZone;

    // 按地理风貌区分水乡/山海/大漠雪山/都会/雪国纹样
    let motif = '';
    if (['dali', 'urumqi'].includes(city.id)) {
      // 雪山与云月
      motif = `
        <circle cx="76" cy="34" r="10" fill="${c2}" opacity="0.85"/>
        <path d="M12 86 L42 40 L60 66 L76 46 L108 86 Z" fill="${c1}" opacity="0.22"/>
        <path d="M20 86 L46 48 L66 72 L84 52 L104 86" fill="none" stroke="${c1}" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M18 94 Q60 82 102 94" fill="none" stroke="${c2}" stroke-width="2" stroke-linecap="round"/>
      `;
    } else if (['qingdao', 'xiamen', 'shenzhen'].includes(city.id)) {
      // 落日与海浪
      motif = `
        <circle cx="60" cy="48" r="18" fill="${c1}" opacity="0.85"/>
        <path d="M16 74 Q32 64 48 74 T80 74 T104 74" fill="none" stroke="${c2}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M22 86 Q38 78 54 86 T86 86 T98 86" fill="none" stroke="${c2}" stroke-width="2.2" stroke-linecap="round" opacity="0.72"/>
        <path d="M40 36 Q46 30 52 36 M68 32 Q73 27 78 32" fill="none" stroke="#FCF9F3" stroke-width="1.6" stroke-linecap="round"/>
      `;
    } else if (['suzhou', 'hangzhou', 'guangzhou'].includes(city.id)) {
      // 江南拱桥与水波
      motif = `
        <circle cx="82" cy="34" r="9" fill="${c1}" opacity="0.75"/>
        <path d="M20 76 Q60 36 100 76" fill="none" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M36 76 Q60 54 84 76" fill="none" stroke="${c2}" stroke-width="2" stroke-linecap="round"/>
        <line x1="16" y1="78" x2="104" y2="78" stroke="${c2}" stroke-width="2" stroke-linecap="round"/>
        <path d="M28 88 Q44 83 60 88 T92 88" fill="none" stroke="${c2}" stroke-width="1.8" opacity="0.7"/>
      `;
    } else if (['shanghai', 'beijing', 'xian'].includes(city.id)) {
      // 飞檐/天际线与明月
      motif = `
        <circle cx="60" cy="42" r="16" fill="${c2}" opacity="0.28"/>
        <path d="M24 62 Q60 44 96 62" fill="none" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M34 62 L34 86 M86 62 L86 86 M48 60 L48 86 M72 60 L72 86" stroke="${c1}" stroke-width="2.2"/>
        <line x1="20" y1="86" x2="100" y2="86" stroke="${c2}" stroke-width="2.4" stroke-linecap="round"/>
      `;
    } else if (zone === '东北') {
      // 冰雪结晶与暖阳
      motif = `
        <circle cx="60" cy="60" r="24" fill="${c1}" opacity="0.14"/>
        <path d="M60 24 L60 96 M24 60 L96 60 M35 35 L85 85 M85 35 L35 85" stroke="${c1}" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="60" cy="60" r="8" fill="${c2}"/>
      `;
    } else {
      // 山城/江城/巴蜀灯火与江流
      motif = `
        <circle cx="60" cy="42" r="14" fill="${c1}" opacity="0.82"/>
        <path d="M18 76 C36 52, 54 64, 72 48 C84 38, 94 58, 104 76" fill="none" stroke="${c2}" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M18 88 Q42 80 60 88 T102 88" fill="none" stroke="${c1}" stroke-width="2.2" stroke-linecap="round" opacity="0.75"/>
      `;
    }

    return `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="none" stroke="${c2}" stroke-width="1" stroke-dasharray="2 3" opacity="0.45"/>
        ${motif}
      </svg>
    `;
  }

  // ==================== SVG 六维雷达图 ====================
  function renderRadarChart(userDisplayScores, city) {
    const svg = el.radarSvg;
    const cx = 160;
    const cy = 152;
    const maxR = 96;
    const n = DIMENSIONS.length;

    const pointAt = (index, ratio) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / n;
      return {
        x: cx + Math.cos(angle) * maxR * ratio,
        y: cy + Math.sin(angle) * maxR * ratio
      };
    };

    const parts = [];

    // 4层同心六边形网格
    [0.25, 0.5, 0.75, 1].forEach((level) => {
      const pts = DIMENSIONS.map((_, i) => {
        const p = pointAt(i, level);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      }).join(' ');
      parts.push(
        `<polygon points="${pts}" fill="none" stroke="rgba(140, 118, 84, 0.28)" stroke-width="${level === 1 ? 1.2 : 0.9}" />`
      );
    });

    // 6条轴线与文字标签
    DIMENSIONS.forEach((dim, i) => {
      const edge = pointAt(i, 1);
      const labelPos = pointAt(i, 1.24);
      parts.push(
        `<line x1="${cx}" y1="${cy}" x2="${edge.x.toFixed(1)}" y2="${edge.y.toFixed(1)}" stroke="rgba(140, 118, 84, 0.22)" stroke-width="1" />`
      );
      parts.push(
        `<text x="${labelPos.x.toFixed(1)}" y="${(labelPos.y + 4).toFixed(1)}" text-anchor="middle" fill="#1F292B" font-size="12" font-family="Songti SC, Noto Serif SC, serif" font-weight="600">${dim.shortName}</text>`
      );
    });

    // 城市理想轮廓（鎏金虚线）
    const cityPts = DIMENSIONS.map((dim, i) => {
      const p = pointAt(i, Math.max(0.2, city.profile[dim.key] / 100));
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ');
    parts.push(
      `<polygon points="${cityPts}" fill="rgba(185, 145, 83, 0.14)" stroke="#B99153" stroke-width="1.6" stroke-dasharray="4 3" />`
    );

    // 用户维度多边形（城市主色）
    const userPts = DIMENSIONS.map((dim, i) => {
      const p = pointAt(i, Math.max(0.2, userDisplayScores[dim.key] / 100));
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ');
    parts.push(
      `<polygon points="${userPts}" fill="${city.accent}" fill-opacity="0.22" stroke="${city.accent}" stroke-width="2.2" />`
    );

    // 顶点圆点
    DIMENSIONS.forEach((dim, i) => {
      const p = pointAt(i, Math.max(0.2, userDisplayScores[dim.key] / 100));
      parts.push(
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.6" fill="${city.accent}" stroke="#FCF9F3" stroke-width="1.4" />`
      );
    });

    svg.innerHTML = parts.join('');
  }

  // ==================== 结果页渲染 ====================
  function renderResult(result) {
    const { city, matchPct } = result.primary;
    const scores = result.displayScores;

    // 注入该城市专属国风配色
    document.documentElement.style.setProperty('--city-accent', city.accent);
    document.documentElement.style.setProperty('--city-secondary', city.secondary);

    el.resCoords.textContent = city.coords;
    el.resGeozone.textContent = city.geoZone;
    el.resRegion.textContent = city.region;
    el.resCityName.textContent = city.name;
    el.resSeal.textContent = city.seal;
    el.resPinyin.textContent = city.pinyin;
    el.resArchetype.textContent = city.title;
    el.resEmblem.innerHTML = createCityEmblemSVG(city);
    el.resMatchPct.textContent = `${matchPct}%`;
    el.resQuote.textContent = city.quote;
    el.legendCityName.textContent = city.name;

    // 性格特点标签
    el.resTraits.innerHTML = '';
    city.traits.forEach((trait) => {
      const span = document.createElement('span');
      span.className = 'trait-pill';
      span.textContent = `# ${trait}`;
      el.resTraits.appendChild(span);
    });

    // 雷达图与六维进度条
    renderRadarChart(scores, city);
    el.dimensionBars.innerHTML = '';
    DIMENSIONS.forEach((dim) => {
      const val = scores[dim.key];
      const row = document.createElement('div');
      row.className = 'dim-row';
      row.innerHTML = `
        <div class="dim-row-top">
          <span class="dim-name">${dim.name}<span class="dim-desc-inline">${dim.desc}</span></span>
          <span class="dim-val">${val}</span>
        </div>
        <div class="dim-track">
          <div class="dim-bar-fill" style="width: ${val}%"></div>
        </div>
      `;
      el.dimensionBars.appendChild(row);
    });

    // 深度解读与趣味彩蛋
    el.resMatchReason.textContent = city.matchReason;
    el.resHiddenStrength.textContent = city.hiddenStrength;
    el.resEggScene.textContent = city.easterEgg.scene;
    el.resEggToken.textContent = city.easterEgg.token;
    el.resEggCode.textContent = city.easterEgg.code;

    // 平行时空备选城
    el.resRunnerups.innerHTML = '';
    result.runnerUps.forEach((item) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'runnerup-chip';
      chip.innerHTML = `
        <span>${item.city.name} · ${item.city.seal}</span>
        <span class="runnerup-pct">${item.matchPct}%</span>
      `;
      chip.addEventListener('click', () => openAtlasModal(item.city.id));
      el.resRunnerups.appendChild(chip);
    });
  }

  // ==================== 纯 Canvas 2D 高清小红书海报生成 (1080 × 1440) ====================
  function wrapCanvasText(ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    for (const ch of text) {
      const testLine = line + ch;
      if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
        lines.push(line);
        line = ch;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function generatePosterImage() {
    if (!state.lastResult) return null;
    const { city, matchPct } = state.lastResult.primary;
    const scores = state.lastResult.displayScores;
    const canvas = el.posterCanvas;
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1440;

    // 1. 宣纸底色与柔和晕染
    ctx.fillStyle = '#F6F1E7';
    ctx.fillRect(0, 0, W, H);

    const grad1 = ctx.createRadialGradient(890, 210, 40, 890, 210, 480);
    grad1.addColorStop(0, `${city.accent}24`);
    grad1.addColorStop(1, 'rgba(246, 241, 231, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, W, H);

    const grad2 = ctx.createRadialGradient(180, 1220, 40, 180, 1220, 460);
    grad2.addColorStop(0, `${city.secondary}20`);
    grad2.addColorStop(1, 'rgba(246, 241, 231, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, W, H);

    // 2. 主画框与国风双边框
    drawRoundedRect(ctx, 46, 46, W - 92, H - 92, 28);
    ctx.fillStyle = '#FCF9F3';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(185, 145, 83, 0.45)';
    ctx.stroke();

    drawRoundedRect(ctx, 64, 64, W - 128, H - 128, 20);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(185, 145, 83, 0.25)';
    ctx.stroke();

    // 3. 顶部栏
    ctx.fillStyle = '#7C8482';
    ctx.font = '500 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('《测测你的宿命恋人在哪个城市》', 102, 126);

    ctx.textAlign = 'right';
    ctx.font = '500 22px ui-monospace, Menlo, monospace';
    ctx.fillText(city.coords, W - 102, 126);

    ctx.beginPath();
    ctx.setLineDash([8, 8]);
    ctx.moveTo(102, 154);
    ctx.lineTo(W - 102, 154);
    ctx.strokeStyle = 'rgba(140, 118, 84, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. 地理区划与城市大标题
    drawRoundedRect(ctx, 102, 194, 88, 38, 8);
    ctx.fillStyle = city.secondary;
    ctx.fill();
    ctx.fillStyle = '#FCF9F3';
    ctx.textAlign = 'center';
    ctx.font = '600 22px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(city.geoZone, 146, 221);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#485457';
    ctx.font = '500 25px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(city.region, 208, 222);

    ctx.fillStyle = '#7C8482';
    ctx.font = '500 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('我的宿命恋人藏在', 102, 286);

    ctx.fillStyle = city.accent;
    ctx.font = '700 112px "Songti SC", "Noto Serif SC", "STSong", serif';
    ctx.fillText(city.name, 98, 408);

    // 城市朱砂印章
    const nameWidth = ctx.measureText(city.name).width;
    const sealX = Math.min(102 + nameWidth + 28, W - 260);
    drawRoundedRect(ctx, sealX, 314, 52, 112, 8);
    ctx.fillStyle = city.accent;
    ctx.fill();
    ctx.fillStyle = '#FCF9F3';
    ctx.textAlign = 'center';
    ctx.font = '700 21px "Songti SC", "STSong", serif';
    city.seal.split('').forEach((ch, idx) => {
      ctx.fillText(ch, sealX + 26, 342 + idx * 24);
    });

    // 右侧契合度圆徽章
    ctx.beginPath();
    ctx.arc(W - 196, 336, 86, 0, Math.PI * 2);
    ctx.fillStyle = '#F6F1E7';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = city.accent;
    ctx.stroke();

    ctx.fillStyle = '#7C8482';
    ctx.font = '500 22px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('灵魂契合度', W - 196, 318);
    ctx.fillStyle = city.accent;
    ctx.font = '700 50px "Songti SC", "STSong", serif';
    ctx.fillText(`${matchPct}%`, W - 196, 376);

    // 拼音与人设副标题
    ctx.textAlign = 'left';
    ctx.fillStyle = '#B99153';
    ctx.font = '600 22px "PingFang SC", sans-serif';
    ctx.fillText(city.pinyin.split('').join(' '), 102, 456);

    ctx.fillStyle = '#1F292B';
    ctx.font = '700 36px "Songti SC", "STSong", serif';
    ctx.fillText(city.title, 102, 514);

    // 5. 专属记忆点文案卡片
    drawRoundedRect(ctx, 102, 548, W - 204, 152, 16);
    ctx.fillStyle = '#F6F1E7';
    ctx.fill();
    ctx.fillStyle = city.accent;
    ctx.fillRect(102, 548, 8, 152);

    ctx.fillStyle = '#1F292B';
    ctx.font = '600 30px "Songti SC", "STSong", serif';
    const quoteLines = wrapCanvasText(ctx, city.quote, W - 270);
    const quoteStartY = 548 + (152 - quoteLines.length * 44) / 2 + 34;
    quoteLines.forEach((line, idx) => {
      ctx.fillText(line, 136, quoteStartY + idx * 44);
    });

    // 6. 性格特点标签（自适应字号与间距，确保绝不越界）
    const maxTagRowWidth = W - 204;
    let tagFontSize = 23;
    let tagPadX = 36;
    let tagGap = 14;
    let tagWidths = [];
    let totalTagW = Infinity;

    while (tagFontSize >= 18) {
      ctx.font = `500 ${tagFontSize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
      tagWidths = city.traits.map((t) => ctx.measureText(`# ${t}`).width + tagPadX);
      totalTagW = tagWidths.reduce((a, b) => a + b, 0) + tagGap * (city.traits.length - 1);
      if (totalTagW <= maxTagRowWidth) break;
      tagFontSize -= 1;
      tagPadX = Math.max(24, tagPadX - 3);
      tagGap = Math.max(10, tagGap - 1);
    }

    let tagX = 102 + Math.max(0, (maxTagRowWidth - totalTagW) / 2);
    const tagY = 736;
    city.traits.forEach((trait, idx) => {
      const label = `# ${trait}`;
      const tw = tagWidths[idx];
      drawRoundedRect(ctx, tagX, tagY, tw, 48, 24);
      ctx.fillStyle = `${city.accent}18`;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `${city.accent}55`;
      ctx.stroke();

      ctx.fillStyle = city.accent;
      ctx.textAlign = 'center';
      ctx.fillText(label, tagX + tw / 2, tagY + 32);
      tagX += tw + tagGap;
    });

    // 7. 中段：左侧迷你雷达图 + 右侧匹配理由摘录
    const rCx = 258;
    const rCy = 965;
    const rMax = 112;
    const n = DIMENSIONS.length;
    const rPt = (i, ratio) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return { x: rCx + Math.cos(ang) * rMax * ratio, y: rCy + Math.sin(ang) * rMax * ratio };
    };

    [0.33, 0.66, 1].forEach((lv) => {
      ctx.beginPath();
      DIMENSIONS.forEach((_, i) => {
        const p = rPt(i, lv);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(140, 118, 84, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    DIMENSIONS.forEach((dim, i) => {
      const lp = rPt(i, 1.26);
      ctx.fillStyle = '#485457';
      ctx.textAlign = 'center';
      ctx.font = '600 22px "Songti SC", "STSong", serif';
      ctx.fillText(dim.shortName, lp.x, lp.y + 8);
    });

    ctx.beginPath();
    DIMENSIONS.forEach((dim, i) => {
      const p = rPt(i, Math.max(0.22, scores[dim.key] / 100));
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = `${city.accent}38`;
    ctx.fill();
    ctx.strokeStyle = city.accent;
    ctx.lineWidth = 3;
    ctx.stroke();

    // 右侧隐藏优势 + 匹配精华
    ctx.textAlign = 'left';
    ctx.fillStyle = city.accent;
    ctx.font = '700 26px "Songti SC", "STSong", serif';
    ctx.fillText('隐藏恋爱优势', 442, 858);

    ctx.fillStyle = '#485457';
    ctx.font = '400 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    const strengthLines = wrapCanvasText(ctx, city.hiddenStrength, W - 548).slice(0, 6);
    strengthLines.forEach((line, idx) => {
      ctx.fillText(line, 442, 902 + idx * 38);
    });

    // 8. 底部趣味彩蛋盒
    drawRoundedRect(ctx, 102, 1142, W - 204, 152, 16);
    ctx.fillStyle = '#F6F1E7';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(185, 145, 83, 0.4)';
    ctx.stroke();

    ctx.fillStyle = '#B99153';
    ctx.font = '700 24px "Songti SC", "STSong", serif';
    ctx.fillText('宿命偶遇彩蛋 · 恋爱暗号', 134, 1188);

    ctx.fillStyle = '#1F292B';
    ctx.font = '600 27px "Songti SC", "STSong", serif';
    const codeLines = wrapCanvasText(ctx, city.easterEgg.code, W - 268).slice(0, 2);
    codeLines.forEach((line, idx) => {
      ctx.fillText(line, 134, 1232 + idx * 38);
    });

    // 9. 页脚署名与右下角淡淡水印
    ctx.fillStyle = '#7C8482';
    ctx.textAlign = 'center';
    ctx.font = '400 21px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('40道生活切片 · 16座中国地理风物城 · 测测你的宿命恋人在哪个城市', W / 2, 1344);

    ctx.fillStyle = 'rgba(124, 132, 130, 0.38)';
    ctx.textAlign = 'right';
    ctx.font = '400 20px "Songti SC", "Noto Serif SC", Georgia, serif';
    ctx.fillText('songfeng', W - 86, H - 76);

    return canvas.toDataURL('image/png');
  }

  // ==================== 弹窗与分享交互 ====================
  function openPosterModal() {
    const dataUrl = generatePosterImage();
    if (!dataUrl) return;
    el.posterPreviewImg.src = dataUrl;
    el.modalPoster.hidden = false;
  }

  function downloadPoster() {
    if (!state.lastResult) return;
    const dataUrl = el.posterPreviewImg.src || generatePosterImage();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `宿命恋人城市-${state.lastResult.primary.city.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('高清海报已开始下载');
  }

  function copyShareText() {
    if (!state.lastResult) return;
    const { city, matchPct } = state.lastResult.primary;
    const runnerNames = state.lastResult.runnerUps.map((r) => r.city.name).join(' / ');
    const shareText = [
      `✨ 我的宿命恋人藏在【${city.name}】（灵魂契合度 ${matchPct}%）`,
      `📍 ${city.region} · ${city.title}`,
      `${city.quote}`,
      `🏷️ 匹配性格：${city.traits.join(' / ')}`,
      `🎁 宿命暗号：${city.easterEgg.code}`,
      `🌌 平行时空备选城：${runnerNames}`,
      `#测测你的宿命恋人在哪个城市 #趣味人格测试 #中国地理`
    ].join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => showToast('已复制小红书 / 朋友圈分享文案'))
        .catch(() => fallbackCopy(shareText));
    } else {
      fallbackCopy(shareText);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('已复制分享文案');
    } catch (_) {
      showToast('复制失败，请手动截图分享');
    }
    document.body.removeChild(ta);
  }

  function openAtlasModal(highlightCityId) {
    const myCityId = state.lastResult ? state.lastResult.primary.city.id : null;
    const zones = ['华东', '华北', '西南', '西北', '东北', '华中', '华南'];

    el.atlasContent.innerHTML = '';
    zones.forEach((zone) => {
      const list = CITIES.filter((c) => c.geoZone === zone);
      if (list.length === 0) return;

      const group = document.createElement('div');
      group.className = 'atlas-zone-group';

      const heading = document.createElement('h4');
      heading.className = 'atlas-zone-title';
      heading.textContent = `${zone}地区`;
      group.appendChild(heading);

      const grid = document.createElement('div');
      grid.className = 'atlas-grid';

      list.forEach((c) => {
        const card = document.createElement('div');
        const isMine = c.id === myCityId;
        const isHighlighted = highlightCityId && c.id === highlightCityId;
        card.className = 'atlas-item' + (isMine || isHighlighted ? ' is-mine' : '');
        card.innerHTML = `
          <div class="atlas-item-top">
            <span class="atlas-city-name" style="color: ${c.accent}">${c.name}${isMine ? '（你的宿命城）' : ''}</span>
            <span class="atlas-seal">${c.seal}</span>
          </div>
          <p class="atlas-archetype">${c.title}</p>
          <p class="atlas-region">${c.region} · ${c.traits.slice(0, 2).join(' / ')}</p>
        `;
        grid.appendChild(card);
      });

      group.appendChild(grid);
      el.atlasContent.appendChild(group);
    });

    el.modalAtlas.hidden = false;
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.hidden = true;
  }

  let toastTimer = null;
  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toast.hidden = true;
    }, 2400);
  }

  // ==================== 事件绑定 ====================
  function bindEvents() {
    el.btnStart.addEventListener('click', startNewQuiz);
    el.btnResume.addEventListener('click', resumeQuiz);
    el.btnPrev.addEventListener('click', goToPrevQuestion);
    el.btnBackHome.addEventListener('click', () => {
      checkSavedProgress();
      switchView('home');
    });

    el.btnPoster.addEventListener('click', openPosterModal);
    el.btnDownloadPoster.addEventListener('click', downloadPoster);
    el.btnCopyShare.addEventListener('click', copyShareText);
    el.btnAtlas.addEventListener('click', () => openAtlasModal());
    el.btnAtlasTop.addEventListener('click', () => openAtlasModal());
    el.btnRetest.addEventListener('click', startNewQuiz);

    // 弹窗关闭委托
    document.querySelectorAll('[data-close-modal]').forEach((node) => {
      node.addEventListener('click', () => closeModal(node.dataset.closeModal));
    });

    // 键盘快捷支持
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        el.modalPoster.hidden = true;
        el.modalAtlas.hidden = true;
        return;
      }

      if (state.currentView !== 'quiz') return;

      const keyMap = {
        '1': 0, a: 0, A: 0,
        '2': 1, b: 1, B: 1,
        '3': 2, c: 2, C: 2,
        '4': 3, d: 3, D: 3
      };

      if (Object.prototype.hasOwnProperty.call(keyMap, e.key)) {
        handleSelectOption(keyMap[e.key]);
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        goToPrevQuestion();
      }
    });
  }

  // 暴露调试/验证接口（便于本地自动化测试评分算法）
  window.DESTINED_CITY_APP = {
    evaluateAnswers,
    QUESTION_DIM_STATS,
    CITY_DIM_STATS
  };

  // 初始化
  checkSavedProgress();
  bindEvents();
})();
