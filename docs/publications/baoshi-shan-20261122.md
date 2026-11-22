# 宝石山小马线生活文章发布

日期：2026-11-22，Asia/Shanghai。用户已确认轻松开心的正文、轨迹旋转交互及删除正文运动数据，并明确授权图片存 R2、发布博客。

- 文章：《今天去宝石山，遛了一匹小马》。地址为 `https://blog.aiyly.com/2026/11/22/baoshi-shan-pony-line/`。
- 实际角色：Root 兼文章编辑、前端与博客发布；无独立代理。
- 文章源：`source/_posts/baoshi-shan-pony-line.md`；图片链接全部使用博客 HTTPS 地址，无本机路径。
- 图片本体：私有 R2 `aiyly-box-library/blog-media/baoshi-shan-20261122-v1/`，八张 JPG 原样上传，逐项读回核对 SHA-256，并在 HTTPS 分发地址再次核对一致。GitHub 不存这批照片本体。
- 分发：`aiyly-blog-media` Worker，`blog.aiyly.com/media/*` 路由。只允许本篇八张照片，GET/HEAD、ETag 条件读取已实测；未知和私有路径 404，写方法 405。原有 18 条 Worker 路由保持。Worker 源及无秘密元数据见 `workers/blog-media/`。
- 验证：Worker 四项行为检查通过。本地静态站 390/1366 两视口，生活栏目进入文章、八图加载、canonical/OG、开心版正文、无正文运动数据、旋转与键盘还原全部通过，无页面脚本错误和横向溢出。
- 发布范围：新文章、生活栏目、三层归档、三个标签页、Atom 和 Sitemap。旧标签内容保留，首页、技术栏目、简历和共用样式保持。
- Pages 生产状态：待推送及正式 HTTPS 验证，不把 R2 图片上线视为文章已发布。
- 下一接收人：Root 完成 Pages 发布与线上核验，再记录最终提交和结果。
