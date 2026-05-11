import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const cultureModule = createPlaceholderModule({
  id: "culture",
  title: "古筝文化与由来",
  summary: "适合课堂开场，先建立文化印象和兴趣。",
  priority: "中",
  header: {
    eyebrow: "Culture Module",
    title: "古筝文化与由来",
    summary: "这一栏会独立负责文化背景、音色特点和课堂开场内容。",
  },
});
