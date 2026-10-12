# Jack Zhu's Blog

基于 [VitePress](https://vitepress.dev/) 的个人博客，部署在 GitHub Pages。

## 目录结构

```
docs/
├── en/            # 英文（根语言，URL 在 / 下）
│   ├── index.md   # 英文首页
│   └── posts/     # 英文文章
├── zh/            # 中文（URL 在 /zh/ 下）
│   ├── index.md   # 中文首页
│   └── posts/     # 中文文章
├── components/    # 共享 Vue 组件
├── public/        # 静态资源（图片等，URL 以 / 开头引用）
└── .vitepress/
    └── config.mts # 站点配置（侧边栏自动生成，一般不用改）
```

各语言是同级目录。新增语言时：新建 `docs/<lang>/`（结构同上），并在
`config.mts` 的 `locales` 中参照 `zh` 加一个条目即可。

## 添加文章

1. 在对应语言的 `posts/` 目录下新建 `.md` 文件，例如：
   `docs/zh/posts/2026-10-15-my-new-post.md`
2. 写好 frontmatter（见下节），正文用 Markdown 写。
3. 推送后 GitHub Actions 自动构建部署，文章的侧边栏条目**自动生成**，
   无需修改任何配置。

中文文章放在 `docs/zh/posts/`，英文文章放在 `docs/en/posts/`。
两种语言各自维护，不要求一一对应。

> 注意：dev server（`npm run docs:dev`）运行中新增文章时，页面会热更新，
> 但侧边栏需要重启 dev server 才会刷新（标签页不受影响，会自动更新）。
> 构建（含 CI 部署）总是最新的。

## 文件名约定

```
YYYY-MM-DD-slug.md
```

- 日期前缀：文章日期，也是排序的兜底依据（frontmatter 的 `date` 缺失时使用）。
- `slug`：URL 的一部分，只用小写字母、数字和连字符，见名知义。
- 文件名即 URL：`docs/zh/posts/2026-10-15-my-new-post.md` 的地址是
  `/zh/posts/2026-10-15-my-new-post.html`。文件名确定后不要改，会改变文章链接。

## Frontmatter 约定

```yaml
---
layout: doc
title: 文章标题
date: 2026-10-15
tags:
  - 算法
  - 笔记
---
```

| 字段     | 说明                                                            |
| -------- | --------------------------------------------------------------- |
| `layout` | 固定为 `doc`。                                                   |
| `title`  | 侧边栏和浏览器标签页显示的标题。                                  |
| `date`   | 文章日期，决定侧边栏排序（新→旧）。建议与文件名日期一致。          |
| `tags`   | 标签列表，用于标签页筛选（见下节）。                          |

正文从 frontmatter 之后开始写；一级标题（`#`）建议与 `title` 保持一致。

## 标签筛选

导航栏的「Tags / 标签」页（`/tags`、`/zh/tags`）按语言汇总所有文章的标签，
点击标签即筛选出该标签下的文章列表，数据来自文章的 `tags` 字段，无需任何配置。

## 本地开发

```bash
npm ci              # 首次安装依赖
npm run docs:dev    # 本地预览（http://localhost:5173）
npm run docs:build  # 构建到 docs/.vitepress/dist
npm run docs:preview  # 预览构建产物
```

## 部署

推送到 `main` 分支即自动构建并部署到 GitHub Pages，无需手动操作。
