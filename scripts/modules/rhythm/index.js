import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const rhythmModule = createPlaceholderModule({
  id: "rhythm",
  title: "节奏与跟练",
  summary: "节拍感建立、节奏模仿和跟练。",
  priority: "中高",
  header: {
    eyebrow: "Rhythm Module",
    title: "节奏与跟练",
    summary: "这一栏会独立负责节拍提示、节奏训练和跟练互动。",
  },
});
