import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const postureModule = createPlaceholderModule({
  id: "posture",
  title: "坐姿与手型",
  summary: "正确姿势、手型和义甲佩戴说明。",
  priority: "高",
  header: {
    eyebrow: "Posture Module",
    title: "坐姿与手型",
    summary: "这一栏会独立负责正确坐姿、错误对比、基础手型和义甲佩戴。",
  },
});
