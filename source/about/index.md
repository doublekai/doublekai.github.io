---
title: 个人简历
---

<style>
.resume { color: #233039; font-size: 15px; line-height: 1.72; overflow-wrap: anywhere; }
.post-block:has(.resume) > .post-title { display: none; }
.resume .resume-header { padding: 8px 0 18px; border-bottom: 2px solid #24735c; margin-bottom: 16px; }
.resume .resume-header h1 { margin: 0 0 4px; color: #17272c; font-size: 36px; line-height: 1.2; }
.resume .resume-role { color: #24735c; font-size: 17px; font-weight: 700; margin: 6px 0; }
.resume .resume-meta { color: #47555d; font-size: 14px; margin: 4px 0; }
.resume h2, .resume h3, .resume h4 { left: auto; max-width: none; }
.resume .headerlink { display: none; }
.resume h2 { color: #17272c; font-size: 21px; line-height: 1.35; margin: 24px 0 10px; padding-bottom: 5px; border-bottom: 1px solid #dde6e3; }
.resume h3 { color: #17272c; font-size: 17px; line-height: 1.4; margin: 14px 0 4px; }
.resume h4 { color: #24735c; font-size: 15px; line-height: 1.45; margin: 12px 0 4px; }
.resume p, .resume ul { margin: 5px 0 8px; }
.resume ul { padding-left: 1.4em; }
.resume li { margin-bottom: 6px; }
.resume .print-btn { margin-top: 8px; padding: 6px 12px; background: #24735c; color: #fff; border: 0; border-radius: 5px; cursor: pointer; font: inherit; }
.resume .print-btn:focus-visible { outline: 2px solid #17272c; outline-offset: 3px; }
@media (max-width: 600px) {
  .resume .resume-header h1 { font-size: 30px; }
  .resume .resume-role { font-size: 16px; }
}
@media print {
  @page { size: A4; margin: 12mm 15mm; }
  body { background: #fff !important; }
  header, footer, .post-title, .post-info, .no-print { display: none !important; }
  .wrap, main.container, .post, .post-block, .post-content { width: auto !important; max-width: none !important; margin: 0 !important; padding: 0 !important; }
  .resume { font-size: 10pt; line-height: 1.36; color: #222; }
  .resume .resume-header { padding: 0 0 7px; margin-bottom: 8px; }
  .resume .resume-header h1 { font-size: 21pt; }
  .resume .resume-role { font-size: 12pt; margin: 3px 0; }
  .resume .resume-meta { display: inline; font-size: 9pt; margin-right: 12px; }
  .resume h2 { font-size: 13pt; margin: 8px 0 3px; padding-bottom: 2px; }
  .resume h3 { font-size: 11pt; margin: 7px 0 2px; }
  .resume h4 { font-size: 10pt; margin: 6px 0 2px; }
  .resume h2, .resume h3, .resume h4 { break-after: avoid; }
  .resume p, .resume ul { margin: 3px 0 4px; }
  .resume li { margin-bottom: 2px; break-inside: avoid; }
  .resume a { color: inherit !important; text-decoration: none !important; }
}
</style>

<div class="resume">
<div class="resume-header">
<h1>王凯</h1>
<p class="resume-role">AI Agent / 后端开发工程师</p>
<p class="resume-meta"><a href="mailto:wdoublekai@126.com">wdoublekai@126.com</a> · 微信：wdoublekai</p>
<p class="resume-meta"><a href="https://github.com/doublekai">GitHub</a> · <a href="/tech/">技术博客</a></p>
<button class="print-btn no-print" type="button" onclick="window.print()">打印 / 保存 PDF</button>
</div>

## 个人简介

以 Node.js、TypeScript 和 Python 为主要技术栈，开发面向包装设计的多模态 Agent，覆盖从对话、工具调用到可编辑交付的链路。有异步任务、积分计费、支付订阅和数据库性能优化经验。

## 工作经历

### 包小盒 / Pacdora ｜ 后端开发工程师

**2022.08 — 至今** · 国内业务至 2024.01，2024.02 起参与海外业务

#### Pacdora AI Design｜AI 包装设计工作台

- **多模态 Agent：**开发对话式包装设计 Agent，接入生图、改图、背景处理、Logo、扩图和视频工具。参与从 LangGraph 迁移至自研 ReAct 运行时，用带步数上限的循环处理澄清、工具选择和结果反馈，由业务代码校验权限、资产归属、参数和付费条件。
- **上下文与任务接续：**区分产品图、风格图、结构图和编辑目标，按用户、品牌、产品和资产持久化记忆，支持补充素材后接续原任务。
- **真实刀板与可编辑 3D：**串联需求描述、盒型搜索、尺寸确认、刀板生成和 3D 预览，将 2D 方案转成可继续编辑的 3D 包装。先生成主展示面，再并行生成其他面，按刀板几何、遮罩和面坐标裁切贴图，减少文字被裁切及已完成内容被覆盖。
- **图像分层与编辑：**将生成图拆成文字、艺术字、图形和背景，用真实字体将普通文字重建为画布原生图层。单个已验证任务产出 **50 余个图层，其中 30 余个文字图层可编辑**。优化蒙版、下载和合成，在本地固定模型数据测试中将 RSS 峰值从 625 MiB 降至 357 MiB，降幅约 **43%**。
- **商品海报：**参与前后端实现，串联模板选择、商品图上传或复用、包装候选生成、海报生成和画布编辑。为 **461 张模板**整理多维标签并实现加权搜索，支持任务进度展示、刷新恢复和失败重试。
- **异步任务与商业化：**实现任务状态持久化、事件时间线和增量轮询，支持取消、从失败步骤恢复和复用结果。接入 AI Design 积分包与免水印权益，实现批量扣费、部分失败退款和重试幂等。
- **性能与稳定性：**改写积分去重查询。生产只读对比中，原查询约 **2.47 秒**，改写后的核心聚合约 **11～12 毫秒**。修复 RabbitMQ 消费者重复注册造成的通道耗尽。

#### 包小盒国内业务与 Pacdora 海外站

- 设计订单和账单微服务，接入支付宝连续包月及微信支付；作为包小印核心后端开发，实现包装报价引擎、合并下单、供应商分单及售后流程。
- 在海外站接入多语言翻译与校对流程，维护动态 Sitemap、结构化数据和 hreflang，使用 AWS S3、CloudFront、Lambda 支持资源存储和分发。

### 北京八分量信息科技有限公司 ｜ Python 开发工程师

**2021.07 — 2022.07** · 使用 FastAPI 和 PostgreSQL 开发隐私计算平台，负责多数据源存储和节点服务；使用 Django 和 MySQL 开发跨链数据平台。

## 个人项目

### Aiyly · AI 数据分析平台

[在线体验](https://ai.aiyly.com) · 独立开发自然语言查询 MySQL 的应用。用 OpenAI SDK 串联工具调用和结果解读，以表列白名单和参数化约束只读查询，通过 SSE 返回处理过程与结果。

## 技术栈

- **后端：**Node.js、TypeScript、Midway.js、Python、FastAPI、Django
- **数据与基础设施：**MySQL、PostgreSQL、Redis、RabbitMQ、Docker、Nginx、GitLab CI/CD

## 教育背景

**合肥大学** · 本科 · 2021 年毕业

</div>
