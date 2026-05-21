import { assembleOrder, hotspotData } from "./data.js";

function renderPieceButtons() {
  return assembleOrder
    .map(
      (part) => `
        <button class="game-piece-button" draggable="true" data-piece="${part}">
          <strong>${hotspotData[part].title}</strong>
        </button>
      `,
    )
    .join("");
}

function renderZones() {
  return assembleOrder
    .map((part) => `<div class="game-zone" data-zone="${part}"><span>${hotspotData[part].title}</span></div>`)
    .join("");
}

export function createStructureGameMarkup() {
  return `
    <div class="fullscreen-panel" data-overlay-lock="true">
      <div class="fullscreen-content">
        <aside class="fullscreen-side">
          <div class="module-panel__head">
            <h3>互动拼合游戏</h3>
            <button class="button button--ghost" id="close-fullscreen-game">关闭</button>
          </div>
          <div class="game-piece-list">
            ${renderPieceButtons()}
          </div>
          <div class="game-progress">
            <div class="game-progress__bar"><span id="game-progress-bar"></span></div>
            <span class="game-progress__text" id="game-progress-text">0 / 7</span>
          </div>
          <p class="module-note module-note--center" id="game-tip">拖动左侧部件到古筝轮廓中的对应位置。</p>
        </aside>

        <section class="fullscreen-stage">
          <div class="module-panel__head">
            <h3>古筝拼合台</h3>
          </div>
          <div class="game-stage-zones">
            <div class="game-stage-base"></div>
            <div class="game-stage-lines">
              <span class="game-stage-line l1"></span>
              <span class="game-stage-line l2"></span>
              <span class="game-stage-line l3"></span>
              <span class="game-stage-line l4"></span>
              <span class="game-stage-line l5"></span>
            </div>
            ${renderZones()}
          </div>
          <div class="game-complete-dialog" id="game-complete-dialog">
            <div class="game-complete-dialog__card">
              <strong>恭喜完成全部拼合</strong>
              <p>古筝结构已经完整复原。</p>
              <button class="button button--primary" id="close-complete-dialog">关闭</button>
            </div>
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
  const completeDialog = root.querySelector("#game-complete-dialog");
  const closeCompleteDialogButton = root.querySelector("#close-complete-dialog");
  const buttons = [...root.querySelectorAll(".game-piece-button")];
  const zones = [...root.querySelectorAll(".game-zone")];
  const closeButton = root.querySelector("#close-fullscreen-game");
  const assembled = new Set();
  let draggingPiece = null;

  function updateProgress(message) {
    const completed = assembled.size;
    const total = assembleOrder.length;
    progressBar.style.width = `${(completed / total) * 100}%`;
    progressText.textContent = `${completed} / ${total}`;

    if (completed === total) {
      tip.textContent = "恭喜你，古筝全部部件已经拼合完成。";
      completeDialog.classList.add("is-open");
      return;
    }

    completeDialog.classList.remove("is-open");
    tip.textContent = message || "拖动左侧部件到古筝轮廓中的对应位置。";
  }

  buttons.forEach((button) => {
    button.addEventListener("dragstart", (event) => {
      draggingPiece = button.dataset.piece;
      button.classList.add("is-dragging");
      event.dataTransfer.setData("text/plain", draggingPiece);
      event.dataTransfer.effectAllowed = "move";
    });

    button.addEventListener("dragend", () => {
      button.classList.remove("is-dragging");
      draggingPiece = null;
    });
  });

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      const piece = draggingPiece || event.dataTransfer.getData("text/plain");
      if (piece === zone.dataset.zone && !assembled.has(piece)) {
        event.dataTransfer.dropEffect = "move";
        zone.classList.add("is-hover");
      }
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("is-hover");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-hover");

      const piece = draggingPiece || event.dataTransfer.getData("text/plain");
      if (!piece || assembled.has(piece)) {
        return;
      }

      if (piece !== zone.dataset.zone) {
        updateProgress("位置不对，再试一次。");
        return;
      }

      assembled.add(piece);
      zone.classList.add("is-filled");
      zone.innerHTML = `<span>${hotspotData[piece].title}</span>`;

      const button = root.querySelector(`[data-piece="${piece}"]`);
      if (button) {
        button.classList.add("is-placed");
        button.disabled = true;
      }

      updateProgress(`已完成 ${hotspotData[piece].title} 的拼合。`);
    });
  });

  closeButton.addEventListener("click", closeOverlay);
  closeCompleteDialogButton.addEventListener("click", closeOverlay);
  updateProgress();
}
