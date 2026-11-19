import { edition } from "@/lib/edition";
import type { Locale } from "@/lib/i18n";

const references = [
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
  {
    title: { zh: "《浮士德》中的梅菲斯特", en: "Mephistopheles in Faust", es: "Mefistófeles en Fausto" },
    credit: "Eugène Delacroix · The Met",
    url: "https://www.metmuseum.org/art/collection/search/336615",
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
          <a href="/media/dario-sources.txt" className="text-link" target="_blank" rel="noreferrer">
            {locale === "zh" ? "完整制作记录" : locale === "en" ? "Production notes" : "Notas de producción"} ↗
          </a>
        </details>
      </div>
      <figure className="cinema-frame">
        <video controls playsInline preload="none" src="/media/dario-after-hours.mp4" poster="/media/dario-after-hours.webp" aria-label={copy.play + " · " + copy.filmTitle} />
        <figcaption className="micro"><span><i /> VOICE WALL PICTURES</span><span>SEEDANCE &nbsp; / &nbsp; 16:9</span></figcaption>
      </figure>
    </section>
  );
}
