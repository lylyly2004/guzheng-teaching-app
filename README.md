# 古筝教学互动软件骨架

这次已经按更正式的软件结构重构成两层：

1. `index.html`
只负责首页和进入软件。

2. `app.html`
真正的教学主控台，采用：

- 左侧菜单栏
- 右侧主显示区
- 互动游戏全屏进入

## 当前代码结构

```text
guzheng-app/
  index.html
  app.html
  styles/
    base.css
    landing.css
    workspace.css
  scripts/
    app-shell.js
    components/
      sidebar.js
    modules/
      index.js
      shared/
        create-placeholder-module.js
      dashboard/
        index.js
      structure/
        index.js
        data.js
        view.js
        game.js
      culture/
        index.js
      posture/
        index.js
      playing/
        index.js
      rhythm/
        index.js
      song/
        index.js
      games/
        index.js
      teacher-tools/
        index.js
  README.md
```

## 这样拆分的意义

- 首页和主控台分开，不会把所有内容堆在一个页面里
- 左侧每个栏目都已经有自己的独立模块入口文件
- 数据、界面、互动逻辑可以按栏目继续分层，后续改一个模块不会牵连整页代码
- 后面继续加“坐姿与手型”“基础弹奏动作”等模块时，可以按同样结构继续扩展

## 当前已完成

- 首页入口页
- 主控台框架
- 左侧模块导航
- 右侧主显示区
- 古筝结构认知模块接入
- 互动游戏全屏进入

## 下一步建议

1. 把“古筝结构认知”里的示意古筝替换成正式美术素材
2. 把全屏点选拼合升级成真正的拖拽拼合
3. 按同样的模块化方式继续开发“坐姿与手型”模块
