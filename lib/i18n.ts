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

export interface Dict {
  brand: string;
  hero: {
    eyebrow: string;
    titlePre: string; // 可含 \n
    titleHighlight: string;
    subtitle: string;
    ctaFacts: string;
    ctaSpeak: string;
    stampTop: string;
    stampSub: string;
    marquee: string;
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
    stampTop: "抗议",
    stampSub: "NO CONSENT",
    marquee: "自以为是的小偷，我们拒绝沉默",
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
      "Anthropic 一边从全世界的文本、代码、论坛、书籍和中文互联网知识中获益，一边以安全为名封锁、检测和惩罚部分真实用户。我们反对这种把公共知识私有化、把商业利益伪装成道德高地的行为。",
    points: [
      "反对把监控包装成安全，把封禁包装成合规",
      "反对吸收全球知识资产后，把收益只放进自己口袋",
      "反对借合作伙伴起量后亲自下场竞争的背刺式商业伦理",
      "反对对中国用户和中文互联网贡献者的选择性排除",
    ],
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
    stampTop: "OPPOSE",
    stampSub: "NO CONSENT",
    marquee: "Self-righteous thieves, we refuse to stay silent",
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
      "Anthropic profits from global text, code, forums, books, and multilingual web knowledge while using safety rhetoric to block, detect, and punish real users. We reject the privatization of public knowledge and the conversion of commercial interest into moral theater.",
    points: [
      "No to surveillance dressed up as safety",
      "No to extracting global knowledge while pocketing the benefits",
      "No to partner betrayal after scaling through developer platforms",
      "No to selectively excluding Chinese users and Chinese web contributors",
    ],
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
    stampTop: "OPONERSE",
    stampSub: "SIN CONSENTIR",
    marquee: "Ladrones moralistas, nos negamos a guardar silencio",
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
      "Anthropic se beneficia de textos, código, foros, libros y conocimiento web multilingüe de todo el mundo mientras usa el lenguaje de la seguridad para bloquear, detectar y castigar a usuarios reales. Rechazamos la privatización del conocimiento público y la conversión del interés comercial en teatro moral.",
    points: [
      "No a la vigilancia disfrazada de seguridad",
      "No a extraer conocimiento global y quedarse con los beneficios",
      "No a traicionar socios después de crecer mediante plataformas de desarrollo",
      "No a excluir selectivamente a usuarios chinos y contribuyentes de la web china",
    ],
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
