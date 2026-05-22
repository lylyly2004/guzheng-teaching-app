import { renderSidebar } from "./components/sidebar.js";
import { defaultModuleId, moduleList, modulesById } from "./modules/index.js";

const AUTH_KEY = "guzheng-app-auth";
const AUTH_VALUE = "ok";

if (sessionStorage.getItem(AUTH_KEY) !== AUTH_VALUE) {
  window.location.href = "./index.html";
}

const state = {
  activeModuleId: defaultModuleId,
  modules: {
    structure: {
      activeHotspot: null,
      activeExplodeCraft: "traditional",
      explodeExpanded: false,
    },
  },
};

const navRoot = document.getElementById("sidebar-nav");
const contentRoot = document.getElementById("workspace-content");
const workspaceMain = document.querySelector(".workspace-main");
const headerEyebrow = document.getElementById("header-eyebrow");
const headerTitle = document.getElementById("header-title");
const headerSummary = document.getElementById("header-summary");
const headerActions = document.getElementById("header-actions");
const overlayRoot = document.getElementById("fullscreen-overlay");
const returnLoginButton = document.getElementById("return-login");

function getActiveModule() {
  return modulesById[state.activeModuleId];
}

function redirectToLogin() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.href = "./index.html";
}

function setActiveModule(moduleId) {
  if (!modulesById[moduleId]) {
    return;
  }

  state.activeModuleId = moduleId;
  renderApp();
}

function closeOverlay() {
  if (state.modules?.structure) {
    state.modules.structure.activeHotspot = null;
    state.modules.structure.explodeExpanded = false;
  }
  overlayRoot.classList.remove("is-open");
  overlayRoot.setAttribute("aria-hidden", "true");
  delete overlayRoot.dataset.locked;
  overlayRoot.innerHTML = "";
}

function openOverlay(markup, binder) {
  overlayRoot.innerHTML = markup;
  overlayRoot.classList.add("is-open");
  overlayRoot.setAttribute("aria-hidden", "false");
  overlayRoot.dataset.locked = overlayRoot.querySelector("[data-overlay-lock='true']") ? "true" : "false";

  if (binder) {
    binder({
      root: overlayRoot,
      state,
      closeOverlay,
      switchModule: setActiveModule,
    });
  }
}

function updateHeader() {
  const activeModule = getActiveModule();
  const header = activeModule.header || {};
  const eyebrow = header.eyebrow || "";
  const summary = header.summary || activeModule.summary || "";

  headerEyebrow.textContent = eyebrow;
  headerEyebrow.hidden = !eyebrow;

  headerTitle.textContent = header.title || activeModule.title;

  headerSummary.textContent = summary;
  headerSummary.hidden = !summary;

  headerActions.innerHTML =
    state.activeModuleId === defaultModuleId
      ? ""
      : '<button class="button button--ghost" id="header-back-dashboard">返回上一级</button>';

  const backButton = headerActions.querySelector("#header-back-dashboard");
  if (backButton) {
    backButton.addEventListener("click", () => {
      setActiveModule(defaultModuleId);
    });
  }

  if (typeof activeModule.renderHeaderActions === "function") {
    activeModule.renderHeaderActions({
      root: headerActions,
      state,
      openOverlay,
      closeOverlay,
      switchModule: setActiveModule,
    });
  }
}

function updateSidebar() {
  navRoot.innerHTML = renderSidebar(moduleList, state.activeModuleId);
  navRoot.querySelectorAll(".sidebar-item").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveModule(button.dataset.moduleId);
    });
  });
}

function renderContent() {
  const activeModule = getActiveModule();
  contentRoot.innerHTML = activeModule.render(state);

  if (typeof activeModule.bind === "function") {
    activeModule.bind({
      root: contentRoot,
      state,
      openOverlay,
      closeOverlay,
      switchModule: setActiveModule,
      rerender: renderApp,
    });
  }
}

function renderApp() {
  if (workspaceMain) {
    workspaceMain.dataset.activeModule = state.activeModuleId;
  }
  updateSidebar();
  updateHeader();
  renderContent();
}

overlayRoot.addEventListener("click", (event) => {
  if (overlayRoot.dataset.locked === "true") {
    return;
  }

  if (event.target === overlayRoot) {
    closeOverlay();
  }
});

returnLoginButton?.addEventListener("click", () => {
  redirectToLogin();
});

renderApp();
