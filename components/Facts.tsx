"use client";

import { useI18n } from "./LanguageProvider";
import styles from "./CommunityArchive.module.css";

const label = { zh: "事件与原始出处", en: "Events and sources", es: "Hechos y fuentes" };

export default function Facts() {
  const { locale, t } = useI18n();
  return (
    <details className={styles.folder}>
      <summary><span>{label[locale]}</span><small>{t.facts.items.length}</small></summary>
      <div className={styles.folderBody}>
        <p>{t.facts.description}</p>
        {t.facts.items.map((item) => (
          <article key={item.title} className={styles.record}>
            <p className={styles.recordDate}>{item.date}</p>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              {item.sourceUrl && (
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  {item.sourceLabel ?? t.briefing.sourceLabel} ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </details>
  );
}
