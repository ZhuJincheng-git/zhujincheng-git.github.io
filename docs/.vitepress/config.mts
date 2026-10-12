import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import mathjax3 from "markdown-it-mathjax3";
import { defineConfig } from "vitepress";

const DOCS_DIR = fileURLToPath(new URL("..", import.meta.url));

interface Post {
  text: string;
  link: string;
  ts: number;
}

/**
 * Scan a locale's posts directory and build sidebar items sorted by
 * date descending (newest first). Adding a new .md file to the
 * directory is enough — no manual config edit is needed. The scan
 * runs at dev-server start and at build time, so both local dev and
 * CI deploys stay in sync automatically.
 */
function getPosts(langDir: string, urlPrefix: string): Post[] {
  const dir = join(DOCS_DIR, langDir, "posts");
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(dir, file), "utf-8");
      const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
      const title =
        frontmatter.match(/^title:\s*(.+)$/m)?.[1].trim() ??
        file.replace(/\.md$/, "");
      // Prefer the frontmatter `date`, fall back to the YYYY-MM-DD file prefix.
      const ts =
        Date.parse(frontmatter.match(/^date:\s*(.+)$/m)?.[1].trim() ?? "") ||
        Date.parse(file.slice(0, 10)) ||
        0;
      return {
        text: title,
        link: `${urlPrefix}/posts/${file.replace(/\.md$/, "")}`,
        ts,
      };
    })
    .sort((a, b) => b.ts - a.ts || a.text.localeCompare(b.text));
}

// Languages live in sibling directories under docs/ (en/, zh/, ...).
// `en` is the root locale: its folder is rewritten to `/` so existing
// URLs keep working. To add a language later, drop in `docs/<lang>/`
// and add a matching entry here.
const enPosts = getPosts("en", "");
const zhPosts = getPosts("zh", "/zh");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jack Zhu",
  description: "What I See",
  // Serve the root locale from docs/en/ while keeping its URLs at /...
  rewrites: {
    "en/:path(.*)": ":path(.*)",
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3); // Latex
    },
  },
  head: [
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js", // MathJax
        async: "true",
      },
    ],
  ],
  locales: {
    // English (root, content in docs/en/ via rewrites)
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          { text: "Blog", link: enPosts[0]?.link ?? "/posts/" },
          { text: "GitHub", link: "https://github.com/ZhuJincheng-git" },
        ],
        sidebar: {
          "/posts/": [{ text: "Blog", items: enPosts }],
          "/": [],
        },
      },
    },
    // Chinese
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: {
        nav: [
          { text: "文章", link: zhPosts[0]?.link ?? "/zh/posts/" },
          { text: "GitHub", link: "https://github.com/ZhuJincheng-git" },
        ],
        sidebar: {
          "/zh/posts/": [{ text: "文章", items: zhPosts }],
          "/zh/": [],
        },
      },
    },
  },
});
