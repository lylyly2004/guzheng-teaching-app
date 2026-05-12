import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const playingModule = createPlaceholderModule({
  id: "playing",
  title: "基础弹奏动作",
  summary: "单音拨弦、右手基础动作和简单试弹。",
  priority: "高",
  header: {
    eyebrow: "Playing Module",
    title: "基础弹奏动作",
    summary: "这一栏会独立负责单音拨弦、动作演示和简单试弹逻辑。",
  },
});
