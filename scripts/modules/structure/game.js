import { assembleOrder, hotspotData } from "./data.js";

const pieceImageMap = {
  qintou: "./assets/images/hotspot-qintou.png",
  qinwei: "./assets/images/hotspot-qinwei.png",
  mianban: "./assets/images/hotspot-mianban.png",
  qinxian: "./assets/images/hotspot-qinxian.png",
  yanzhu: "./assets/images/hotspot-yanzhu.png",
  yueshan: "./assets/images/hotspot-houyueshan.png",
  qianyueshan: "./assets/images/hotspot-qianyueshan.png"
};

function renderPieceButtons() {
  return assembleOrder
    .map((part) => {
      const title = hotspotData[part].title;
      const imageSrc = pieceImageMap[part] ?? "./assets/images/structure-guzheng.png";
      return `
        <button class="puzzle-piece-button" draggable="true" data-piece="${part}" type="button">
          <span class="puzzle-piece-button__title">${title}</span>
          <span class="puzzle-piece-button__thumb">
            <img src="${imageSrc}" alt="${title}" draggable="false" />
          </span>
        </button>
      `;
    })
    .join("");
}

function renderZones() {
  return assembleOrder
    .map(
      (part) => `
        <div class="puzzle-zone puzzle-zone--${part}" data-zone="${part}">
          <span>${hotspotData[part].title}</span>
        </div>
      `
    )
    .join("");
}

export function createStructureGameMarkup() {
  return `
    <div class="fullscreen-panel fullscreen-panel--game">
      <div class="fullscreen-content fullscreen-content--game">
        <div class="puzzle-layout">
          <div class="puzzle-topbar">
            <button class="button button--ghost" data-game-close type="button">关闭</button>
          </div>
          <div class="puzzle-main-stage">
            <div class="puzzle-board-wrap">
              <div class="puzzle-stage">
                ${renderZones()}
              </div>
            </div>
          </div>
          <p class="puzzle-tip" data-game-tip>将下方部件拖动到古筝轮廓中的对应位置。</p>
          <div class="puzzle-bottom-dock">
            <div class="puzzle-piece-row">
              ${renderPieceButtons()}
            </div>
          </div>
        </div>
        <div class="game-complete-dialog" hidden>
          <p>拼合完成，恭喜你完成古筝结构互动练习。</p>
          <button class="primary-button" data-game-close type="button">关闭</button>
        </div>
      </div>
    </div>
  `;
}

export function bindStructureGame({ root, closeOverlay }) {
  const pieceButtons = Array.from(root.querySelectorAll(".puzzle-piece-button"));
  const zones = Array.from(root.querySelectorAll(".puzzle-zone"));
  const tip = root.querySelector("[data-game-tip]");
  const closeButtons = root.querySelectorAll("[data-game-close]");
  const completeDialog = root.querySelector(".game-complete-dialog");
  const assembled = new Set();

  function updateProgress() {
    if (assembled.size === assembleOrder.length) {
      tip.textContent = "全部部件已拼合完成。";
      completeDialog.hidden = false;
    }
  }

  pieceButtons.forEach((button) => {
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", button.dataset.piece ?? "");
      event.dataTransfer?.setDragImage(button, button.offsetWidth / 2, button.offsetHeight / 2);
      root.classList.add("is-dragging-piece");
    });

    button.addEventListener("dragend", () => {
      root.classList.remove("is-dragging-piece");
    });
  });

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-over");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("is-over");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-over");
      const piece = event.dataTransfer?.getData("text/plain");
      if (!piece || piece !== zone.dataset.zone || assembled.has(piece)) {
        tip.textContent = "位置不正确，请继续尝试。";
        return;
      }

      assembled.add(piece);
      zone.classList.add("is-filled");
      zone.innerHTML = `<span>${hotspotData[piece].title}</span>`;
      const button = root.querySelector(`.puzzle-piece-button[data-piece="${piece}"]`);
      if (button) {
        button.disabled = true;
        button.classList.add("is-used");
      }
      tip.textContent = `已完成：${hotspotData[piece].title}`;
      updateProgress();
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeOverlay));
  updateProgress();
}


