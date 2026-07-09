---
title: '用 Astro + GitHub Pages 免费搭一个博客(附踩坑)'
description: '这个博客本身的搭建记录:Astro 官方模板 + GitHub Actions 自动部署,全程免费,含 Node 版本坑'
pubDate: 'Jul 09 2026'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

这个博客上线了。作为开篇,就把它自己的搭建过程记下来——全程免费,不需要服务器,一次配置之后发文章只剩 `git push`。

## 技术选型

- **静态生成器**:Astro 官方 blog 模板。构建快,默认零 JS,写文章就是写 Markdown;
- **托管**:GitHub Pages。仓库名叫 `用户名.github.io`,站点地址就是 `https://用户名.github.io`;
- **部署**:GitHub Actions。push 到 main 分支自动构建发布,半分钟出结果。

## 关键步骤

1. 脚手架:`npm create astro@latest blog -- --template blog`;
2. 把 `astro.config.mjs` 里的 `site` 改成自己的 Pages 地址(sitemap 和 RSS 都依赖它);
3. 加一个 workflow,用官方的 `withastro/action` 构建、`actions/deploy-pages` 发布;
4. 在仓库 Settings → Pages 里把构建源切换成 **GitHub Actions**(默认是老式的分支模式);
5. push,等 Actions 变绿,完事。

## 踩到的两个坑

**坑一:GitHub 会自作主张跑一次 Jekyll。** `用户名.github.io` 仓库第一次 push 时,GitHub 默认用 Jekyll 构建你的仓库——而我的仓库是 Astro 源码,于是 Actions 里凭空多了一条红色的 `pages build and deployment` 失败记录。把 Pages 构建源切到 GitHub Actions 模式后,这条流水线就永远沉默了。那个红叉不用管,是历史遗留。

**坑二:Node 版本。** Astro 7 要求 Node ≥ 22.12,而 `withastro/action@v3` 默认给的是 Node 20,构建直接报错退出。修法很简单:

```yaml
- name: Build with Astro
  uses: withastro/action@v3
  with:
    node-version: 22
```

## 日常写作流程

之后发文章只有两步:

1. 在 `src/content/blog/` 下新建一个 `.md`,顶部写好 `title` / `description` / `pubDate`;
2. `git add . && git commit && git push`。

Actions 自动构建发布,RSS 和 sitemap 也会自动更新。对一个不想为博客维护服务器的人来说,这套组合的性价比无可挑剔。
