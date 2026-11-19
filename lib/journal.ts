import { AI_ARTICLES, AI_ARTICLES_UPDATED_AT, type AIArticle } from "./ai-articles";
import { AI_NEWS_ITEMS, AI_NEWS_UPDATED_AT } from "./ai-news";

export type JournalEntry = AIArticle;

const newIds = new Set(AI_ARTICLES.map((item) => item.id));
const previous: JournalEntry[] = AI_NEWS_ITEMS.filter((item) => !newIds.has(item.id)).map((item) => ({
  ...item,
  copy: {
    zh: { ...item.copy.zh, body: [] },
    en: { ...item.copy.en, body: [] },
    es: { ...item.copy.es, body: [] },
  },
}));

export const JOURNAL: JournalEntry[] = [...AI_ARTICLES, ...previous].sort((a, b) => b.date.localeCompare(a.date));

export const JOURNAL_UPDATED_AT = [AI_ARTICLES_UPDATED_AT, AI_NEWS_UPDATED_AT, JOURNAL[0].date].sort().at(-1)!;
