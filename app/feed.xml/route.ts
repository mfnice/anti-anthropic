import { edition, editionPath } from "@/lib/edition";
import { JOURNAL } from "@/lib/journal";
import { absoluteUrl, siteName, siteUpdatedAt } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function rssDate(date: string) {
  return new Date(`${date}T00:00:00+08:00`).toUTCString();
}

export function GET() {
  const items = JOURNAL.map((item) => {
    const articleUrl = absoluteUrl(editionPath("zh", `/articles/${item.id}`));
    return `
      <item>
        <title>${escapeXml(item.copy.zh.title)}</title>
        <link>${escapeXml(articleUrl)}</link>
        <guid isPermaLink="false">${escapeXml(`ai-news:${item.id}`)}</guid>
        <pubDate>${rssDate(item.date)}</pubDate>
        <category>${escapeXml(item.category)}</category>
        <description>${escapeXml(item.copy.zh.summary)}</description>
      </item>`;
  }).join("");

  const copy = edition.zh;
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteName} · ${copy.articleIndex}`)}</title>
    <link>${escapeXml(absoluteUrl(editionPath("zh", "/articles")))}</link>
    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(copy.indexIntro)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${rssDate(siteUpdatedAt)}</lastBuildDate>
    <ttl>1440</ttl>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
