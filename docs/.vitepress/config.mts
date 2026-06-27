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
          { text: "Blog", link: "/posts/first-post" },
          { text: "GitHub", link: "https://github.com/ZhuJincheng-git" },
        ],
        sidebar: {
          "/posts/": [
            {
              text: "Log",
              items: [{ text: "01. First Post", link: "/posts/first-post" }],
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
          { text: "文章", link: "/zh/posts/first-post" },
          { text: "GitHub", link: "https://github.com/ZhuJincheng-git" },
        ],
        sidebar: {
          "/zh/posts/": [
            {
              text: "日志",
              items: [{ text: "01. 第一篇文章", link: "/zh/posts/first-post" }],
            },
          ],
          "/zh/": [],
        },
      },
    },
  },
});
