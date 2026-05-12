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
      activeHotspot: "qintou",
      activeExplodeStep: 0,
    },
  },
};

const navRoot = document.getElementById("sidebar-nav");
const contentRoot = document.getElementById("workspace-content");
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
  overlayRoot.classList.remove("is-open");
  overlayRoot.setAttribute("aria-hidden", "true");
  overlayRoot.innerHTML = "";
}

function openOverlay(markup, binder) {
  overlayRoot.innerHTML = markup;
  overlayRoot.classList.add("is-open");
  overlayRoot.setAttribute("aria-hidden", "false");

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
  const header = activeModule.header;

  headerEyebrow.textContent = header.eyebrow || "课堂工作台";
  headerTitle.textContent = header.title || activeModule.title;
  headerSummary.textContent = header.summary || activeModule.summary || "";

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
  updateSidebar();
  updateHeader();
  renderContent();
}

overlayRoot.addEventListener("click", (event) => {
  if (event.target === overlayRoot) {
    closeOverlay();
  }
});

returnLoginButton?.addEventListener("click", () => {
  redirectToLogin();
});

renderApp();
