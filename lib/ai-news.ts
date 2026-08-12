import type { Locale } from "./i18n";

export type AINewsCategory = "openai" | "china" | "industry";

interface LocalizedNewsCopy {
  title: string;
  summary: string;
}

interface NewsSource {
  label: string;
  url: string;
}

export interface AINewsItem {
  id: string;
  date: string;
  category: AINewsCategory;
  copy: Record<Locale, LocalizedNewsCopy>;
  sources: NewsSource[];
}

interface AINewsSectionCopy {
  kicker: string;
  title: string;
  description: string;
  updatedLabel: string;
  cadence: string;
  sourceLabel: string;
  categories: Record<AINewsCategory, string>;
}

export const AI_NEWS_UPDATED_AT = "2026-08-13";

export const AI_NEWS_SECTION: Record<Locale, AINewsSectionCopy> = {
  zh: {
    kicker: "AI DAILY WIRE",
    title: "AI 新闻，不只看一家",
    description:
      "追踪 OpenAI、中国大模型与全球产业变化。优先采用官方发布，并用可靠媒体补充市场影响；不把传闻写成事实。",
    updatedLabel: "核验更新",
    cadence: "每天 09:00 · 新加坡时间",
    sourceLabel: "来源",
    categories: {
      openai: "OPENAI",
      china: "中国大模型",
      industry: "产业观察",
    },
  },
  en: {
    kicker: "AI DAILY WIRE",
    title: "AI news beyond one lab",
    description:
      "Tracking OpenAI, Chinese foundation models, and the global AI market. Official releases come first, with reputable reporting for industry impact—not rumors presented as fact.",
    updatedLabel: "Verified",
    cadence: "Daily at 09:00 · Singapore time",
    sourceLabel: "Sources",
    categories: {
      openai: "OPENAI",
      china: "CHINA MODELS",
      industry: "INDUSTRY",
    },
  },
  es: {
    kicker: "AI DAILY WIRE",
    title: "Noticias de IA más allá de un solo laboratorio",
    description:
      "Seguimiento de OpenAI, los modelos fundacionales chinos y el mercado global. Priorizamos fuentes oficiales y usamos medios fiables para medir el impacto, sin presentar rumores como hechos.",
    updatedLabel: "Verificado",
    cadence: "Cada día a las 09:00 · hora de Singapur",
    sourceLabel: "Fuentes",
    categories: {
      openai: "OPENAI",
      china: "MODELOS DE CHINA",
      industry: "INDUSTRIA",
    },
  },
};

export const AI_NEWS_ITEMS: AINewsItem[] = [
  {
    id: "openai-enterprise-agent-adoption",
    date: "2026-08-12",
    category: "openai",
    copy: {
      zh: {
        title: "OpenAI：企业 AI 正从辅助问答转向代理执行",
        summary:
          "OpenAI 发布两份企业采用研究：截至 6 月，Codex 占企业客户在 Codex 与 ChatGPT 合计输出 token 的 64%；自 2 月以来，企业 Codex 周活用户在法律、销售、招聘和营销岗位分别增长 108 倍、41 倍、41 倍和 26 倍。数据来自 OpenAI 客户样本，适合观察趋势，不等同于整个市场份额。",
      },
      en: {
        title: "OpenAI says enterprise AI is shifting from assistance to execution",
        summary:
          "Two OpenAI studies report that Codex generated 64% of combined Codex and ChatGPT output tokens among enterprise customers as of June. Since February, weekly enterprise Codex users grew 108× in legal, 41× in sales, 41× in recruiting, and 26× in marketing. The figures describe OpenAI's customer sample, not total market share.",
      },
      es: {
        title: "OpenAI afirma que la IA empresarial pasa de asistir a ejecutar",
        summary:
          "Dos estudios de OpenAI señalan que, hasta junio, Codex generó el 64% de los tokens de salida combinados de Codex y ChatGPT entre clientes empresariales. Desde febrero, los usuarios semanales de Codex crecieron 108 veces en legal, 41 en ventas, 41 en selección y 26 en marketing. Son datos de clientes de OpenAI, no cuota de mercado total.",
      },
    },
    sources: [
      {
        label: "OpenAI",
        url: "https://openai.com/index/how-enterprises-put-ai-to-work/",
      },
    ],
  },
  {
    id: "openai-chatgpt-ads-expansion",
    date: "2026-08-11",
    category: "openai",
    copy: {
      zh: {
        title: "ChatGPT 广告试点扩展到英国、墨西哥、巴西、日本和韩国",
        summary:
          "OpenAI 已把 ChatGPT Ads 推向五个新市场。广告继续面向登录的成年 Free 和 Go 用户；付费、企业和教育套餐不显示广告。OpenAI 表示广告不会影响回答，广告主不能访问聊天记录，但系统会用对话主题、历史聊天和广告互动匹配广告。",
      },
      en: {
        title: "ChatGPT ads expand to the UK, Mexico, Brazil, Japan, and South Korea",
        summary:
          "OpenAI has launched its ChatGPT Ads pilot in five more markets. Ads remain limited to logged-in adults on Free and Go tiers; paid, enterprise, and education plans stay ad-free. OpenAI says ads do not alter answers and advertisers cannot access chats, although matching can use conversation topics, chat history, and prior ad interactions.",
      },
      es: {
        title: "Los anuncios de ChatGPT llegan a Reino Unido, México, Brasil, Japón y Corea del Sur",
        summary:
          "OpenAI amplió el piloto de ChatGPT Ads a cinco mercados. Los anuncios siguen limitados a adultos conectados en los planes Free y Go; los planes de pago, empresa y educación continúan sin anuncios. OpenAI afirma que no alteran las respuestas y que los anunciantes no ven los chats, aunque la selección puede usar temas, historial e interacciones previas.",
      },
    },
    sources: [
      {
        label: "OpenAI",
        url: "https://openai.com/index/testing-ads-in-chatgpt/",
      },
    ],
  },
  {
    id: "openai-gpt-5-6-cyber-daybreak",
    date: "2026-08-10",
    category: "openai",
    copy: {
      zh: {
        title: "OpenAI 推出 GPT‑5.6‑Cyber 与两级 Daybreak 访问体系",
        summary:
          "Daybreak Blue 面向常规防御工作开放 GPT‑5.6 Sol，Daybreak Red 则向获批研究人员提供专门训练的 GPT‑5.6‑Cyber，用于漏洞研究、利用验证和安全测试。OpenAI 的内部评测显示，Cyber 模型在高级双用途请求上的完成率显著更高，因此访问被放在受治理的可信环境中。",
      },
      en: {
        title: "OpenAI launches GPT‑5.6‑Cyber with two-tier Daybreak access",
        summary:
          "Daybreak Blue gives approved defenders GPT‑5.6 Sol for broad defensive work, while Daybreak Red provides the purpose-trained GPT‑5.6‑Cyber for vulnerability research, exploit validation, and security testing. OpenAI's internal evaluations show much higher completion of advanced dual-use requests, so access is restricted to governed trusted environments.",
      },
      es: {
        title: "OpenAI lanza GPT‑5.6‑Cyber con acceso Daybreak de dos niveles",
        summary:
          "Daybreak Blue ofrece GPT‑5.6 Sol a defensores aprobados para trabajo defensivo general; Daybreak Red da acceso a GPT‑5.6‑Cyber, entrenado para investigación de vulnerabilidades, validación de exploits y pruebas de seguridad. Las evaluaciones internas muestran mucha mayor finalización de solicitudes avanzadas de doble uso, por lo que el acceso queda en entornos gobernados.",
      },
    },
    sources: [
      {
        label: "OpenAI",
        url: "https://openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows/",
      },
    ],
  },
  {
    id: "kimi-code-agent-core-v2",
    date: "2026-08-05",
    category: "china",
    copy: {
      zh: {
        title: "Kimi Code 默认启用 agent-core-v2，并加入官方 Computer Use 插件",
        summary:
          "Kimi Code v0.33.0 将新版代理引擎设为 TUI、打印模式和 ACP 等界面的默认核心，并在官方插件市场加入 Kimi Computer Use 与 WebBridge。Web 端同时支持自定义模型供应商、会话置顶和套餐用量查看，产品竞争开始从单模型能力延伸到完整代理运行环境。",
      },
      en: {
        title: "Kimi Code defaults to agent-core-v2 and adds official Computer Use plugins",
        summary:
          "Kimi Code v0.33.0 makes agent-core-v2 the default engine across its TUI, print mode, and ACP surfaces, while adding official Kimi Computer Use and WebBridge plugins. The web UI also gains custom providers, pinned sessions, and plan usage, extending competition from model quality to the surrounding agent runtime.",
      },
      es: {
        title: "Kimi Code adopta agent-core-v2 y añade plugins oficiales de Computer Use",
        summary:
          "Kimi Code v0.33.0 convierte agent-core-v2 en el motor predeterminado de la TUI, el modo de impresión y ACP, y añade plugins oficiales Kimi Computer Use y WebBridge. La interfaz web incorpora proveedores personalizados, sesiones fijadas y uso del plan, ampliando la competencia del modelo al entorno completo del agente.",
      },
    },
    sources: [
      {
        label: "Kimi",
        url: "https://www.kimi.com/code/docs/en/kimi-code/whats-new.html",
      },
    ],
  },
  {
    id: "openai-gpt-5-6-price-cut",
    date: "2026-07-31",
    category: "openai",
    copy: {
      zh: {
        title: "OpenAI 下调 GPT‑5.6 Luna 与 Terra API 价格",
        summary:
          "OpenAI 将 Luna 的价格下调 80%，至每百万输入 / 输出 token 0.20 / 1.20 美元；Terra 下调 20%，至 2 / 12 美元。公司把降价归因于推理、缓存、路由与模型效率的共同提升。",
      },
      en: {
        title: "OpenAI cuts GPT‑5.6 Luna and Terra API prices",
        summary:
          "OpenAI cut Luna pricing by 80% to $0.20 / $1.20 per million input / output tokens, and Terra by 20% to $2 / $12. It attributes the reductions to gains across inference, caching, routing, and model efficiency.",
      },
      es: {
        title: "OpenAI reduce el precio de GPT‑5.6 Luna y Terra",
        summary:
          "OpenAI rebajó Luna un 80%, hasta 0,20 / 1,20 dólares por millón de tokens de entrada / salida, y Terra un 20%, hasta 2 / 12 dólares. La empresa atribuye la reducción a mejoras de inferencia, caché, enrutamiento y eficiencia del modelo.",
      },
    },
    sources: [
      {
        label: "OpenAI",
        url: "https://openai.com/index/building-abundant-intelligence/",
      },
    ],
  },
  {
    id: "deepseek-v4-flash-0731",
    date: "2026-07-31",
    category: "china",
    copy: {
      zh: {
        title: "DeepSeek 正式发布 V4 Flash 0731",
        summary:
          "新版本取代此前预览版，采用 MIT 许可证，模型卡标注为 304B 参数，并强化了智能体任务与 DSpark 推测解码。官方基准显示，它以更少激活参数超过 V4 Pro 预览版的多项成绩。",
      },
      en: {
        title: "DeepSeek formally releases V4 Flash 0731",
        summary:
          "The MIT-licensed 304B release supersedes the preview and strengthens agentic work with DSpark speculative decoding. DeepSeek's published benchmarks show it beating the V4 Pro preview on several tasks despite fewer activated parameters.",
      },
      es: {
        title: "DeepSeek publica oficialmente V4 Flash 0731",
        summary:
          "La versión de 304B parámetros, bajo licencia MIT, sustituye a la preliminar y refuerza las tareas de agentes con decodificación especulativa DSpark. Los benchmarks publicados por DeepSeek la sitúan por encima de V4 Pro Preview en varias pruebas con menos parámetros activos.",
      },
    },
    sources: [
      {
        label: "DeepSeek",
        url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731",
      },
      {
        label: "Axios",
        url: "https://www.axios.com/2026/08/01/deepseek-model-cheap-ai-price-war",
      },
    ],
  },
  {
    id: "qwen-image-3",
    date: "2026-07-21",
    category: "china",
    copy: {
      zh: {
        title: "阿里发布 Qwen‑Image 3.0",
        summary:
          "Qwen 团队推出第三代图像生成基础模型，把方向概括为“真实”，重点提升丰富内容、真实细节与知识表达。这也是中国大模型竞争从文本和代码继续扩展到视觉生成的最新一步。",
      },
      en: {
        title: "Alibaba releases Qwen‑Image 3.0",
        summary:
          "Qwen's third-generation image foundation model centers on what the team calls “Real,” with an emphasis on rich content, authentic detail, and knowledge. It extends Chinese model competition beyond text and code into visual generation.",
      },
      es: {
        title: "Alibaba lanza Qwen‑Image 3.0",
        summary:
          "La tercera generación del modelo fundacional de imagen de Qwen se centra en lo que el equipo llama «Real», con énfasis en contenido rico, detalles auténticos y conocimiento. La competencia china se extiende así del texto y el código a la generación visual.",
      },
    },
    sources: [
      {
        label: "Qwen",
        url: "https://qwen.ai/blog?id=qwen-image-3.0",
      },
    ],
  },
  {
    id: "kimi-k3",
    date: "2026-07-16",
    category: "china",
    copy: {
      zh: {
        title: "月之暗面开源 Kimi K3",
        summary:
          "Kimi K3 采用 2.8 万亿参数规模，支持原生视觉理解与最高 100 万 token 上下文，面向长程编程、知识工作与复杂智能体任务。上线后的需求一度迫使 Kimi 暂停新订阅。",
      },
      en: {
        title: "Moonshot open-sources Kimi K3",
        summary:
          "Kimi K3 uses a 2.8-trillion-parameter architecture with native vision and up to a 1M-token context, targeting long-horizon coding, knowledge work, and complex agents. Demand later forced Kimi to pause new subscriptions temporarily.",
      },
      es: {
        title: "Moonshot abre los pesos de Kimi K3",
        summary:
          "Kimi K3 usa una arquitectura de 2,8 billones de parámetros, visión nativa y hasta un millón de tokens de contexto, orientada a programación prolongada, trabajo de conocimiento y agentes complejos. La demanda obligó después a pausar temporalmente nuevas suscripciones.",
      },
    },
    sources: [
      {
        label: "Kimi",
        url: "https://www.kimi.com/code/docs/en/kimi-code/whats-new.html",
      },
      {
        label: "AP",
        url: "https://apnews.com/article/kimi-k3-china-ai-model-us-4c66a2e0f557ce79d3cc2d769c9a6226",
      },
    ],
  },
];
