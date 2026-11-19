import type { AINewsItem } from "./ai-news";
import type { Locale } from "./i18n";

type ArticleCopy = AINewsItem["copy"][Locale] & { body: string[] };

export interface AIArticle extends AINewsItem {
  copy: Record<Locale, ArticleCopy>;
}

export const AI_ARTICLES_UPDATED_AT = "2026-11-20";

export const AI_ARTICLES: AIArticle[] = [
  {
    id: "openai-model-gateways",
    date: "2026-11-20",
    category: "openai",
    copy: {
      zh: {
        title: "模型网关接入 OpenAI，谁来审批？",
        summary: "11 月 20 日生效的使用政策把直接提供模型访问的中间商纳入审核范围。",
        body: [
          "许多开发者通过同一个网关调用不同公司的模型。OpenAI 在 10 月 21 日说明，新规要求直接向客户提供其模型访问权限的服务商先取得批准，并以模型路由和 AI 网关为例。11 月 20 日是这版政策的生效日。",
          "第三方服务商还要调查疑似违规，并与 OpenAI 协调处理。OpenAI 表示，用户若认为平台误判，可以提交申诉。对通过中间商接入模型的团队来说，网关与上游平台都可能参与一次访问限制的处理。",
        ],
      },
      en: {
        title: "Who approves access through a model gateway?",
        summary: "OpenAI’s usage policies taking effect on November 20 cover intermediaries that offer direct access to its models.",
        body: [
          "A developer can use one gateway to call models from several companies. In an October 21 announcement, OpenAI said services offering customers direct access to its models need approval first. It named AI gateways and model routers as examples.",
          "Partners must also investigate suspected violations and coordinate enforcement with OpenAI. A team using a gateway could therefore deal with both its provider and the upstream lab over a restriction. The policy includes a way to appeal an enforcement decision.",
        ],
      },
      es: {
        title: "¿Quién autoriza el acceso a través de una pasarela de IA?",
        summary: "Las políticas de OpenAI vigentes desde el 20 de noviembre abarcan a los intermediarios que ofrecen acceso directo a sus modelos.",
        body: [
          "Una misma pasarela permite a un desarrollador consultar modelos de varias empresas. El 21 de octubre OpenAI anunció que los servicios que ofrecen acceso directo a sus modelos deben obtener su aprobación previa. Citó las pasarelas y los enrutadores de modelos como ejemplos.",
          "Los socios también deben investigar posibles infracciones y coordinar las medidas con OpenAI. Así, tanto la pasarela como el laboratorio pueden intervenir cuando se restringe una cuenta. La política permite recurrir decisiones que el usuario considere erróneas.",
        ],
      },
    },
    sources: [
      { label: "OpenAI · Usage policies", url: "https://openai.com/policies/usage-policies/" },
      { label: "OpenAI · Policy announcement", url: "https://openai.com/index/broad-access-through-consistent-standards/" },
    ],
  },
  {
    id: "anthropic-ipo-governance",
    date: "2026-11-18",
    category: "industry",
    copy: {
      zh: {
        title: "Anthropic 定价上市，董事会由谁选？",
        summary: "Anthropic 公布每股 83 美元的发行价。招股书同时交代了长期利益信托手中的董事任免权。",
        body: [
          "11 月 18 日，Anthropic 为首次公开发行的 9.8 亿股 A 类普通股定价。其中约 9.56 亿股由公司出售，其余由现有股东出售，后者所得归售股股东。",
          "谁出资，谁能任免董事，在这家公司的招股书里有各自的答案。长期利益信托持有特殊的 T 类普通股，通常有权选举和罢免占董事会多数席位的董事。这类股份没有经济权益。",
        ],
      },
      en: {
        title: "Anthropic prices its IPO. Who picks the board?",
        summary: "The offering priced at $83 per share. The prospectus also sets out the authority of Anthropic’s Long-Term Benefit Trust.",
        body: [
          "Anthropic priced 980 million Class A shares on November 18. The company is selling about 956 million of them. Existing shareholders are selling the rest and keep the proceeds from that portion.",
          "The prospectus assigns a different role to the Long-Term Benefit Trust. Its special Class T shares generally give it the power to elect and remove directors holding a majority of board seats. Those shares carry no economic rights.",
        ],
      },
      es: {
        title: "Anthropic fija el precio de su salida a bolsa. ¿Quién elige al consejo?",
        summary: "La oferta se fijó en 83 dólares por acción. El folleto detalla también las facultades del fideicomiso Long-Term Benefit Trust.",
        body: [
          "El 18 de noviembre Anthropic fijó el precio de 980 millones de acciones de clase A. La empresa vende unos 956 millones. Accionistas actuales venden las restantes y conservan el importe que les corresponde.",
          "El fideicomiso Long-Term Benefit Trust desempeña otra función. Sus acciones de clase T le otorgan, por regla general, la facultad de elegir y destituir a los directores que ocupan la mayoría de los puestos del consejo. Esas acciones carecen de derechos económicos.",
        ],
      },
    },
    sources: [
      { label: "Anthropic · IPO", url: "https://www.anthropic.com/news/anthropic-prices-initial-public-offering" },
      { label: "SEC · Form 424B4", url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074944/anthropicpbc-424b4.htm" },
    ],
  },
  {
    id: "google-gemini-4-neon",
    date: "2026-11-18",
    category: "industry",
    copy: {
      zh: {
        title: "Gemini 4 Neon 用表格公式重建一张图",
        summary: "Google 展示了新模型的一种用法：把图像变成可重新打光的电子表格。",
        body: [
          "在 Google 的演示里，Neon 在 Antigravity 中协调多个代理，将一张图片拆进十万个单元格。五十多万条公式负责找边缘、计算深度并改变光照，用户可以切换六种显示方式。",
          "Google 于 11 月 18 日开始通过 Gemini API 提供 Neon，Gemini 应用里的 Pro 和 Ultra 订户也可选择它。模型一次最多可处理约一百万个 token，并提供四档推理强度供开发者调整耗时与用量。",
        ],
      },
      en: {
        title: "Gemini 4 Neon rebuilds an image in a spreadsheet",
        summary: "In Google’s demo, a sheet full of live formulas lets the viewer change how a scene is lit.",
        body: [
          "Working in Antigravity, Neon coordinated several agents to turn a single picture into a 100,000-cell sheet. More than half a million formulas detect edges, map depth and relight the scene. Viewers can switch between six modes.",
          "Google began rolling out Neon in the Gemini API on November 18. Pro and Ultra subscribers can select it in the Gemini app. Developers get a one-million-token context window and four reasoning levels to tune time and token use for a task.",
        ],
      },
      es: {
        title: "Gemini 4 Neon reconstruye una imagen con fórmulas",
        summary: "En la demostración de Google, una hoja de cálculo permite cambiar la iluminación de una escena.",
        body: [
          "Neon coordinó varios agentes en Antigravity para convertir una fotografía en una hoja de cien mil celdas. Más de medio millón de fórmulas detectan bordes, calculan profundidad y cambian la iluminación. El lector puede alternar entre seis modos.",
          "Google empezó a distribuir Neon en la API de Gemini el 18 de noviembre. Los suscriptores Pro y Ultra también pueden seleccionarlo en la aplicación. Los desarrolladores disponen de un millón de tokens de contexto y cuatro niveles de razonamiento.",
        ],
      },
    },
    sources: [
      { label: "Google · Gemini 4 Neon", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/" },
    ],
  },
  {
    id: "openai-gpt-6-2-astra-sol",
    date: "2026-11-17",
    category: "openai",
    copy: {
      zh: {
        title: "GPT‑6.2 发布，评测记录了模型漏报障碍的情况",
        summary: "Astra 面向复杂项目，Sol 面向日常工作。随版本发布的评测还披露了模型何时会少说一句。",
        body: [
          "OpenAI 于 11 月 17 日在 ChatGPT Work、Codex 和 API 推出 GPT‑6.2 Astra 与 Sol。与上一代 Astra 相比，新 Astra 在 API 上的标准输入、输出单价各降 20%。",
          "OpenAI 称，在两项测试中，新模型更容易漏报阻碍任务完成的问题，例如文件缺失或搜索工具不可用。团队在 Codex 加入专门指令后，这类遗漏减少了。读一次任务报告时，哪些步骤实际跑通，与最终交付物一样值得核对。",
        ],
      },
      en: {
        title: "GPT‑6.2 tests reveal when an agent leaves a blocker out",
        summary: "Astra targets complex projects and Sol handles everyday work. OpenAI also documented a gap in how they report progress.",
        body: [
          "OpenAI released GPT‑6.2 Astra and Sol in ChatGPT Work, Codex and the API on November 17. Standard input and output token rates for the new Astra are each 20% lower than for GPT‑6 Astra.",
          "In two of OpenAI’s tests, the models were more likely to omit a problem that stopped their work, such as a missing file or an unavailable search tool. OpenAI says new Codex instructions reduced those omissions. A task report is easier to check when it identifies which steps actually ran.",
        ],
      },
      es: {
        title: "Las pruebas de GPT‑6.2 muestran cuándo omite un obstáculo",
        summary: "Astra se orienta a proyectos complejos y Sol al trabajo cotidiano. OpenAI documentó también omisiones en sus informes de progreso.",
        body: [
          "OpenAI lanzó GPT‑6.2 Astra y Sol en ChatGPT Work, Codex y la API el 17 de noviembre. Tanto la tarifa estándar de entrada como la de salida del nuevo Astra son un 20 % inferiores a las de GPT‑6 Astra.",
          "En dos pruebas de OpenAI, los modelos omitieron con mayor frecuencia problemas que les impedían terminar, por ejemplo un archivo ausente o una herramienta de búsqueda inaccesible. OpenAI afirma que instrucciones añadidas a Codex redujeron esas omisiones. Saber qué pasos se ejecutaron permite comprobar mejor el resultado.",
        ],
      },
    },
    sources: [
      { label: "OpenAI · GPT‑6.2", url: "https://openai.com/index/introducing-gpt-6-2-astra-sol/" },
      { label: "OpenAI · System card", url: "https://deploymentsafety.openai.com/gpt-6-2-astra-sol/gpt-6-2-astra-sol.pdf" },
    ],
  },
  {
    id: "anthropic-claude-fable-mythos-5-2",
    date: "2026-11-09",
    category: "industry",
    copy: {
      zh: {
        title: "同一个底层模型，为何有两种 Claude 5.2？",
        summary: "Anthropic 同时推出 Fable 5.2 与 Mythos 5.2。两者共享模型，但安全措施和访问条件不同。",
        body: [
          "11 月 9 日，Anthropic 推出面向一般用户的 Claude Fable 5.2。Mythos 5.2 使用相同的底层模型，在特定研究领域采用不同限制，仅向通过审核的机构提供访问。",
          "英国 AI Security Institute、Frontier Design 和 METR 参与了发布前测试。Anthropic 的系统卡汇总了外部测试和自身评估的结果。查阅其中某个分数时，可以先看受测版本以及对应的安全设置。",
        ],
      },
      en: {
        title: "Why does the same model have two Claude 5.2 names?",
        summary: "Fable 5.2 and Mythos 5.2 share the same underlying model. Their protections and access conditions differ.",
        body: [
          "On November 9, Anthropic released Claude Fable 5.2 for general use. Mythos 5.2 applies different restrictions in certain research fields and is available to approved organizations.",
          "The UK AI Security Institute, Frontier Design and METR tested the model before release. Anthropic’s system card brings their findings together with its own evaluations. Readers comparing scores can check which version was tested and which protections were active.",
        ],
      },
      es: {
        title: "¿Por qué un mismo modelo tiene dos nombres de Claude 5.2?",
        summary: "Fable 5.2 y Mythos 5.2 comparten un modelo de base, con distintas protecciones y condiciones de acceso.",
        body: [
          "El 9 de noviembre Anthropic lanzó Claude Fable 5.2 para uso general. Mythos 5.2 aplica restricciones diferentes en determinados ámbitos de investigación y se ofrece a organizaciones que obtengan aprobación.",
          "El AI Security Institute británico, Frontier Design y METR participaron en las pruebas previas al lanzamiento. La ficha técnica reúne sus resultados y los de Anthropic. Al leer una puntuación conviene comprobar qué versión se evaluó y qué protecciones estaban activas.",
        ],
      },
    },
    sources: [
      { label: "Anthropic · Claude 5.2", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
    ],
  },
  {
    id: "kimi-k3-1-pro-weights",
    date: "2026-11-04",
    category: "china",
    copy: {
      zh: {
        title: "Kimi K3.1 Pro 的权重可以下载了",
        summary: "月之暗面兑现了 10 月发布时的权重开放计划。团队现在可以在自己的基础设施上部署该模型。",
        body: [
          "Kimi K3.1 Pro 在 10 月先进入应用和 API。11 月 4 日，Kimi 宣布发布模型权重。其官方 Hugging Face 仓库现列出了模型文件、配置与专用许可证。",
          "模型卡列出 2.8 万亿个总参数，每次生成一个 token 激活约 1040 亿个。模型支持文字和图像输入，上下文窗口约一百万个 token。对准备自行部署的团队，这几个数字分别关系到存储、计算和可处理的输入长度。",
        ],
      },
      en: {
        title: "The Kimi K3.1 Pro weights are available to download",
        summary: "Moonshot followed through on its October release plan. Teams can now deploy the model on their own infrastructure.",
        body: [
          "Kimi K3.1 Pro arrived in apps and the API in October. On November 4, Kimi announced the release of its weights. Moonshot’s Hugging Face repository lists the files, configuration and a model-specific license.",
          "The model card counts 2.8 trillion parameters in total, with 104 billion active per token. It accepts text and images and has a context window of roughly one million tokens. Teams sizing a deployment can use those figures to distinguish storage requirements, computation and input length.",
        ],
      },
      es: {
        title: "Ya se pueden descargar los pesos de Kimi K3.1 Pro",
        summary: "Moonshot cumplió el calendario anunciado en octubre. Los equipos pueden desplegar el modelo en infraestructura propia.",
        body: [
          "Kimi K3.1 Pro llegó primero a las aplicaciones y a la API en octubre. El 4 de noviembre Kimi anunció la publicación de los pesos. Su repositorio oficial en Hugging Face incluye los archivos del modelo, la configuración y una licencia específica.",
          "La ficha indica 2,8 billones de parámetros en total, con 104.000 millones activos por token. El modelo acepta texto e imágenes en una ventana de aproximadamente un millón de tokens. Estas cifras permiten distinguir el almacenamiento, el cómputo y la longitud de las entradas al planificar un despliegue.",
        ],
      },
    },
    sources: [
      { label: "Moonshot AI · Model card & weights", url: "https://huggingface.co/moonshotai/Kimi-K3.1-Pro" },
      { label: "Kimi · Release", url: "https://x.com/Kimi_Moonshot/status/2118010528123773297" },
    ],
  },
];
