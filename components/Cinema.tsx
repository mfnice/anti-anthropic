import { edition } from "@/lib/edition";
import type { Locale } from "@/lib/i18n";
import CinemaPlayer from "./CinemaPlayer";

const sourcePage = "https://www.dvidshub.net/video/874137/staff-sgt-sari-seibert-she-became-afn-radio-dj-broll";

const references = [
  {
    title: { zh: "电台实拍动作与剪辑参考", en: "Radio studio motion and edit reference", es: "Referencia de movimiento y montaje en la radio" },
    credit: "Kevin Henderson · AFN Kaiserslautern · 2023",
    url: sourcePage,
  },
  {
    title: { zh: "达里奥造型研究", en: "Character design", es: "Diseño del personaje" },
    credit: "Simon Walker / No 10 Downing Street",
    url: "https://commons.wikimedia.org/wiki/File:Dario_Amodei_in_2023.jpg",
  },
  {
    title: { zh: "迈阿密海滩的装饰艺术建筑", en: "Art Deco, Miami Beach", es: "Art déco de Miami Beach" },
    credit: "Carol M. Highsmith · Library of Congress",
    url: "https://www.loc.gov/item/2011630398/",
  },
];

export default function Cinema({ locale }: { locale: Locale }) {
  const copy = edition[locale];
  return (
    <section id="cinema" className="cinema section-space" aria-labelledby="cinema-title">
      <div className="cinema-details">
        <p className="eyeline"><i />MIDNIGHT CINEMA</p>
        <h2 id="cinema-title">{copy.filmTitle}<em>.</em></h2>
        <p className="film-tag">{copy.fiction}</p>
        <p className="film-summary">{copy.filmDesc}</p>
        <details className="film-credits">
          <summary>{copy.credits}</summary>
          <ul>
            {references.map((reference) => (
              <li key={reference.url}>
                <a href={reference.url} target="_blank" rel="noreferrer">{reference.title[locale]} ↗</a>
                <small>{reference.credit}</small>
              </li>
            ))}
          </ul>
          <a href="/media/dario-on-air-sources.txt" className="text-link" target="_blank" rel="noreferrer">
            {locale === "zh" ? "完整制作记录" : locale === "en" ? "Production notes" : "Notas de producción"} ↗
          </a>
        </details>
      </div>
      <CinemaPlayer locale={locale} sourcePage={sourcePage} />
    </section>
  );
}
