import { explodeSteps, hotspotData } from "./data.js";
import { createStructureGameMarkup, bindStructureGame } from "./game.js";
import { renderStructureView } from "./view.js";

export const structureModule = {
  id: "structure",
  title: "古筝结构认知",
  summary: "整琴认知、部位讲解、拆解演示、互动拼合。",
  priority: "高",
  header: {
    eyebrow: "Structure Module",
    title: "古筝结构认知",
    summary: "先看整体，再做热点讲解、拆解演示，最后进入全屏互动游戏。",
  },
  render(state) {
    return renderStructureView(state.modules.structure);
  },
  bind({ root, state, openOverlay }) {
    root.querySelectorAll(".hotspot-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.modules.structure.activeHotspot = button.dataset.part;
        updateHotspotInfo(root, state.modules.structure.activeHotspot);
      });
    });

    root.querySelectorAll(".step-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.modules.structure.activeExplodeStep = Number(button.dataset.stepIndex);
        updateExplodeStage(root, state.modules.structure.activeExplodeStep);
      });
    });

    root.querySelectorAll("#open-structure-game, #open-structure-game-alt").forEach((button) => {
      button.addEventListener("click", () => {
        openOverlay(createStructureGameMarkup(), bindStructureGame);
      });
    });

    updateHotspotInfo(root, state.modules.structure.activeHotspot);
    updateExplodeStage(root, state.modules.structure.activeExplodeStep);
  },
  renderHeaderActions({ root, openOverlay }) {
    root.insertAdjacentHTML("beforeend", `<button class="button button--primary" id="header-open-game">进入互动游戏</button>`);
    root.querySelector("#header-open-game").addEventListener("click", () => {
      openOverlay(createStructureGameMarkup(), bindStructureGame);
    });
  },
};

function updateHotspotInfo(root, activeHotspot) {
  const data = hotspotData[activeHotspot];
  root.querySelector("#structure-side-title").textContent = data.title;
  root.querySelector("#structure-side-description").textContent = data.description;
  root.querySelector("#structure-side-points").innerHTML = data.points.map((point) => `<li>${point}</li>`).join("");

  root.querySelectorAll(".hotspot-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.part === activeHotspot);
  });
}

function updateExplodeStage(root, stepIndex) {
  const step = explodeSteps[stepIndex];
  root.querySelector("#explode-description").textContent = step.description;

  root.querySelectorAll(".explode-part").forEach((part) => {
    const key = part.dataset.part;
    part.style.transform = step.transforms[key];
  });

  root.querySelectorAll(".step-button").forEach((button, index) => {
    button.classList.toggle("is-active", index === stepIndex);
  });
}
