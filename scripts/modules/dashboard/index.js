const quickActions = [
  {
    id: "structure",
    title: "古筝结构认知",
    label: "进入主讲模块",
  },
  {
    id: "posture",
    title: "坐姿与手型",
    label: "切换到动作教学",
  },
  {
    id: "games",
    title: "课堂互动游戏",
    label: "打开互动环节",
  },
];

const lessonFlow = [
  "课堂开场与学生进入状态",
  "结构认知与部位讲解",
  "手型或弹奏内容衔接",
  "互动练习与课堂收束",
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
      <section class="dashboard-hero dashboard-hero--overview">
        <div class="dashboard-hero__content">
          <p class="dashboard-hero__eyebrow">教学总览</p>
          <h3>把今天这节课的讲解、演示和互动收在同一个工作台里</h3>
          <p>左侧负责切换模块，右侧负责当前课堂内容和操作。先从结构认知开始，再按课堂状态切换到手型、弹奏或互动环节。</p>
          <div class="dashboard-hero__actions action-row">
            <button class="button button--primary dashboard-enter" data-module-id="structure">进入古筝结构认知</button>
          </div>
        </div>
        <div class="dashboard-hero__stats">
          <article class="dashboard-stat">
            <strong>1</strong>
            <span>当前主讲模块</span>
          </article>
          <article class="dashboard-stat">
            <strong>4</strong>
            <span>课堂建议步骤</span>
          </article>
          <article class="dashboard-stat">
            <strong>3</strong>
            <span>常用快捷操作</span>
          </article>
        </div>
      </section>

      <div class="view-grid view-grid--dashboard">
        <section class="dashboard-main">
          <div class="dashboard-section__head">
            <div>
              <h3>今日课堂安排</h3>
              <p>先完成主讲内容，再根据现场节奏切换到下一个教学环节。</p>
            </div>
            <span class="sub-badge">课堂流程</span>
          </div>

          <div class="dashboard-overview-list">
            <article class="dashboard-overview-card dashboard-overview-card--primary">
              <div class="dashboard-overview-card__head">
                <div>
                  <span class="status-badge">当前模块</span>
                  <h4>古筝结构认知</h4>
                </div>
              </div>
              <p>用于课堂开场、整琴认识和互动引入，适合作为当前默认主讲内容。</p>
              <div class="action-row">
                <button class="button button--primary dashboard-enter" data-module-id="structure">开始讲解</button>
              </div>
            </article>

            <article class="dashboard-overview-card">
              <div class="dashboard-overview-card__head">
                <div>
                  <span class="status-badge">后续衔接</span>
                  <h4>建议课堂路径</h4>
                </div>
              </div>
              <ol class="dashboard-flow-steps">
                ${lessonFlow.map((step) => `<li>${step}</li>`).join("")}
              </ol>
            </article>
          </div>
        </section>

        <aside class="dashboard-side">
          <div class="dashboard-section__head">
            <div>
              <h3>快捷操作</h3>
              <p>根据课堂状态，直接切换到需要的教学环节。</p>
            </div>
            <span class="sub-badge">快速进入</span>
          </div>

          <div class="dashboard-action-list">
            ${quickActions
              .map(
                (action) => `
                  <article class="dashboard-action-card">
                    <div>
                      <h4>${action.title}</h4>
                      <p>${action.label}</p>
                    </div>
                    <button class="button button--ghost dashboard-enter" data-module-id="${action.id}">
                      打开
                    </button>
                  </article>
                `
              )
              .join("")}
          </div>
        </aside>
      </div>
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
