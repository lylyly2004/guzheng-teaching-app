import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const songModule = createPlaceholderModule({
  id: "song",
  title: "小曲目练习",
  summary: "分句练习、完整跟弹和成果展示。",
  priority: "高",
  header: {
    eyebrow: "Song Module",
    title: "小曲目练习",
    summary: "这一栏会独立负责曲目拆句、跟弹练习和成果展示。",
  },
});
