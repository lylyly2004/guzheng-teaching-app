const recommendedFlows = [
  {
    title: "首次试听课推荐",
    description: "先建立兴趣，再认识古筝结构，最后用小互动收尾，更适合第一次接触的学生。",
    steps: ["古筝文化与由来", "古筝结构认知", "课堂互动小游戏"],
  },
  {
    title: "三次体验课安排",
    description: "适合作为阶段性教学参考，帮助老师更自然地安排课堂节奏。",
    steps: ["结构认知与基础文化", "坐姿手型与基础弹奏", "节奏跟练与小曲目体验"],
  },
  {
    title: "自由组合上课",
    description: "根据学员状态和现场课堂反馈自由切换，更适合真实教学场景。",
    steps: ["按课堂目标选模块", "中途灵活切换互动", "用曲目或小游戏收束"],
  },
];

const quickModules = [
  {
    id: "structure",
    title: "古筝结构认知",
    summary: "整琴认知、部位讲解、拆解演示和互动拼合。",
    priority: "高",
  },
  {
    id: "posture",
    title: "坐姿与手型",
    summary: "讲解规范坐姿、基础手型与义甲佩戴。",
    priority: "高",
  },
  {
    id: "playing",
    title: "基础弹奏动作",
    summary: "单音拨弦、右手动作和简单试弹练习。",
    priority: "高",
  },
  {
    id: "song",
    title: "小曲目练习",
    summary: "分句练习、跟弹体验和课堂成果展示。",
    priority: "高",
  },
];

export const dashboardModule = {
  id: "dashboard",
  title: "教学主控台",
  summary: "查看推荐组合，快速进入当前最重要的教学模块。",
  priority: "入口",
  header: {
    eyebrow: "课堂工作台",
    title: "教学主控台",
    summary: "从主控台统一安排课堂节奏，先进入今天要讲的重点，再按现场状态灵活切换模块。",
  },
  render() {
    return `
      <section class="dashboard-hero">
        <div class="dashboard-hero__content">
          <p class="dashboard-hero__eyebrow">课堂总览</p>
          <h3>把常用教学内容收在一个清晰、好切换的主控台里</h3>
          <p>先从今天的主讲内容进入，再按课堂互动和学生状态自由切换模块，整节课会更顺，老师操作也更省心。</p>
          <div class="dashboard-hero__actions action-row">
            <button class="button button--primary dashboard-enter" data-module-id="structure">进入古筝结构认知</button>
            <button class="button button--ghost dashboard-enter" data-module-id="posture">打开坐姿与手型</button>
          </div>
        </div>
        <div class="dashboard-hero__stats">
          <article class="dashboard-stat">
            <strong>4</strong>
            <span>常用核心模块</span>
          </article>
          <article class="dashboard-stat">
            <strong>3</strong>
            <span>推荐课堂流程</span>
          </article>
          <article class="dashboard-stat">
            <strong>1</strong>
            <span>默认主讲入口</span>
          </article>
        </div>
      </section>

      <section class="dashboard-focus">
        <div class="dashboard-focus__copy">
          <p class="dashboard-focus__eyebrow">今日推荐入口</p>
          <h3>先从古筝结构认知开始，最容易把学生注意力带进课堂</h3>
          <p>适合作为试听课、启蒙课和课堂开场模块。先讲整琴结构，再切入互动展示，后续衔接手型、弹奏和小游戏都会更自然。</p>
          <div class="dashboard-focus__tags">
            <span class="status-badge">适合开场</span>
            <span class="status-badge">讲解互动一体</span>
            <span class="status-badge">方便衔接后续模块</span>
          </div>
          <div class="action-row">
            <button class="button button--primary dashboard-enter" data-module-id="structure">立即进入结构认知</button>
          </div>
        </div>
        <div class="dashboard-focus__aside">
          <span class="priority-badge">推荐原因</span>
          <ul class="bullet-list">
            <li>第一模块就能快速建立课堂秩序</li>
            <li>讲解、演示和互动路径更完整</li>
            <li>适合后续切换到手型和弹奏内容</li>
          </ul>
        </div>
      </section>

      <div class="view-grid view-grid--dashboard">
        <section class="dashboard-main">
          <div class="dashboard-section__head">
            <div>
              <h3>快捷进入</h3>
              <p>把常用教学模块放在这里，方便上课时直接打开。</p>
            </div>
            <span class="sub-badge">模块入口</span>
          </div>
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
          <div class="dashboard-section__head">
            <div>
              <h3>推荐流程</h3>
              <p>按课堂场景选择更顺手的教学组合。</p>
            </div>
            <span class="sub-badge">课堂节奏</span>
          </div>
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
