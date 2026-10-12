import { createContentLoader } from "vitepress";

export interface Post {
  title: string;
  date: string;
  tags: string[];
  url: string;
  lang: "en" | "zh";
}

declare const data: Post[];
export { data };

function parseTs(date: string, url: string): number {
  // Prefer the frontmatter `date`, fall back to the YYYY-MM-DD file prefix.
  return Date.parse(date) || Date.parse(url.split("/").pop()?.slice(0, 10) ?? "") || 0;
}

// YAML parses unquoted dates (e.g. `2026-10-12`) into Date objects; normalize
// them to `YYYY-MM-DD` strings so they display cleanly.
function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value ? String(value) : "";
}

export default createContentLoader("**/posts/*.md", {
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter }) => {
        const isZh = url.startsWith("/zh/");
        return {
          title: (frontmatter.title as string) ?? url,
          date: formatDate(frontmatter.date),
          tags: Array.isArray(frontmatter.tags)
            ? (frontmatter.tags as string[])
            : [],
          // `en` is the root locale: strip the folder prefix from its URLs.
          url: isZh ? url : url.replace(/^\/en/, ""),
          lang: isZh ? "zh" : "en",
        };
      })
      .sort((a, b) => parseTs(b.date, b.url) - parseTs(a.date, a.url));
  },
});
