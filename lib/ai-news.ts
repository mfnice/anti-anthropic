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

export const AI_NEWS_UPDATED_AT = "2026-11-03";

export const AI_NEWS_SECTION: Record<Locale, AINewsSectionCopy> = {
  zh: {
    kicker: "AI DAILY WIRE",
    title: "AI 新闻，不只看一家",
    description:
      "追踪 OpenAI、中国大模型与全球产业变化。优先采用官方发布，并用可靠媒体补充市场影响；不把传闻写成事实。",
    updatedLabel: "核验更新",
    cadence: "按实质更新核验",
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
    cadence: "Verified when substantive updates emerge",
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
    cadence: "Verificado cuando hay novedades relevantes",
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
    id: "openai-gpt-6-rosalind",
    date: "2026-10-30",
    category: "openai",
    copy: {
      zh: {
        title: "OpenAI 发布面向生命科学研究的 GPT‑6 Rosalind",
        summary:
          "官方更新日志公布 GPT‑6 Rosalind，结合生物学推理与科学工具使用。访问仅面向通过 Rosalind Research 可信访问审核的组织，供获授权用户开展内部研究；这不是面向所有用户的通用开放。",
      },
      en: {
        title: "OpenAI releases GPT‑6 Rosalind for life sciences research",
        summary:
          "The official changelog introduces GPT‑6 Rosalind for biological reasoning and scientific tool use. Access is restricted to organizations approved for Rosalind Research, for internal research by authorized users; it is not a general public rollout.",
      },
      es: {
        title: "OpenAI presenta GPT‑6 Rosalind para investigación biológica",
        summary:
          "El registro oficial presenta GPT‑6 Rosalind para razonamiento biológico y uso de herramientas científicas. El acceso está limitado a organizaciones aprobadas para Rosalind Research y a investigación interna de usuarios autorizados; no es un lanzamiento abierto al público.",
      },
    },
    sources: [
      {
        label: "OpenAI · Changelog",
        url: "https://developers.openai.com/api/docs/changelog",
      },
    ],
  },
  {
    id: "openai-gpt-6-1-terra",
    date: "2026-10-26",
    category: "openai",
    copy: {
      zh: {
        title: "GPT‑6.1 Terra 上线，聚焦视觉推理与电脑操作",
        summary:
          "OpenAI 将 Terra 定位于看图、理解屏幕、操作应用和清晰写作。模型支持文本与图像输入；API 工具调用需使用 Responses API。它也已进入 ChatGPT Work 和 Codex，具体访问取决于套餐及工作区设置。",
      },
      en: {
        title: "GPT‑6.1 Terra arrives for visual reasoning and computer use",
        summary:
          "OpenAI positions Terra for images, screen workflows, and clear writing. It accepts text and image inputs; API tool calling requires Responses. It is also available in ChatGPT Work and Codex, subject to plan and workspace access.",
      },
      es: {
        title: "GPT‑6.1 Terra llega para razonamiento visual y uso del ordenador",
        summary:
          "OpenAI orienta Terra a imágenes, tareas en pantalla y escritura clara. Acepta texto e imágenes; las llamadas a herramientas requieren Responses. También está disponible en ChatGPT Work y Codex, según el plan y la configuración del espacio de trabajo.",
      },
    },
    sources: [
      {
        label: "OpenAI · Model",
        url: "https://developers.openai.com/api/docs/models/gpt-6.1-terra",
      },
      {
        label: "OpenAI · Release notes",
        url: "https://learn.chatgpt.com/docs/whats-new/october-26-30-2026",
      },
    ],
  },
  {
    id: "kimi-k3-1-pro",
    date: "2026-10-23",
    category: "china",
    copy: {
      zh: {
        title: "Kimi K3.1 Pro 上线，权重发布仍需区分计划与完成",
        summary:
          "Kimi Code 于 10 月 23 日宣布 K3.1 Pro 系列上线，支持最高 100 万 token 上下文，并提供 Highspeed 版本。官方称完整权重将在 11 月 4 日前发布；本次核验保留这一计划表述，不把产品上线写成权重已公开。",
      },
      en: {
        title: "Kimi K3.1 Pro launches; weight release remains a separate milestone",
        summary:
          "Kimi Code announced the K3.1 Pro series on October 23, with up to a 1M-token context and a Highspeed version. The official blog promises full weights by November 4. Product availability should not be confused with a completed weight release.",
      },
      es: {
        title: "Llega Kimi K3.1 Pro; publicar los pesos sigue siendo otro hito",
        summary:
          "Kimi Code anunció la serie K3.1 Pro el 23 de octubre, con hasta un millón de tokens de contexto y una versión Highspeed. El blog oficial promete los pesos completos para el 4 de noviembre. El lanzamiento del producto no confirma que los pesos ya estén publicados.",
      },
    },
    sources: [
      {
        label: "Kimi · Release notes",
        url: "https://www.kimi.com/code/docs/en/kimi-code/whats-new.html",
      },
      {
        label: "Kimi · Technical report",
        url: "https://www.kimi.com/en/blog/kimi-k3-1-pro",
      },
    ],
  },
  {
    id: "openai-decisions-api-ga",
    date: "2026-10-22",
    category: "openai",
    copy: {
      zh: {
        title: "OpenAI Decisions API 正式开放，每次最多评估 400 个问题",
        summary:
          "Decisions API 使用 GPT‑6 Luna，把文本、图像和 JSON 转成概率判断、分类或评分。正式版将单次问题上限从 200 提至 400，并加入提示缓存与问题内图像，面向分类、路由和优先级判断等应用。",
      },
      en: {
        title: "OpenAI Decisions API reaches GA with up to 400 questions per request",
        summary:
          "Using GPT‑6 Luna, Decisions turns text, images, and JSON into probabilities, categories, or scores. General availability raises the question limit from 200 to 400 and adds prompt caching and question-specific images for classification, routing, and prioritization.",
      },
      es: {
        title: "Decisions API pasa a disponibilidad general con hasta 400 preguntas",
        summary:
          "Con GPT‑6 Luna, Decisions convierte texto, imágenes y JSON en probabilidades, categorías o puntuaciones. La versión general amplía el límite de 200 a 400 preguntas e incorpora caché de prompts e imágenes por pregunta para clasificar, enrutar y priorizar.",
      },
    },
    sources: [
      {
        label: "OpenAI · Decisions",
        url: "https://developers.openai.com/api/docs/guides/decisions",
      },
      {
        label: "OpenAI · Changelog",
        url: "https://developers.openai.com/api/docs/changelog",
      },
    ],
  },
  {
    id: "deepseek-v4-1-flash-1017-search",
    date: "2026-10-17",
    category: "china",
    copy: {
      zh: {
        title: "DeepSeek 更新 V4.1 Flash，并开放自研搜索 API",
        summary:
          "V4.1 Flash‑1017 已覆盖官网、App 与 API，调用名仍为 deepseek-flash，价格不变。同日 DeepSeek 开放搜索与网页抓取接口，支持多语言检索。官方报告任务效率改善，具体收益仍取决于实际工作负载。",
      },
      en: {
        title: "DeepSeek updates V4.1 Flash and opens its search API",
        summary:
          "V4.1 Flash‑1017 reaches the website, app, and API under the unchanged deepseek-flash name and pricing. DeepSeek also opens search and page-fetch APIs with multilingual search. It reports better task efficiency; practical gains depend on the workload.",
      },
      es: {
        title: "DeepSeek actualiza V4.1 Flash y abre su API de búsqueda",
        summary:
          "V4.1 Flash‑1017 llega a la web, la app y la API, sin cambiar el nombre deepseek-flash ni los precios. DeepSeek también abre búsqueda multilingüe y recuperación de páginas. La empresa informa de mayor eficiencia; las mejoras prácticas dependen de cada tarea.",
      },
    },
    sources: [
      {
        label: "DeepSeek · Changelog",
        url: "https://api-docs.deepseek.com/updates/",
      },
    ],
  },
  {
    id: "qwen-image-2-1",
    date: "2026-09-20",
    category: "china",
    copy: {
      zh: {
        title: "Qwen 开源 Image‑2.1，统一图像生成与编辑",
        summary:
          "Qwen‑Image‑2.1 的视觉生成部分为 70 亿参数，原生支持透明图像生成和编辑，最多接受 10 张参考图。官方还介绍了局部修改与人物、商品一致性能力，让素材制作与后续编辑使用同一模型。",
      },
      en: {
        title: "Qwen open-sources Image‑2.1 for unified generation and editing",
        summary:
          "Qwen‑Image‑2.1 combines generation and editing with a 7B-parameter visual component. It natively supports transparent images and up to ten references. The team also highlights local edits and consistency for people and products within the same model.",
      },
      es: {
        title: "Qwen abre Image‑2.1 para unificar generación y edición",
        summary:
          "Qwen‑Image‑2.1 combina generación y edición con un componente visual de 7.000 millones de parámetros. Admite imágenes transparentes y hasta diez referencias. El equipo también destaca los cambios locales y la consistencia de personas y productos dentro del mismo modelo.",
      },
    },
    sources: [
      {
        label: "Qwen · Research",
        url: "https://qwen.ai/blog?id=qwen-image-2.1",
      },
    ],
  },
];
