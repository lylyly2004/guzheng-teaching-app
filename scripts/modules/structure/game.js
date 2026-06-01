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
    stageImage: "assets/images/puzzle-stage-qinwei.png",
    stageFullCanvas: true,
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
    stageImage: "assets/images/puzzle-stage-qinxian.png",
    stageFullCanvas: true,
    zoneClassName: "zone-qinxian",
    stageClassName: "stage-piece-qinxian"
  },
  yanzhu: {
    label: "筝码",
    image: "assets/images/puzzle-piece-yanzhu.png",
    stageImage: "assets/images/puzzle-stage-yanzhu.png",
    stageFullCanvas: true,
    zoneClassName: "zone-yanzhu",
    stageClassName: "stage-piece-yanzhu"
  },
  houyueshan: {
    label: "后岳山",
    image: "assets/images/puzzle-piece-houyueshan.png",
    stageImage: "assets/images/puzzle-stage-houyueshan.png",
    stageFullCanvas: true,
    zoneClassName: "zone-houyueshan",
    stageClassName: "stage-piece-houyueshan"
  },
  qianyueshan: {
    label: "前岳山",
    image: "assets/images/puzzle-piece-qianyueshan.png",
    stageImage: "assets/images/puzzle-stage-qianyueshan.png",
    stageFullCanvas: true,
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
      if (key === "ceban" || key === "mianban" || key === "qintou" || key === "qinwei" || key === "qianyueshan" || key === "houyueshan" || key === "yanzhu" || key === "qinxian") {
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
                <div class="puzzle-stage-guide puzzle-stage-guide--qinwei" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-qinwei.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--mianban" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-mianban.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--ceban" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-ceban.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--qianyueshan" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-qianyueshan.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--houyueshan" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-houyueshan.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--yanzhu" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-yanzhu.png" alt="">
                </div>
                <div class="puzzle-stage-guide puzzle-stage-guide--qinxian" aria-hidden="true">
                  <img src="assets/images/puzzle-guide-qinxian.png" alt="">
                </div>
                <div class="puzzle-stage-outline" aria-hidden="true"></div>
                <div class="puzzle-stage-pieces" aria-hidden="true">
                  ${renderStagePieces()}
                </div>
                <div class="puzzle-stage-outline puzzle-stage-outline--yanzhu" data-outline-part="yanzhu" aria-hidden="true"></div>
                <div class="puzzle-stage-outline puzzle-stage-outline--qinxian" data-outline-part="qinxian" aria-hidden="true"></div>
                ${renderZones()}
              </div>
              <div class="game-complete-dialog" data-game-complete-dialog aria-hidden="true">
                <div class="game-complete-dialog__card">
                  <strong>真棒，你已经全部拼合完成！</strong>
                  <button class="button" type="button" data-game-complete-confirm>关闭</button>
                </div>
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
  const completeDialog = root.querySelector("[data-game-complete-dialog]");
  const completeConfirmButton = root.querySelector("[data-game-complete-confirm]");
  const artboard = root.querySelector(".puzzle-stage-artboard");
  const qintouGuide = root.querySelector(".puzzle-stage-guide--qintou");
  const qintouGuideImage = qintouGuide?.querySelector("img");
  const qinweiGuide = root.querySelector(".puzzle-stage-guide--qinwei");
  const qinweiGuideImage = qinweiGuide?.querySelector("img");
  const mianbanGuide = root.querySelector(".puzzle-stage-guide--mianban");
  const mianbanGuideImage = mianbanGuide?.querySelector("img");
  const cebanGuide = root.querySelector(".puzzle-stage-guide--ceban");
  const cebanGuideImage = cebanGuide?.querySelector("img");
  const qianyueshanGuide = root.querySelector(".puzzle-stage-guide--qianyueshan");
  const qianyueshanGuideImage = qianyueshanGuide?.querySelector("img");
  const houyueshanGuide = root.querySelector(".puzzle-stage-guide--houyueshan");
  const houyueshanGuideImage = houyueshanGuide?.querySelector("img");
  const yanzhuGuide = root.querySelector(".puzzle-stage-guide--yanzhu");
  const yanzhuGuideImage = yanzhuGuide?.querySelector("img");
  const qinxianGuide = root.querySelector(".puzzle-stage-guide--qinxian");
  const qinxianGuideImage = qinxianGuide?.querySelector("img");
  let activePiece = null;
  let qintouHitTest = null;
  let qinweiHitTest = null;
  let mianbanHitTest = null;
  let cebanHitTest = null;
  let qianyueshanHitTest = null;
  let houyueshanHitTest = null;
  let yanzhuHitTest = null;
  let qinxianHitTest = null;
  const snapTolerance = {
    qintou: 28,
    qinwei: 28,
    mianban: 20,
    ceban: 20,
    qianyueshan: 30,
    houyueshan: 30,
    yanzhu: 28,
    qinxian: 22
  };

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

  const createBufferedHitTest = ({ imageElement, canvas, context, matcher, tolerance = 0 }) => {
    return (clientX, clientY) => {
      const containedRect = getContainedImageRect(imageElement);
      if (!containedRect) {
        return false;
      }

      const relativeX = (clientX - containedRect.left) / containedRect.width;
      const relativeY = (clientY - containedRect.top) / containedRect.height;
      if (relativeX < 0 || relativeX > 1 || relativeY < 0 || relativeY > 1) {
        return false;
      }

      const centerX = Math.max(0, Math.min(canvas.width - 1, Math.round(relativeX * (canvas.width - 1))));
      const centerY = Math.max(0, Math.min(canvas.height - 1, Math.round(relativeY * (canvas.height - 1))));

      if (tolerance <= 0) {
        const pixel = context.getImageData(centerX, centerY, 1, 1).data;
        return matcher(pixel);
      }

      for (let offsetY = -tolerance; offsetY <= tolerance; offsetY += 1) {
        const pixelY = centerY + offsetY;
        if (pixelY < 0 || pixelY >= canvas.height) {
          continue;
        }

        for (let offsetX = -tolerance; offsetX <= tolerance; offsetX += 1) {
          if (offsetX * offsetX + offsetY * offsetY > tolerance * tolerance) {
            continue;
          }

          const pixelX = centerX + offsetX;
          if (pixelX < 0 || pixelX >= canvas.width) {
            continue;
          }

          const pixel = context.getImageData(pixelX, pixelY, 1, 1).data;
          if (matcher(pixel)) {
            return true;
          }
        }
      }

      return false;
    };
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

    if (pieceId === "qinwei") {
      qinweiGuide?.classList.add("is-filled");
      qinweiGuide?.classList.remove("is-active");
    }

    if (pieceId === "qianyueshan") {
      qianyueshanGuide?.classList.add("is-filled");
      qianyueshanGuide?.classList.remove("is-active");
    }

    if (pieceId === "houyueshan") {
      houyueshanGuide?.classList.add("is-filled");
      houyueshanGuide?.classList.remove("is-active");
    }

    if (pieceId === "yanzhu") {
      yanzhuGuide?.classList.add("is-filled");
      yanzhuGuide?.classList.remove("is-active");
      root.querySelector('[data-outline-part="yanzhu"]')?.classList.add("is-filled");
    }

    if (pieceId === "qinxian") {
      qinxianGuide?.classList.add("is-filled");
      qinxianGuide?.classList.remove("is-active");
      root.querySelector('[data-outline-part="qinxian"]')?.classList.add("is-filled");
    }

    const placedCount = pieceButtons.filter((item) => item.hasAttribute("disabled")).length;
    if (placedCount === pieceOrder.length) {
      completeDialog?.classList.add("is-open");
      completeDialog?.setAttribute("aria-hidden", "false");
    }
  };

  const clearDropState = () => {
    zones.forEach((zone) => zone.classList.remove("is-active"));
    qintouGuide?.classList.remove("is-active");
    qinweiGuide?.classList.remove("is-active");
    mianbanGuide?.classList.remove("is-active");
    cebanGuide?.classList.remove("is-active");
    qianyueshanGuide?.classList.remove("is-active");
    houyueshanGuide?.classList.remove("is-active");
    yanzhuGuide?.classList.remove("is-active");
    qinxianGuide?.classList.remove("is-active");
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

    qintouHitTest = createBufferedHitTest({
      imageElement: qintouGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.qintou,
      matcher: (pixel) => pixel[3] > 180 && pixel[0] > 180 && pixel[1] < 80 && pixel[2] < 80
    });
  };

  const setupQinweiHitTest = () => {
    if (!qinweiGuideImage || qinweiHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = qinweiGuideImage.naturalWidth || 1920;
    canvas.height = qinweiGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(qinweiGuideImage, 0, 0, canvas.width, canvas.height);

    qinweiHitTest = createBufferedHitTest({
      imageElement: qinweiGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.qinwei,
      matcher: (pixel) => pixel[3] > 180
    });
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

    mianbanHitTest = createBufferedHitTest({
      imageElement: mianbanGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.mianban,
      matcher: (pixel) => pixel[3] > 180 && pixel[2] > 180 && pixel[0] < 90 && pixel[1] < 90
    });
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

    cebanHitTest = createBufferedHitTest({
      imageElement: cebanGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.ceban,
      matcher: (pixel) => pixel[3] > 180 && pixel[0] > 200 && pixel[1] > 60 && pixel[1] < 170 && pixel[2] < 80
    });
  };

  const setupQianyueshanHitTest = () => {
    if (!qianyueshanGuideImage || qianyueshanHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = qianyueshanGuideImage.naturalWidth || 1920;
    canvas.height = qianyueshanGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(qianyueshanGuideImage, 0, 0, canvas.width, canvas.height);

    qianyueshanHitTest = createBufferedHitTest({
      imageElement: qianyueshanGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.qianyueshan,
      matcher: (pixel) => pixel[3] > 180
    });
  };

  const setupHouyueshanHitTest = () => {
    if (!houyueshanGuideImage || houyueshanHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = houyueshanGuideImage.naturalWidth || 1920;
    canvas.height = houyueshanGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(houyueshanGuideImage, 0, 0, canvas.width, canvas.height);

    houyueshanHitTest = createBufferedHitTest({
      imageElement: houyueshanGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.houyueshan,
      matcher: (pixel) => pixel[3] > 180
    });
  };

  const setupYanzhuHitTest = () => {
    if (!yanzhuGuideImage || yanzhuHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = yanzhuGuideImage.naturalWidth || 1920;
    canvas.height = yanzhuGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(yanzhuGuideImage, 0, 0, canvas.width, canvas.height);

    yanzhuHitTest = createBufferedHitTest({
      imageElement: yanzhuGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.yanzhu,
      matcher: (pixel) => pixel[3] > 180
    });
  };

  const setupQinxianHitTest = () => {
    if (!qinxianGuideImage || qinxianHitTest) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = qinxianGuideImage.naturalWidth || 1920;
    canvas.height = qinxianGuideImage.naturalHeight || 1080;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(qinxianGuideImage, 0, 0, canvas.width, canvas.height);

    qinxianHitTest = createBufferedHitTest({
      imageElement: qinxianGuideImage,
      canvas,
      context,
      tolerance: snapTolerance.qinxian,
      matcher: (pixel) => pixel[3] > 180
    });
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

  if (qinweiGuideImage?.complete) {
    setupQinweiHitTest();
  } else {
    qinweiGuideImage?.addEventListener("load", setupQinweiHitTest, { once: true });
  }

  if (mianbanGuideImage?.complete) {
    setupMianbanHitTest();
  } else {
    mianbanGuideImage?.addEventListener("load", setupMianbanHitTest, { once: true });
  }

  if (qianyueshanGuideImage?.complete) {
    setupQianyueshanHitTest();
  } else {
    qianyueshanGuideImage?.addEventListener("load", setupQianyueshanHitTest, { once: true });
  }

  if (houyueshanGuideImage?.complete) {
    setupHouyueshanHitTest();
  } else {
    houyueshanGuideImage?.addEventListener("load", setupHouyueshanHitTest, { once: true });
  }

  if (yanzhuGuideImage?.complete) {
    setupYanzhuHitTest();
  } else {
    yanzhuGuideImage?.addEventListener("load", setupYanzhuHitTest, { once: true });
  }

  if (qinxianGuideImage?.complete) {
    setupQinxianHitTest();
  } else {
    qinxianGuideImage?.addEventListener("load", setupQinxianHitTest, { once: true });
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

    if (hoveredPiece === "qinwei") {
      const qinweiButton = root.querySelector('.puzzle-piece-button[data-piece="qinwei"]');
      if (qinweiButton?.hasAttribute("disabled")) {
        return;
      }

      if (!qinweiHitTest?.(event.clientX, event.clientY)) {
        qinweiGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        qinweiGuide?.classList.add("is-active");
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

    if (hoveredPiece === "qianyueshan") {
      const qianyueshanButton = root.querySelector('.puzzle-piece-button[data-piece="qianyueshan"]');
      if (qianyueshanButton?.hasAttribute("disabled")) {
        return;
      }

      if (!qianyueshanHitTest?.(event.clientX, event.clientY)) {
        qianyueshanGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        qianyueshanGuide?.classList.add("is-active");
      }
    }

    if (hoveredPiece === "houyueshan") {
      const houyueshanButton = root.querySelector('.puzzle-piece-button[data-piece="houyueshan"]');
      if (houyueshanButton?.hasAttribute("disabled")) {
        return;
      }

      if (!houyueshanHitTest?.(event.clientX, event.clientY)) {
        houyueshanGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        houyueshanGuide?.classList.add("is-active");
      }
    }

    if (hoveredPiece === "yanzhu") {
      const yanzhuButton = root.querySelector('.puzzle-piece-button[data-piece="yanzhu"]');
      if (yanzhuButton?.hasAttribute("disabled")) {
        return;
      }

      if (!yanzhuHitTest?.(event.clientX, event.clientY)) {
        yanzhuGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        yanzhuGuide?.classList.add("is-active");
      }
    }

    if (hoveredPiece === "qinxian") {
      const qinxianButton = root.querySelector('.puzzle-piece-button[data-piece="qinxian"]');
      if (qinxianButton?.hasAttribute("disabled")) {
        return;
      }

      if (!qinxianHitTest?.(event.clientX, event.clientY)) {
        qinxianGuide?.classList.remove("is-active");
      } else {
        event.preventDefault();
        qinxianGuide?.classList.add("is-active");
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

    if (droppedPiece === "qinwei") {
      event.preventDefault();
      qinweiGuide?.classList.remove("is-active");
      if (!qinweiHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("qinwei");
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

    if (droppedPiece === "qianyueshan") {
      event.preventDefault();
      qianyueshanGuide?.classList.remove("is-active");
      if (!qianyueshanHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("qianyueshan");
      activePiece = null;
      return;
    }

    if (droppedPiece === "houyueshan") {
      event.preventDefault();
      houyueshanGuide?.classList.remove("is-active");
      if (!houyueshanHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("houyueshan");
      activePiece = null;
      return;
    }

    if (droppedPiece === "yanzhu") {
      event.preventDefault();
      yanzhuGuide?.classList.remove("is-active");
      if (!yanzhuHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("yanzhu");
      activePiece = null;
      return;
    }

    if (droppedPiece === "qinxian") {
      event.preventDefault();
      qinxianGuide?.classList.remove("is-active");
      if (!qinxianHitTest?.(event.clientX, event.clientY)) {
        return;
      }

      placePiece("qinxian");
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

  completeConfirmButton?.addEventListener("click", () => {
    completeDialog?.classList.remove("is-open");
    completeDialog?.setAttribute("aria-hidden", "true");
  });
}
