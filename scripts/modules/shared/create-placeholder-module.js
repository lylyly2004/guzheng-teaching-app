export function createPlaceholderModule(config) {
  return {
    ...config,
    render() {
      return `
        <section class="placeholder-card card">
          <div class="placeholder-card__head">
            <h3>${config.title}</h3>
            <span class="status-badge">模块页面</span>
          </div>
          <div class="placeholder-stage"></div>
        </section>
      `;
    },
  };
}
