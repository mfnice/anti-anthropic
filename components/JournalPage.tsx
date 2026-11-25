import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { AI_NEWS_SECTION } from "@/lib/ai-news";
import { edition, editionPath } from "@/lib/edition";
import { JOURNAL, type JournalEntry } from "@/lib/journal";
import { buildJournalMetadata } from "@/lib/site";
import { LanguageProvider } from "./LanguageProvider";
import Masthead from "./Masthead";
import Footer from "./Footer";

export type JournalParams = { params: Promise<{ entry?: string[] }> };

export function journalPaths() {
  return [{ entry: [] }, ...JOURNAL.map(({ id }) => ({ entry: [id] }))];
}

function resolveArticle(entry?: string[]) {
  if (!entry?.length) return;
  const article = entry.length === 1 && JOURNAL.find(({ id }) => id === entry[0]);
  if (!article) notFound();
  return article;
}

export async function journalMetadata(locale: Locale, { params }: JournalParams) {
  return buildJournalMetadata(locale, resolveArticle((await params).entry));
}

function StoryDate({ article, locale }: { article: JournalEntry; locale: Locale }) {
  return <div className="card-meta"><span>{AI_NEWS_SECTION[locale].categories[article.category]}</span><span> / </span><time dateTime={article.date}>{article.date.replaceAll("-", ".")}</time></div>;
}

function JournalIndex({ locale }: { locale: Locale }) {
  const copy = edition[locale];
  const [lead, ...rest] = JOURNAL;
  const leadUrl = editionPath(locale, `/articles/${lead.id}`);
  return (
    <>
      <header className="journal-head">
        <div><p className="eyeline"><i />AI JOURNAL</p><h1>{copy.articleIndex}<em>.</em></h1></div>
        <p>{copy.indexIntro}</p>
      </header>
      <article className="journal-lead">
        <Link className="journal-image feature-art feature-wire" href={leadUrl} aria-label={lead.copy[locale].title}>
          <Image src="/media/server-rack.webp" alt="" fill sizes="(min-width: 750px) 48vw, 90vw" />
          <b aria-hidden>{lead.category === "opinion" ? "OPINION" : "AI WIRE"}</b>
        </Link>
        <div className="journal-lead-copy">
          <StoryDate article={lead} locale={locale} />
          <h2><Link href={leadUrl}>{lead.copy[locale].title}</Link></h2>
          <p>{lead.copy[locale].summary}</p>
          <Link className="text-link" href={leadUrl}>{copy.readStory} ↗</Link>
        </div>
      </article>
      <h2 className="journal-archive-heading">{copy.more}</h2>
      <ol className="story-list">
        {rest.map((entry) => (
          <li key={entry.id}><Link href={editionPath(locale, `/articles/${entry.id}`)}>
            <StoryDate article={entry} locale={locale} />
            <div><h3>{entry.copy[locale].title}</h3><p>{entry.copy[locale].summary}</p></div>
            <span aria-hidden>↗</span>
          </Link></li>
        ))}
      </ol>
    </>
  );
}

function Story({ locale, article }: { locale: Locale; article: JournalEntry }) {
  const copy = edition[locale];
  const content = article.copy[locale];
  const next = JOURNAL[(JOURNAL.indexOf(article) + 1) % JOURNAL.length];
  return (
    <article className="story-page">
      <Link className="text-link back-link" href={editionPath(locale, "/articles")}>← {copy.previous}</Link>
      <StoryDate article={article} locale={locale} />
      <h1>{content.title}</h1>
      <p className="story-deck">{content.summary}</p>
      {content.body.map((paragraph) => <p className="story-body" key={paragraph}>{paragraph}</p>)}
      <div className="story-sources">
        <h2>{copy.source}</h2>
        {article.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}
      </div>
      <Link className="story-next" href={editionPath(locale, `/articles/${next.id}`)}>
        <span className="eyeline">{copy.next} →</span><strong>{next.copy[locale].title}</strong>
      </Link>
    </article>
  );
}

export async function JournalPage({ locale, params }: JournalParams & { locale: Locale }) {
  const article = resolveArticle((await params).entry);
  const path = article ? `/articles/${article.id}` : "/articles";
  return (
    <LanguageProvider initialLocale={locale}>
      <Masthead locale={locale} path={path} />
      <main className="journal section-space" id="content">{article ? <Story locale={locale} article={article} /> : <JournalIndex locale={locale} />}</main>
      <Footer locale={locale} />
    </LanguageProvider>
  );
}
