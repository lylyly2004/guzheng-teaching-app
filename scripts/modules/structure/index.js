import { explodeCraftData, hotspotData } from "./data.js";
import { createStructureGameMarkup, bindStructureGame } from "./game.js";
import { createStructureExplodeMarkup, createStructureHotspotMarkup, renderStructureView } from "./view.js";

const hotspotGuideAnchors = {
  houyueshan: { bx: 0.5, by: 1, tx: 0.764, ty: 0.455 },
  qinxian: { bx: 0.5, by: 1, tx: 0.487, ty: 0.306 },
  yanzhu: { bx: 0.5, by: 1, tx: 0.369, ty: 0.352 },
  qianyueshan: { bx: 0.5, by: 1, tx: 0.158, ty: 0.43 },
  qinwei: { bx: 0.5, by: 0, tx: 0.878, ty: 0.462 },
  ceban: { bx: 0.5, by: 0, tx: 0.484, ty: 0.548 },
  mianban: { bx: 0.5, by: 0, tx: 0.62, ty: 0.467 },
  qintou: { bx: 0.5, by: 0, tx: 0.146, ty: 0.403 },
};

export const structureModule = {
  id: "structure",
  title: "古筝结构认知",
  summary: "",
  priority: "高",
  header: {
    eyebrow: "结构认知",
    title: "古筝结构认知",
    summary: "",
  },
  render(state) {
    return renderStructureView(state.modules.structure);
  },
  bind({ root, state, openOverlay }) {
    root.querySelector("#open-structure-hotspot")?.addEventListener("click", () => {
      state.modules.structure.activeHotspot = null;
      openOverlay(createStructureHotspotMarkup(state.modules.structure.activeHotspot), ({ root: overlayRoot, closeOverlay }) => {
        bindStructureHotspotOverlay(overlayRoot, state);
        overlayRoot.querySelector("#close-structure-hotspot")?.addEventListener("click", closeOverlay);
      });
    });

    root.querySelector("#open-structure-explode")?.addEventListener("click", () => {
      openOverlay(createStructureExplodeMarkup(state.modules.structure.activeExplodeCraft, state.modules.structure.explodeExpanded), ({ root: overlayRoot, closeOverlay }) => {
        bindStructureExplodeOverlay(overlayRoot, state, closeOverlay);
      });
    });

    root.querySelector("#open-structure-game")?.addEventListener("click", () => {
      openOverlay(createStructureGameMarkup(), bindStructureGame);
    });
  },
};

function updateHotspotInfo(root, activeHotspot) {
  const data = hotspotData[activeHotspot];
  root.querySelector("#structure-side-title").textContent = data?.title || "";
  root.querySelector("#structure-side-description").textContent = data?.description || "";
  root.querySelector("#structure-side-points").innerHTML = (data?.points || []).map((point) => `<li>${point}</li>`).join("");

  root.querySelectorAll(".hotspot-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.part === activeHotspot);
  });

  root.querySelectorAll(".hotspot-region-image").forEach((region) => {
    const isActive = region.dataset.part === activeHotspot;
    region.classList.toggle("is-active", isActive);
    region.style.display = isActive ? "block" : "none";
    region.style.opacity = isActive ? "0.6" : "0";
  });

  root.querySelectorAll(".hotspot-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.part === activeHotspot);
  });

  alignHotspotLinks(root);
}

function alignHotspotLinks(root) {
  const figure = root.querySelector(".hotspot-figure");
  if (!figure) {
    return;
  }
  const isMirrored = figure.classList.contains("is-mirrored");
  const figureRect = figure.getBoundingClientRect();
  if (!figureRect.width || !figureRect.height) {
    return;
  }

  root.querySelectorAll(".hotspot-link").forEach((link) => {
    const part = link.dataset.part;
    const guide = hotspotGuideAnchors[part];
    const button = root.querySelector(`.hotspot-button[data-part="${part}"]`);
    if (!guide || !button) {
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width * guide.bx - figureRect.left;
    const startY = buttonRect.top + buttonRect.height * guide.by - figureRect.top;
    const normalizedStartX = isMirrored ? figureRect.width - startX : startX;
    const endX = figureRect.width * guide.tx;
    const endY = figureRect.height * guide.ty;
    const dx = endX - normalizedStartX;
    const dy = endY - startY;
    const width = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    link.style.setProperty("--x", `${normalizedStartX}px`);
    link.style.setProperty("--y", `${startY}px`);
    link.style.setProperty("--w", `${width}px`);
    link.style.setProperty("--angle", `${angle}deg`);
  });
}

function rerenderExplodeOverlay(root, state, closeOverlay) {
  root.innerHTML = createStructureExplodeMarkup(state.modules.structure.activeExplodeCraft, state.modules.structure.explodeExpanded);
  bindStructureExplodeOverlay(root, state, closeOverlay);
}

function bindStructureHotspotOverlay(root, state) {
  root.querySelectorAll(".hotspot-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.modules.structure.activeHotspot = button.dataset.part;
      updateHotspotInfo(root, state.modules.structure.activeHotspot);
    });
  });

  updateHotspotInfo(root, state.modules.structure.activeHotspot);
  window.requestAnimationFrame(() => alignHotspotLinks(root));
}

function bindStructureExplodeOverlay(root, state, closeOverlay) {
  root.querySelector("#close-structure-explode")?.addEventListener("click", closeOverlay);

  root.querySelectorAll(".craft-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.modules.structure.activeExplodeCraft = button.dataset.craftId;
      state.modules.structure.explodeExpanded = false;
      rerenderExplodeOverlay(root, state, closeOverlay);
    });
  });

  root.querySelector("#toggle-craft-explode")?.addEventListener("click", () => {
    const canvas = root.querySelector(".craft-workbench__canvas");
    const toggleButton = root.querySelector("#toggle-craft-explode");

    if (!canvas || !toggleButton || toggleButton.disabled) {
      return;
    }

    const expanding = !state.modules.structure.explodeExpanded;
    state.modules.structure.explodeExpanded = expanding;
    toggleButton.disabled = true;

    if (expanding) {
      canvas.classList.remove("is-collapsing");
      canvas.classList.add("is-expanding");
      window.requestAnimationFrame(() => {
        canvas.classList.add("is-exploded");
      });

      window.setTimeout(() => {
        canvas.classList.remove("is-expanding");
        toggleButton.textContent = "恢复整体";
        toggleButton.disabled = false;
      }, 760);
      return;
    }

    canvas.classList.remove("is-expanding");
    canvas.classList.add("is-collapsing");
    canvas.classList.remove("is-exploded");

    window.setTimeout(() => {
      canvas.classList.remove("is-collapsing");
      toggleButton.textContent = "开始拆解";
      toggleButton.disabled = false;
    }, 620);
  });

  const activeCraft = explodeCraftData[state.modules.structure.activeExplodeCraft];
  const descriptionNode = root.querySelector("#explode-description");
  if (descriptionNode && activeCraft?.detail) {
    descriptionNode.textContent = activeCraft.detail;
  }
}
