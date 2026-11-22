# 博客公开照片

Worker `aiyly-blog-media` 处理 `blog.aiyly.com/media/*`。照片本体在私有 R2 桶 `aiyly-box-library` 的 `blog-media/` 前缀，GitHub Pages 只保存文章与图片链接。

当前仅允许 `baoshi-shan-20261122-v1/` 下这篇文章选用的八个 JPG 文件，文件名在 `index.mjs` 中精确列出。其他路径返回 404，写入方法返回 405。没有桶列表、任意对象代理或私有图片入口。GET 以流返回照片，HEAD 与 ETag 条件读取受支持。

`metadata.json` 为 Cloudflare 上传元数据，使用 R2 binding；不包含凭据。首次发布配置日期为 2026-11-22，日志及 traces 已开启。生产凭据沿用本机受保护配置，通过 Cloudflare API 发布；不保存到仓库。

本地行为检查：`node --test workers/blog-media/index.test.mjs`。新增文章照片时使用新的版本前缀，先上传并核对 SHA-256，再扩展允许清单、发布 Worker，最后更新文章。旧对象版本保留供回滚。
