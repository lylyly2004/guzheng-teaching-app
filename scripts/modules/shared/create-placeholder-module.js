export function createPlaceholderModule(config) {
  return {
    ...config,
    render() {
      return `
        <section class="placeholder-card card">
          <h3>${config.title}</h3>
          <p>${config.summary}</p>
          <div class="action-row">
            <span class="status-badge">模块预留中</span>
          </div>
          <ul class="support-list">
            <li>这个栏目已经独立成自己的模块文件，后续只需要在这个栏目目录里继续加功能。</li>
            <li>增加页面、交互或数据时，不需要去改其他栏目代码，能明显降低后期互相影响的概率。</li>
            <li>等你确认教学内容后，我会继续按同样结构把它扩展成正式模块。</li>
          </ul>
        </section>
      `;
    },
  };
}
