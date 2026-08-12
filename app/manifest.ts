import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Protest File",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f0d",
    theme_color: "#dfff45",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
