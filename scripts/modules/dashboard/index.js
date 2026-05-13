const quickModules = [
  {
    id: "structure",
    title: "古筝结构认知",
  },
  {
    id: "culture",
    title: "古筝文化与由来",
  },
  {
    id: "posture",
    title: "坐姿与手型",
  },
  {
    id: "playing",
    title: "基础弹奏动作",
  },
  {
    id: "rhythm",
    title: "节奏跟练",
  },
  {
    id: "song",
    title: "小曲目练习",
  },
  {
    id: "games",
    title: "课堂互动游戏",
  },
  {
    id: "teacher-tools",
    title: "教学辅助工具",
  },
];

export const dashboardModule = {
  id: "dashboard",
  title: "教学主控台",
  summary: "",
  priority: "入口",
  header: {
    eyebrow: "课堂工作台",
    title: "教学主控台",
    summary: "",
  },
  render() {
    return `
      <section class="dashboard-hero">
        <div class="dashboard-hero__content">
          <h3>教学模块</h3>
          <div class="dashboard-hero__actions action-row">
            <button class="button button--primary dashboard-enter" data-module-id="structure">进入古筝结构认知</button>
          </div>
        </div>
        <div class="dashboard-hero__stats">
          <article class="dashboard-stat">
            <strong>${quickModules.length}</strong>
            <span>功能模块</span>
          </article>
        </div>
      </section>

      <section class="dashboard-main dashboard-main--full">
        <div class="dashboard-section__head">
          <h3>功能模块</h3>
        </div>
        <div class="dashboard-module-list dashboard-module-list--grid">
          ${quickModules
            .map(
              (module) => `
                <article class="dashboard-module-card dashboard-module-card--simple">
                  <div class="dashboard-module-card__header">
                    <h4>${module.title}</h4>
                  </div>
                  <div class="action-row">
                    <button class="button button--ghost dashboard-enter" data-module-id="${module.id}">
                      打开模块
                    </button>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  },
  bind({ root, switchModule }) {
    root.querySelectorAll(".dashboard-enter").forEach((button) => {
      button.addEventListener("click", () => {
        switchModule(button.dataset.moduleId);
      });
    });
  },
};
