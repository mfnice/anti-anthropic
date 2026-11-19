import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { edition, editionPath } from "@/lib/edition";
import { JOURNAL } from "@/lib/journal";

export default function Lineup({ locale }: { locale: Locale }) {
  const copy = edition[locale];
  const latest = JOURNAL[0];
  const cards = [
    { href: editionPath(locale, `/articles/${latest.id}`), image: "/media/server-rack.webp", top: copy.articles, detail: latest.date.replaceAll("-", "."), title: latest.copy[locale].title, mark: "AI WIRE", style: "wire" },
    { href: "#cinema", image: "/media/dario-after-hours.webp", top: copy.cinema, detail: copy.fiction, title: copy.filmTitle, mark: "AFTER HOURS", style: "movie" },
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
              <Image src={card.image} alt="" fill sizes="(min-width: 750px) 32vw, 92vw" />
              <b lang="en" aria-hidden>{card.mark}</b><span className="art-corner" aria-hidden>{card.style === "movie" ? "▶" : "↗"}</span>
            </div>
            <p className="card-meta"><span>{card.top}</span><span> / </span>{card.detail}</p>
            <h3>{card.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
