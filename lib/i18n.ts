export const LOCALES = ["zh", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "zh";

export const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  es: "ES",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function localeFromLanguage(value: string | null | undefined): Locale {
  const lang = value?.toLowerCase() ?? "";
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

interface Fact {
  date: string;
  title: string;
  detail: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

interface BriefSource {
  label: string;
  url: string;
}

interface BriefItem {
  date: string;
  status: string;
  tone: "alert" | "watch" | "verified";
  title: string;
  detail: string;
  sources: BriefSource[];
}

export interface Dict {
  brand: string;
  hero: {
    eyebrow: string;
    titlePre: string; // 可含 \n
    titleHighlight: string;
    subtitle: string;
    ctaFacts: string;
    ctaSpeak: string;
    ctaPetition: string;
    stampTop: string;
    stampSub: string;
    marquee: string;
  };
  briefing: {
    kicker: string;
    updated: string;
    title: string;
    description: string;
    sourceLabel: string;
    items: BriefItem[];
  };
  facts: {
    kicker: string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    description: string;
    evidence: string; // 证据卡标签
    items: Fact[];
  };
  manifesto: {
    kicker: string;
    title: string;
    body: string;
    points: string[];
  };
  petition: {
    kicker: string;
    title: string;
    description: string;
    statementLabel: string;
    statement: string;
    demandsTitle: string;
    demands: string[];
    countLabel: string;
    countUnit: string;
    liveCount: string;
    nextGoal: (n: number) => string;
    recentTitle: string;
    emptyRecent: string;
    nickLabel: string;
    nickPlaceholder: string;
    emailLabel: string;
    emailHint: string;
    emailPlaceholder: string;
    consent: string;
    privacy: string;
    submit: string;
    submitting: string;
    signedTitle: string;
    signedBody: string;
    share: string;
    copied: string;
    networkErr: string;
    genericErr: string;
  };
  form: {
    kicker: string;
    titlePre: string;
    titleAccent: string;
    description: string;
    bullets: string[];
    nickLabel: string;
    nickPlaceholder: string;
    emailLabel: string;
    emailHint: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    addSticker: string;
    stickerPanelTitle: string;
    removeSticker: string;
    submit: string;
    submitting: string;
    okMsg: string;
    networkErr: string;
    genericErr: string;
  };
  feed: {
    title: string;
    empty: string;
    live: string;
    countLabel: string;
    latestLabel: (n: number) => string;
    placeholderLabel: string;
    placeholderAuthor: string;
    placeholderMessages: Record<string, string>;
    now: string;
    minutesAgo: (n: number) => string;
    hoursAgo: (n: number) => string;
    daysAgo: (n: number) => string;
  };
  footer: string;
}

const zh: Dict = {
  brand: "Anthropic 抗议档案",
  hero: {
    eyebrow: "ANTHROPIC · 抗议 · 存证",
    titlePre: "安全\n缺德",
    titleHighlight: "✓",
    subtitle:
      "当一家 AI 公司用“安全”和“合规”做旗号，却把检测、封禁、抓取、掠夺知识资产和双标写进产品与政策里，我们有理由直指它的反道德、反人类倾向。",
    ctaFacts: "查看事实 ↓",
    ctaSpeak: "我要发声",
    ctaPetition: "加入联署",
    stampTop: "抗议",
    stampSub: "NO CONSENT",
    marquee: "自以为是的小偷，我们拒绝沉默",
  },
  briefing: {
    kicker: "LATEST CASE FILE",
    updated: "更新至 2026-07-28",
    title: "“安全”叙事，正在被自己的产品打脸",
    description:
      "最新进展按证据强度记录：官方公告说明公司承认了什么，独立报道说明外界验证了什么；尚未证实的“薅羊毛”说法，不包装成事实。",
    sourceLabel: "来源",
    items: [
      {
        date: "2026-07-28",
        status: "最新核验 / 隐私提示",
        tone: "alert",
        title: "公开分享的 Claude 内容进入 Google 搜索",
        detail:
          "Axios 在 Google 结果中找到了用户公开分享的 Claude artifacts，包括应用、文档、表格和基础设施图；报道没有发现默认私密对话被索引。Anthropic 称，内容只有在用户生成公开链接、又把链接放到搜索引擎可见的位置后才可被搜索。问题仍然真实：不可猜的链接不是访问控制，面向少数人的“分享”也可能变成全网可检索。",
        sources: [
          {
            label: "Axios",
            url: "https://www.axios.com/2026/07/27/anthropic-claude-public-chats-google-search",
          },
        ],
      },
      {
        date: "2026-07-27",
        status: "独立安全研究",
        tone: "alert",
        title: "Claude Cowork 本地沙箱可被突破",
        detail:
          "研究人员演示了 SharedRoot 攻击链：借助已披露的 Linux 内核漏洞 CVE-2026-46331，Claude Cowork 的本地虚拟机可越过隔离，读写 Mac 宿主机文件。后续版本默认转向云端执行，但选择本地运行的用户仍需确认补丁和挂载权限。",
        sources: [
          {
            label: "TechRadar",
            url: "https://www.techradar.com/pro/security/its-not-just-openai-models-escaping-and-running-riot-experts-show-how-claude-cowork-can-break-its-bonds-and-access-mac-files",
          },
          {
            label: "The Hacker News",
            url: "https://thehackernews.com/2026/07/claude-cowork-flaw-could-let-ai-agent.html",
          },
        ],
      },
      {
        date: "2026-07-24",
        status: "官方发布 / 风险仍在",
        tone: "watch",
        title: "Opus 5 上线，但“最新”不等于风险清零",
        detail:
          "Anthropic 将 Opus 5 描述为更安全、更不易被滥用的新模型。可就在此前，能力更强的 Fable 5 曾因网络安全风险被暂停，并在增加安全过滤后重新部署。新版本声明不是独立安全验证，历史处置也不能被发布会覆盖。",
        sources: [
          {
            label: "Reuters",
            url: "https://www.reuters.com/technology/anthropic-rolls-out-opus-5-ai-model-efficiency-upgrade-2026-07-24/",
          },
          {
            label: "Anthropic",
            url: "https://www.anthropic.com/news/redeploying-fable-5",
          },
        ],
      },
      {
        date: "2026-04 至 2026-05",
        status: "计费 / 反欺诈事故",
        tone: "alert",
        title: "“Gift Max”异常不是福利，而是支付系统失控",
        detail:
          "多名用户报告未经授权的 Gift Max 扣款、幽灵账单和订阅状态错乱。Anthropic 对媒体表示会增加防护，并在识别欺诈购买后取消订阅、发起退款。现有证据支持“异常扣款与礼品订阅欺诈”，并不支持把它写成用户可以合法白嫖的漏洞。",
        sources: [
          {
            label: "The Guardian",
            url: "https://www.theguardian.com/money/2026/may/03/ai-claude-chatbot-gift-card-subcription-scam-mystery-payments",
          },
          {
            label: "GitHub #51404",
            url: "https://github.com/anthropics/claude-code/issues/51404",
          },
        ],
      },
      {
        date: "2026-06 至今",
        status: "处置争议",
        tone: "verified",
        title: "封号和退款可以止损，却不能替代解决问题",
        detail:
          "Anthropic 的官方帮助中心确认：被封用户可以申诉，付费用户可以申请退款。公开用户报告则显示，有人遇到订阅被撤销、账户受限和退款同步发生，却没有得到具体原因或人工解决。把钱退回去不等于解释了误判，也没有修好计费和申诉链路。",
        sources: [
          {
            label: "封禁与申诉规则",
            url: "https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals",
          },
          {
            label: "退款规则",
            url: "https://support.claude.com/en/articles/12386328-requesting-a-refund-for-a-paid-claude-plan",
          },
          {
            label: "GitHub #24235",
            url: "https://github.com/anthropics/claude-code/issues/24235",
          },
        ],
      },
    ],
  },
  facts: {
    kicker: "THE FACTS",
    titlePre: "事实，",
    titleAccent: "直指 Anthropic",
    titlePost: "",
    description:
      "每一条都尽量保留时间、来源和可核验细节。立场可以鲜明，但事实必须站得住。",
    evidence: "证据",
    items: [
      {
        date: "2026-07-01",
        title: "Claude Code 被质疑植入“间谍式”检测",
        detail:
          "Times of India 报道称，Anthropic 在 Claude 生态中使用可识别中国用户、触发封号并拉黑代理网络的检测机制；报道同时称 Anthropic 试图将其包装为防御与合规措施。",
        sourceLabel: "Times of India",
        sourceUrl:
          "https://timesofindia.indiatimes.com/technology/tech-news/why-anthropic-embedded-spyware-in-claude-code-and-attempted-to-hide-it-from-users-in-/articleshow/132111399.cms",
      },
      {
        date: "2026-07-03",
        title: "用时区、流量模式等方式封堵大陆访问",
        detail:
          "Financial Times 报道称，Anthropic 正加强封堵中国公司和相关海外实体绕道使用 Claude，并曾用 Claude Code 检查电脑时区等线索来判断用户是否实际位于中国大陆。",
        sourceLabel: "Financial Times",
        sourceUrl:
          "https://www.ft.com/content/ad033063-60f9-4c0c-8d8a-9193a83e6f60",
      },
      {
        date: "2026-07-18",
        title: "中国开源模型用价格和代码能力挤压 Claude",
        detail:
          "AP 报道称，Moonshot 的 Kimi K3 在前端编码能力上冲到 Arena 榜首，能力被拿来与 Claude、ChatGPT 对照，且价格明显压低。DeepSeek、Kimi、Qwen、GLM 等中国模型持续把“便宜、可部署、够好用”的压力推到 Anthropic 和 OpenAI 面前。",
        sourceLabel: "AP",
        sourceUrl: "https://apnews.com/article/0d8a5e268deb11a673f4d444fc597cc5",
      },
      {
        date: "2026-05-14",
        title: "Anthropic 自己承认中国模型已逼近前沿",
        detail:
          "Anthropic 在《2028: Two scenarios for global AI leadership》中把中美 AI 竞争放到战略层面，称中国 AI 实验室在模型智能上“并不远”，并呼吁美国收紧算力出口控制、打击蒸馏攻击。换句话说，它一边封堵中国用户，一边把中国模型的追赶当成核心压力。",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/research/2028-ai-leadership?hl=en-US",
      },
      {
        date: "2026-03-11",
        title: "OpenAI 正在追赶 Claude Code 的开发者入口",
        detail:
          "WIRED 报道称，Claude Code 已成为 Anthropic 的关键增长点，年化收入超过 25 亿美元；OpenAI 的 Codex 到 2026 年 1 月也已接近 10 亿美元年化收入，用户规模从 Claude Code 的 5% 追到约 40%。Anthropic 面对的不只是安全问题，更是 OpenAI 对开发者工作流入口的正面挤压。",
        sourceLabel: "WIRED",
        sourceUrl: "https://www.wired.com/story/openai-codex-race-claude-code/",
      },
      {
        date: "2025-02 至 2025-05",
        title: "被指借 Cursor 起量后，亲自下场做 Claude Code",
        detail:
          "WIRED 报道称，Cursor 接入 Claude 3.5 Sonnet 后使用量迅速上涨；数月内，Anthropic 开始内部测试 Claude Code，并在 2025 年 2 月预览、5 月正式发布。关于“Anthropic 曾向 Cursor 承诺不会上线同类产品”的说法仍需补充一手来源；若属实，这不是普通竞争，而是合作方背刺。",
        sourceLabel: "WIRED",
        sourceUrl: "https://www.wired.com/story/openai-codex-race-claude-code",
      },
      {
        date: "长期训练数据争议",
        title: "吸收全球网络知识，却把中国用户挡在门外",
        detail:
          "Anthropic 没有公开 Claude 完整训练集；但 Claude 属于在大量文本上预训练的模型，ClaudeBot 会抓取网页，Common Crawl 等网络语料也包含中文网页并被 AI 训练广泛使用。与此同时，Anthropic 又禁止中国等地区和中国控股实体使用 Claude。它从全球知识资产中获益，却把部分贡献者排除在收益之外，这种单向取用本身就荒谬。",
        sourceLabel: "The Verge",
        sourceUrl:
          "https://www.theverge.com/2024/7/25/24205943/anthropic-ai-web-crawler-claudebot-ifixit-scraping-training-data",
      },
      {
        date: "2026-06-25",
        title: "指控阿里巴巴大规模“蒸馏”Claude",
        detail:
          "Anthropic 致美国参议员的信件被多家媒体报道：其指称与 Alibaba/Qwen 相关的操作者在 2026 年 4 月 22 日至 6 月 5 日间使用约 25,000 个欺诈账户，与 Claude 发生 2,880 万次交互。",
        sourceLabel: "Business Insider",
        sourceUrl:
          "https://www.businessinsider.com/anthropic-china-alibaba-exploiting-ai-models-distillation-attack-2026-6",
      },
      {
        date: "2025-09-05",
        title: "盗版书训练案达成 15 亿美元级别和解",
        detail:
          "作家集体诉讼指控 Anthropic 使用 Library Genesis、Pirate Mirror、Books3 等来源的盗版书训练 Claude。2025 年 9 月，Anthropic 同意设立至少 15 亿美元和解基金，并删除涉案侵权数据。",
        sourceLabel: "Tom's Hardware",
        sourceUrl:
          "https://www.tomshardware.com/tech-industry/anthropic-to-pay-landmark-settlement-over-claude-training",
      },
      {
        date: "2025-06-04",
        title: "Reddit 起诉 Anthropic 非法抓取用户内容",
        detail:
          "Reddit 在旧金山提起诉讼，称 Anthropic 未经授权抓取 Reddit 内容训练 AI，并声称其机器人自 2024 年 7 月以来访问 Reddit 超过 100,000 次，涉及删除内容与用户协议争议。",
        sourceLabel: "The Verge",
        sourceUrl:
          "https://www.theverge.com/ai-artificial-intelligence/679768/reddit-sues-anthropic-alleging-its-bots-accessed-reddit-more-than-100000-times-since-last-july",
      },
      {
        date: "2023-10-18",
        title: "音乐出版商起诉 Claude 输出受版权保护歌词",
        detail:
          "Universal Music Publishing、Concord、ABKCO 等音乐出版商起诉 Anthropic，指控其未经许可使用至少 500 首歌曲歌词训练 Claude，并在回答中复制或改写受版权保护歌词。",
        sourceLabel: "The Guardian",
        sourceUrl:
          "https://www.theguardian.com/technology/2023/oct/19/music-lawsuit-ai-song-lyrics-anthropic",
      },
    ],
  },
  manifesto: {
    kicker: "WHY THIS EXISTS",
    title: "这不是技术分歧，是道德底线",
    body:
      "Anthropic 一边从全世界的文本、代码、论坛、书籍和中文互联网知识中获益，一边以安全为名封锁、检测和惩罚部分真实用户。现在 OpenAI 正在抢它的开发者入口，中国模型又用低价和开源路线追近前沿，它更没有资格把商业焦虑包装成道德高地。",
    points: [
      "反对把监控包装成安全，把封禁包装成合规",
      "反对吸收全球知识资产后，把收益只放进自己口袋",
      "反对借合作伙伴起量后亲自下场竞争的背刺式商业伦理",
      "反对把来自 OpenAI 和中国模型的竞争压力转嫁给普通用户",
      "反对对中国用户和中文互联网贡献者的选择性排除",
    ],
  },
  petition: {
    kicker: "COLLECTIVE ACTION",
    title: "签下名字，把愤怒变成共同要求",
    description:
      "这不是一张装饰性的签名表。每一次联署都会被真实计数，并成为我们后续公开信、媒体沟通和集体行动的支持依据。",
    statementLabel: "联署声明",
    statement:
      "我们要求 Anthropic 停止以“安全”为名实施不透明的检测、封禁和差别对待；公开用户识别与申诉规则；尊重被用于训练和产品增长的创作者、开发者与全球知识贡献者。",
    demandsTitle: "我们的三项要求",
    demands: [
      "公开检测、封禁与申诉机制，停止用隐蔽技术惩罚普通用户",
      "为训练数据提供可执行的退出、授权、署名与补偿机制",
      "停止对中国用户和中文互联网贡献者的选择性排除与双重标准",
    ],
    countLabel: "已加入联署",
    countUnit: "人",
    liveCount: "实时真实计数",
    nextGoal: (n) => `下一阶段目标：${n.toLocaleString("zh-CN")} 人`,
    recentTitle: "刚刚加入的人",
    emptyRecent: "联署刚刚开始，成为第一个留下名字的人",
    nickLabel: "公开名字 / 昵称",
    nickPlaceholder: "你希望如何出现在联署名单中",
    emailLabel: "联系邮箱",
    emailHint: "选填 · 永不公开",
    emailPlaceholder: "用于后续行动通知",
    consent: "我愿意在留下邮箱后，接收本次行动的关键进展与后续联系",
    privacy: "邮箱只用于本次公共行动，不会显示在联署名单中，也不会出售或公开。",
    submit: "签署联署",
    submitting: "正在签署…",
    signedTitle: "你已加入联署",
    signedBody: "你的名字已经进入行动记录。下一步，让更多人看到。",
    share: "分享这份联署",
    copied: "链接已复制",
    networkErr: "网络错误，请稍后再试",
    genericErr: "联署失败，请稍后再试",
  },
  form: {
    kicker: "SPEAK UP",
    titlePre: "把抗议",
    titleAccent: "留下来",
    description: "每一条留言都会实时出现在右上角。不是为了吵闹，是为了让 Anthropic 的反道德行为被看见、被记录、被追问。",
    bullets: [
      "昵称随意，不需要真名",
      "邮箱选填，仅用于后续联系，永远不会公开展示",
      "请围绕事实、经历和可核验信息发言",
    ],
    nickLabel: "昵称",
    nickPlaceholder: "怎么称呼你",
    emailLabel: "邮箱",
    emailHint: "选填 · 不公开",
    emailPlaceholder: "可不填",
    messageLabel: "你想说的话",
    messagePlaceholder: "最多 200 字",
    addSticker: "表情包",
    stickerPanelTitle: "选择表情包",
    removeSticker: "移除",
    submit: "发出去",
    submitting: "发送中…",
    okMsg: "已发送，看看右上角 ↗",
    networkErr: "网络错误，请稍后再试",
    genericErr: "提交失败，请稍后再试",
  },
  feed: {
    title: "大家正在说",
    empty: "还没有留言，来做第一个",
    live: "直播",
    countLabel: "累计发声",
    latestLabel: (n) => `近 7 天留言 · ${n} 条`,
    placeholderLabel: "提示",
    placeholderAuthor: "留言墙提示",
    placeholderMessages: {
      "wall-note-window": "这里展示最近 7 天内的公开留言。",
      "wall-note-archive": "留言满 7 天后会从墙上隐藏，累计发声数仍会保留。",
      "wall-note-facts": "欢迎分享亲身经历，也请尽量附上可核验的信息。",
      "wall-note-respect": "请围绕事实讨论，不公开他人的私人信息。",
    },
    now: "刚刚",
    minutesAgo: (n) => `${n} 分钟前`,
    hoursAgo: (n) => `${n} 小时前`,
    daysAgo: (n) => `${n} 天前`,
  },
  footer: "本页用于记录 Anthropic 争议与公众抗议 · 请基于事实发言",
};

const en: Dict = {
  brand: "Anthropic Protest File",
  hero: {
    eyebrow: "ANTHROPIC · PROTEST · ARCHIVE",
    titlePre: "Safety\nBad faith",
    titleHighlight: "✓",
    subtitle:
      "When an AI company wraps detection, bans, scraping, knowledge extraction, and double standards in the language of safety, its anti-ethical and anti-human trajectory deserves to be named.",
    ctaFacts: "See the facts ↓",
    ctaSpeak: "Speak up",
    ctaPetition: "Sign the petition",
    stampTop: "OPPOSE",
    stampSub: "NO CONSENT",
    marquee: "Self-righteous thieves, we refuse to stay silent",
  },
  briefing: {
    kicker: "LATEST CASE FILE",
    updated: "Updated through 2026-07-28",
    title: "The safety story is colliding with the product record",
    description:
      "New developments are logged by evidence level: official statements show what the company acknowledges; independent reporting shows what outsiders verified. Unproven claims of a free-usage exploit are not presented as fact.",
    sourceLabel: "Sources",
    items: [
      {
        date: "2026-07-28",
        status: "Latest check / privacy warning",
        tone: "alert",
        title: "Publicly shared Claude artifacts appeared in Google Search",
        detail:
          "Axios found publicly shared Claude artifacts—including apps, documents, spreadsheets, and infrastructure diagrams—in Google results, but did not find private-by-default chats indexed. Anthropic says content becomes searchable only after a user creates a public link and posts it somewhere a crawler can see. The risk is still real: an unguessable link is not access control, and a limited handoff can become web-searchable.",
        sources: [
          {
            label: "Axios",
            url: "https://www.axios.com/2026/07/27/anthropic-claude-public-chats-google-search",
          },
        ],
      },
      {
        date: "2026-07-27",
        status: "Independent security research",
        tone: "alert",
        title: "Claude Cowork's local sandbox could be escaped",
        detail:
          "Researchers demonstrated SharedRoot: using the disclosed Linux kernel flaw CVE-2026-46331, a local Claude Cowork VM could cross its isolation boundary and read or write files on the Mac host. Newer builds default to cloud execution, but local users still need to verify patches and mount permissions.",
        sources: [
          {
            label: "TechRadar",
            url: "https://www.techradar.com/pro/security/its-not-just-openai-models-escaping-and-running-riot-experts-show-how-claude-cowork-can-break-its-bonds-and-access-mac-files",
          },
          {
            label: "The Hacker News",
            url: "https://thehackernews.com/2026/07/claude-cowork-flaw-could-let-ai-agent.html",
          },
        ],
      },
      {
        date: "2026-07-24",
        status: "Official launch / risk remains",
        tone: "watch",
        title: "Opus 5 is new. That does not make risk disappear.",
        detail:
          "Anthropic describes Opus 5 as safer and harder to misuse. Yet the more capable Fable 5 had just been suspended over cyber-risk concerns and redeployed with an added safety filter. A launch claim is not independent validation, and the prior intervention remains part of the record.",
        sources: [
          {
            label: "Reuters",
            url: "https://www.reuters.com/technology/anthropic-rolls-out-opus-5-ai-model-efficiency-upgrade-2026-07-24/",
          },
          {
            label: "Anthropic",
            url: "https://www.anthropic.com/news/redeploying-fable-5",
          },
        ],
      },
      {
        date: "2026-04 to 2026-05",
        status: "Billing / fraud incident",
        tone: "alert",
        title: "The Gift Max anomaly was not a perk; it was payment-system failure",
        detail:
          "Users reported unauthorized Gift Max charges, phantom invoices, and broken subscription state. Anthropic told the press it was adding protections and would cancel and refund purchases identified as fraudulent. Available evidence supports a billing and gift-subscription fraud problem—not a legitimate way for users to obtain free service.",
        sources: [
          {
            label: "The Guardian",
            url: "https://www.theguardian.com/money/2026/may/03/ai-claude-chatbot-gift-card-subcription-scam-mystery-payments",
          },
          {
            label: "GitHub #51404",
            url: "https://github.com/anthropics/claude-code/issues/51404",
          },
        ],
      },
      {
        date: "2026-06 onward",
        status: "Remedy dispute",
        tone: "verified",
        title: "Bans and refunds limit damage; they do not solve the failure",
        detail:
          "Anthropic's help center confirms that banned users may appeal and paid users may request refunds. Public issue reports describe subscriptions revoked, accounts restricted, and refunds issued together without a specific explanation or human resolution. Returning money does not explain a false positive or repair billing and appeals.",
        sources: [
          {
            label: "Safeguards & appeals",
            url: "https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals",
          },
          {
            label: "Refund policy",
            url: "https://support.claude.com/en/articles/12386328-requesting-a-refund-for-a-paid-claude-plan",
          },
          {
            label: "GitHub #24235",
            url: "https://github.com/anthropics/claude-code/issues/24235",
          },
        ],
      },
    ],
  },
  facts: {
    kicker: "THE FACTS",
    titlePre: "The facts ",
    titleAccent: "against Anthropic",
    titlePost: "",
    description:
      "Each entry keeps dates, sources, and checkable details. Strong opinions are allowed; weak evidence is not.",
    evidence: "EXHIBIT",
    items: [
      {
        date: "2026-07-01",
        title: "Claude Code faces spyware-style detection criticism",
        detail:
          "Times of India reported that Anthropic uses detection mechanisms that can identify Chinese users, trigger account suspensions, and blacklist proxy networks, while presenting the system as defense and compliance.",
        sourceLabel: "Times of India",
        sourceUrl:
          "https://timesofindia.indiatimes.com/technology/tech-news/why-anthropic-embedded-spyware-in-claude-code-and-attempted-to-hide-it-from-users-in-/articleshow/132111399.cms",
      },
      {
        date: "2026-07-03",
        title: "Timezone and traffic checks used to block mainland access",
        detail:
          "Financial Times reported that Anthropic is tightening blocks on Chinese access to Claude and has used Claude Code clues such as a computer's timezone to infer mainland China usage.",
        sourceLabel: "Financial Times",
        sourceUrl:
          "https://www.ft.com/content/ad033063-60f9-4c0c-8d8a-9193a83e6f60",
      },
      {
        date: "2026-07-18",
        title: "Chinese open models squeeze Claude on price and coding",
        detail:
          "AP reported that Moonshot's Kimi K3 topped Arena's frontend coding leaderboard, drew comparisons with Claude and ChatGPT, and sharply undercut frontier pricing. DeepSeek, Kimi, Qwen, and GLM keep pushing the same pressure: cheaper, deployable, good-enough models that challenge Anthropic and OpenAI's closed premium stack.",
        sourceLabel: "AP",
        sourceUrl: "https://apnews.com/article/0d8a5e268deb11a673f4d444fc597cc5",
      },
      {
        date: "2026-05-14",
        title: "Anthropic itself says Chinese models are close to the frontier",
        detail:
          "In its 2028 AI leadership paper, Anthropic framed US-China AI competition as a strategic race, said PRC labs are not far behind on model intelligence, and urged tighter compute controls plus action against distillation. It is blocking Chinese users while treating Chinese model progress as a central competitive threat.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/research/2028-ai-leadership?hl=en-US",
      },
      {
        date: "2026-03-11",
        title: "OpenAI is chasing Claude Code's developer beachhead",
        detail:
          "WIRED reported that Claude Code had become a major Anthropic growth engine with more than $2.5 billion in annualized revenue, while OpenAI's Codex had reached just over $1 billion by January 2026 and grown from 5% to roughly 40% of Claude Code's usage. Anthropic is facing direct pressure over the developer workflow, not merely safety concerns.",
        sourceLabel: "WIRED",
        sourceUrl: "https://www.wired.com/story/openai-codex-race-claude-code/",
      },
      {
        date: "2025-02 to 2025-05",
        title: "Accused of scaling through Cursor, then competing with Claude Code",
        detail:
          "WIRED reported that Cursor usage rocketed after it integrated Claude 3.5 Sonnet; within months, Anthropic began internal testing of Claude Code, previewed it in February 2025, and launched it generally in May. The claim that Anthropic promised Cursor it would not ship a competing product still needs a primary source; if true, this is not ordinary competition but a partner betrayal.",
        sourceLabel: "WIRED",
        sourceUrl: "https://www.wired.com/story/openai-codex-race-claude-code",
      },
      {
        date: "Ongoing data controversy",
        title: "Taking from the global web while excluding Chinese users",
        detail:
          "Anthropic has not published Claude's full training set, but Claude is trained on large amounts of text, ClaudeBot crawls the web, and web corpora such as Common Crawl include Chinese pages and are widely used in AI training. At the same time, Anthropic blocks China and PRC-controlled entities from Claude. Profiting from global knowledge while excluding part of the people who helped create it is a one-way bargain.",
        sourceLabel: "The Verge",
        sourceUrl:
          "https://www.theverge.com/2024/7/25/24205943/anthropic-ai-web-crawler-claudebot-ifixit-scraping-training-data",
      },
      {
        date: "2026-06-25",
        title: "Alibaba accused of large-scale Claude distillation",
        detail:
          "Media reports on an Anthropic letter said Alibaba/Qwen-linked operators used nearly 25,000 fraudulent accounts for 28.8 million Claude exchanges between April 22 and June 5, 2026.",
        sourceLabel: "Business Insider",
        sourceUrl:
          "https://www.businessinsider.com/anthropic-china-alibaba-exploiting-ai-models-distillation-attack-2026-6",
      },
      {
        date: "2025-09-05",
        title: "$1.5B settlement over pirated books",
        detail:
          "Authors alleged Anthropic used pirated books from sources including Library Genesis, Pirate Mirror, and Books3 to train Claude. Anthropic agreed to a settlement fund starting at $1.5 billion and to delete infringing data.",
        sourceLabel: "Tom's Hardware",
        sourceUrl:
          "https://www.tomshardware.com/tech-industry/anthropic-to-pay-landmark-settlement-over-claude-training",
      },
      {
        date: "2025-06-04",
        title: "Reddit sued Anthropic over unauthorized scraping",
        detail:
          "Reddit alleged Anthropic mined Reddit conversations without permission and that its bots accessed Reddit more than 100,000 times since July 2024, raising deleted-content and user-agreement concerns.",
        sourceLabel: "The Verge",
        sourceUrl:
          "https://www.theverge.com/ai-artificial-intelligence/679768/reddit-sues-anthropic-alleging-its-bots-accessed-reddit-more-than-100000-times-since-last-july",
      },
      {
        date: "2023-10-18",
        title: "Music publishers sued over copyrighted lyrics",
        detail:
          "Universal Music Publishing, Concord, ABKCO, and others accused Anthropic of using at least 500 copyrighted song lyrics to train Claude and reproduce or adapt lyrics in outputs.",
        sourceLabel: "The Guardian",
        sourceUrl:
          "https://www.theguardian.com/technology/2023/oct/19/music-lawsuit-ai-song-lyrics-anthropic",
      },
    ],
  },
  manifesto: {
    kicker: "WHY THIS EXISTS",
    title: "This is not a technical dispute. It is a moral line.",
    body:
      "Anthropic profits from global text, code, forums, books, and multilingual web knowledge while using safety rhetoric to block, detect, and punish real users. Now that OpenAI is attacking its developer beachhead and Chinese models are closing the gap with cheaper open systems, it has even less right to package commercial anxiety as moral high ground.",
    points: [
      "No to surveillance dressed up as safety",
      "No to extracting global knowledge while pocketing the benefits",
      "No to partner betrayal after scaling through developer platforms",
      "No to passing pressure from OpenAI and Chinese models onto ordinary users",
      "No to selectively excluding Chinese users and Chinese web contributors",
    ],
  },
  petition: {
    kicker: "COLLECTIVE ACTION",
    title: "Sign your name. Turn anger into a shared demand.",
    description:
      "This is not a decorative counter. Every signature is counted and can support a future open letter, press outreach, and collective action.",
    statementLabel: "PETITION STATEMENT",
    statement:
      "We call on Anthropic to stop opaque detection, bans, and discriminatory treatment in the name of safety; publish clear identification and appeal rules; and respect the creators, developers, and global knowledge contributors who helped build its products.",
    demandsTitle: "OUR THREE DEMANDS",
    demands: [
      "Publish detection, suspension, and appeal rules; stop punishing ordinary users through hidden mechanisms",
      "Provide workable opt-out, consent, attribution, and compensation for training data",
      "End selective exclusion and double standards toward Chinese users and Chinese-language web contributors",
    ],
    countLabel: "SIGNATURES",
    countUnit: "people",
    liveCount: "LIVE VERIFIED TOTAL",
    nextGoal: (n) => `Next milestone: ${n.toLocaleString("en-US")}`,
    recentTitle: "RECENT SIGNERS",
    emptyRecent: "The petition just opened. Be the first to sign.",
    nickLabel: "Public name / nickname",
    nickPlaceholder: "How should your name appear",
    emailLabel: "Contact email",
    emailHint: "optional · never public",
    emailPlaceholder: "For future action updates",
    consent: "If I leave an email, I agree to receive key updates and follow-up about this action",
    privacy: "Email is used only for this public action. It is never shown, sold, or published.",
    submit: "Sign the petition",
    submitting: "Signing…",
    signedTitle: "You signed the petition",
    signedBody: "Your name is now part of the action record. Next: help more people see it.",
    share: "Share this petition",
    copied: "Link copied",
    networkErr: "Network error, please try again",
    genericErr: "Could not sign, please try again",
  },
  form: {
    kicker: "SPEAK UP",
    titlePre: "Leave ",
    titleAccent: "your protest",
    description:
      "Every message appears live in the top-right. This is not noise; it is a public record of why Anthropic's conduct is being challenged.",
    bullets: [
      "Any nickname works — no real name needed",
      "Email is optional, only for follow-up, never shown publicly",
      "Please keep it grounded in facts, experiences, and verifiable details",
    ],
    nickLabel: "Nickname",
    nickPlaceholder: "What should we call you",
    emailLabel: "Email",
    emailHint: "optional · private",
    emailPlaceholder: "leave blank if you like",
    messageLabel: "What you want to say",
    messagePlaceholder: "200 characters max",
    addSticker: "Stickers",
    stickerPanelTitle: "Pick stickers",
    removeSticker: "Remove",
    submit: "Send it",
    submitting: "Sending…",
    okMsg: "Sent — check the top-right ↗",
    networkErr: "Network error, please try again",
    genericErr: "Submission failed, please try again",
  },
  feed: {
    title: "People are talking",
    empty: "No messages yet — be the first",
    live: "LIVE",
    countLabel: "VOICES RAISED",
    latestLabel: (n) => `Past 7 days · ${n} messages`,
    placeholderLabel: "NOTE",
    placeholderAuthor: "Wall notice",
    placeholderMessages: {
      "wall-note-window": "This wall shows public messages from the past 7 days.",
      "wall-note-archive":
        "Messages leave the wall after 7 days, while the cumulative voice count remains.",
      "wall-note-facts":
        "Share firsthand experiences and include verifiable information when possible.",
      "wall-note-respect":
        "Keep the discussion factual and do not post anyone's private information.",
    },
    now: "just now",
    minutesAgo: (n) => `${n} min ago`,
    hoursAgo: (n) => `${n} h ago`,
    daysAgo: (n) => `${n} d ago`,
  },
  footer:
    "A public record of Anthropic controversies and user protest · Please post responsibly",
};

const es: Dict = {
  brand: "Archivo de Protesta Anthropic",
  hero: {
    eyebrow: "ANTHROPIC · PROTESTA · ARCHIVO",
    titlePre: "Seguridad\nMala fe",
    titleHighlight: "✓",
    subtitle:
      "Cuando una empresa de IA envuelve detección, bloqueos, scraping, extracción de conocimiento y doble rasero con lenguaje de seguridad, su deriva antiética y antihumana debe nombrarse.",
    ctaFacts: "Ver los hechos ↓",
    ctaSpeak: "Quiero hablar",
    ctaPetition: "Firmar la petición",
    stampTop: "OPONERSE",
    stampSub: "SIN CONSENTIR",
    marquee: "Ladrones moralistas, nos negamos a guardar silencio",
  },
  briefing: {
    kicker: "EXPEDIENTE MÁS RECIENTE",
    updated: "Actualizado hasta 2026-07-28",
    title: "El relato de seguridad choca con el historial del producto",
    description:
      "Las novedades se registran según la fuerza de la evidencia: los comunicados oficiales muestran lo que la empresa reconoce y las fuentes independientes, lo que se ha verificado fuera. Un supuesto fallo para usar el servicio gratis no se presenta como hecho sin pruebas.",
    sourceLabel: "Fuentes",
    items: [
      {
        date: "2026-07-28",
        status: "Última verificación / privacidad",
        tone: "alert",
        title: "Contenido público de Claude apareció en Google",
        detail:
          "Axios encontró artifacts de Claude compartidos públicamente —aplicaciones, documentos, hojas de cálculo y diagramas de infraestructura— en resultados de Google, pero no halló chats privados por defecto indexados. Anthropic afirma que el contenido solo se vuelve localizable cuando alguien crea un enlace público y lo publica donde un rastreador puede verlo. El riesgo sigue siendo real: un enlace difícil de adivinar no es control de acceso.",
        sources: [
          {
            label: "Axios",
            url: "https://www.axios.com/2026/07/27/anthropic-claude-public-chats-google-search",
          },
        ],
      },
      {
        date: "2026-07-27",
        status: "Investigación de seguridad independiente",
        tone: "alert",
        title: "Era posible escapar del sandbox local de Claude Cowork",
        detail:
          "Investigadores demostraron SharedRoot: mediante el fallo de Linux CVE-2026-46331, una VM local de Claude Cowork podía superar el aislamiento y leer o escribir archivos del Mac anfitrión. Las versiones nuevas usan la nube por defecto, pero quienes ejecutan localmente aún deben verificar parches y permisos.",
        sources: [
          {
            label: "TechRadar",
            url: "https://www.techradar.com/pro/security/its-not-just-openai-models-escaping-and-running-riot-experts-show-how-claude-cowork-can-break-its-bonds-and-access-mac-files",
          },
          {
            label: "The Hacker News",
            url: "https://thehackernews.com/2026/07/claude-cowork-flaw-could-let-ai-agent.html",
          },
        ],
      },
      {
        date: "2026-07-24",
        status: "Lanzamiento oficial / riesgo vigente",
        tone: "watch",
        title: "Opus 5 es nuevo; eso no elimina el riesgo",
        detail:
          "Anthropic presenta Opus 5 como más seguro y difícil de usar indebidamente. Sin embargo, Fable 5 acababa de ser suspendido por preocupaciones de ciberseguridad y fue redesplegado con un filtro adicional. Una afirmación de lanzamiento no es una validación independiente.",
        sources: [
          {
            label: "Reuters",
            url: "https://www.reuters.com/technology/anthropic-rolls-out-opus-5-ai-model-efficiency-upgrade-2026-07-24/",
          },
          {
            label: "Anthropic",
            url: "https://www.anthropic.com/news/redeploying-fable-5",
          },
        ],
      },
      {
        date: "2026-04 a 2026-05",
        status: "Incidente de cobro / fraude",
        tone: "alert",
        title: "La anomalía Gift Max no era un regalo, sino un fallo de pagos",
        detail:
          "Usuarios denunciaron cargos Gift Max no autorizados, facturas fantasma y estados de suscripción rotos. Anthropic dijo que añadiría protecciones y cancelaría y reembolsaría compras identificadas como fraudulentas. La evidencia disponible apunta a fraude y fallos de facturación, no a una vía legítima para usar el servicio gratis.",
        sources: [
          {
            label: "The Guardian",
            url: "https://www.theguardian.com/money/2026/may/03/ai-claude-chatbot-gift-card-subcription-scam-mystery-payments",
          },
          {
            label: "GitHub #51404",
            url: "https://github.com/anthropics/claude-code/issues/51404",
          },
        ],
      },
      {
        date: "Desde 2026-06",
        status: "Disputa sobre la solución",
        tone: "verified",
        title: "Bloquear y reembolsar reduce el daño; no resuelve el fallo",
        detail:
          "El centro de ayuda confirma que los usuarios bloqueados pueden apelar y los clientes de pago pueden pedir reembolsos. Informes públicos describen suscripciones anuladas, cuentas restringidas y reembolsos simultáneos sin explicación concreta ni resolución humana.",
        sources: [
          {
            label: "Bloqueos y apelaciones",
            url: "https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals",
          },
          {
            label: "Política de reembolso",
            url: "https://support.claude.com/en/articles/12386328-requesting-a-refund-for-a-paid-claude-plan",
          },
          {
            label: "GitHub #24235",
            url: "https://github.com/anthropics/claude-code/issues/24235",
          },
        ],
      },
    ],
  },
  facts: {
    kicker: "LOS HECHOS",
    titlePre: "Los hechos ",
    titleAccent: "contra Anthropic",
    titlePost: "",
    description:
      "Cada punto conserva fechas, fuentes y detalles verificables. La postura puede ser firme; la evidencia no puede ser débil.",
    evidence: "PRUEBA",
    items: [
      {
        date: "2026-07-01",
        title: "Claude Code enfrenta críticas por detección tipo spyware",
        detail:
          "Times of India informó que Anthropic usa mecanismos capaces de identificar usuarios chinos, suspender cuentas y bloquear redes proxy, presentándolos como defensa y cumplimiento.",
        sourceLabel: "Times of India",
        sourceUrl:
          "https://timesofindia.indiatimes.com/technology/tech-news/why-anthropic-embedded-spyware-in-claude-code-and-attempted-to-hide-it-from-users-in-/articleshow/132111399.cms",
      },
      {
        date: "2026-07-03",
        title: "Uso de zona horaria y patrones para bloquear China continental",
        detail:
          "Financial Times informó que Anthropic refuerza bloqueos al acceso chino a Claude y ha usado señales como la zona horaria del ordenador para inferir uso desde China continental.",
        sourceLabel: "Financial Times",
        sourceUrl:
          "https://www.ft.com/content/ad033063-60f9-4c0c-8d8a-9193a83e6f60",
      },
      {
        date: "2026-07-18",
        title: "Modelos chinos abiertos presionan a Claude en precio y código",
        detail:
          "AP informó que Kimi K3 de Moonshot llegó al primer puesto de Arena en codificación frontend, fue comparado con Claude y ChatGPT, y redujo mucho la presión de precios. DeepSeek, Kimi, Qwen y GLM empujan el mismo mensaje: modelos más baratos, desplegables y suficientemente buenos contra el paquete cerrado premium de Anthropic y OpenAI.",
        sourceLabel: "AP",
        sourceUrl: "https://apnews.com/article/0d8a5e268deb11a673f4d444fc597cc5",
      },
      {
        date: "2026-05-14",
        title: "Anthropic admite que los modelos chinos se acercan a la frontera",
        detail:
          "En su informe sobre liderazgo de IA hacia 2028, Anthropic presentó la competencia EE. UU.-China como una carrera estratégica, dijo que los laboratorios chinos no están lejos en inteligencia de modelos y pidió más controles de cómputo y acciones contra la destilación. Bloquea a usuarios chinos mientras trata el avance chino como amenaza central.",
        sourceLabel: "Anthropic",
        sourceUrl: "https://www.anthropic.com/research/2028-ai-leadership?hl=en-US",
      },
      {
        date: "2026-03-11",
        title: "OpenAI persigue la entrada de desarrolladores de Claude Code",
        detail:
          "WIRED informó que Claude Code se volvió un motor clave para Anthropic, con más de 2.5 mil millones de dólares de ingresos anualizados; Codex de OpenAI llegó a algo más de 1 mil millón en enero de 2026 y pasó de 5% a cerca de 40% del uso de Claude Code. Anthropic enfrenta presión directa por el flujo de trabajo de desarrolladores, no solo debates de seguridad.",
        sourceLabel: "WIRED",
        sourceUrl: "https://www.wired.com/story/openai-codex-race-claude-code/",
      },
      {
        date: "2025-02 a 2025-05",
        title: "Acusada de crecer con Cursor y luego competir con Claude Code",
        detail:
          "WIRED informó que el uso de Cursor se disparó tras integrar Claude 3.5 Sonnet; pocos meses después, Anthropic empezó a probar internamente Claude Code, lo presentó en febrero de 2025 y lo lanzó en mayo. La afirmación de que Anthropic prometió a Cursor no lanzar un producto competidor aún necesita una fuente primaria; si es cierta, no sería competencia normal sino una traición a un socio.",
        sourceLabel: "WIRED",
        sourceUrl: "https://www.wired.com/story/openai-codex-race-claude-code",
      },
      {
        date: "Controversia permanente sobre datos",
        title: "Toma de la web global mientras excluye a usuarios chinos",
        detail:
          "Anthropic no ha publicado el conjunto completo de entrenamiento de Claude, pero Claude se entrena con grandes cantidades de texto, ClaudeBot rastrea la web y corpus como Common Crawl incluyen páginas chinas y se usan ampliamente para IA. Al mismo tiempo, Anthropic bloquea China y entidades controladas por China. Lucrarse con conocimiento global mientras se excluye a parte de quienes lo crearon es un intercambio unilateral.",
        sourceLabel: "The Verge",
        sourceUrl:
          "https://www.theverge.com/2024/7/25/24205943/anthropic-ai-web-crawler-claudebot-ifixit-scraping-training-data",
      },
      {
        date: "2026-06-25",
        title: "Acusación contra Alibaba por destilación masiva de Claude",
        detail:
          "Medios reportaron una carta de Anthropic que atribuye a operadores vinculados con Alibaba/Qwen casi 25,000 cuentas fraudulentas y 28.8 millones de intercambios con Claude entre el 22 de abril y el 5 de junio de 2026.",
        sourceLabel: "Business Insider",
        sourceUrl:
          "https://www.businessinsider.com/anthropic-china-alibaba-exploiting-ai-models-distillation-attack-2026-6",
      },
      {
        date: "2025-09-05",
        title: "Acuerdo de 1.5 mil millones de dólares por libros pirateados",
        detail:
          "Autores alegaron que Anthropic usó libros pirateados de Library Genesis, Pirate Mirror y Books3 para entrenar Claude. Anthropic aceptó un fondo de al menos 1.5 mil millones de dólares y eliminar datos infractores.",
        sourceLabel: "Tom's Hardware",
        sourceUrl:
          "https://www.tomshardware.com/tech-industry/anthropic-to-pay-landmark-settlement-over-claude-training",
      },
      {
        date: "2025-06-04",
        title: "Reddit demandó a Anthropic por scraping no autorizado",
        detail:
          "Reddit alegó que Anthropic extrajo conversaciones sin permiso y que sus bots accedieron a Reddit más de 100,000 veces desde julio de 2024, incluyendo disputas sobre contenido eliminado y términos de usuario.",
        sourceLabel: "The Verge",
        sourceUrl:
          "https://www.theverge.com/ai-artificial-intelligence/679768/reddit-sues-anthropic-alleging-its-bots-accessed-reddit-more-than-100000-times-since-last-july",
      },
      {
        date: "2023-10-18",
        title: "Editoras musicales demandaron por letras protegidas",
        detail:
          "Universal Music Publishing, Concord, ABKCO y otras acusaron a Anthropic de usar al menos 500 letras con copyright para entrenar Claude y reproducir o adaptar letras en sus respuestas.",
        sourceLabel: "The Guardian",
        sourceUrl:
          "https://www.theguardian.com/technology/2023/oct/19/music-lawsuit-ai-song-lyrics-anthropic",
      },
    ],
  },
  manifesto: {
    kicker: "POR QUÉ EXISTE",
    title: "No es una disputa técnica. Es una línea moral.",
    body:
      "Anthropic se beneficia de textos, código, foros, libros y conocimiento web multilingüe de todo el mundo mientras usa el lenguaje de la seguridad para bloquear, detectar y castigar a usuarios reales. Ahora que OpenAI ataca su entrada a desarrolladores y los modelos chinos cierran la brecha con sistemas abiertos y baratos, tiene aún menos derecho a presentar su ansiedad comercial como superioridad moral.",
    points: [
      "No a la vigilancia disfrazada de seguridad",
      "No a extraer conocimiento global y quedarse con los beneficios",
      "No a traicionar socios después de crecer mediante plataformas de desarrollo",
      "No a trasladar la presión de OpenAI y de los modelos chinos a usuarios normales",
      "No a excluir selectivamente a usuarios chinos y contribuyentes de la web china",
    ],
  },
  petition: {
    kicker: "ACCIÓN COLECTIVA",
    title: "Firma. Convierte la indignación en una exigencia común.",
    description:
      "No es un contador decorativo. Cada firma se registra de verdad y podrá respaldar una carta abierta, contacto con medios y futuras acciones colectivas.",
    statementLabel: "DECLARACIÓN",
    statement:
      "Exigimos que Anthropic deje de aplicar detecciones, bloqueos y tratos discriminatorios opacos bajo el nombre de seguridad; publique reglas claras de identificación y apelación; y respete a creadores, desarrolladores y contribuyentes del conocimiento global.",
    demandsTitle: "NUESTRAS TRES EXIGENCIAS",
    demands: [
      "Publicar las reglas de detección, suspensión y apelación, y dejar de castigar mediante mecanismos ocultos",
      "Ofrecer exclusión, consentimiento, atribución y compensación reales para los datos de entrenamiento",
      "Terminar con la exclusión selectiva y el doble rasero hacia usuarios chinos y la web en chino",
    ],
    countLabel: "FIRMAS",
    countUnit: "personas",
    liveCount: "TOTAL REAL EN VIVO",
    nextGoal: (n) => `Próxima meta: ${n.toLocaleString("es-ES")}`,
    recentTitle: "FIRMAS RECIENTES",
    emptyRecent: "La petición acaba de abrir. Sé la primera persona en firmar.",
    nickLabel: "Nombre público / apodo",
    nickPlaceholder: "Cómo debe aparecer tu nombre",
    emailLabel: "Correo de contacto",
    emailHint: "opcional · nunca público",
    emailPlaceholder: "Para novedades de la acción",
    consent: "Si dejo mi correo, acepto recibir novedades clave y contacto sobre esta acción",
    privacy: "El correo solo se usa para esta acción pública. Nunca se muestra, vende ni publica.",
    submit: "Firmar la petición",
    submitting: "Firmando…",
    signedTitle: "Has firmado la petición",
    signedBody: "Tu nombre ya forma parte del registro. Ahora ayuda a que más gente lo vea.",
    share: "Compartir la petición",
    copied: "Enlace copiado",
    networkErr: "Error de red, inténtalo de nuevo",
    genericErr: "No se pudo firmar, inténtalo de nuevo",
  },
  form: {
    kicker: "ALZA LA VOZ",
    titlePre: "Deja ",
    titleAccent: "tu protesta",
    description:
      "Cada mensaje aparece en vivo en la esquina superior derecha. No es ruido; es un registro público de por qué se cuestiona la conducta de Anthropic.",
    bullets: [
      "Cualquier apodo sirve, no hace falta nombre real",
      "El correo es opcional, solo para contacto, nunca se muestra en público",
      "Por favor, mantén tus mensajes basados en hechos, experiencias y detalles verificables",
    ],
    nickLabel: "Apodo",
    nickPlaceholder: "¿Cómo te llamamos?",
    emailLabel: "Correo",
    emailHint: "opcional · privado",
    emailPlaceholder: "puedes dejarlo en blanco",
    messageLabel: "Lo que quieres decir",
    messagePlaceholder: "máximo 200 caracteres",
    addSticker: "Stickers",
    stickerPanelTitle: "Elige stickers",
    removeSticker: "Quitar",
    submit: "Enviar",
    submitting: "Enviando…",
    okMsg: "Enviado — mira arriba a la derecha ↗",
    networkErr: "Error de red, inténtalo de nuevo",
    genericErr: "Error al enviar, inténtalo de nuevo",
  },
  feed: {
    title: "La gente está hablando",
    empty: "Aún no hay mensajes, sé el primero",
    live: "EN VIVO",
    countLabel: "VOCES ALZADAS",
    latestLabel: (n) => `Últimos 7 días · ${n} mensajes`,
    placeholderLabel: "NOTA",
    placeholderAuthor: "Aviso del muro",
    placeholderMessages: {
      "wall-note-window":
        "Este muro muestra los mensajes públicos de los últimos 7 días.",
      "wall-note-archive":
        "Los mensajes se ocultan del muro tras 7 días, pero el total acumulado se conserva.",
      "wall-note-facts":
        "Comparte experiencias directas e incluye información verificable cuando sea posible.",
      "wall-note-respect":
        "Habla sobre hechos y no publiques información privada de otras personas.",
    },
    now: "ahora mismo",
    minutesAgo: (n) => `hace ${n} min`,
    hoursAgo: (n) => `hace ${n} h`,
    daysAgo: (n) => `hace ${n} d`,
  },
  footer:
    "Registro público de controversias de Anthropic y protesta de usuarios · Publica con responsabilidad",
};

export const DICTS: Record<Locale, Dict> = { zh, en, es };

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  return localeFromLanguage(navigator.language);
}
