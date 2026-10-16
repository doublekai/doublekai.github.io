---
title: 个人简历
---

<style>
.resume { color: #333; line-height: 1.85; }
.resume .resume-header { padding: 24px 0; border-bottom: 2px solid #27845e; margin-bottom: 28px; }
.resume .resume-header h1 { margin: 0 0 8px; font-size: 32px; }
.resume .resume-role { color: #27845e; font-size: 17px; font-weight: 600; }
.resume .resume-meta { color: #666; font-size: 14px; margin: 6px 0; }
.resume h2 { margin-top: 32px; padding-bottom: 8px; border-bottom: 1px solid #e8e8e8; }
.resume h3 { margin-top: 24px; line-height: 1.5; }
.resume li { margin-bottom: 8px; }
.resume .print-btn { margin-top: 12px; padding: 8px 16px; background: #27845e; color: #fff; border: 0; border-radius: 5px; cursor: pointer; font: inherit; }
@media (max-width: 600px) { .resume .resume-header h1 { font-size: 28px; } }
@media print {
  @page { margin: 14mm; }
  body { font-size: 11px !important; background: #fff !important; }
  header, footer, .post-title, .post-info, .no-print { display: none !important; }
  .wrap, main.container, .post, .post-block { width: auto !important; max-width: none !important; margin: 0 !important; padding: 0 !important; }
  .resume { line-height: 1.55; }
  .resume .resume-header { padding: 0 0 10px; margin-bottom: 12px; }
  .resume .resume-header h1 { font-size: 24px; }
  .resume h2 { font-size: 16px; margin-top: 18px; break-after: avoid; }
  .resume h3 { font-size: 13px; margin-top: 14px; break-after: avoid; }
  .resume li { margin-bottom: 4px; }
  .resume a { color: #333 !important; text-decoration: none !important; }
  .resume p, .resume li { orphans: 2; widows: 2; }
}
</style>

<div class="resume">
<div class="resume-header">
<h1>王凯</h1>
<p class="resume-role">后端开发工程师 · Node.js / Python · AI 应用开发</p>
<p class="resume-meta">合肥大学 · 本科 · 2021 年毕业 ｜ 1997 年 · 安徽</p>
<p class="resume-meta"><a href="mailto:wdoublekai@126.com">wdoublekai@126.com</a> ｜ 微信：wdoublekai</p>
<p class="resume-meta"><a href="https://github.com/doublekai">GitHub</a> ｜ <a href="https://www.aiyly.com">技术博客</a> ｜ <a href="https://ai.aiyly.com">AI 数据分析平台</a></p>
<button class="print-btn no-print" type="button" onclick="window.print()">打印 / 保存 PDF</button>
</div>

## 个人简介

以 Node.js、TypeScript、Python 为主要技术栈，具有在线设计平台、支付订单、海外业务及隐私计算产品的后端开发经验。近期重点开发 Pacdora 多模态包装设计 Agent、真实刀板与 3D 联动、设计图分层和异步计费系统，具备从模型工具调用到业务执行、失败恢复及性能优化的落地经验。独立搭建 AI 数据分析项目，并具备 Linux、Docker、Nginx 与 CI/CD 部署能力。

## 专业技能

- **后端开发**：Node.js、TypeScript、Midway.js、Python、FastAPI、Django、TypeORM；具备微服务与业务接口开发经验。
- **数据与缓存**：MySQL、PostgreSQL、Redis、SQLite；具备订单、账单、内容及数据分析场景的开发经验。
- **AI 应用**：多模态大模型、ReAct、OpenAI SDK、Function Calling、上下文与持久化记忆、异步任务及 SSE 流式响应。
- **部署与工程化**：Linux、Docker、Nginx、Shell、Git、GitLab CI/CD；使用 AWS 与阿里云完成应用部署、域名及 HTTPS 配置。
- **业务能力**：支付与订阅、订单流转、多语言与翻译流程、SEO 后端支持、Web 安全；了解 Vue、React。

## 工作经历

### 包小盒 / Pacdora ｜ 后端开发工程师

**2022.08 — 至今**

**Pacdora 海外业务 · 2024.02 — 至今**

技术栈：Node.js / TypeScript / Midway.js / MySQL / Redis / ReAct / 多模态大模型 / AWS · [pacdora.com](https://www.pacdora.com)

#### AI 包装设计 Agent

- **多模态工具调用**：开发面向包装设计的 Agent，将自然语言、产品图片、结构参考及历史设计结果接入统一会话，支持生图、图片编辑、背景处理、Logo、扩图和视频等工具调用。
- **决策与执行架构**：参与从 LangGraph 规划流程向自研 ReAct 运行时的演进，通过有步数约束的循环组织需求澄清、工具选择、参数生成与结果反馈。建立工具注册及参数校验机制，将模型语义决策与权限、资产归属、必要参数及付费执行条件校验分离。
- **上下文与持久化记忆**：区分产品参考、风格参考、包装结构及编辑目标，支持补充素材后续接原任务；按用户、品牌、产品、包装与资产管理记忆，记录信息来源和确认状态，减少历史图片误用与跨会话状态污染。
- **任务可观测与恢复**：构建任务级事件时间线，通过增量轮询展示执行阶段、工具调用和生成结果，处理任务取消、重复提交、失败重试及结果恢复。

#### AI 包装生成、真实刀板与 3D 联动

- 打通自然语言需求、盒型搜索、尺寸确认、真实刀板准备、设计生成和 3D 预览的完整链路，接入盒型单选与默认尺寸确认，兼容历史任务及修改尺寸流程。
- 将包装设计拆分为主展示面、信息面及其他结构面，采用主面完成后并行生成其余内容的方式，兼顾视觉一致性与生成效率。
- 基于真实刀板几何、物理遮罩和面坐标完成裁切、缩放及贴图合成，保护已完成内容面，减少整图重绘造成的文字裁切与内容覆盖。

#### AI 设计图分层与可编辑元素

- 将生成图片拆分为文字、艺术字、图形和背景等独立图层并接入编辑器；普通文字重建为使用真实字体的原生文字图层，艺术字及图形独立重建并透明化，支持移动、隐藏及重新排版。
- 实现背景重建、局部坐标映射与 SVG 等比适配，修复缩放裁切、参考图缺失笔画及历史图层兼容问题；**在已验证的真实任务中产出 50 余个图层，其中包含 30 余个可编辑文字图层。**
- 优化局部蒙版、素材下载及合成阶段的内存使用，**在本地固定模型数据测试中，将 RSS 峰值从 625 MiB 降至 357 MiB，降低约 43%。**

#### 异步任务、积分计费与性能优化

- 实现付费任务状态持久化、供应商结果转存及已有结果复用，支持从失败步骤恢复；完善批量扣费、部分失败退款和重试幂等逻辑，按任务汇总积分明细并保留底层真实账本。
- 定位积分去重查询的执行计划问题，在保留最早扣费记录语义的前提下改写查询；**生产只读对比中，原查询约 2.47 秒，优化方案核心聚合查询约 11～12 毫秒，完整接口收益尚待验证。**
- 优化会话分页、历史读取与任务轮询，运行中轮询采用任务优先的只读路径；修复 RabbitMQ 消费者被定时任务重复注册的问题，改为应用启动时单次订阅并增加进程内幂等保护，避免消费者持续累积至通道上限。

**其他海外业务职责**

- **国际化与云服务**：实现多语言架构及翻译 API 接入，衔接自动翻译与人工校对；使用 AWS S3、CloudFront、Lambda 支持海外资源存储与分发。
- **SEO 与线上维护**：实现动态 Sitemap、结构化数据及多语言 hreflang 支持，定位并修复生产环境问题。

**国内业务 · 2022.08 — 2024.01**

技术栈：Node.js / Midway.js / MySQL / Redis · [baoxiaohe.com](https://www.baoxiaohe.com)

- **订单与账单**：设计实现订单、账单微服务，覆盖业务下单、第三方支付回调与订单状态流转。
- **支付与会员**：接入支付宝连续包月和微信支付 SDK，实现会员订阅、付费功能及高级模板、印刷定制等付费服务。
- **运营与搜索优化**：支持折扣、限时抢购、赠品活动；参与网站结构、Meta 标签与 URL 规范优化。
- **包小印从 0 到 1**：2023.02 — 2023.12 担任后端核心开发，团队由 2 名后端、2 名前端和 1 名测试组成。实现按盒型、数量、材质配置的报价引擎，以及购物车、合并下单、支付、供应商分单、发货和售后流程。

### 北京八分量信息科技有限公司 ｜ Python 开发工程师

**2021.07 — 2022.07**

技术栈：Python / FastAPI / PostgreSQL / Django

- **隐私计算平台**：基于 FastAPI、PostgreSQL 开发平台后端，参与产品评审、概要设计与接口定义。
- **存储组件**：实现数据存储模块，支持 HDFS、MySQL、PostgreSQL、SQLite 等存储介质。
- **节点服务**：开发数据发布、联盟管理及线性回归、逻辑回归等机器学习任务相关功能。
- **跨链大数据平台**：使用 Django、MySQL 开发企业级数据应用。

## 项目与实践

### Aiyly · AI Agent 数据分析平台

**个人项目 · 从 0 到 1** ｜ [在线体验](https://ai.aiyly.com)

技术栈：Midway.js / TypeORM / OpenAI SDK / MySQL

面向自然语言数据库分析场景，用户配置 MySQL 连接、数据 Schema 和业务指标后，通过提问完成 SQL 查询与结果解读。

- **Agent 核心流程**：直接使用 OpenAI SDK 实现 Function Calling 与工具调用，串联问题理解、查询构建、执行和结果解读。
- **查询安全约束**：通过 SQLBuilder 限制生成 SELECT 查询，校验 Schema 中的表名和列名，对标识符进行白名单校验，并通过占位符参数化查询值。
- **流式交互**：通过 LLM 流式输出、AsyncGenerator 与 SSE 将处理过程推送至前端，支持逐步展示响应。
- **用户配置隔离**：按用户管理数据库连接配置，支持数据库直连、SSH 隧道与 JWT 认证。

### SEO 内容平台后端

技术栈：Midway.js / TypeORM / MySQL / Redis

- 聚合文章、专题等内容生成动态 Sitemap，输出供前端使用的 JSON-LD 结构化数据。
- 通过中间件处理 URL 大小写、末尾斜杠及 301 重定向，统一访问路径。
- 根据关键词库插入内容内链，使用 Redis 缓存热门内容。

### 部署与运维实践

- 完成服务器初始化、SSH 密钥与用户权限配置，搭建 Node.js、Python、Docker、MySQL、Redis 环境。
- 配置 DNS、SSL 证书、Nginx 反向代理、HTTPS 跳转和静态资源缓存。
- 搭建 GitLab CI/CD 流水线，结合 Docker、PM2 完成构建部署与进程管理，支持日志排查及监控告警。

## 教育背景与兴趣

**合肥大学 · 本科 · 2021 年毕业**

热爱户外徒步，走过雨崩、武功山及杭州周边多条山野路线；也喜欢篮球、象棋和 FPS 游戏。

</div>
