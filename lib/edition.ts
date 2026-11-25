import type { Locale } from "./i18n";
export const localePath: Record<Locale, string> = { zh: "/", en: "/en", es: "/es" };

export function editionPath(locale: Locale, path = "") {
  return path ? `${localePath[locale].replace(/\/$/, "")}${path}` : localePath[locale];
}

export const edition = {
  zh: {
    home: "首页", articles: "AI 文章", archive: "证据档案", voice: "公众发声",
    language: "语言", nav: "主导航", skip: "跳到正文", read: "进入文章栏目", all: "全部文章",
    lead: "我们反对 Anthropic 替作者和用户做决定。", subtitle: "查阅法院文件、隐私条款和独立评估，读我们的批评，也留下你的意见。",
    edition: "迈阿密特刊", updated: "本期更新", selections: "本期精选", browse: "浏览本期",
    articleIndex: "评论与报道", indexIntro: "从作者的书库到用户的聊天记录，我们追问 Anthropic 如何取得和使用数据。这里也收录其他 AI 公司的报道。", moreOpinions: "更多 Anthropic 评论",
    featured: "最新文章", more: "往期文章", source: "一手来源", readStory: "阅读全文",
    archiveTitle: "回到 Anthropic 争议现场", archiveDesc: "查阅事件时间线、当事方声明和公开证据。",
    next: "下一篇", previous: "返回文章栏目",
    footer: "独立 AI 观察与公众档案", backTop: "回到顶部", photo: "机架摄影",
  },
  en: {
    home: "Home", articles: "AI journal", archive: "Evidence", voice: "Voices",
    language: "Language", nav: "Main navigation", skip: "Skip to content", read: "Explore the journal", all: "All articles",
    lead: "We oppose Anthropic making decisions for authors and users.", subtitle: "Read our criticism alongside the court records, privacy terms and independent evaluations. Add your own account.",
    edition: "Miami edition", updated: "Edition updated", selections: "In this issue", browse: "Explore the issue",
    articleIndex: "Opinion and reporting", indexIntro: "From authors’ books to users’ chat histories, we examine how Anthropic acquires and uses data. The journal also covers other AI companies.", moreOpinions: "More opinions on Anthropic",
    featured: "Latest article", more: "Previous articles", source: "Primary sources", readStory: "Read the story",
    archiveTitle: "Inside the Anthropic files", archiveDesc: "Trace the chronology through public records and first-hand accounts.",
    next: "Next article", previous: "Back to the journal",
    footer: "An independent AI journal and public archive", backTop: "Back to top", photo: "Server rack photography",
  },
  es: {
    home: "Inicio", articles: "Revista IA", archive: "Pruebas", voice: "Voces",
    language: "Idioma", nav: "Navegación principal", skip: "Saltar al contenido", read: "Explorar la revista", all: "Todos los artículos",
    lead: "Nos oponemos a que Anthropic decida por autores y usuarios.", subtitle: "Lee nuestras críticas junto a los documentos judiciales, las condiciones de privacidad y las evaluaciones independientes. Comparte tu experiencia.",
    edition: "Edición Miami", updated: "Edición actualizada", selections: "En esta edición", browse: "Explorar la edición",
    articleIndex: "Opinión y reportajes", indexIntro: "Desde los libros de los autores hasta las conversaciones de los usuarios, examinamos cómo Anthropic obtiene y utiliza los datos. También cubrimos otras empresas de IA.", moreOpinions: "Más opiniones sobre Anthropic",
    featured: "Último artículo", more: "Artículos anteriores", source: "Fuentes primarias", readStory: "Leer el artículo",
    archiveTitle: "El archivo de Anthropic", archiveDesc: "Recorre la cronología y consulta las declaraciones y los documentos públicos.",
    next: "Siguiente artículo", previous: "Volver a la revista",
    footer: "Revista independiente de IA y archivo público", backTop: "Volver arriba", photo: "Fotografía de servidores",
  },
} as const;
