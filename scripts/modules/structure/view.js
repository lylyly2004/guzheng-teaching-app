import { explodeCraftData, explodeCraftOrder, hotspotData, hotspotOrder } from "./data.js";

function renderHotspotButtons(activeHotspot) {
  return hotspotOrder
    .map((part) => {
      const label = hotspotData[part].title;
      return `<button class="hotspot-button${part === activeHotspot ? " is-active" : ""}" data-part="${part}"><span class="hotspot-button__label">${label}</span></button>`;
    })
    .join("");
}

function renderHotspotRegions(activeHotspot) {
  return `
    <div class="hotspot-overlay" aria-hidden="true">
      <img class="hotspot-region-image${activeHotspot === "qintou" ? " is-active" : ""}" data-part="qintou" src="./assets/images/hotspot-qintou.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "qinwei" ? " is-active" : ""}" data-part="qinwei" src="./assets/images/hotspot-qinwei.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "ceban" ? " is-active" : ""}" data-part="ceban" src="./assets/images/hotspot-ceban.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "houyueshan" ? " is-active" : ""}" data-part="houyueshan" src="./assets/images/hotspot-houyueshan.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "mianban" ? " is-active" : ""}" data-part="mianban" src="./assets/images/hotspot-mianban.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "qinxian" ? " is-active" : ""}" data-part="qinxian" src="./assets/images/hotspot-qinxian.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "yanzhu" ? " is-active" : ""}" data-part="yanzhu" src="./assets/images/hotspot-yanzhu.png" alt="" />
      <img class="hotspot-region-image${activeHotspot === "qianyueshan" ? " is-active" : ""}" data-part="qianyueshan" src="./assets/images/hotspot-qianyueshan.png" alt="" />
      <svg class="hotspot-overlay__svg" viewBox="0 0 1920 1080" aria-hidden="true"></svg>
    </div>
  `;
}

function renderHotspotLinks(activeHotspot) {
  return hotspotOrder
    .map((part) => `<span class="hotspot-link${activeHotspot === part ? " is-active" : ""}" data-part="${part}"></span>`)
    .join("");
}

function renderCraftButtons(activeCraft) {
  return explodeCraftOrder
    .map((craftId) => {
      const craft = explodeCraftData[craftId];
      return `
        <button class="craft-button${craftId === activeCraft ? " is-active" : ""}" data-craft-id="${craftId}">
          <span class="craft-button__title">${craft.title}</span>
          <span class="craft-button__meta">${craft.eyebrow}</span>
        </button>
      `;
    })
    .join("");
}

function renderExplodedPieces(craft, explodeExpanded) {
  if (craft.explodedPieces?.length) {
    return craft.explodedPieces
      .map(
        (piece, index) => `
          <figure
            class="craft-piece-image${explodeExpanded ? " is-exploded" : ""}"
            data-piece-id="${piece.id}"
            style="--enter-x:${piece.enterX || "0px"}; --enter-y:${piece.enterY || "0px"}; --piece-z:${piece.z || 1}; --piece-delay:${index * 46}ms;"
            aria-label="${piece.label}"
          >
            <img src="${piece.src}" alt="${piece.label}" />
          </figure>
        `,
      )
      .join("");
  }

  if (craft.explodedLayoutImage) {
    return `
      <figure class="craft-exploded-layout${explodeExpanded ? " is-exploded" : ""}" aria-label="${craft.title}拆解结构图">
        <img src="${craft.explodedLayoutImage}" alt="${craft.title}拆解结构图" />
      </figure>
    `;
  }

  return (craft.parts || [])
    .map((part, index) => {
      const offsetX = explodeExpanded ? (index % 4) * 150 - 210 : 0;
      const offsetY = explodeExpanded ? Math.floor(index / 4) * 118 - 70 : 0;
      return `<div class="craft-piece${explodeExpanded ? " is-exploded" : ""}" style="--tx:${offsetX}px; --ty:${offsetY}px;">${part}</div>`;
    })
    .join("");
}

function renderCraftAssembly(activeCraft, explodeExpanded) {
  const craft = explodeCraftData[activeCraft];
  const piecesMarkup = renderExplodedPieces(craft, explodeExpanded);

  const wholeMarkup = craft.wholeImage
    ? `<img class="craft-whole-zither__image" src="${craft.wholeImage}" alt="${craft.title}完整示意图" />`
    : `<div class="craft-whole-zither__placeholder">${craft.title}完整示意图</div>`;

  return `
    <div class="craft-workbench">
      <div class="craft-workbench__stage-row">
        <div class="craft-workbench__canvas${explodeExpanded ? " is-exploded" : ""}">
          <div class="craft-workbench__actions">
            <button class="button button--primary" id="toggle-craft-explode">${explodeExpanded ? "恢复整体" : "开始拆解"}</button>
          </div>
          <div class="craft-stage-viewport">
            <div class="craft-stage-artboard" style="--artboard-ratio:${craft.artboardRatio || "41 / 100"};">
              <div class="craft-whole-zither">${wholeMarkup}</div>
              <div class="craft-pieces">${piecesMarkup}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderStructureView() {
  return `
    <div class="module-layout">
      <section class="module-panel structure-entry-card structure-entry-card--hotspot">
        <div class="module-panel__head">
          <h3>结构讲解</h3>
        </div>
        <p class="module-note">查看古筝各部位结构和名称。</p>
        <div class="structure-entry-visual" aria-hidden="true">
          <span class="structure-entry-visual__badge">部位热区</span>
          <span class="structure-entry-visual__line structure-entry-visual__line--long"></span>
          <span class="structure-entry-visual__line structure-entry-visual__line--mid"></span>
          <span class="structure-entry-visual__dot structure-entry-visual__dot--a"></span>
          <span class="structure-entry-visual__dot structure-entry-visual__dot--b"></span>
          <span class="structure-entry-visual__dot structure-entry-visual__dot--c"></span>
        </div>
        <button class="button button--primary" id="open-structure-hotspot">进入结构讲解</button>
      </section>

      <section class="module-panel structure-entry-card structure-entry-card--explode">
        <div class="module-panel__head">
          <h3>拆解演示</h3>
        </div>
        <p class="module-note">从传统工艺、半挖筝、挖筝三个方向认识古筝由哪些部件拼合而成。</p>
        <div class="structure-entry-visual" aria-hidden="true">
          <span class="structure-entry-visual__badge">工艺演示</span>
          <span class="structure-entry-visual__stack structure-entry-visual__stack--top"></span>
          <span class="structure-entry-visual__stack structure-entry-visual__stack--mid"></span>
          <span class="structure-entry-visual__stack structure-entry-visual__stack--base"></span>
        </div>
        <button class="button button--primary" id="open-structure-explode">进入拆解演示</button>
      </section>

      <section class="module-panel structure-entry-card structure-entry-card--game">
        <div class="module-panel__head">
          <h3>互动拼合游戏</h3>
        </div>
        <p class="module-note">通过拖拽部件完成整琴拼合。</p>
        <div class="structure-entry-visual" aria-hidden="true">
          <span class="structure-entry-visual__badge">拼合练习</span>
          <span class="structure-entry-visual__outline"></span>
          <span class="structure-entry-visual__piece structure-entry-visual__piece--left"></span>
          <span class="structure-entry-visual__piece structure-entry-visual__piece--mid"></span>
          <span class="structure-entry-visual__piece structure-entry-visual__piece--right"></span>
        </div>
        <button class="button button--primary structure-game-entry" id="open-structure-game">进入互动拼合游戏</button>
      </section>
    </div>
  `;
}

export function createStructureHotspotMarkup(activeHotspot) {
  const activePart = activeHotspot ? hotspotData[activeHotspot] : null;

  return `
    <div class="fullscreen-panel" data-overlay-lock="true">
      <div class="fullscreen-content">
        <aside class="fullscreen-side">
          <div class="fullscreen-side__eyebrow">当前部位</div>
          <div class="module-sidecard__head">
            <h3 id="structure-side-title">${activePart?.title || ""}</h3>
            <button class="button button--ghost" id="close-structure-hotspot">关闭</button>
          </div>
          <p id="structure-side-description">${activePart?.description || ""}</p>
          <ul class="support-list" id="structure-side-points">
            ${(activePart?.points || []).map((point) => `<li>${point}</li>`).join("")}
          </ul>
          <div class="structure-side-summary">
            <span class="status-badge">结构讲解</span>
            <span class="status-badge">部位识别</span>
          </div>
        </aside>

        <section class="fullscreen-stage">
          <div class="module-panel__head">
            <h3>结构讲解</h3>
          </div>
          <div class="fullscreen-stage__eyebrow">点击名称框，查看古筝对应部位的结构名称与讲解内容。</div>
          <div class="hotspot-stage hotspot-stage--fullscreen">
            <div class="hotspot-zither">
              <div class="hotspot-figure is-mirrored">
                <img class="hotspot-image" src="./assets/images/structure-guzheng.png" alt="古筝结构图" />
                ${renderHotspotRegions(activeHotspot)}
                ${renderHotspotLinks(activeHotspot)}
                ${renderHotspotButtons(activeHotspot)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function createStructureExplodeMarkup(activeCraft, explodeExpanded) {
  return `
    <div class="fullscreen-panel" data-overlay-lock="true">
      <div class="fullscreen-content fullscreen-content--explode">
        <aside class="fullscreen-side">
          <div class="fullscreen-side__eyebrow">工艺列表</div>
          <div class="module-sidecard__head">
            <h3>古筝制作工艺</h3>
            <button class="button button--ghost" id="close-structure-explode">关闭</button>
          </div>
          <div class="craft-list">
            ${renderCraftButtons(activeCraft)}
          </div>
        </aside>

        <section class="fullscreen-stage fullscreen-stage--explode-clean">
          <div class="explode-stage explode-stage--fullscreen explode-stage--craft">
            ${renderCraftAssembly(activeCraft, explodeExpanded)}
          </div>
        </section>
      </div>
    </div>
  `;
}
