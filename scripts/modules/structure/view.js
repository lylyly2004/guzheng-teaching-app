import { assembleOrder, explodeSteps, hotspotData } from "./data.js";

function renderHotspotButtons() {
  return assembleOrder
    .map((part) => {
      const label = hotspotData[part].title;
      return `<button class="hotspot-button${part === "qintou" ? " is-active" : ""}" data-part="${part}">${label}</button>`;
    })
    .join("");
}

function renderExplodeButtons(activeIndex) {
  return explodeSteps
    .map(
      (step, index) => `
        <button class="step-button${index === activeIndex ? " is-active" : ""}" data-step-index="${index}">
          ${step.title}
        </button>
      `
    )
    .join("");
}

function renderExplodeParts() {
  return assembleOrder
    .map((part) => `<div class="explode-part part-${part}" data-part="${part}" data-label="${hotspotData[part].title}"></div>`)
    .join("");
}

export function renderStructureView(moduleState) {
  const activePart = hotspotData[moduleState.activeHotspot];
  const activeStep = explodeSteps[moduleState.activeExplodeStep];

  return `
    <div class="subnav">
      <button class="subnav-button is-active">模块说明</button>
      <button class="subnav-button">讲解区</button>
      <button class="subnav-button">拆解演示</button>
      <button class="subnav-button">互动游戏</button>
    </div>

    <div class="module-layout">
      <div class="module-stack">
        <section class="module-panel">
          <h3>模块定位</h3>
          <p>这一模块先解决“认识古筝结构”的核心课堂任务。老师可以先讲整体，再点热点，再看拆解，最后进入全屏互动游戏。</p>
          <div class="action-row">
            <button class="button button--primary" id="open-structure-game">进入全屏互动游戏</button>
          </div>
        </section>

        <section class="module-panel">
          <h3>点击部位讲解</h3>
          <p>右侧信息卡会随着你点击古筝部位而切换。现在先用示意图，后面你给正式素材后，我直接把这块替换进去。</p>
          <div class="hotspot-stage">
            <div class="hotspot-zither">
              <span class="hotspot-body"></span>
              <span class="hotspot-string s1"></span>
              <span class="hotspot-string s2"></span>
              <span class="hotspot-string s3"></span>
              <span class="hotspot-string s4"></span>
              <span class="hotspot-string s5"></span>
              <span class="hotspot-bridge b1"></span>
              <span class="hotspot-bridge b2"></span>
              <span class="hotspot-bridge b3"></span>
              ${renderHotspotButtons()}
            </div>
          </div>
        </section>

        <section class="module-panel">
          <h3>分步拆解演示</h3>
          <p>这部分先用按钮控制拆解顺序，后续正式接 PNG 分层图后，可以平滑升级成真实拆解动画。</p>
          <div class="explode-stage">
            <div class="step-list">
              ${renderExplodeButtons(moduleState.activeExplodeStep)}
            </div>
            <div class="explode-view">
              ${renderExplodeParts()}
            </div>
          </div>
          <p id="explode-description" class="support-list">${activeStep.description}</p>
        </section>
      </div>

      <aside class="module-sidecard">
        <h3 id="structure-side-title">${activePart.title}</h3>
        <p id="structure-side-description">${activePart.description}</p>
        <ul class="support-list" id="structure-side-points">
          ${activePart.points.map((point) => `<li>${point}</li>`).join("")}
        </ul>
        <div class="action-stack">
          <button class="sidebar-action is-active">结构讲解</button>
          <button class="sidebar-action">拆解演示</button>
          <button class="sidebar-action" id="open-structure-game-alt">互动游戏</button>
        </div>
      </aside>
    </div>
  `;
}
