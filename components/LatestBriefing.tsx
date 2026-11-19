"use client";

import { useI18n } from "./LanguageProvider";
import styles from "./CommunityArchive.module.css";

const label = { zh: "AI 安全与监督简报", en: "AI safety briefings", es: "Informes de seguridad de IA" };

export default function LatestBriefing() {
  const { locale, t } = useI18n();
  return (
    <details className={styles.folder}>
      <summary><span>{label[locale]}</span><small>{t.briefing.items.length}</small></summary>
      <div className={styles.folderBody}>
        <p>{t.briefing.description} {t.briefing.updated}</p>
        {t.briefing.items.map((item) => (
          <article key={item.title} className={styles.record}>
            <p className={styles.recordDate}>{item.date}<br />{item.status}</p>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className={styles.sources}>
                {item.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    {source.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </details>
  );
}
