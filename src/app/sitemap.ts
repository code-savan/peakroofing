import type { MetadataRoute } from "next"

const baseUrl = "https://peakroofing.com"
const lastModified = "2026-06-30"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
