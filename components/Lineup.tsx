import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { edition, editionPath } from "@/lib/edition";
import { JOURNAL } from "@/lib/journal";
import { AI_NEWS_SECTION } from "@/lib/ai-news";

export default function Lineup({ locale }: { locale: Locale }) {
  const copy = edition[locale];
  const latest = JOURNAL[0];
  const moreOpinions = JOURNAL.filter((story) => story.category === "opinion" && story.id !== latest.id).slice(0, 3);
  const cards = [
    { href: editionPath(locale, `/articles/${latest.id}`), image: "/media/server-rack.webp", top: AI_NEWS_SECTION[locale].categories[latest.category], detail: latest.date.replaceAll("-", "."), title: latest.copy[locale].title, mark: latest.category === "opinion" ? "OPINION" : "AI WIRE", style: "wire" },
    { href: "#facts", image: "/dario.webp", top: copy.archive, detail: "ANTHROPIC", title: copy.archiveTitle, mark: "CASE FILES", style: "files" },
  ];
  return (
    <section className="lineup section-space" id="lineup" aria-labelledby="lineup-title">
      <span id="ai-news" />
      <div className="section-head">
        <div><p className="eyeline"><i />THE LINEUP</p><h2 id="lineup-title">{copy.selections}<em>.</em></h2></div>
        <Link className="text-link" href={editionPath(locale, "/articles")}>{copy.all} <span aria-hidden>↗</span></Link>
      </div>
      <div className="lineup-grid">
        {cards.map((card) => (
          <Link className={`feature-card feature-${card.style}`} key={card.href} href={card.href}>
            <div className="feature-art">
              <Image src={card.image} alt="" fill sizes="(min-width: 761px) 46vw, 92vw" />
              <b lang="en" aria-hidden>{card.mark}</b><span className="art-corner" aria-hidden>↗</span>
            </div>
            <p className="card-meta"><span>{card.top}</span><span> / </span>{card.detail}</p>
            <h3>{card.title}</h3>
          </Link>
        ))}
      </div>
      {moreOpinions.length > 0 && (
        <div className="opinion-links">
          <h3>{copy.moreOpinions}</h3>
          <ul>
            {moreOpinions.map((story) => <li key={story.id}>
              <Link href={editionPath(locale, `/articles/${story.id}`)}>{story.copy[locale].title} <span aria-hidden>↗</span></Link>
            </li>)}
          </ul>
        </div>
      )}
    </section>
  );
}
