"use client";

import { useI18n } from "./LanguageProvider";
import Facts from "./Facts";
import LatestBriefing from "./LatestBriefing";
import Manifesto from "./Manifesto";
import Petition from "./Petition";
import SubmitForm from "./SubmitForm";
import styles from "./CommunityArchive.module.css";

const archiveTitle = { zh: "公共档案", en: "Public archive", es: "Archivo público" };

export default function CommunityArchive() {
  const { locale } = useI18n();
  return (
    <div className={styles.community}>
      <section id="facts" className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.inner}>
          <h2 className={styles.heading} id="archive-title">{archiveTitle[locale]}</h2>
          <div className={styles.folders}>
            <LatestBriefing />
            <Facts />
            <Manifesto />
          </div>
        </div>
      </section>
      <Petition />
      <SubmitForm />
    </div>
  );
}
