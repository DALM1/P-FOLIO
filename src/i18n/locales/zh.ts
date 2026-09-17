import type { TranslationsShape } from '../index'

export const zh: TranslationsShape = {
  common: {
    backToMenu: '← 返回菜单',
    connectingHearts: '连接彼此的心',
    portfolio: '王国之心 作品集',
  },
  landing: {
    pressStart: '按开始',
    beginHint: '点击任意位置或按回车进入',
  },
  menu: {
    home: '首页',
    projects: '项目',
    skills: '技能',
    about: '关于我',
    contact: '联系方式',
  },
  home: {
    cta: '点击任意位置 · 按任意键',
  },
  projects: {
    subtitle: (n) => `公开代码仓库 · ${n}`,
    loadingUser: '正在加载代码仓库…',
    title: '项目',
    intro: '来自 ',
    introSuffix: ' 的最新公开项目，已隐藏 Fork 仓库。',
    followers: (n) => `粉丝 ${n}`,
    following: (n) => `关注 ${n}`,
    loading: '正在从 GitHub 加载代码仓库…',
    error: '无法加载代码仓库',
    empty: '暂无公开非 Fork 代码仓库。',
    pushed: (t) => `${t} 前更新`,
    archived: '已归档',
    homepage: '项目主页 ↗',
  },
  skills: {
    subtitle: (n) => `技能矩阵 · 共 ${n} 项技能`,
    title: '技能',
    intro:
      '分层能力矩阵 — 从 S（精通）到 C（熟悉）。公共仓库的语言分布也被纳入考量，数据来自 GitHub。',
    tierLegend: {
      SMaster: '精通 / 专家',
      SDesc: '已在多个生产项目中验证使用。',
      tierS: '等级 S — 精通',
      tierA: '等级 A — 专家',
      tierB: '等级 B — 熟练',
      tierC: '等级 C — 熟悉',
    },
    categories: {
      frontend: '前端',
      backend: '后端',
      mobile: '移动与桌面',
      ops: 'DevOps 与云',
      ai: '人工智能与安全',
      tools: '工具与方法',
    },
    count: (n) => `${n} 项技能`,
  },
  about: {
    subtitle: '关于 · 个人资料与经历',
    title: '关于我',
    intro: '我是 ',
    role: '一名专注于分布式系统、后端架构与人工智能的软件工程师。',
    stats: (r, f, fl) => `${r} 个仓库 · ${f} 粉丝 · ${fl} 关注`,
    interests: [
      '分布式系统',
      '实时应用',
      '可扩展性',
      '人工智能工程',
      '物联网系统',
      '机器人 · 物联网 · LoRa',
      '科技创业',
      '硬件进出口',
      '自动化与 CI/CD',
      '大模型微调',
      '打造技术产品',
    ],
    sections: {
      parcours: '个人经历',
      engEntrepreneurship: '工程与创业',
      roboticsSystems: '机器人与系统',
      buildArchitectAutomate: '构建 · 架构 · 自动化。',
    },
    timeline: [
      {
        year: '国际',
        title: 'Saint Martin-Saint Denis Val de Loire 国际学校',
        body: '国际学校环境，多元文化熏陶，英语教学方法论。',
      },
      {
        year: '陆军',
        title: '海军陆战队士兵',
        body: '法国军事训练：纪律、团队协作、抗压能力与结构化作战环境。',
      },
      {
        year: '职业转型',
        title: 'La Passerelle — Web 开发训练营',
        body: 'Web 开发入门：前端切图、HTML/CSS/JS、前端技术栈基础。',
      },
      {
        year: 'CS50 · 哈佛',
        title: '计算机科学基础',
        body: '算法、数据结构、内存、编程范式，夯实理论与算法基础。',
      },
      {
        year: 'Le Réacteur',
        title: '现代 Web 开发',
        body: 'React、Node.js、敏捷开发流程、全栈项目实战。',
      },
      {
        year: 'Le Wagon · 巴黎',
        title: 'Web 与移动 — 软件开发项目',
        body: '深入 Ruby on Rails、JavaScript、跨平台应用，开始转向架构方向。',
      },
      {
        year: 'EPITECH · 巴黎',
        title: '硕士 · 信息系统架构 · 人工智能 / 分布式系统方向',
        body: '数据架构、分布式系统、人工智能工程。Python 大模型微调与复杂系统设计。',
      },
      {
        year: 'DALM AGENCY',
        title: '个体经营 · IT 服务',
        body: '首次创业：围绕开发与 IT 服务展开业务，负责产品、基础设施、运营与商业。',
      },
      {
        year: 'FDJ UNITED',
        title: 'QA 测试工程 · 国际',
        body: '国际终端与软件质量：功能/探索/回归测试。Playwright、Selenium、Shell、GitLab CI 实现 API 与 E2E 自动化。',
      },
      {
        year: '新项目',
        title: 'IT 服务 · 深圳 ↔ 法国 硬件进出口',
        body: '第二次创业：IT 服务 + 深圳/法国硬件进出口贸易。',
      },
      {
        year: 'Evolutek',
        title: '法国机器人俱乐部',
        body: '软件 + 硬件结合：机器人、物联网、传感器、LoRa 通信、自主无人机。',
      },
      {
        year: 'DALM AGENCY',
        title: '软件工程师 · 定制解决方案',
        body: 'Web 与移动应用、GraphQL、gRPC、微服务、实时、分布式系统与高并发后端设计。',
      },
    ],
    bio: [{ heading: null, paragraphs: ['', null] }],
    bioParagraphs: [
      {
        content:
          '我最初在 Saint Martin-Saint Denis Val de Loire 国际学校就读，在国际化环境中成长。随后我在法国陆军中接受训练，成为一名海军陆战队士兵，之后才转向计算机领域。',
      },
      {
        content:
          '我在 La Passerelle 开始了技术转型，随后进入 Le Réacteur 训练营，并完成了哈佛大学 CS50 课程，夯实了我的计算机科学与编程基础。',
      },
      {
        content:
          '之后我加入了巴黎 Le Wagon 编程学校，深入学习 Web 与移动开发，并参与了多个软件项目。这段经历让我逐渐转向更复杂的系统设计与架构问题。',
      },
      {
        content:
          '我在巴黎 EPITECH 继续深造，取得信息系统架构硕士学位，专攻人工智能、分布式系统与数据架构方向。我主要研究 Python 下的大模型适配与微调，以及复杂系统设计。',
      },
    ],
    engEntrepreneurship: [
      {
        content:
          '在加入 FDJ UNITED 之前，我创立了自己的个体经营业务，最初围绕开发与 IT 服务展开。直到今天，我仍然在职业生涯之外持续经营这份事业。',
      },
      {
        content:
          '在 FDJ UNITED，我从事国际级软件与终端的 QA 测试工程工作，涵盖功能测试、探索性测试与回归测试，并通过 Playwright、Selenium、Shell 和 GitLab CI 实现 API 与 E2E 自动化。',
      },
      {
        content:
          '与此同时，我也在筹备第二个创业项目，目标是成立一家专注 IT 服务开发以及深圳与法国间硬件进出口贸易的公司。',
      },
      {
        content:
          '创业者的视角补充了我作为工程师的履历：它迫使我不仅思考产品的技术设计，还要考虑它的落地方式、基础设施、运营约束与商业环境。',
      },
    ],
    roboticsSystems: [
      {
        content:
          '在学业与工作之外，我也是法国 Evolutek 机器人俱乐部的一员，探索软件与硬件的交叉领域，特别是机器人、物联网、LoRa 通信与无人机方向。',
      },
      {
        content:
          '作为软件工程师 / 自由职业者，我也设计并交付了多款 Web 与移动端解决方案，尤其在 GraphQL、gRPC、微服务架构、实时系统与分布式应用方向。',
      },
    ],
    bioFooter: [
      '今天，我的个人定位位于软件工程、系统架构、人工智能、机器人与创业的交叉点。',
      '我喜欢从整体去理解一个问题，设计合适的系统架构，然后亲自跟进到实现与验证阶段。',
      '我对分布式系统、实时应用、可扩展性、人工智能工程、物联网系统以及打造技术产品尤为感兴趣。',
    ],
    philosophy: {
      title: '理念',
      body: '全局理解 → 架构设计 → 工程实现 → 验证交付。以稳健、可扩展、清晰的系统设计为首要。',
      tags: ['稳健', '清晰', '性能', '自动化'],
    },
  },
  contact: {
    subtitle: (n) => `联系我 · ${n} 种渠道`,
    title: '联系方式',
    intro: '选择一个渠道 — 可直接跳转的卡片会自动打开，微信 ID 点击即可复制到剪贴板。',
    userTitle: 'Dimitri Almon · DALM1 (玄一)',
    userRole: '全栈工程师 — 恶意代码分析 — 人工智能方向',
    statWhatsapp: 'WhatsApp · 法国',
    statWechat: '微信 · DALM101',
    viewProfile: '查看主页 ↗',
    message: '发消息 ↗',
    copyId: '复制 ID',
    copied: '✓ 已复制！',
    kindClipboard: '剪贴板',
    kindWhatsapp: 'WhatsApp',
    kindExternal: '外部链接',
  },
} as const
