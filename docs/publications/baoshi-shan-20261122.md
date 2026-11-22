# 宝石山小马线生活文章发布

日期：2026-11-22，Asia/Shanghai。用户已确认轻松开心的正文、轨迹旋转交互及删除正文运动数据，并明确授权图片存 R2、发布博客。

- 文章：《今天去宝石山，遛了一匹小马》。地址为 `https://blog.aiyly.com/2026/11/22/baoshi-shan-pony-line/`。
- 实际角色：Root 兼文章编辑、前端与博客发布；无独立代理。
- 文章源：`source/_posts/baoshi-shan-pony-line.md`；图片链接全部使用博客 HTTPS 地址，无本机路径。
- 图片本体：私有 R2 `aiyly-box-library/blog-media/baoshi-shan-20261122-v1/`，八张 JPG 原样上传，逐项读回核对 SHA-256，并在 HTTPS 分发地址再次核对一致。GitHub 不存这批照片本体。
- 分发：`aiyly-blog-media` Worker，`blog.aiyly.com/media/*` 路由。只允许本篇八张照片，GET/HEAD、ETag 条件读取已实测；未知和私有路径 404，写方法 405。原有 18 条 Worker 路由保持。Worker 源及无秘密元数据见 `workers/blog-media/`。
- 验证：Worker 四项行为检查通过。本地静态站 390/1366 两视口，生活栏目进入文章、八图加载、canonical/OG、开心版正文、无正文运动数据、旋转与键盘还原全部通过，无页面脚本错误和横向溢出。
- 发布范围：新文章、生活栏目、三层归档、三个标签页、Atom 和 Sitemap。旧标签内容保留，首页、技术栏目、简历和共用样式保持。
- Pages 生产状态：已发布。文章实现源码提交 `0eee1c8`，静态发布提交 `7cafb2e0658b1dd23006ddb7c8587dfaabd71d4f`；GitHub Pages [run 45014971673](https://github.com/doublekai/doublekai.github.io/actions/runs/45014971673) 的 build、report-build-status、deploy 全部 success。
- 正式域名验收：本次十个发布文件 HTTPS 200，正文与已提交产物逐项一致。390/1366 两视口从生活栏目点击进入文章，八图加载、canonical/OG、正文、无正文运动数据、点击倒转及键盘还原均通过，无脚本错误或横向溢出。
- 接续：用户可从生活栏目或文章地址直接访问。下一篇图片继续采用新版本前缀，按本文记录的上传、读回、分发和页面发布顺序维护。
