const teacherToolCards = [
  { id: "score-editor", title: "曲谱编辑器", status: "已启用", action: "进入编辑" },
  { id: "sight-reading", title: "识谱练习", status: "已启用", action: "进入练习" },
  { id: "lesson-notes", title: "课堂批注", status: "预留", action: "敬请期待" },
  { id: "print-center", title: "打印中心", status: "预留", action: "敬请期待" },
  { id: "homework-sheet", title: "作业单", status: "预留", action: "敬请期待" },
  { id: "resource-box", title: "教学素材盒", status: "预留", action: "敬请期待" },
];

const notationGroups = [
  {
    title: "基本音符",
    items: ["1", "2", "3", "4", "5", "6", "7", "0", "-", "."],
  },
  {
    title: "节奏",
    items: ["附点", "减时线", "增时线", "延音线", "连音线", "三连音"],
  },
  {
    title: "结构",
    items: ["小节线", "反复", "终止", "房子", "段落", "页码"],
  },
  {
    title: "古筝符号",
    items: ["托", "劈", "抹", "挑", "勾", "剔", "摇指", "上滑", "下滑", "按音", "揉弦", "泛音"],
  },
];

const defaultRows = [
  { marks: "∪      ∪", notes: "| 5 6 1 ·2 | 5 2 5 6 | 1 2 5 - |", lyrics: "沧海一声笑滔滔两岸潮" },
  { marks: "⌒⌒    ≈ ≈", notes: "| 6 ·5 3 2 1 | 3 ·2 1 6 5 | 5 ·6 5 6 1 ·2 3 5 |", lyrics: "浮沉随浪只记今朝苍天笑" },
  { marks: "↗ ∪ ○", notes: "| 6 6 5 3 2 1 | 2 - - - | 3 3 2 1 6 5 - |", lyrics: "纷纷世上潮谁负谁胜出" },
  { marks: "∪    ○", notes: "| 5 ·6 5 6 1 ·2 3 5 | 6 6 5 3 2 1 2 - |", lyrics: "淘浪淘尽红尘俗世知多少" },
];

const insertionMap = {
  附点: ".",
  减时线: "_",
  增时线: "-",
  延音线: " - ",
  连音线: "︵",
  三连音: "3 ",
  小节线: " | ",
  反复: " ||: :|| ",
  终止: " || ",
  房子: "① ",
  段落: "\n",
  页码: "第1页",
  托: "∪",
  劈: "∩",
  抹: "⌒",
  挑: "⌣",
  勾: "﹀",
  剔: "︿",
  摇指: "≈",
  上滑: "↗",
  下滑: "↘",
  按音: "﹋",
  揉弦: "〰",
  泛音: "○",
};

const noteBaseMidi = {
  C: 60,
  "C#": 61,
  Db: 61,
  D: 62,
  "D#": 63,
  Eb: 63,
  E: 64,
  F: 65,
  "F#": 66,
  Gb: 66,
  G: 67,
  "G#": 68,
  Ab: 68,
  A: 69,
  "A#": 70,
  Bb: 70,
  B: 71,
};

const sightReadingKeys = [
  { id: "1", label: "1", activeImage: "./assets/images/key-1-active.png", audio: "./assets/audio/key-1.mp3" },
  { id: "2", label: "2", activeImage: "./assets/images/key-2-active.png", audio: "./assets/audio/key-2.mp3" },
  { id: "3", label: "3", activeImage: "./assets/images/key-3-active.png", audio: "./assets/audio/key-3.mp3" },
  { id: "4", label: "4", activeImage: "./assets/images/key-4-active.png", audio: "./assets/audio/key-4.mp3" },
  { id: "5", label: "5", activeImage: "./assets/images/key-5-active.png", audio: "./assets/audio/key-5.mp3" },
  { id: "6", label: "6", activeImage: "./assets/images/key-6-active.png", audio: "./assets/audio/key-6.mp3" },
  { id: "7", label: "7", activeImage: "./assets/images/key-7-active.png", audio: "./assets/audio/key-7.mp3" },
  { id: "i", label: "i", activeImage: "./assets/images/key-8-active.png", audio: "./assets/audio/key-8.mp3" },
];

const keyboardBlackMaskImage = "./assets/images/keyboard-black-mask.png";
const majorScaleOffsets = [0, 2, 4, 5, 7, 9, 11];

function cloneRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function tokenizeScoreText(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function tokenizeLyrics(value) {
  return Array.from(String(value || "").replace(/\s+/g, "")).filter(Boolean);
}

function parseNoteLayout(text) {
  const tokens = tokenizeScoreText(text);
  const cells = [];
  const separators = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (/^[|:]+$/.test(token)) {
      separators.push(cells.length);
      continue;
    }

    if (token === "·" && index + 1 < tokens.length) {
      const nextToken = tokens[index + 1];
      if (!/^[|:]+$/.test(nextToken)) {
        cells.push({
          text: `·${nextToken}`,
          lyricSlot: /\d/.test(nextToken),
        });
        index += 1;
        continue;
      }
    }

    cells.push({
      text: token,
      lyricSlot: /\d/.test(token) || token === "0",
    });
  }

  return { cells, separators };
}

function buildPreviewData(row) {
  const noteLayout = parseNoteLayout(row.notes);
  const lyricTokens = tokenizeLyrics(row.lyrics);
  const noteCells = [...noteLayout.cells];
  const lyricCells = [];
  let lyricIndex = 0;

  noteCells.forEach((cell) => {
    if (cell.lyricSlot) {
      lyricCells.push(lyricTokens[lyricIndex] || "");
      lyricIndex += 1;
    } else {
      lyricCells.push("");
    }
  });

  while (lyricIndex < lyricTokens.length) {
    noteCells.push({ text: "", lyricSlot: false });
    lyricCells.push(lyricTokens[lyricIndex]);
    lyricIndex += 1;
  }

  return {
    columnCount: Math.max(noteCells.length, 1),
    noteCells,
    lyricCells,
    separators: noteLayout.separators,
  };
}

function renderCells(values, kind) {
  return values
    .map((value) => `<span class="score-paper__cell score-paper__cell--${kind}">${escapeHtml(value)}</span>`)
    .join("");
}

function renderSeparators(separators, columnCount) {
  return separators
    .map(
      (columnIndex) => `
        <span
          class="score-paper__separator"
          style="left: calc(${columnIndex} / ${columnCount} * 100%);"
        ></span>
      `
    )
    .join("");
}

function renderPreviewMarkup(row) {
  const preview = buildPreviewData(row);
  return `
    <div class="score-paper__marks">${escapeHtml(row.marks)}</div>
    <div class="score-paper__grid" style="--score-columns:${preview.columnCount};">
      <div class="score-paper__separator-layer">
        ${renderSeparators(preview.separators, preview.columnCount)}
      </div>
      <div class="score-paper__line score-paper__line--notes">
        ${renderCells(preview.noteCells.map((cell) => cell.text), "note")}
      </div>
      <div class="score-paper__line score-paper__line--lyrics">
        ${renderCells(preview.lyricCells, "lyric")}
      </div>
    </div>
  `;
}

function ensureTeacherToolsState(state) {
  if (!state.modules.teacherTools) {
    state.modules.teacherTools = {
      view: "home",
      editor: {
        title: "沧海一声笑",
        keySignature: "1 = D",
        timeSignature: "4 / 4",
        tempo: "♩ = 65",
        rows: cloneRows(defaultRows),
        activeTarget: null,
        isPlaying: false,
        player: null,
      },
      practice: {
        activeKey: null,
        clearTimer: null,
        blackMask: null,
        audioMap: {},
      },
    };
  }

  if (!state.modules.teacherTools.practice) {
    state.modules.teacherTools.practice = {
      activeKey: null,
      clearTimer: null,
      blackMask: null,
      audioMap: {},
    };
  }

  return state.modules.teacherTools;
}

function renderToolHome() {
  return `
    <section class="teacher-tools-home">
      <div class="teacher-tools-home__grid">
        ${teacherToolCards
          .map(
            (tool) => `
              <article class="teacher-tool-launch${tool.id === "score-editor" || tool.id === "sight-reading" ? " is-featured" : ""}">
                <div class="teacher-tool-launch__top">
                  <span class="sub-badge">${tool.status}</span>
                  <h3>${tool.title}</h3>
                </div>
                <button
                  class="button ${tool.id === "score-editor" || tool.id === "sight-reading" ? "button--primary teacher-tool-open" : "button--ghost"}"
                  type="button"
                  ${tool.id === "score-editor" || tool.id === "sight-reading" ? `data-tool-id="${tool.id}"` : "disabled"}
                >
                  ${tool.action}
                </button>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderScoreEditor(editor) {
  return `
    <section class="score-editor-shell">
      <div class="score-editor-topbar">
        <div class="score-editor-topbar__actions">
          <button class="button button--ghost score-editor-play" type="button">${editor.isPlaying ? "播放中..." : "播放试听"}</button>
          <button class="button button--ghost score-editor-stop" type="button">停止</button>
          <button class="button button--primary score-editor-print" type="button">打印</button>
        </div>
      </div>

      <div class="score-editor-layout">
        <aside class="score-editor-panel score-editor-panel--left">
          <div class="score-editor-meta">
            <label>
              <span>曲名</span>
              <input class="score-editor-input" data-field="title" type="text" value="${escapeHtml(editor.title)}" />
            </label>
            <label>
              <span>调号</span>
              <input class="score-editor-input" data-field="keySignature" type="text" value="${escapeHtml(editor.keySignature)}" />
            </label>
            <label>
              <span>拍号</span>
              <input class="score-editor-input" data-field="timeSignature" type="text" value="${escapeHtml(editor.timeSignature)}" />
            </label>
            <label>
              <span>速度</span>
              <input class="score-editor-input" data-field="tempo" type="text" value="${escapeHtml(editor.tempo)}" />
            </label>
          </div>

          <div class="score-editor-palette">
            ${notationGroups
              .map(
                (group) => `
                  <section class="score-editor-group">
                    <h4>${group.title}</h4>
                    <div class="score-editor-tags">
                      ${group.items
                        .map(
                          (item) => `
                            <button class="score-editor-tag" type="button" data-insert-token="${escapeHtml(item)}">
                              ${item}
                            </button>
                          `
                        )
                        .join("")}
                    </div>
                  </section>
                `
              )
              .join("")}
          </div>
        </aside>

        <section class="score-editor-panel score-editor-panel--center">
          <div class="score-editor-canvas">
            <article class="score-paper">
              <header class="score-paper__header">
                <div class="score-paper__meta">
                  <span class="score-paper-meta-key">${escapeHtml(editor.keySignature)}</span>
                  <span class="score-paper-meta-time">${escapeHtml(editor.timeSignature)}</span>
                  <span class="score-paper-meta-tempo">${escapeHtml(editor.tempo)}</span>
                </div>
                <h3 class="score-paper-title">${escapeHtml(editor.title)}</h3>
              </header>

              <section class="score-paper__body">
                ${editor.rows
                  .map(
                    (row, index) => `
                      <article class="score-paper__row">
                        <div class="score-paper__preview" data-row-index="${index}">
                          ${renderPreviewMarkup(row)}
                        </div>
                        <div class="score-paper__editors">
                          <textarea class="score-paper__editor score-paper__editor--marks score-editor-textarea" data-row-index="${index}" data-row-field="marks" rows="1">${escapeHtml(row.marks)}</textarea>
                          <textarea class="score-paper__editor score-paper__editor--notes score-editor-textarea" data-row-index="${index}" data-row-field="notes" rows="2">${escapeHtml(row.notes)}</textarea>
                          <textarea class="score-paper__editor score-paper__editor--lyrics score-editor-textarea" data-row-index="${index}" data-row-field="lyrics" rows="2">${escapeHtml(row.lyrics)}</textarea>
                        </div>
                      </article>
                    `
                  )
                  .join("")}
              </section>
            </article>
          </div>
        </section>

        <aside class="score-editor-panel score-editor-panel--right">
          <div class="score-editor-sidecard">
            <h4>版式</h4>
            <button class="score-editor-line" type="button">A4 竖版</button>
            <button class="score-editor-line" type="button">四行紧凑</button>
            <button class="score-editor-line" type="button">带页码</button>
          </div>

          <div class="score-editor-sidecard">
            <h4>歌词</h4>
            <button class="score-editor-line" type="button">显示歌词</button>
            <button class="score-editor-line" type="button">双行歌词</button>
            <button class="score-editor-line" type="button">段落编号</button>
          </div>

          <div class="score-editor-sidecard">
            <h4>常用</h4>
            <button class="score-editor-line" type="button">插入小节</button>
            <button class="score-editor-line" type="button">插入反复</button>
            <button class="score-editor-line" type="button">插入指法</button>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function readTempoValue(value) {
  const match = String(value).match(/(\d{2,3})/);
  const bpm = Number(match?.[1] || 65);
  return Number.isFinite(bpm) && bpm > 0 ? bpm : 65;
}

function readKeyMidi(value) {
  const text = String(value).trim();
  const letterMatch = text.match(/([A-G](?:#|b)?)/i);
  if (letterMatch) {
    const pitch = letterMatch[1].replace(/^[a-z]/, (char) => char.toUpperCase());
    return noteBaseMidi[pitch] ?? 62;
  }
  return 62;
}

function parseNotesFromRows(rows, keySignature, tempoText) {
  const baseMidi = readKeyMidi(keySignature);
  const bpm = readTempoValue(tempoText);
  const beatSeconds = 60 / bpm;
  const events = [];
  let lastEvent = null;

  const createEventFromDigit = (digitChar, octaveShift) => {
    if (digitChar === "0") {
      return { type: "rest", duration: beatSeconds };
    }

    const scaleIndex = Number(digitChar) - 1;
    const midi = baseMidi + majorScaleOffsets[scaleIndex] + octaveShift * 12;
    const frequency = 440 * 2 ** ((midi - 69) / 12);
    return { type: "note", frequency, duration: beatSeconds };
  };

  rows.forEach((row) => {
    const text = String(row.notes || "");
    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      if (/\d/.test(char)) {
        let octaveShift = 0;
        let lookahead = index + 1;
        while (lookahead < text.length) {
          const nextChar = text[lookahead];
          if (nextChar === "'" || nextChar === "’") {
            octaveShift += 1;
            lookahead += 1;
            continue;
          }
          if (nextChar === ",") {
            octaveShift -= 1;
            lookahead += 1;
            continue;
          }
          break;
        }

        const event = createEventFromDigit(char, octaveShift);
        events.push(event);
        lastEvent = event;
        continue;
      }

      if (char === "-") {
        if (lastEvent) {
          lastEvent.duration += beatSeconds;
        } else {
          events.push({ type: "rest", duration: beatSeconds });
        }
        continue;
      }

      if (char === "." && lastEvent) {
        lastEvent.duration += beatSeconds * 0.5;
      }
    }
  });

  return events;
}

function stopPlayback(editor) {
  if (editor.player?.timeoutId) {
    window.clearTimeout(editor.player.timeoutId);
  }

  if (editor.player?.oscillators) {
    editor.player.oscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // ignore
      }
    });
  }

  if (editor.player?.audioContext && editor.player.audioContext.state !== "closed") {
    editor.player.audioContext.close().catch(() => undefined);
  }

  editor.player = null;
  editor.isPlaying = false;
}

async function playPreview(editor, rerender) {
  stopPlayback(editor);

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return;
  }

  const events = parseNotesFromRows(editor.rows, editor.keySignature, editor.tempo);
  if (!events.length) {
    return;
  }

  const audioContext = new AudioContextCtor();
  await audioContext.resume().catch(() => undefined);

  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.18;
  masterGain.connect(audioContext.destination);

  const oscillators = [];
  let currentTime = audioContext.currentTime + 0.04;

  events.forEach((event) => {
    if (event.type === "note") {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(event.frequency, currentTime);
      gainNode.gain.setValueAtTime(0.0001, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.24, currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, currentTime + Math.max(0.08, event.duration * 0.92));

      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      oscillator.start(currentTime);
      oscillator.stop(currentTime + event.duration);
      oscillators.push(oscillator);
    }

    currentTime += event.duration;
  });

  editor.player = {
    audioContext,
    oscillators,
    timeoutId: window.setTimeout(() => {
      stopPlayback(editor);
      rerender();
    }, Math.ceil((currentTime - audioContext.currentTime) * 1000) + 120),
  };

  editor.isPlaying = true;
  rerender();
}

function insertAtCursor(target, value) {
  const start = target.selectionStart ?? target.value.length;
  const end = target.selectionEnd ?? target.value.length;
  const nextValue = `${target.value.slice(0, start)}${value}${target.value.slice(end)}`;
  target.value = nextValue;
  const cursor = start + value.length;
  target.setSelectionRange(cursor, cursor);
  target.dispatchEvent(new Event("input", { bubbles: true }));
  target.focus();
}

function syncRowPreview(root, rowIndex, row) {
  const preview = root.querySelector(`.score-paper__preview[data-row-index="${rowIndex}"]`);
  if (!preview) {
    return;
  }
  preview.innerHTML = renderPreviewMarkup(row);
}

function bindScoreEditor({ root, editor, rerender }) {
  root.querySelector(".score-editor-print")?.addEventListener("click", () => {
    window.print();
  });

  root.querySelector(".score-editor-play")?.addEventListener("click", async () => {
    if (!editor.isPlaying) {
      await playPreview(editor, rerender);
    }
  });

  root.querySelector(".score-editor-stop")?.addEventListener("click", () => {
    stopPlayback(editor);
    rerender();
  });

  root.querySelectorAll(".score-editor-input").forEach((input) => {
    const field = input.dataset.field;
    input.addEventListener("focus", () => {
      editor.activeTarget = { type: "field", field };
    });
    input.addEventListener("input", () => {
      editor[field] = input.value;
      if (field === "title") {
        root.querySelector(".score-paper-title").textContent = input.value || "未命名曲谱";
      } else if (field === "keySignature") {
        root.querySelector(".score-paper-meta-key").textContent = input.value || "";
      } else if (field === "timeSignature") {
        root.querySelector(".score-paper-meta-time").textContent = input.value || "";
      } else if (field === "tempo") {
        root.querySelector(".score-paper-meta-tempo").textContent = input.value || "";
      }
    });
  });

  root.querySelectorAll(".score-editor-textarea").forEach((textarea) => {
    const rowIndex = Number(textarea.dataset.rowIndex);
    const rowField = textarea.dataset.rowField;

    textarea.addEventListener("focus", () => {
      editor.activeTarget = { type: "row", rowIndex, rowField };
    });

    textarea.addEventListener("input", () => {
      editor.rows[rowIndex][rowField] = textarea.value;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      syncRowPreview(root, rowIndex, editor.rows[rowIndex]);
    });

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });

  root.querySelectorAll("[data-insert-token]").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.dataset.insertToken;
      const token = insertionMap[label] ?? label;
      const activeTarget = editor.activeTarget;
      if (!activeTarget) {
        return;
      }

      if (activeTarget.type === "field") {
        const input = root.querySelector(`.score-editor-input[data-field="${activeTarget.field}"]`);
        if (input) {
          insertAtCursor(input, token);
        }
        return;
      }

      const selector = `.score-editor-textarea[data-row-index="${activeTarget.rowIndex}"][data-row-field="${activeTarget.rowField}"]`;
      const textarea = root.querySelector(selector);
      if (textarea) {
        insertAtCursor(textarea, token);
      }
    });
  });
}

function renderSightReadingPractice(practiceState) {
  return `
    <section class="teacher-practice-shell">
      <div class="teacher-practice-topbar">
        <div class="teacher-practice-topbar__actions"></div>
      </div>

      <div class="teacher-practice-layout">
        <section class="teacher-practice-panel teacher-practice-panel--main">
          <div class="teacher-practice-stage">
            <div class="teacher-practice-stage__header">
              <span class="sub-badge">识谱练习</span>
            </div>
            <div class="teacher-practice-stage__body">
              <div class="teacher-practice-keyboard-wrap">
                <img class="teacher-practice-keyboard" src="./assets/images/keyboard-base.png" alt="八键钢琴键盘" />
                <div class="teacher-practice-key-highlight-layer" aria-hidden="true">
                  ${sightReadingKeys
                    .map(
                      (key) => `
                        <img
                          class="teacher-practice-key-highlight${practiceState.activeKey === key.id ? " is-active" : ""}"
                          src="${key.activeImage}"
                          alt=""
                          data-key-highlight="${key.id}"
                        />
                      `
                    )
                    .join("")}
                </div>
                <div class="teacher-practice-key-overlay" aria-label="按键编号">
                  ${sightReadingKeys.map((key) => `<span>${key.label}</span>`).join("")}
                </div>
                <div class="teacher-practice-key-hitareas" aria-label="按键操作区">
                  ${sightReadingKeys
                    .map(
                      (key) => `
                        <button
                          class="teacher-practice-key-trigger"
                          type="button"
                          data-practice-key="${key.id}"
                          aria-label="按键 ${key.label}"
                        ></button>
                      `
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside class="teacher-practice-panel teacher-practice-panel--side">
          <div class="teacher-practice-card">
            <h4>练习信息</h4>
            <p>点击白键即可查看高亮并播放对应教学音。</p>
          </div>
          <div class="teacher-practice-card">
            <h4>按键顺序</h4>
            <p>面向屏幕从左到右依次对应 1 2 3 4 5 6 7 i。</p>
          </div>
          <div class="teacher-practice-card">
            <h4>下一步</h4>
            <p>后续可继续加入题目提示、随机抽题和识谱检测内容。</p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function bindSightReadingPractice({ root, practiceState, rerender }) {
  const keyboardWrap = root.querySelector(".teacher-practice-keyboard-wrap");
  const keyConfigMap = Object.fromEntries(sightReadingKeys.map((key) => [key.id, key]));

  const ensureBlackMask = () => {
    if (practiceState.blackMask) {
      return practiceState.blackMask;
    }

    practiceState.blackMask = new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        resolve({
          width: canvas.width,
          height: canvas.height,
          context,
        });
      };
      image.onerror = () => resolve(null);
      image.src = keyboardBlackMaskImage;
    });

    return practiceState.blackMask;
  };

  const isBlackKeyPoint = async (clientX, clientY) => {
    if (!keyboardWrap) {
      return false;
    }

    const rect = keyboardWrap.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      return false;
    }

    const mask = await ensureBlackMask();
    if (!mask) {
      return false;
    }

    const pixelX = Math.max(0, Math.min(mask.width - 1, Math.floor((x / rect.width) * mask.width)));
    const pixelY = Math.max(0, Math.min(mask.height - 1, Math.floor((y / rect.height) * mask.height)));
    const pixel = mask.context.getImageData(pixelX, pixelY, 1, 1).data;
    return pixel[3] > 150 && pixel[0] > 180;
  };

  const playKeyAudio = (keyId) => {
    const keyConfig = keyConfigMap[keyId];
    if (!keyConfig?.audio) {
      return;
    }

    if (!practiceState.audioMap[keyId]) {
      practiceState.audioMap[keyId] = new Audio(keyConfig.audio);
      practiceState.audioMap[keyId].preload = "auto";
    }

    const audio = practiceState.audioMap[keyId];
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // ignore
    }
    audio.play().catch(() => undefined);
  };

  const clearActiveKey = () => {
    if (!practiceState.activeKey) {
      return;
    }
    practiceState.activeKey = null;
    rerender();
  };

  const triggerActiveKey = (keyId) => {
    if (practiceState.clearTimer) {
      window.clearTimeout(practiceState.clearTimer);
    }

    playKeyAudio(keyId);
    practiceState.activeKey = keyId;
    rerender();
    practiceState.clearTimer = window.setTimeout(() => {
      practiceState.clearTimer = null;
      clearActiveKey();
    }, 220);
  };

  root.querySelectorAll(".teacher-practice-key-trigger").forEach((button) => {
    const keyId = button.dataset.practiceKey;
    const handleTrigger = async (event) => {
      event.preventDefault();
      if (await isBlackKeyPoint(event.clientX, event.clientY)) {
        return;
      }
      triggerActiveKey(keyId);
    };

    button.addEventListener("pointerdown", handleTrigger);
    button.addEventListener("click", handleTrigger);
  });
}

export const teacherToolsModule = {
  id: "teacher-tools",
  title: "老师常用工具",
  summary: "老师高频功能入口。",
  priority: "扩展",
  header: {
    eyebrow: "Teacher Tools",
    title: "老师常用工具",
    summary: "",
  },
  getHeader(state) {
    const moduleState = ensureTeacherToolsState(state);
    if (moduleState.view === "sight-reading" || moduleState.view === "score-editor") {
      return { eyebrow: "", title: "", summary: "" };
    }
    return this.header;
  },
  getViewState(state) {
    return ensureTeacherToolsState(state).view;
  },
  getHeaderBackAction(state) {
    const moduleState = ensureTeacherToolsState(state);
    if (moduleState.view === "score-editor" || moduleState.view === "sight-reading") {
      return { label: "返回上一级" };
    }
    return { label: "返回上一页" };
  },
  handleHeaderBackAction({ state, rerender, switchModule }) {
    const moduleState = ensureTeacherToolsState(state);
    if (moduleState.view === "score-editor" || moduleState.view === "sight-reading") {
      stopPlayback(moduleState.editor);
      moduleState.editor.activeTarget = null;
      moduleState.view = "home";
      rerender();
      return true;
    }

    switchModule("dashboard");
    return true;
  },
  getGlobalAction(state) {
    const moduleState = ensureTeacherToolsState(state);
    if (moduleState.view === "score-editor" || moduleState.view === "sight-reading") {
      return { label: "返回工具页", mode: "module-home" };
    }
    return { label: "返回登录页", mode: "login" };
  },
  handleGlobalAction({ state, rerender, redirectToLogin }) {
    const moduleState = ensureTeacherToolsState(state);
    if (moduleState.view === "score-editor" || moduleState.view === "sight-reading") {
      stopPlayback(moduleState.editor);
      moduleState.editor.activeTarget = null;
      moduleState.view = "home";
      rerender();
      return true;
    }

    redirectToLogin();
    return true;
  },
  onDeactivate(state) {
    const moduleState = ensureTeacherToolsState(state);
    stopPlayback(moduleState.editor);
    moduleState.editor.activeTarget = null;
    moduleState.view = "home";
  },
  render(state) {
    const moduleState = ensureTeacherToolsState(state);
    if (moduleState.view === "score-editor") {
      return renderScoreEditor(moduleState.editor);
    }
    if (moduleState.view === "sight-reading") {
      return renderSightReadingPractice(moduleState.practice);
    }
    return renderToolHome();
  },
  bind({ root, state, rerender }) {
    const moduleState = ensureTeacherToolsState(state);

    root.querySelectorAll(".teacher-tool-open").forEach((button) => {
      button.addEventListener("click", () => {
        moduleState.view = button.dataset.toolId;
        rerender();
      });
    });

    if (moduleState.view === "score-editor") {
      bindScoreEditor({
        root,
        editor: moduleState.editor,
        rerender,
      });
      return;
    }

    if (moduleState.view === "sight-reading") {
      bindSightReadingPractice({
        root,
        practiceState: moduleState.practice,
        rerender,
      });
    }
  },
};
