"use client";

import { useState } from "react";
import { edition } from "@/lib/edition";
import type { Locale } from "@/lib/i18n";

const labels = {
  zh: { film: "即梦成片", source: "实拍参考", view: "查看完整原片", silent: "无声节选", selector: "选择放映版本" },
  en: { film: "Animated short", source: "Reference footage", view: "Watch the full original", silent: "Silent excerpt", selector: "Select a film" },
  es: { film: "Corto animado", source: "Vídeo de referencia", view: "Ver el original completo", silent: "Fragmento sin audio", selector: "Seleccionar vídeo" },
};

export default function CinemaPlayer({ locale, sourcePage }: { locale: Locale; sourcePage: string }) {
  const [version, setVersion] = useState<"film" | "source">("film");
  const copy = labels[locale];
  const isFilm = version === "film";
  const media = isFilm ? "/media/dario-on-air" : "/media/dario-reference";

  return (
    <figure className="cinema-frame">
      <div className="reel-switch" role="group" aria-label={copy.selector}>
        {(["film", "source"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-controls="cinema-screen"
            aria-pressed={version === item}
            onClick={() => setVersion(item)}
          >
            {copy[item]}
          </button>
        ))}
      </div>
      <video
        id="cinema-screen" key={version}
        controls playsInline preload="none"
        src={media + ".mp4"} poster={media + ".webp"}
        aria-label={isFilm ? edition[locale].filmTitle : copy.source}
      />
      <figcaption className="micro">
        <span><i /> {isFilm ? "VOICE WALL PICTURES" : "KEVIN HENDERSON / AFN"}</span>
        <span>{isFilm ? "SEEDANCE  /  16:9" : "00:23.6 – 00:29.4"}</span>
      </figcaption>
      {!isFilm && <div className="reel-source">
        <span>{copy.silent} · </span><a href={sourcePage} target="_blank" rel="noreferrer">{copy.view} ↗</a>
        <p lang="en">The appearance of U.S. Department of War (DoW) visual information does not imply or constitute DoW endorsement.</p>
      </div>}
    </figure>
  );
}
