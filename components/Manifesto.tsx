"use client";

import { useI18n } from "./LanguageProvider";
import styles from "./CommunityArchive.module.css";

const label = { zh: "本站宣言", en: "Our manifesto", es: "Nuestro manifiesto" };

export default function Manifesto() {
  const { locale, t } = useI18n();
  return (
    <details className={styles.folder}>
      <summary><span>{label[locale]}</span></summary>
      <div className={styles.folderBody}>
        <h3>{t.manifesto.title}</h3>
        <p>{t.manifesto.body}</p>
        <ul className={styles.bullets}>
          {t.manifesto.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </details>
  );
}
