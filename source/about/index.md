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
.resume .meta { color: #47555d; font-size: 14px; }
.resume .resume-contact { display: flex; flex-wrap: wrap; gap: 2px 14px; }
.resume h2, .resume h3, .resume h4 { left: auto; max-width: none; }
.resume .headerlink, .resume h2::before, .resume h3::before { display: none; }
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
  .resume { font-size: 10pt; line-height: 1.43; color: #222; }
  .resume .resume-header { padding: 0 0 7px; margin-bottom: 8px; }
  .resume .resume-header h1 { font-size: 21pt; }
  .resume .resume-role { font-size: 12pt; margin: 3px 0; }
  .resume .resume-meta, .resume .meta { font-size: 9pt; }
  .resume .meta { break-before: avoid; }
  .resume .print-start { break-before: page; }
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
  <p class="resume-role">求职方向 · AI 应用架构师 / 软件架构师</p>
  <div class="resume-meta resume-contact">
    <a href="mailto:wdoublekai@126.com">wdoublekai@126.com</a>
    <span>微信 wdoublekai</span>
    <a href="https://github.com/doublekai" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://blog.aiyly.com/tech/" target="_blank" rel="noopener noreferrer">技术博客</a>
  </div>
  <button class="print-btn no-print" type="button" onclick="window.print()">打印 / 保存 PDF</button>
</div>

<p>独立开发 Pacdora PackifyDesign 后端模块，并开发 AI 设计工作台前端。完成多模态 Agent 从 LangGraph 到自研 ReAct 的迁移，开发 Stripe 订阅与 AI 积分账本，将海外站发布拆为独立服务。支持生成任务恢复、设计稿编辑和账单核对。</p>

<section aria-labelledby="experience">
  <h2 id="experience">工作经历</h2>
  <h3>包小盒 / Pacdora · 后端开发工程师｜2022.08 — 至今</h3>
  <p class="meta">Pacdora 面向全球提供在线包装设计服务。截至 2026 年 11 月，平台累计账号 <strong>925 万以上</strong>，2026 年新增账号 <strong>371 万以上</strong>。</p>

  <h3><a href="https://www.pacdora.com/ai-design" target="_blank" rel="noopener noreferrer">Packify AI Design</a> 与 AI 创作｜2025–2026</h3>
  <ul>
    <li><strong>多模态 Agent 运行时</strong> · 将 LangGraph 固定编排迁移到自研 ReAct 循环，让模型依据参考图和工具结果决定下一步。通过 Skill 注册和结构化动作协议接入生图、改图、背景和视频工具，统一校验权限、计费条件与参数，并限制纠错次数。</li>
    <li><strong>并发执行与失败恢复</strong> · 将同一画布的多个任务合并轮询，以持久化事件和游标增量同步。限制生图提交与查询并发，处理超时、部分成功与重复回调，原子提交状态和产物，支持刷新或断线后恢复。</li>
    <li><strong>任务规模</strong> · 截至 2026 年 11 月 12 日，年内累计记录 <strong>19.2 万余条任务</strong>，关联约 <strong>4.7 万个账号</strong>，最近 30 个完整自然日内单日峰值为 <strong>2,847 条任务</strong>。</li>
    <li><strong>包装设计与可编辑交付</strong> · 将刀模、可旋转 3D Mockup 和可编辑纹理图层接入画布。2D 转 3D 使用独立任务 API，复用生成和计费链路，并按请求 ID 去重。为 <strong>461 张商品海报模板</strong>实现中英双语加权检索，开发多轮改图、AI 背景、灵感图与商品详情页生成。</li>
  </ul>

  <h3>Pacdora 海外支付、订阅与 Credits｜2024–2026</h3>
  <ul>
    <li><strong>统一订单与订阅</strong> · 接入 Stripe、PayPal 支付回调，支持地区套餐和币种、月付与年付切换、旧订阅取消及升级后积分补发。开发 AI Design 积分加购，串联多语言收银台、Stripe Checkout、积分入账、免水印权益和购买归因。</li>
    <li><strong>任务与账本一致性</strong> · 灰度与生产共用账本时，用数据库行锁按用户串行扣费，保留用户间并行。优化扣费去重查询以避免全主键索引扫描，校验回调订单并防止重复入账。纹理分层支持先预扣、按实际用量补扣和已付费任务恢复。</li>
    <li><strong>续订留存与开票</strong> · 开发取消问卷、A/B 实验和优惠领取，通过 Stripe Subscription Schedule 将优惠应用到下一期账单。实现积分明细、按实收金额异步开票、回调通知与重开。</li>
  </ul>

  <h3><a href="https://www.pacdora.com/" target="_blank" rel="noopener noreferrer">Pacdora 海外站</a>多语言与发布架构｜2023–2026</h3>
  <ul>
    <li><strong>独立发布 Worker</strong> · 将专题页和分类页渲染从运营后台拆出，由 RabbitMQ 投递。支持按语言生成、单页或全量发布、CloudFront 刷新与结果通知，并限制同环境的全量任务并发。</li>
    <li><strong>发布性能</strong> · 通过批量查询、EJS 预编译、4 个 Worker 线程和批内并发写入，灰度环境约 <strong>9,570 页、7 种语言</strong>的发布实测从约 <strong>400 秒降至 157 秒</strong>。每种语言的模板查询从约 <strong>1,300 次降至 13 次</strong>。</li>
    <li><strong>多语言内容发布</strong> · 开发翻译任务、内容同步和失败重试，覆盖专题、盒型、分类和 FAQ。生成多语言 Sitemap、JSON-LD 和 hreflang，管理 S3 / OSS 资源分发。</li>
  </ul>

  <h3 class="print-start">包装视频渲染与文件导出｜2024–2026</h3>
  <ul>
    <li>开发独立渲染服务，串联 RabbitMQ、Puppeteer、Bray、FFmpeg 和 S3 / OSS，支持中外站队列、进度回调与导出邮件。修复浏览器页面关闭后轮询定时器残留引发的进程崩溃和消息反复投递。</li>
    <li>开发 Bray 场景包直接渲染、V-Ray 调度与任务校验，维护刀模、DXF、印刷 ZIP 和 Illustrator 导出，处理转换重试与自动部署。</li>
  </ul>

  <h3><a href="https://yin.baoxiaohe.com/" target="_blank" rel="noopener noreferrer">包小印</a>与 PrintShop 印刷交易｜2023–2026</h3>
  <ul>
    <li>重构开放工厂报价，覆盖材质、工艺、加工、交期和报价 PDF，串联下单、供应商分发、审稿与物流。跨用户 API、订单及支付服务开发对公收款、补差价、部分退款、分账和开票，开发订单 BI API 和 ECharts 大屏。</li>
    <li>开发 PrintShop 运营配置、报价、购物车与 Shopify 草稿订单。修正 Shopify 小数精度限制导致的总金额偏差，复用未支付订单以支持继续结账。</li>
  </ul>

  <h3><a href="https://www.baoxiaohe.com/" target="_blank" rel="noopener noreferrer">包小盒国内站</a>运营与工程工具｜2022–2026</h3>
  <ul>
    <li>开发 SEO / TDK、热门词专题、Playwright 静态发布、PRO 会员、微信场景码和 DXF 付费权益。</li>
    <li>开发 AI Code Guard 并接入 Git Hook、GitLab CI 和飞书通知，开发自然语言查数助手、慢请求监控与数据同步工具。</li>
  </ul>

  <h3>北京八分量信息科技有限公司 · Python 开发工程师｜2021.07 — 2022.07</h3>
  <p class="meta">隐私计算产品（联邦学习应用）｜2021.10 — 2022.07</p>
  <p>参与框架、平台和节点三部分开发。两个节点加入同一联盟后，各自上传并发布数据，再协同执行线性回归或逻辑回归任务。平台保存联盟和节点信息。</p>
  <ul>
    <li><strong>隐私计算框架</strong> · 框架由通信、计算、存储三个组件组成。负责 Python 存储组件，将上传数据写入指定的 HDFS、MySQL、PostgreSQL 或 SQLite，供计算层读取。</li>
    <li><strong>隐私计算平台</strong> · 使用 FastAPI、PostgreSQL 和 Tortoise ORM 开发后端，编写概要设计与接口文档，实现联盟和节点管理等业务逻辑。平台技术栈还包括 ZooKeeper。</li>
    <li><strong>隐私计算节点</strong> · 使用 FastAPI、PostgreSQL 和 Tortoise ORM 编写概要设计与接口文档，实现节点侧业务逻辑，支持数据上传、发布及联邦学习任务。</li>
  </ul>
  <p class="meta"><strong>跨链大数据平台</strong></p>
  <ul>
    <li>使用 Django 和 MySQL 开发用户登录、注册、密码重置及平台人员管理功能。</li>
  </ul>
</section>

<section aria-labelledby="skills">
  <h2 id="skills">技术栈</h2>
  <p>TypeScript、Node.js、Midway.js、Vue 3、React、Next.js、Python、FastAPI、MySQL、PostgreSQL、Redis、RabbitMQ、Docker、GitLab CI/CD、AWS、阿里云</p>
</section>

<section aria-labelledby="education">
  <h2 id="education">教育背景</h2>
  <p>合肥大学 · 本科 · 2021 年毕业</p>
</section>
</div>
