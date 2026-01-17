// 六大维度：逻辑推理、创意创造、空间想象、专注坚持、协作沟通、观察探索
export const quizQuestions = [
  // ============ 逻辑推理维度 (5题) ============
  {
    id: 1,
    dimension: 'logic',
    question: '当你遇到一道难题时，你会？',
    options: [
      { text: '按照步骤一步步分析', score: { logic: 5 } },
      { text: '尝试不同的解法', score: { creativity: 3, logic: 3 } },
      { text: '直接问老师或同学', score: { collaboration: 4 } },
      { text: '先放一放，等会儿再做', score: { focus: 2 } }
    ]
  },
  {
    id: 2,
    dimension: 'logic',
    question: '你喜欢玩什么类型的游戏？',
    options: [
      { text: '解谜、数独、推理游戏', score: { logic: 5 } },
      { text: '搭积木、建造类游戏', score: { space: 4, logic: 2 } },
      { text: '角色扮演、剧情游戏', score: { creativity: 4 } },
      { text: '多人竞技、团队游戏', score: { collaboration: 4 } }
    ]
  },
  {
    id: 3,
    dimension: 'logic',
    question: '数学课上，你最喜欢？',
    options: [
      { text: '用公式解题', score: { logic: 5 } },
      { text: '画图理解', score: { space: 4 } },
      { text: '和同学讨论', score: { collaboration: 3 } },
      { text: '动手操作', score: { exploration: 3 } }
    ]
  },
  {
    id: 4,
    dimension: 'logic',
    question: '整理书包或房间时，你会？',
    options: [
      { text: '按类别、大小整齐排列', score: { logic: 5 } },
      { text: '想怎么放就怎么放', score: { creativity: 3 } },
      { text: '让爸爸妈妈帮忙', score: { collaboration: 2 } },
      { text: '需要的时候再找', score: { exploration: 2 } }
    ]
  },
  {
    id: 5,
    dimension: 'logic',
    question: '你觉得编程最酷的地方是？',
    options: [
      { text: '能让电脑听我的指令', score: { logic: 5 } },
      { text: '能做出好玩的游戏', score: { creativity: 4 } },
      { text: '能和朋友一起做项目', score: { collaboration: 3 } },
      { text: '能学到很多新知识', score: { exploration: 4 } }
    ]
  },

  // ============ 创意创造维度 (4题) ============
  {
    id: 6,
    dimension: 'creativity',
    question: '如果给你一盒彩笔，你会？',
    options: [
      { text: '按照想法画一幅画', score: { creativity: 5 } },
      { text: '照着书本或图片画', score: { focus: 3 } },
      { text: '和好朋友一起画', score: { collaboration: 3 } },
      { text: '用彩笔做手工', score: { space: 3, creativity: 2 } }
    ]
  },
  {
    id: 7,
    dimension: 'creativity',
    question: '讲故事的时候，你更喜欢？',
    options: [
      { text: '自己编一个全新的故事', score: { creativity: 5 } },
      { text: '讲听过的故事', score: { focus: 3 } },
      { text: '和伙伴一人一句编', score: { collaboration: 4 } },
      { text: '边讲边表演出来', score: { creativity: 3, collaboration: 2 } }
    ]
  },
  {
    id: 8,
    dimension: 'creativity',
    question: '你最喜欢的课是？',
    options: [
      { text: '美术、音乐课', score: { creativity: 5 } },
      { text: '数学、科学课', score: { logic: 4 } },
      { text: '体育、活动课', score: { collaboration: 3 } },
      { text: '都喜欢', score: { exploration: 3 } }
    ]
  },
  {
    id: 9,
    dimension: 'creativity',
    question: '如果让你设计一个游戏，你会？',
    options: [
      { text: '设计一个全新的玩法', score: { creativity: 5 } },
      { text: '改进喜欢的游戏', score: { exploration: 3, creativity: 3 } },
      { text: '和朋友一起讨论', score: { collaboration: 4 } },
      { text: '先玩别人的游戏找灵感', score: { exploration: 4 } }
    ]
  },

  // ============ 空间想象维度 (4题) ============
  {
    id: 10,
    dimension: 'space',
    question: '你喜欢玩什么玩具？',
    options: [
      { text: '乐高、积木', score: { space: 5 } },
      { text: '拼图', score: { logic: 3, space: 2 } },
      { text: '玩偶', score: { creativity: 3 } },
      { text: '遥控车、机器人', score: { exploration: 3, logic: 2 } }
    ]
  },
  {
    id: 11,
    dimension: 'space',
    question: '看地图或找路时，你？',
    options: [
      { text: '很容易就能看懂', score: { space: 5 } },
      { text: '需要别人帮忙指路', score: { collaboration: 2 } },
      { text: '用手机导航', score: { exploration: 3 } },
      { text: '凭感觉走', score: { exploration: 2, space: 2 } }
    ]
  },
  {
    id: 12,
    dimension: 'space',
    question: '画画时，你更擅长？',
    options: [
      { text: '画立体的东西', score: { space: 5 } },
      { text: '画平面的画', score: { creativity: 3 } },
      { text: '涂颜色', score: { focus: 3 } },
      { text: '不怎么会画', score: { exploration: 2 } }
    ]
  },
  {
    id: 13,
    dimension: 'space',
    question: '如果你学3D打印，你想？',
    options: [
      { text: '设计很酷的模型', score: { space: 5, creativity: 2 } },
      { text: '打印实用的东西', score: { logic: 3 } },
      { text: '和同学一起做', score: { collaboration: 3 } },
      { text: '先看看别人做什么', score: { exploration: 3 } }
    ]
  },

  // ============ 专注坚持维度 (4题) ============
  {
    id: 14,
    dimension: 'focus',
    question: '你开始拼一个1000片的拼图，会？',
    options: [
      { text: '不拼完不休息', score: { focus: 5 } },
      { text: '拼一会儿休息一下', score: { focus: 3 } },
      { text: '叫朋友一起拼', score: { collaboration: 3 } },
      { text: '太难就不拼了', score: { exploration: 2 } }
    ]
  },
  {
    id: 15,
    dimension: 'focus',
    question: '写作业时，你会？',
    options: [
      { text: '一口气写完再玩', score: { focus: 5 } },
      { text: '写一会玩一会', score: { focus: 2 } },
      { text: '遇到难题就跳过', score: { exploration: 2 } },
      { text: '需要爸爸妈妈监督', score: { collaboration: 2 } }
    ]
  },
  {
    id: 16,
    dimension: 'focus',
    question: '你喜欢做什么事情？',
    options: [
      { text: '需要很长时间完成的事', score: { focus: 5 } },
      { text: '很快就能做完的事', score: { creativity: 3 } },
      { text: '和朋友一起做的事', score: { collaboration: 3 } },
      { text: '尝试新鲜的事', score: { exploration: 3 } }
    ]
  },
  {
    id: 17,
    dimension: 'focus',
    question: '如果一件事失败了，你会？',
    options: [
      { text: '反复尝试直到成功', score: { focus: 5 } },
      { text: '换一个方法试试', score: { creativity: 3 } },
      { text: '找人帮忙', score: { collaboration: 3 } },
      { text: '先放一放', score: { exploration: 2 } }
    ]
  },

  // ============ 协作沟通维度 (3题) ============
  {
    id: 18,
    dimension: 'collaboration',
    question: '小组活动时，你通常会？',
    options: [
      { text: '组织大家分工合作', score: { collaboration: 5, logic: 2 } },
      { text: '提出创意想法', score: { creativity: 4, collaboration: 2 } },
      { text: '听大家的安排', score: { collaboration: 3 } },
      { text: '自己完成任务', score: { focus: 3 } }
    ]
  },
  {
    id: 19,
    dimension: 'collaboration',
    question: '你更喜欢？',
    options: [
      { text: '和朋友一起做事', score: { collaboration: 5 } },
      { text: '自己一个人做事', score: { focus: 3 } },
      { text: '看情况', score: { exploration: 2 } },
      { text: '教别人做事', score: { collaboration: 4, logic: 2 } }
    ]
  },
  {
    id: 20,
    dimension: 'collaboration',
    question: '当同学有困难时，你会？',
    options: [
      { text: '主动帮助他', score: { collaboration: 5 } },
      { text: '叫老师来帮忙', score: { collaboration: 3 } },
      { text: '看是什么困难再决定', score: { exploration: 3 } },
      { text: '先完成自己的事', score: { focus: 2 } }
    ]
  },

  // ============ 观察探索维度 (3题) ============
  {
    id: 21,
    dimension: 'exploration',
    question: '看到不认识的小虫子，你会？',
    options: [
      { text: '仔细观察它长什么样', score: { exploration: 5 } },
      { text: '查书或上网了解', score: { exploration: 4, logic: 2 } },
      { text: '叫别人来看', score: { collaboration: 3 } },
      { text: '有点害怕', score: { creativity: 2 } }
    ]
  },
  {
    id: 22,
    dimension: 'exploration',
    question: '你去一个新地方，会？',
    options: [
      { text: '到处走走看看', score: { exploration: 5 } },
      { text: '跟着大人走', score: { collaboration: 2 } },
      { text: '先看地图', score: { space: 3 } },
      { text: '问问有什么好玩的', score: { collaboration: 3 } }
    ]
  },
  {
    id: 23,
    dimension: 'exploration',
    question: '你对什么最感兴趣？',
    options: [
      { text: '探索未知的事物', score: { exploration: 5 } },
      { text: '创造新东西', score: { creativity: 4 } },
      { text: '解决难题', score: { logic: 4 } },
      { text: '和朋友一起玩', score: { collaboration: 3 } }
    ]
  }
]

// 天赋类型定义
export const talentTypes = [
  {
    name: '逻辑探险家',
    emoji: '🧮',
    color: '#4F46E5',
    traits: '逻辑思维强，善于分析',
    description: '你就像一个小侦探，喜欢通过推理和思考找到答案。遇到问题时，你能一步步分析，找到解决方法。',
    programmingMatch: '超强适配！',
    programmingReason: '你的逻辑思维能力正是编程的核心能力。从算法设计到bug调试，都需要你的推理能力。推荐学习Python或C++，从算法挑战开始！',
    careerTags: ['算法工程师', '数据分析师', '科学家'],
    learningAdvice: '多做一些逻辑推理题和数独，学习编程时可以先从算法和逻辑训练开始。'
  },
  {
    name: '创意魔法师',
    emoji: '🎨',
    color: '#EC4899',
    traits: '想象力丰富，充满创意',
    description: '你的脑袋里装满了奇思妙想！你总能想出新点子，用不同的方式看待问题。',
    programmingMatch: '完美适配！',
    programmingReason: '编程是创造力的最佳表达工具！你可以用Scratch制作互动故事，用Unity开发游戏。你的创意能变成独一无二的作品！',
    careerTags: ['游戏设计师', '产品经理', '数字艺术家'],
    learningAdvice: '从Scratch或Unity开始，把你的创意变成实际的程序和游戏。'
  },
  {
    name: '结构建筑师',
    emoji: '🧱',
    color: '#059669',
    traits: '善于组织，喜欢搭建',
    description: '你像个小建筑师，喜欢把东西按秩序排列整齐。你能看到事物的结构和规律。',
    programmingMatch: '高度适配！',
    programmingReason: '编程就是用代码搭建结构！你的组织能力让你能写出清晰、规范的代码。前端开发和工程化非常适合你。',
    careerTags: ['前端工程师', '系统架构师', '全栈开发者'],
    learningAdvice: '可以从HTML/CSS开始，学习网页结构，然后逐步学习JavaScript和框架。'
  },
  {
    name: '未来发明家',
    emoji: '🚀',
    color: '#7C3AED',
    traits: '好奇心强，热爱探索',
    description: '你对世界充满好奇，总想探索未知的事物。你有很多"为什么"，喜欢尝试新鲜事物。',
    programmingMatch: '天生适配！',
    programmingReason: '技术发展日新月异，你的探索精神让你能快速学习新技术！AI、物联网、区块链...未来的科技领域等你来开拓！',
    careerTags: ['AI工程师', '全栈开发者', '科技创业者'],
    learningAdvice: '广泛涉猎各种编程语言和技术，找到你最喜欢的方向深入探索。'
  },
  {
    name: '协作领航员',
    emoji: '🤝',
    color: '#EA580C',
    traits: '善于沟通，乐于助人',
    description: '你喜欢和大家一起做事，在团队中能很好地沟通和协作。你懂得如何让每个人发挥所长。',
    programmingMatch: '非常适合！',
    programmingReason: '现代软件开发都是团队合作！你的沟通能力让你能更好地理解需求、协调团队。全栈开发和项目管理都很适合你。',
    careerTags: ['产品经理', '技术主管', '全栈开发者'],
    learningAdvice: '可以参与开源项目或编程社区，学习如何与他人协作开发。'
  },
  {
    name: '专注工匠',
    emoji: '🎯',
    color: '#0891B2',
    traits: '细致耐心，追求完美',
    description: '你能长时间专注于一件事情，把细节做到最好。你不怕困难，会反复尝试直到成功。',
    programmingMatch: '非常适合！',
    programmingReason: '编程需要耐心和细致！调试代码、优化性能都需要工匠精神。你的专注让你能写出高质量的代码。',
    careerTags: ['测试工程师', '精品应用开发', '技术专家'],
    learningAdvice: '选择一个方向深入钻研，比如移动开发或小程序开发，做到精益求精。'
  }
]

// 维度名称映射
export const dimensionNames = {
  logic: '逻辑推理',
  creativity: '创意创造',
  space: '空间想象',
  focus: '专注坚持',
  collaboration: '协作沟通',
  exploration: '观察探索'
}
