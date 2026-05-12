export const hotspotData = {
  qintou: {
    title: "琴头",
    description: "琴头位于古筝的一端，是整琴外观识别度很高的位置，也适合作为老师讲解的起点。",
    points: ["适合先指给学生看", "帮助建立方向感", "可作为拼合练习起始部件"],
  },
  qinwei: {
    title: "琴尾",
    description: "琴尾位于古筝另一端，和琴头一起帮助学生理解整琴的前后方向。",
    points: ["适合和琴头对比讲", "帮助学生区分两端", "适合作为结构问答内容"],
  },
  mianban: {
    title: "面板",
    description: "面板是古筝主要的琴身部分，适合老师在这里强调古筝的整体结构。",
    points: ["是整琴主体", "适合承接整体结构讲解", "拼合时属于大块基础部件"],
  },
  qinxian: {
    title: "琴弦",
    description: "琴弦是后面真正弹奏时会直接接触的部分，拨动琴弦就能发出声音。",
    points: ["和后续弹奏模块直接关联", "适合引出声音概念", "可过渡到单音体验练习"],
  },
  yanzhu: {
    title: "雁柱",
    description: "雁柱支撑琴弦，是古筝结构里很有辨识度的一部分，也容易成为课堂记忆点。",
    points: ["适合重点强调名称", "视觉特征明显", "后续可结合音高位置讲解"],
  },
  yueshan: {
    title: "岳山",
    description: "岳山位于古筝一端，适合老师在讲结构层次时重点指出。",
    points: ["名称有辨识度", "适合和前岳山区分", "很适合放进课堂小测验"],
  },
  qianyueshan: {
    title: "前岳山",
    description: "前岳山和岳山名称相近，很适合放进课堂问答，帮助学生加深记忆。",
    points: ["适合做对比记忆", "可用于结构问答", "有助于理解结构位置"],
  },
};

export const explodeSteps = [
  {
    title: "步骤 1：先看整琴",
    description: "先不拆解，先给学员看完整的古筝外形，再说明接下来会逐步认识内部结构。",
    transforms: {
      qintou: "translate(-140px, -24px)",
      mianban: "translate(-140px, -24px)",
      qinxian: "translate(-140px, -24px)",
      yanzhu: "translate(-140px, -24px)",
      yueshan: "translate(-140px, -24px)",
      qianyueshan: "translate(-140px, -24px)",
      qinwei: "translate(-140px, -24px)",
    },
  },
  {
    title: "步骤 2：拆开两端",
    description: "先把琴头和琴尾拉开，让学生先记住古筝整体的前后方向。",
    transforms: {
      qintou: "translate(-280px, -24px)",
      mianban: "translate(-140px, -24px)",
      qinxian: "translate(-140px, -24px)",
      yanzhu: "translate(-140px, -24px)",
      yueshan: "translate(-140px, -24px)",
      qianyueshan: "translate(-140px, -24px)",
      qinwei: "translate(0px, -24px)",
    },
  },
  {
    title: "步骤 3：突出主体与琴弦",
    description: "再把面板和琴弦拉开，老师可以在这里从外形过渡到发声结构。",
    transforms: {
      qintou: "translate(-300px, -24px)",
      mianban: "translate(-140px, -132px)",
      qinxian: "translate(-140px, 90px)",
      yanzhu: "translate(-140px, -24px)",
      yueshan: "translate(-140px, -24px)",
      qianyueshan: "translate(-140px, -24px)",
      qinwei: "translate(18px, -24px)",
    },
  },
  {
    title: "步骤 4：强调关键名称",
    description: "最后突出雁柱、岳山和前岳山，帮助学生记住最容易混淆的部分。",
    transforms: {
      qintou: "translate(-318px, -24px)",
      mianban: "translate(-140px, -132px)",
      qinxian: "translate(-140px, 90px)",
      yanzhu: "translate(24px, -120px)",
      yueshan: "translate(-252px, -124px)",
      qianyueshan: "translate(108px, 64px)",
      qinwei: "translate(38px, -24px)",
    },
  },
];

export const assembleOrder = [
  "qintou",
  "qinwei",
  "mianban",
  "qinxian",
  "yanzhu",
  "yueshan",
  "qianyueshan",
];
