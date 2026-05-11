import { createPlaceholderModule } from "../shared/create-placeholder-module.js";

export const teacherToolsModule = createPlaceholderModule({
  id: "teacher-tools",
  title: "老师常用工具",
  summary: "课堂流程建议、知识点速查和快捷入口。",
  priority: "中",
  header: {
    eyebrow: "Teacher Tools",
    title: "老师常用工具",
    summary: "这一栏会独立负责课堂快捷入口和老师高频工具区。",
  },
});
