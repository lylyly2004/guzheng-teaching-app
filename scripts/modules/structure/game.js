import { assembleOrder, hotspotData } from "./data.js";

function renderPieceButtons() {
  return assembleOrder
    .map(
      (part) => `
        <button class="game-piece-button" data-piece="${part}">
          <strong>${hotspotData[part].title}</strong>
          <span>${hotspotData[part].description}</span>
        </button>
      `
    )
    .join("");
}

function renderZones() {
  return assembleOrder
    .map((part) => `<div class="game-zone" data-zone="${part}">${hotspotData[part].title}</div>`)
    .join("");
}

export function createStructureGameMarkup() {
  return `
    <div class="fullscreen-panel">
      <div class="fullscreen-content">
        <aside class="fullscreen-side">
          <p class="eyebrow">Full Screen Game</p>
          <h3>古筝结构拼合互动</h3>
          <p>这里先用点选方式跑通互动逻辑。后面接正式素材后，我们再升级成真正的拖拽拼合。</p>
          <div class="game-piece-list">
            ${renderPieceButtons()}
          </div>
          <div class="game-progress">
            <div class="game-progress__bar"><span id="game-progress-bar"></span></div>
            <span class="game-progress__text" id="game-progress-text">0 / 7</span>
          </div>
          <div class="action-row">
            <button class="button button--ghost" id="close-fullscreen-game">退出游戏</button>
          </div>
        </aside>

        <section class="fullscreen-stage">
          <p class="eyebrow">Assembly Stage</p>
          <h3>点选结构部件完成拼合</h3>
          <p id="game-tip">从琴头开始，按照老师讲解顺序逐个点亮对应结构。</p>
          <div class="game-stage-zones">
            <div class="game-stage-base"></div>
            ${renderZones()}
          </div>
        </section>
      </div>
    </div>
  `;
}

export function bindStructureGame({ root, closeOverlay }) {
  const progressBar = root.querySelector("#game-progress-bar");
  const progressText = root.querySelector("#game-progress-text");
  const tip = root.querySelector("#game-tip");
  const buttons = root.querySelectorAll(".game-piece-button");
  const zones = root.querySelectorAll(".game-zone");
  const closeButton = root.querySelector("#close-fullscreen-game");
  const assembled = new Set();

  function updateProgress() {
    const completed = assembled.size;
    const total = assembleOrder.length;
    progressBar.style.width = `${(completed / total) * 100}%`;
    progressText.textContent = `${completed} / ${total}`;

    if (completed === total) {
      tip.textContent = "全部结构已完成，你可以退出游戏，回到课堂讲解区继续教学。";
      return;
    }

    const nextPart = assembleOrder.find((part) => !assembled.has(part));
    tip.textContent = `继续点选“${hotspotData[nextPart].title}”，按顺序完成拼合。`;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const part = button.dataset.piece;
      assembled.add(part);
      button.classList.add("is-active");

      zones.forEach((zone) => {
        if (zone.dataset.zone === part) {
          zone.classList.add("is-filled");
          zone.textContent = `${hotspotData[part].title} 已完成`;
        }
      });

      updateProgress();
    });
  });

  closeButton.addEventListener("click", closeOverlay);
  updateProgress();
}
