---
title: 个人简历
---

<style>
@media print {
  body { font-size: 12px !important; }
  .header, .footer, nav, .sidebar { display: none !important; }
  a { color: #333 !important; text-decoration: none !important; }
  pre { font-size: 10px !important; padding: 8px !important; }
  h1 { font-size: 20px !important; }
  h2 { font-size: 16px !important; page-break-after: avoid; }
  h3 { font-size: 14px !important; page-break-after: avoid; }
  .resume-header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
  .no-print { display: none !important; }
}
.resume-header { text-align: center; margin-bottom: 30px; }
.resume-header h1 { margin-bottom: 10px; }
.info-grid { display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; }
.info-item { color: #666; }
.print-btn {
  position: fixed; right: 20px; top: 100px;
  padding: 10px 20px; background: #42b983; color: white;
  border: none; border-radius: 4px; cursor: pointer; z-index: 1000;
}
.print-btn:hover { background: #3aa876; }
</style>

<button class="print-btn no-print" onclick="window.print()">打印简历</button>

<div class="resume-header">

# 王凯

<div class="info-grid">
<span class="info-item">1997年 · 安徽</span>
<span class="info-item">合肥大学 · 2021毕业 本科</span>
<span class="info-item">wdoublekai@126.com</span>
<span class="info-item">微信: wdoublekai</span>
</div>

</div>

> **Talk is cheap, Show me the code**

---

## 专业技能

**后端开发**：Node.js / Midway.js / Python / FastAPI / Django / TypeORM

**数据库**：MySQL / PostgreSQL / Redis / SQLite

**前端开发**：Vue / React / TypeScript（了解）

**AI/LLM**：OpenAI SDK / Agent 开发 / Function Calling / Prompt Engineering

**运维部署**：Linux / Docker / Nginx / AWS / 阿里云 / GitLab CI/CD

**自动化能力**：服务器选购与初始化 / SSL 证书配置 / 域名解析 / CI/CD 流水线搭建 / 项目从 0 到 1 部署上线

**其他技能**：Git / SEO 优化 / Web 安全 / Shell 脚本

---

## 工作经历

### 包小盒（Pacdora 海外版） | 2024.02 - 至今

**后端开发工程师** | Node.js / Midway.js / AWS

Pacdora ([pacdora.com](https://www.pacdora.com)) 是包小盒的海外版本，面向全球用户提供在线包装设计服务。

**主要工作：**

- **国际化多语言系统**：设计并实现多语言架构，支持英语、西班牙语、法语等多语种切换
- **AWS 服务集成**：使用 AWS S3、CloudFront、Lambda 等服务，优化海外用户访问体验
- **翻译服务实现**：集成翻译 API，实现内容自动翻译和人工校对流程
- **SEO 后端优化**：针对 Google 搜索优化，实现动态 Sitemap、结构化数据输出、多语言 hreflang 标签
- **问题排查与修复**：快速定位并解决生产环境 Bug，保障系统稳定运行

---

### 包小盒 | 2022.08 - 2024.01

**后端开发工程师** | Node.js / Midway.js / MySQL / Redis

包小盒 ([baoxiaohe.com](https://www.baoxiaohe.com)) 是国内领先的在线包装设计平台，用户可在线选择盒型、模板进行 3D 渲染和设计。

**TOC 业务：**

- **订单中心微服务**：设计实现订单微服务和账单微服务，处理业务端下单、第三方支付回调、订单状态流转
- **会员付费系统**：集成支付宝（连续包月）、微信支付 SDK，实现用户订阅和付费功能
- **付费产品开发**：基于用户需求开发高级模板、印刷定制等付费服务
- **SEO 重构**：分析关键词和竞对，优化网站结构、Meta 标签、URL 规范，提升搜索排名
- **运营活动支持**：配合节日促销，实现打折优惠、限时抢购、赠品活动等功能

**TOB 业务 - 包小印 ([yin.baoxiaohe.com](https://yin.baoxiaohe.com))：**

- **0-1 项目搭建**：2023年2月-12月，后端核心开发（团队：后端2人、前端2人、测试1人）
- **可配置报价器**：根据盒型、数量、材质等参数，实现灵活的价格计算引擎
- **完整下单流程**：用户选盒型 → 下单 → 支付（对公/支付宝/微信）→ 订单分发供应商 → 发货 → 确认收货/售后
- **购物车功能**：支持多商品合并下单，优化用户购买体验

---

### 北京八分量信息科技有限公司 | 2021.07 - 2022.07

**Python 开发工程师** | Python / FastAPI / PostgreSQL / Django

从事隐私计算产品研发，产品由隐私计算框架、平台、节点三部分组成。

**隐私计算产品（2021.10 - 2022.07）：**

- **存储组件开发**：实现数据存储模块，支持 HDFS、MySQL、PostgreSQL、SQLite 多种存储介质
- **隐私计算平台**：使用 FastAPI + PostgreSQL 开发平台后端，参与产品评审、概要设计、接口定义
- **隐私计算节点**：开发节点服务，实现节点间数据发布、联盟管理、机器学习任务（线性回归、逻辑回归）

**跨链大数据平台**：使用 Django + MySQL 开发企业级数据应用

---

## 个人项目 ([ai.aiyly.com](https://ai.aiyly.com))

### AI Agent 数据分析平台（0-1）

**项目简介**：自然语言数据库分析平台，用户配置 MySQL 连接和业务 Schema，通过自然语言提问，系统自动生成 SQL、执行查询并解读结果。

**技术栈**：Midway.js + TypeORM + OpenAI SDK + 手写 Agent 框架

**核心架构**：
```
前端 → SSE Stream → AgentController → GAAgent(LLM) → Tool System → 用户数据库
```

**技术亮点**：

1. **手写 Agent 框架**：不依赖 LangChain，直接使用 OpenAI SDK 实现 Function Calling，轻量可控
2. **四层 SQL 安全防护**：
   - 设计层：SQLBuilder 只生成 SELECT 语句
   - 白名单：表名/列名必须在用户配置的 Schema 中
   - 转义层：标识符只允许 `[a-zA-Z0-9_]`，反引号包裹
   - 参数化：所有用户输入使用 `?` 占位符
3. **全链路流式响应**：LLM 流式输出 → AsyncGenerator → SSE 推送 → 前端逐字显示
4. **多租户隔离**：每用户独立数据库配置，支持直连和 SSH 隧道，JWT 认证

---

### SEO 内容平台后端

**技术栈**：Midway.js + TypeORM + MySQL + Redis

**核心功能**：
- 动态 Sitemap 生成：自动聚合文章、专题等内容生成 XML
- 结构化数据输出：API 返回 JSON-LD 格式数据供前端渲染
- URL 规范化中间件：统一处理末尾斜杠、大小写，301 重定向
- 内链自动插入：内容渲染时根据关键词库自动添加内链
- Redis 缓存策略：热门内容缓存，提升响应速度

---

### 服务器运维与自动化部署（0-1 全流程）

具备从零开始完成项目上线的全流程能力：

**1. 服务器选购与初始化**
- 根据业务需求选择云服务商（阿里云/AWS/腾讯云）和服务器配置
- 系统初始化：安全组配置、SSH 密钥、用户权限、防火墙规则
- 基础环境搭建：Node.js / Python / Docker / MySQL / Redis

**2. 域名与 HTTPS 配置**
- 域名购买、备案（国内）、DNS 解析配置
- SSL 证书申请（Let's Encrypt / 阿里云免费证书）
- Nginx 反向代理 + HTTPS 强制跳转

**3. CI/CD 自动化流水线**
```yaml
# GitLab CI 示例
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - rsync -avz dist/ user@server:/var/www/app/
    - ssh user@server "pm2 reload app"
  only:
    - master
```

**4. 应用部署与进程管理**
- Docker 容器化部署 / PM2 进程守护
- Nginx 负载均衡、静态资源缓存
- 日志收集与监控告警

**完整部署能力**：代码提交 → 自动构建 → 自动测试 → 自动部署 → 服务上线

---

## 技术理解

**Agent vs 传统 LLM**

| 模式 | 流程 | 特点 |
|------|------|------|
| 传统 LLM | 提问 → 回答 | 只能基于训练数据 |
| Agent | 提问 → 思考 → 调用工具 → 获取结果 → 回答 | 可连接真实数据 |

**SSE vs WebSocket**

| 特性 | SSE | WebSocket |
|------|-----|-----------|
| 方向 | 单向（服务端→客户端） | 双向 |
| 复杂度 | 简单，基于 HTTP | 较复杂，独立协议 |
| 适用场景 | 流式输出、通知推送 | 聊天、游戏 |

---

## 个人爱好

篮球 · 户外运动 · 象棋

---

## 联系方式

- **Email**: wdoublekai@126.com
- **微信**: wdoublekai
- **博客**: [www.aiyly.com](https://www.aiyly.com)
