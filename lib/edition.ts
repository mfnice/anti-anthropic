import type { Locale } from "./i18n";
export const localePath: Record<Locale, string> = { zh: "/", en: "/en", es: "/es" };

export function editionPath(locale: Locale, path = "") {
  return path ? `${localePath[locale].replace(/\/$/, "")}${path}` : localePath[locale];
}

export const edition = {
  zh: {
    home: "首页", articles: "AI 文章", cinema: "放映室", archive: "证据档案", voice: "公众发声",
    language: "语言", nav: "主导航", skip: "跳到正文", read: "进入文章栏目", all: "全部文章",
    lead: "追踪 AI，也追问谁在掌控它。", subtitle: "AI 发展、Anthropic 争议与公众发声的独立档案。",
    edition: "迈阿密特刊", updated: "本期更新", selections: "本期精选", browse: "浏览本期",
    articleIndex: "AI 发展手记", indexIntro: "从发布日志、模型卡和研究报告出发，读懂这一轮 AI 更新。",
    featured: "最新文章", more: "往期文章", source: "一手来源", readStory: "阅读全文",
    archiveTitle: "回到 Anthropic 争议现场", archiveDesc: "查阅事件时间线、当事方声明和公开证据。",
    filmTitle: "达里奥的午夜电台", filmDesc: "达里奥的手离开调音台，停了一拍，又伸回来拨动推子。第 4 秒，镜头切到「ON AIR」灯箱，他在一旁露出坏笑。",
    fiction: "虚构讽刺短片", play: "播放短片", credits: "创作参考与制作记录", next: "下一篇", previous: "返回文章栏目",
    footer: "独立 AI 观察与公众档案", backTop: "回到顶部", photo: "机架摄影",
  },
  en: {
    home: "Home", articles: "AI journal", cinema: "Cinema", archive: "Evidence", voice: "Voices",
    language: "Language", nav: "Main navigation", skip: "Skip to content", read: "Explore the journal", all: "All articles",
    lead: "Tracking AI and the people in control.", subtitle: "An independent record of AI releases, Anthropic controversies and public voices.",
    edition: "Miami edition", updated: "Edition updated", selections: "In this issue", browse: "Explore the issue",
    articleIndex: "The AI journal", indexIntro: "A close read of the release notes, model cards and research behind the latest AI developments.",
    featured: "Latest article", more: "Previous articles", source: "Primary sources", readStory: "Read the story",
    archiveTitle: "Inside the Anthropic files", archiveDesc: "Trace the chronology through public records and first-hand accounts.",
    filmTitle: "Dario on Air", filmDesc: "Dario lifts his hand from the mixing desk. A beat passes before he reaches for the fader again. At four seconds, the shot cuts to the glowing ON AIR sign, with Dario grinning beside it.",
    fiction: "A fictional satire", play: "Play short film", credits: "Visual references & production credits", next: "Next article", previous: "Back to the journal",
    footer: "An independent AI journal and public archive", backTop: "Back to top", photo: "Server rack photography",
  },
  es: {
    home: "Inicio", articles: "Revista IA", cinema: "Cine", archive: "Pruebas", voice: "Voces",
    language: "Idioma", nav: "Navegación principal", skip: "Saltar al contenido", read: "Explorar la revista", all: "Todos los artículos",
    lead: "Seguimos la IA y a quienes la controlan.", subtitle: "Un archivo independiente sobre IA, controversias de Anthropic y voces públicas.",
    edition: "Edición Miami", updated: "Edición actualizada", selections: "En esta edición", browse: "Explorar la edición",
    articleIndex: "La revista de IA", indexIntro: "Leemos las notas de lanzamiento, las fichas de modelos y los estudios que explican los avances en IA.",
    featured: "Último artículo", more: "Artículos anteriores", source: "Fuentes primarias", readStory: "Leer el artículo",
    archiveTitle: "El archivo de Anthropic", archiveDesc: "Recorre la cronología y consulta las declaraciones y los documentos públicos.",
    filmTitle: "Dario en antena", filmDesc: "Dario retira la mano de la mesa de mezclas, espera un instante y vuelve al control. En el segundo cuatro, el plano cambia al letrero luminoso de ON AIR. A su lado, Dario sonríe con picardía.",
    fiction: "Cortometraje de ficción satírica", play: "Ver el corto", credits: "Referencias visuales y créditos", next: "Siguiente artículo", previous: "Volver a la revista",
    footer: "Revista independiente de IA y archivo público", backTop: "Volver arriba", photo: "Fotografía de servidores",
  },
} as const;
