# 项目结构说明

这个项目现在按“外壳 + 模块”的方式组织，后面继续加功能时，尽量保持这个边界不变，会比较稳。

## 目录分工

- `index.html`
  登录页入口。
- `app.html`
  主控台入口，只负责整体页面框架。
- `scripts/login.js`
  登录校验和进入主控台逻辑。
- `scripts/app-shell.js`
  主控台公共壳子：模块切换、页头更新、弹层开关、返回登录页。
- `scripts/components/sidebar.js`
  左侧菜单渲染。
- `scripts/modules/`
  每个教学功能模块各自独立放在这里。
- `styles/landing.css`
  登录页样式。
- `styles/workspace.css`
  主控台公共样式和模块页面样式。

## 模块约定

每个模块尽量保持下面这套接口：

- `id`
  模块唯一标识。
- `title`
  模块名称。
- `summary`
  模块简介。
- `header`
  右上主标题区显示内容。
- `render(state)`
  返回模块页面 HTML。
- `bind(context)`
  给当前模块绑定点击和交互事件。
- `renderHeaderActions(context)`（可选）
  在页面右上角补充模块专属按钮。

## 后续新增功能建议

- 新教学内容优先加到 `scripts/modules/` 下面，不直接塞进 `app-shell.js`。
- 公共逻辑才放到 `app-shell.js`，比如统一返回、弹层、登录校验。
- 公共样式继续写在 `workspace.css`，模块专属样式尽量按区域分组。
- 每做完一轮可用版本，就做一次本地 Git 备份。

## 当前风险控制

目前这种结构下，一个模块改动通常只影响它自己，不容易把整个系统一起带坏。真正要避免的是：

- 把多个模块逻辑混写到同一个文件里
- 全局样式无限堆叠互相覆盖
- 修改页面结构后，忘了同步更新绑定逻辑

后面我们继续开发时，就按这份约定往下长。
