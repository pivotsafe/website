// Auto-generated public sitemap covering the indexable routes. Blog detail
// pages are deliberately excluded while content is hidden.
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pivotsafe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/software_security",
    "/ics_scada_security",
    "/embedded_iot_security",
    "/ai_red_teaming",
    "/cloud_security",
    "/penetration_testing",
    "/adversary_simulation",
    "/adversary-simulation-red-team-ops",
    "/real-world-skills",
    "/blogs",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
