export function renderSidebar(modules, activeModuleId) {
  return modules
    .map(
      (module) => `
        <button class="sidebar-item${module.id === activeModuleId ? " is-active" : ""}" data-module-id="${module.id}">
          <span class="sidebar-item__title">${module.title}</span>
        </button>
      `
    )
    .join("");
}
