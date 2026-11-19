import type { MetadataRoute } from "next";
import { siteDescription, siteName, siteTitle } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: siteName,
    description: siteDescription,
    lang: "zh-CN",
    start_url: "/",
    display: "standalone",
    background_color: "#fff4df",
    theme_color: "#fff4df",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
