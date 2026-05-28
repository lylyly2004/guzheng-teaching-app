const pieceConfigs = {
  qintou: {
    label: "筝头",
    image: "assets/images/puzzle-piece-qintou.png",
    stageImage: "assets/images/puzzle-stage-qintou.png",
    stageFullCanvas: true,
    zoneClassName: "zone-qintou",
    stageClassName: "stage-piece-qintou"
  },
  qinwei: {
    label: "筝尾",
    image: "assets/images/puzzle-piece-qinwei.png",
    zoneClassName: "zone-qinwei",
    stageClassName: "stage-piece-qinwei"
  },
  mianban: {
    label: "面板",
    image: "assets/images/puzzle-piece-mianban.png",
    stageImage: "assets/images/puzzle-stage-mianban.png",
    stageFullCanvas: true,
    zoneClassName: "zone-mianban",
    stageClassName: "stage-piece-mianban"
  },
  ceban: {
    label: "侧板",
    image: "assets/images/puzzle-piece-ceban.png",
    stageImage: "assets/images/puzzle-stage-ceban.png",
    stageFullCanvas: true,
    zoneClassName: "zone-ceban",
    stageClassName: "stage-piece-ceban"
  },
  qinxian: {
    label: "琴弦",
    image: "assets/images/puzzle-piece-qinxian.png",
    zoneClassName: "zone-qinxian",
    stageClassName: "stage-piece-qinxian"
  },
  yanzhu: {
    label: "筝码",
    image: "assets/images/puzzle-piece-yanzhu.png",
    zoneClassName: "zone-yanzhu",
    stageClassName: "stage-piece-yanzhu"
  },
  houyueshan: {
    label: "后岳山",
    image: "assets/images/puzzle-piece-houyueshan.png",
    zoneClassName: "zone-houyueshan",
    stageClassName: "stage-piece-houyueshan"
  },
  qianyueshan: {
    label: "前岳山",
    image: "assets/images/puzzle-piece-qianyueshan.png",
    zoneClassName: "zone-qianyueshan",
    stageClassName: "stage-piece-qianyueshan"
  }
};

const zoneOrder = ["qinwei", "houyueshan", "mianban", "ceban", "qinxian", "yanzhu", "qianyueshan", "qintou"];
const pieceOrder = ["qintou", "qinwei", "mianban", "ceban", "qinxian", "yanzhu", "houyueshan", "qianyueshan"];

function renderPieceButtons() {
  return pieceOrder
    .map((key) => {
      const piece = pieceConfigs[key];
      return `
        <button class="puzzle-piece-button" type="button" draggable="true" data-piece="${key}">
          <span class="puzzle-piece-title">${piece.label}</span>
          <span class="puzzle-piece-thumb">
            <img src="${piece.image}" alt="${piece.label}">
          </span>
        </button>
      `;
    })
    .join("");
}

function renderZones() {
  return zoneOrder
    .map((key) => {
      const piece = pieceConfigs[key];
      if (key === "ceban" || key === "mianban" || key === "qintou") {
        return "";
      }
      return `
        <div class="puzzle-zone ${piece.zoneClassName}" data-zone="${key}">
          <span>${piece.label}</span>
        </div>
      `;
    })
    .join("");
}

function renderStagePieces() {
  return pieceOrder
    .map((key) => {
      const piece = pieceConfigs[key];
      const stageImage = piece.stageImage || piece.image;
      const fullCanvasAttr = piece.stageFullCanvas ? ' data-stage-full-canvas="true"' : "";
      return `
        <div class="puzzle-stage-piece ${piece.stageClassName}" data-piece="${key}"${fullCanvasAttr} aria-hidden="true">
          <img src="${stageImage}" alt="">
        </div>
      `;
    })
    .join("");
}

export function createStructureGameMarkup() {
  return `
    <div class="fullscreen-panel fullscreen-panel--game" data-overlay-lock="true" role="dialog" aria-modal="true" aria-label="互动拼合游戏">
      <div class="game-topbar">
        <button class="button button--ghost" type="button" data-close-game>关闭</button>
      </div>
      <div class="puzzle-layout">
        <div class="puzzle-main-stage">
          <div class="puzzle-board-wrap">
            <div class="puzzle-stage">
              <div class="puzzle-stage-artboard">
                <div class="puzzle-stage-guide puzzle-stage-guide--qintou" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-qintou.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--mianban" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-mianban.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--ceban" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-ceban.png" alt="">
                </div>
                <div class="puzzle-stage-outline" aria-hidden="true"></div>
                <div class="puzzle-stage-pieces" aria-hidden="true">
                  ${renderStagePieces()}
                </div>
                ${renderZones()}
              </div>
            </div>
          </div>
        </div>
        <p class="puzzle-tip">将下方部件拖动到古筝轮廓中的对应位置。</p>
        <div class="puzzle-bottom-dock">
          <div class="puzzle-piece-row">
            ${renderPieceButtons()}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindStructureGame({ root, closeOverlay } = {}) {
  if (!root) return;

  const pieceButtons = Array.from(root.querySelectorAll(".puzzle-piece-button"));
  const zones = Array.from(root.querySelectorAll(".puzzle-zone"));
  const closeButton = root.querySelector("[data-close-game]");
  const artboard = root.querySelector(".puzzle-stage-artboard");
  const qintouGuide = root.querySelector(".puzzle-stage-guide--qintou");
  const qintouGuideImage = qintouGuide?.querySelector("img");
  const mianbanGuide = root.querySelector(".puzzle-stage-guide--mianban");
  const mianbanGuideImage = mianbanGuide?.querySelector("img");
  const cebanGuide = root.querySelector(".puzzle-stage-guide--ceban");
  const cebanGuideImage = cebanGuide?.querySelector("img");
  let activePiece = null;
  let qintouHitTest = null;
  let mianbanHitTest = null;
  let cebanHitTest = null;

  const getContainedImageRect = (imageElement) => {
    if (!imageElement) {
      return null;
    }

    const rect = imageElement.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return null;
    }

    const naturalWidth = imageElement.naturalWidth || 1920;
    const naturalHeight = imageElement.naturalHeight || 1080;
    const imageRatio = naturalWidth / naturalHeight;
    const boxRatio = rect.width / rect.height;

    let width = rect.width;
    let height = rect.height;
    let left = rect.left;
    let top = rect.top;

    if (boxRatio > imageRatio) {
      width = rect.height * imageRatio;
      left = rect.left + (rect.width - width) / 2;
    } else {
      height = rect.width / imageRatio;
      top = rect.top + (rect.height - height) / 2;
    }

    return { left, top, width, height };
  };

  const placePiece = (pieceId, zone) => {
    const button = root.querySelector(`.puzzle-piece-button[data-piece="${pieceId}"]`);
    const stagePiece = root.querySelector(`.puzzle-stage-piece[data-piece="${pieceId}"]`);
    if (!button || !stagePiece) return;

    button.classList.add("is-placed");
    button.setAttribute("disabled", "disabled");
    zone?.classList.add("is-filled");
    stagePiece.classList.add("is-visible");
    stagePiece.setAttribute("aria-hidden", "false");

    if (pieceId === "ceban") {
      cebanGuide?.classList.add("is-filled");
      cebanGuide?.classList.remove("is-active");
    }

    if (pieceId === "mianban") {
      mianbanGuide?.classList.add("is-filled");
      mianbanGuide?.classList.remove("is-active");
    }

    if (pieceId === "qintou") {
      qintouGuide?.classList.add("is-filled");
      qintouGuide?.classList.remove("is-active");
    }
  };

  const clearDropState = () => {
    zones.forEach((zone) => zone.classList.remove("is-active"));
    qintouGuide?.classList.remove("is-active");
    mianbanGuide?.classList.remove("is-active");
    cebanGuide?.classList.remove("is-active");
  };

  const setupQintouHitTest = () => {
    if (!qintouGuideImage || qintouHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = qintouGuideImage.naturalWidth || 1920;
    canvas.height = qintouGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(qintouGuideImage, 0, 0, canvas.width, canvas.height);

    qintouHitTest = (clientX, clientY) => {
      const containedRect = getContainedImageRect(qintouGuideImage);
      if (!containedRect) {
        return false;
      }

      const relativeX = (clientX - containedRect.left) / containedRect.width;
      const relativeY = (clientY - containedRect.top) / containedRect.height;
      if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) {
        return false;
      }

      const pixelX = Math.max(0, Math.min(canvas.width - 1, Math.round(relativeX * (canvas.width - 1))));
      const pixelY = Math.max(0, Math.min(canvas.height - 1, Math.round(relativeY * (canvas.height - 1))));
      const pixel = context.getImageData(pixelX, pixelY, 1, 1).data;

      return pixel[3] > 180 && pixel[0] > 180 && pixel[1] < 80 && pixel[2] < 80;
    };
  };

  const setupMianbanHitTest = () => {
    if (!mianbanGuideImage || mianbanHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = mianbanGuideImage.naturalWidth || 1920;
    canvas.height = mianbanGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(mianbanGuideImage, 0, 0, canvas.width, canvas.height);

    mianbanHitTest = (clientX, clientY) => {
      const containedRect = getContainedImageRect(mianbanGuideImage);
      if (!containedRect) {
        return false;
      }

      const relativeX = (clientX - containedRect.left) / containedRect.width;
      const relativeY = (clientY - containedRect.top) / containedRect.height;
      if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) {
        return false;
      }

      const pixelX = Math.max(0, Math.min(canvas.width - 1, Math.round(relativeX * (canvas.width - 1))));
      const pixelY = Math.max(0, Math.min(canvas.height - 1, Math.round(relativeY * (canvas.height - 1))));
      const pixel = context.getImageData(pixelX, pixelY, 1, 1).data;

      return pixel[3] > 180 && pixel[2] > 180 && pixel[0] < 90 && pixel[1] < 90;
    };
  };

  const setupCebanHitTest = () => {
    if (!cebanGuideImage || cebanHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = cebanGuideImage.naturalWidth || 1920;
    canvas.height = cebanGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(cebanGuideImage, 0, 0, canvas.width, canvas.height);

    cebanHitTest = (clientX, clientY) => {
      const containedRect = getContainedImageRect(cebanGuideImage);
      if (!containedRect) {
        return false;
      }

      const relativeX = (clientX - containedRect.left) / containedRect.width;
      const relativeY = (clientY - containedRect.top) / containedRect.height;
      if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) {
        return false;
      }

      const pixelX = Math.max(0, Math.min(canvas.width - 1, Math.round(relativeX * (canvas.width - 1))));
      const pixelY = Math.max(0, Math.min(canvas.height - 1, Math.round(relativeY * (canvas.height - 1))));
      const pixel = context.getImageData(pixelX, pixelY, 1, 1).data;

      return pixel[3] > 180 && pixel[0] > 200 && pixel[1] > 60 && pixel[1] < 170 && pixel[2] < 80;
    };
  };

  if (cebanGuideImage?.complete) {
    setupCebanHitTest();
  } else {
    cebanGuideImage?.addEventListener("load", setupCebanHitTest, { once: true });
  }

  if (qintouGuideImage?.complete) {
    setupQintouHitTest();
  } else {
    qintouGuideImage?.addEventListener("load", setupQintouHitTest, { once: true });
  }

  if (mianbanGuideImage?.complete) {
    setupMianbanHitTest();
  } else {
    mianbanGuideImage?.addEventListener("load", setupMianbanHitTest, { once: true });
  }

  pieceButtons.forEach((button) => {
    button.addEventListener("dragstart", (event) => {
      if (button.hasAttribute("disabled")) {
        event.preventDefault();
        return;
      }

      activePiece = button.dataset.piece;
      button.classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", activePiece);
      }
    });

    button.addEventListener("dragend", () => {
      button.classList.remove("is-dragging");
      activePiece = null;
      clearDropState();
    });
  });

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      const hoveredPiece = activePiece || event.dataTransfer?.getData("text/plain");
      if (!hoveredPiece || hoveredPiece !== zone.dataset.zone || zone.classList.contains("is-filled")) {
        return;
      }

      event.preventDefault();
      zone.classList.add("is-active");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("is-active");
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      const droppedPiece = activePiece || event.dataTransfer?.getData("text/plain");
      zone.classList.remove("is-active");
      if (!droppedPiece || droppedPiece !== zone.dataset.zone || zone.classList.contains("is-filled")) return;
      placePiece(droppedPiece, zone);
      activePiece = null;
    });
  });

  artboard?.addEventListener("dragover", (event) => {
    const hoveredPiece = activePiece || event.dataTransfer?.getData("text/plain");
    if (hoveredPiece === "qintou") {
      const qintouButton = root.querySelector('.puzzle-piece-button[data-piece="qintou"]');
      if (qintouButton?.hasAttribute("disabled")) {
        return;
      }

      if (!qintouHitTest?.(event.clientX, event.clientY)) {
        qintouGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        qintouGuide?.classList.add("is-active");
      }
    }

    if (hoveredPiece === "mianban") {
      const mianbanButton = root.querySelector('.puzzle-piece-button[data-piece="mianban"]');
      if (mianbanButton?.hasAttribute("disabled")) {
        return;
      }

      if (!mianbanHitTest?.(event.clientX, event.clientY)) {
        mianbanGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        mianbanGuide?.classList.add("is-active");
      }
    }

    if (hoveredPiece !== "ceban") {
      return;
    }

    const cebanButton = root.querySelector('.puzzle-piece-button[data-piece="ceban"]');
    if (cebanButton?.hasAttribute("disabled")) {
      return;
    }

    if (!cebanHitTest?.(event.clientX, event.clientY)) {
      cebanGuide?.classList.remove("is-active");
      return;
    }

    event.preventDefault();
    cebanGuide?.classList.add("is-active");
  });

  artboard?.addEventListener("drop", (event) => {
    const droppedPiece = activePiece || event.dataTransfer?.getData("text/plain");
    if (droppedPiece === "qintou") {
      event.preventDefault();
      qintouGuide?.classList.remove("is-active");
      if (!qintouHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("qintou");
      activePiece = null;
      return;
    }

    if (droppedPiece === "mianban") {
      event.preventDefault();
      mianbanGuide?.classList.remove("is-active");
      if (!mianbanHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("mianban");
      activePiece = null;
      return;
    }

    if (droppedPiece !== "ceban") {
      return;
    }

    event.preventDefault();
    cebanGuide?.classList.remove("is-active");
    if (!cebanHitTest?.(event.clientX, event.clientY)) {
      return;
    }

    placePiece("ceban");
    activePiece = null;
  });

  closeButton?.addEventListener("click", () => {
    closeOverlay?.();
  });
}
