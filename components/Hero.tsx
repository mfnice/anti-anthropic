import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { edition, editionPath } from "@/lib/edition";
import { JOURNAL_UPDATED_AT } from "@/lib/journal";

export default function Hero({ locale }: { locale: Locale }) {
  const copy = edition[locale];
  const override = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;
  return (
    <>
      <section className="cover" aria-labelledby="cover-title">
        <Image className="cover-art" src="/media/miami-sunset.webp" alt="" fill sizes="(max-width: 760px) 1100px, 100vw" preload />
        {override && <video aria-hidden className="cover-art cover-video" src={override} muted autoPlay playsInline loop preload="none" />}
        <div className="cover-top micro">
          <p><span className="on-dot" />INDEPENDENT AI JOURNAL</p>
          <p className="cover-issue"><span aria-hidden>✳</span> NOVEMBER &nbsp; 2026</p>
        </div>
        <div className="cover-center">
          <div className="cover-lockup">
            <h1 id="cover-title" lang="en">VOICE WALL</h1>
            <span className="edition-script" lang="en">Miami Edition</span>
          </div>
        </div>
        <div className="cover-lower">
          <div><p className="cover-lead">{copy.lead}</p><p className="cover-sub">{copy.subtitle}</p></div>
          <Link href={editionPath(locale, "/articles")} className="ticket">{copy.read}<span aria-hidden>↗</span></Link>
        </div>
      </section>
      <div className="issue-strip micro">
        <span><i aria-hidden />{copy.updated} &nbsp;{JOURNAL_UPDATED_AT.replaceAll("-", ".")}</span>
        <a href="#lineup">{copy.browse} &nbsp;↓</a>
      </div>
    </>
  );
}
