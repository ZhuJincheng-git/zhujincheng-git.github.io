import mathjax3 from "markdown-it-mathjax3";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jack Zhu",
  description: "What I See",
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
    // English
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          { text: "Blog", link: "/posts/2026-06-30-first-post" },
          { text: "GitHub", link: "https://github.com/ZhuJincheng-git" },
        ],
        sidebar: {
          "/posts/": [
            {
              text: "Blog",
              items: [
                { text: "First Post", link: "/posts/2026-06-30-first-post" },
                { text: "MCTS", link: "/posts/2025-12-31-mcts" },
                {
                  text: "The Great Failure",
                  link: "/posts/2026-07-01-the-great-failure",
                },
                { text: "About AI", link: "/posts/2026-07-02-about-ai" },
                {
                  text: "Solidification",
                  link: "/posts/2026-09-02-solidification",
                },
                {
                  text: "From Recursion to Iteration",
                  link: "/posts/2026-10-12-from-recursion-to-iteration",
                },
              ],
            },
          ],
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
          { text: "文章", link: "/zh/posts/2026-06-30-first-post" },
          { text: "GitHub", link: "https://github.com/ZhuJincheng-git" },
        ],
        sidebar: {
          "/zh/posts/": [
            {
              text: "文章",
              items: [
                { text: "第一篇文章", link: "/zh/posts/2026-06-30-first-post" },
                { text: "蒙特卡洛树搜索", link: "/zh/posts/2025-12-31-mcts" },
                {
                  text: "大失败",
                  link: "/zh/posts/2026-07-01-the-great-failure",
                },
                { text: "关于人工智能", link: "/zh/posts/2026-07-02-about-ai" },
                {
                  text: "固化",
                  link: "/zh/posts/2026-09-02-solidification",
                },
                {
                  text: "从递归到迭代",
                  link: "/zh/posts/2026-10-12-from-recursion-to-iteration",
                },
              ],
            },
          ],
          "/zh/": [],
        },
      },
    },
  },
});
