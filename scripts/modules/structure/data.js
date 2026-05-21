export const hotspotOrder = ["qintou", "qianyueshan", "yanzhu", "qinxian", "houyueshan", "mianban", "ceban", "qinwei"];

export const explodeCraftOrder = ["traditional", "semi-hollow", "hollowed"];

export const explodeCraftData = {
  traditional: {
    title: "传统拼接工艺",
    eyebrow: "传统课堂主讲版本",
    summary: "通过面板、底板、侧板、筝头、筝尾、岳山和筝码等部件拼合成完整古筝，适合先建立学生对传统结构组成关系的认识。",
    detail: "重点让学员理解传统古筝并不是一整块木头直接完成，而是由多个结构部件组合、安装、调试后形成完整乐器。",
    wholeImage: "./assets/images/explode-traditional-whole.png",
    explodedLayoutImage: "./assets/images/explode-traditional-layout.png",
    artboardRatio: "1773 / 2364",
    badges: ["传统结构", "部件拼接", "课堂主线"],
    explodedPieces: [
      { id: "left-side", label: "左侧板", src: "./assets/images/explode-traditional-left-side.png", enterX: "120px", enterY: "0px", z: 2 },
      { id: "mianban", label: "面板", src: "./assets/images/explode-traditional-mianban.png", enterX: "0px", enterY: "140px", z: 5 },
      { id: "right-side", label: "右侧板", src: "./assets/images/explode-traditional-right-side.png", enterX: "-120px", enterY: "0px", z: 2 },
      { id: "diban", label: "底板", src: "./assets/images/explode-traditional-diban.png", enterX: "0px", enterY: "-160px", z: 1 },
      { id: "left-panel", label: "左侧面板", src: "./assets/images/explode-traditional-left-panel.png", enterX: "140px", enterY: "90px", z: 4 },
      { id: "qianyueshan", label: "前岳山", src: "./assets/images/explode-traditional-qianyueshan.png", enterX: "70px", enterY: "110px", z: 7 },
      { id: "right-panel", label: "右侧面板", src: "./assets/images/explode-traditional-right-panel.png", enterX: "-140px", enterY: "90px", z: 4 },
      { id: "yanzhu", label: "筝码", src: "./assets/images/explode-traditional-yanzhu.png", enterX: "0px", enterY: "150px", z: 8 },
      { id: "houyueshan", label: "后岳山", src: "./assets/images/explode-traditional-houyueshan.png", enterX: "-70px", enterY: "110px", z: 7 },
      { id: "qinwei", label: "筝尾", src: "./assets/images/explode-traditional-qinwei.png", enterX: "0px", enterY: "-180px", z: 9 },
      { id: "qintou", label: "筝头", src: "./assets/images/explode-traditional-qintou.png", enterX: "0px", enterY: "180px", z: 9 },
    ],
  },
  "semi-hollow": {
    title: "半挖筝工艺",
    eyebrow: "传统与现代之间",
    summary: "半挖筝在主体制作上引入部分整挖思路，同时保留部分拼接结构，是现代古筝中较常见的一种过渡型工艺。",
    detail: "这一页适合告诉学员：现在常见古筝并不只一种做法，半挖筝是在音色、稳定性和制作方式之间做平衡的代表。",
    artboardRatio: "1773 / 2364",
    badges: ["半挖结构", "现代常见", "工艺过渡"],
    parts: ["主体结构", "局部拼接", "岳山系统", "筝码", "边缘收口"],
  },
  hollowed: {
    title: "挖筝工艺",
    eyebrow: "整木挖制思路",
    summary: "挖筝更强调由整块木料挖制主体，再完成后续结构安装，与传统拼接工艺形成鲜明对比。",
    detail: "这一页适合补充说明：随着工艺发展，古筝制作方式越来越多样，挖筝和半挖筝都是现代课堂里值得学生认识的工艺方向。",
    artboardRatio: "1773 / 2364",
    badges: ["整木主体", "工艺扩展", "现代认知"],
    parts: ["整挖主体", "结构补件", "岳山系统", "筝码", "收边部件"],
  },
};

export const hotspotData = {
  qintou: {
    title: "筝头",
    description: "位于古筝一端，是辨认整琴方向时最直观的结构部位。",
    points: ["用于识别古筝起始端", "外形厚实，便于课堂开场辨认", "和筝尾一起帮助学生建立整琴方向感"],
  },
  qianyueshan: {
    title: "前岳山",
    description: "位于古筝前侧靠近琴弦起点的位置，是琴弦支撑的重要结构。",
    points: ["靠近古筝前端", "和后岳山形成前后对应", "适合引导学生观察琴弦起点"],
  },
  yanzhu: {
    title: "筝码",
    description: "位于古筝中部，是一排支撑琴弦的活动结构，也是辨认度很高的重点部位。",
    points: ["用于支撑琴弦", "位于古筝中部偏上区域", "适合重点记忆和课堂提问"],
  },
  qinxian: {
    title: "琴弦",
    description: "琴弦贯穿整张古筝，是后续弹奏教学中最直接接触的部位。",
    points: ["贯穿整张古筝", "与发声和弹奏直接相关", "适合衔接后续演奏教学"],
  },
  houyueshan: {
    title: "后岳山",
    description: "位于古筝后端靠近弦尾的位置，与前岳山相对，是结构识别的重要参照点。",
    points: ["位于古筝后端", "与前岳山形成对照", "帮助学生理解前后结构关系"],
  },
  yueshan: {
    title: "后岳山",
    description: "位于古筝后端靠近弦尾的位置，与前岳山相对，是结构识别的重要参照点。",
    points: ["位于古筝后端", "与前岳山形成对照", "帮助学生理解前后结构关系"],
  },
  mianban: {
    title: "面板",
    description: "面板是古筝的主体板面，承接整体外形，也是视觉面积最大的主要结构。",
    points: ["属于古筝主体结构", "面积最大，适合整体讲解", "是多数部位的承载基础"],
  },
  ceban: {
    title: "侧板",
    description: "侧板位于古筝下侧外缘，是连接主体和外轮廓的重要结构部位。",
    points: ["位于古筝下侧外缘", "帮助学生认识古筝外轮廓", "适合与面板做结构区分"],
  },
  qinwei: {
    title: "筝尾",
    description: "位于古筝另一端，是整琴末端结构，和筝头共同帮助学生辨认方向。",
    points: ["位于古筝末端", "与筝头对应形成整琴方向", "便于课堂整体结构回顾"],
  },
};

export const explodeSteps = [
  { title: "整体观察", description: "先看完整古筝外形，建立对整琴结构的整体认识。" },
  { title: "两端结构", description: "先拆开筝头和筝尾，帮助学生理解整琴前后方向。" },
  { title: "主体与支撑", description: "再突出面板、底板和侧板，从外形过渡到结构关系。" },
  { title: "关键构件", description: "最后突出前岳山、后岳山和筝码，帮助学生理解古筝并非一整块木料直接制成。" },
];

export const assembleOrder = ["qintou", "qinwei", "mianban", "qinxian", "yanzhu", "yueshan", "qianyueshan"];
