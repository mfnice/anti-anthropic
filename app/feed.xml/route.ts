import { AI_NEWS_ITEMS, AI_NEWS_UPDATED_AT } from "@/lib/ai-news";
import { absoluteUrl, siteDescription, siteName } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = AI_NEWS_ITEMS.map((item) => {
    const sourceUrl = item.sources[0]?.url ?? absoluteUrl("/#ai-news");
    return `
      <item>
        <title>${escapeXml(item.copy.zh.title)}</title>
        <link>${escapeXml(sourceUrl)}</link>
        <guid isPermaLink="false">${escapeXml(`ai-news:${item.id}`)}</guid>
        <pubDate>${new Date(`${item.date}T00:00:00+08:00`).toUTCString()}</pubDate>
        <category>${escapeXml(item.category)}</category>
        <description>${escapeXml(item.copy.zh.summary)}</description>
      </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteName} · AI Daily Wire`)}</title>
    <link>${absoluteUrl("/")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteDescription)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date(`${AI_NEWS_UPDATED_AT}T00:00:00+08:00`).toUTCString()}</lastBuildDate>
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
