const recommendedFlows = [
  {
    title: "首次试听课推荐",
    description: "先建立兴趣，再认识古筝结构，最后用小游戏收尾。",
    steps: ["古筝文化与由来", "古筝结构认知", "课堂互动小游戏"],
  },
  {
    title: "3 次体验课推荐",
    description: "虽然软件不按课时绑定，但可以把这个顺序作为老师参考。",
    steps: ["结构认知与文化", "坐姿手型与基础弹奏", "节奏跟练与小曲目"],
  },
  {
    title: "自由组合上课",
    description: "按学员状态和现场节奏自由切换，更适合真实课堂。",
    steps: ["按内容选模块", "中途灵活跳转", "用曲目或小游戏收尾"],
  },
];

const quickModules = [
  {
    id: "structure",
    title: "古筝结构认知",
    summary: "整琴认知、部位讲解、拆解演示、互动拼合。",
    priority: "高",
  },
  {
    id: "posture",
    title: "坐姿与手型",
    summary: "正确姿势、手型和义甲佩戴说明。",
    priority: "高",
  },
  {
    id: "playing",
    title: "基础弹奏动作",
    summary: "单音拨弦、右手基础动作和简单试弹。",
    priority: "高",
  },
  {
    id: "song",
    title: "小曲目练习",
    summary: "分句练习、完整跟弹和成果展示。",
    priority: "高",
  },
];

export const dashboardModule = {
  id: "dashboard",
  title: "教学主控台",
  summary: "查看推荐组合，快速进入当前最重要的教学模块。",
  priority: "入口",
  header: {
    title: "教学主控台",
  },
  render() {
    return `
      <div class="view-grid view-grid--dashboard">
        <section class="dashboard-main">
          <h3>快捷进入</h3>
          <p>从这里直接进入常用教学模块。</p>
          <div class="dashboard-module-list">
            ${quickModules
              .map(
                (module) => `
                  <article class="dashboard-module-card">
                    <div class="dashboard-module-card__header">
                      <div>
                        <h4>${module.title}</h4>
                        <p>${module.summary}</p>
                      </div>
                      <span class="priority-badge">优先级 ${module.priority}</span>
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

        <aside class="dashboard-side">
          <h3>推荐流程</h3>
          <p>按课堂场景快速选择合适的教学组合。</p>
          <div class="dashboard-flow-list">
            ${recommendedFlows
              .map(
                (flow) => `
                  <article class="dashboard-flow-card">
                    <h4>${flow.title}</h4>
                    <p>${flow.description}</p>
                    <ul class="bullet-list">
                      ${flow.steps.map((step) => `<li>${step}</li>`).join("")}
                    </ul>
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
