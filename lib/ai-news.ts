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

export const AI_NEWS_UPDATED_AT = "2026-08-03";

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
    id: "openai-academic-researchers",
    date: "2026-07-29",
    category: "openai",
    copy: {
      zh: {
        title: "OpenAI 向科研人员开放免费前沿模型计划",
        summary:
          "ChatGPT for Academic Researchers 今年夏季先覆盖 1 万名研究人员，计划在 2027 年扩大到 10 万人，提供 GPT‑5.6、Codex、深度研究与科研连接器。该计划属于 OpenAI 至 2027 年超过 2.5 亿美元的外部科研投入。",
      },
      en: {
        title: "OpenAI launches free frontier access for researchers",
        summary:
          "ChatGPT for Academic Researchers starts with 10,000 researchers this summer and aims for 100,000 by 2027, with GPT‑5.6, Codex, deep research, and scientific connectors. It is part of more than $250 million committed to external research through 2027.",
      },
      es: {
        title: "OpenAI ofrece acceso gratuito a modelos frontera para investigadores",
        summary:
          "ChatGPT for Academic Researchers comienza este verano con 10.000 investigadores y aspira a llegar a 100.000 en 2027, con GPT‑5.6, Codex, investigación profunda y conectores científicos. Forma parte de una inversión externa superior a 250 millones de dólares hasta 2027.",
      },
    },
    sources: [
      {
        label: "OpenAI",
        url: "https://openai.com/index/chatgpt-for-academic-researchers/",
      },
    ],
  },
  {
    id: "china-models-global-adoption",
    date: "2026-07-26",
    category: "industry",
    copy: {
      zh: {
        title: "中国开源模型正在从低价替代走向全球采用",
        summary:
          "美联社报道，近一个月 OpenRouter 最受欢迎的前五个模型均来自中国；Kimi K3 发布后一周下载量超过 93 万。成本、开放权重与智能体需求，正在共同推动开发者重新评估模型供应商。",
      },
      en: {
        title: "Chinese open models move from cheap alternatives to global adoption",
        summary:
          "AP reports that the five most popular models on OpenRouter over the past month were Chinese, while Kimi downloads topped 930,000 in the week after K3 launched. Cost, open weights, and agent demand are reshaping model selection.",
      },
      es: {
        title: "Los modelos chinos pasan de alternativa barata a adopción global",
        summary:
          "AP informa que los cinco modelos más populares de OpenRouter durante el último mes fueron chinos, mientras Kimi superó 930.000 descargas en la semana posterior a K3. El coste, los pesos abiertos y la demanda de agentes están cambiando la selección de proveedores.",
      },
    },
    sources: [
      {
        label: "AP",
        url: "https://apnews.com/article/china-ai-model-us-kimi-deepseek-a00bf637866fcd4d81f4fde28c9862ce",
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
  {
    id: "glm-5-2",
    date: "2026-06-16",
    category: "china",
    copy: {
      zh: {
        title: "智谱 GLM‑5.2 押注百万上下文与长程任务",
        summary:
          "GLM‑5.2 提供 100 万 token 上下文、多档思考强度与更强的长程编程能力，并以 MIT 许可证开放权重。智谱称 IndexShare 架构在百万上下文下把相关单 token 计算量降低 2.9 倍。",
      },
      en: {
        title: "Z.ai's GLM‑5.2 bets on 1M context and long-horizon work",
        summary:
          "GLM‑5.2 offers a 1M-token context, adjustable reasoning effort, and stronger long-horizon coding under an MIT license. Z.ai says its IndexShare design cuts the relevant per-token compute by 2.9× at 1M context.",
      },
      es: {
        title: "GLM‑5.2 apuesta por un millón de tokens y tareas prolongadas",
        summary:
          "GLM‑5.2 ofrece un millón de tokens de contexto, esfuerzo de razonamiento ajustable y mejor programación de larga duración bajo licencia MIT. Z.ai afirma que IndexShare reduce 2,9 veces el cómputo relevante por token con ese contexto.",
      },
    },
    sources: [
      {
        label: "Z.ai",
        url: "https://z.ai/blog/glm-5.2",
      },
      {
        label: "智谱文档",
        url: "https://docs.bigmodel.cn/cn/guide/models/text/glm-5.2",
      },
    ],
  },
];
