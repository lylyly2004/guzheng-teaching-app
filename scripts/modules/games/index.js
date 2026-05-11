import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const gamesModule = createPlaceholderModule({
  id: "games",
  title: "课堂互动小游戏",
  summary: "配对、拼图、问答和课堂闯关内容。",
  priority: "中高",
  header: {
    eyebrow: "Games Module",
    title: "课堂互动小游戏",
    summary: "这一栏会独立负责小游戏内容，不会和讲解模块写在一起。",
  },
});
