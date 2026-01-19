---
title: 关于我
---

> **Talk is cheap, Show me the code**

---

## 个人简介

热爱技术的全栈工程师，专注于 Web 安全、后端系统架构和 AI 应用开发。喜欢深入原理，追求代码的简洁与高效。

---

## 技术栈

**后端**：Node.js / Midway.js / TypeORM / MySQL / Redis

**前端**：Vue / React / TypeScript (前端小白)

**AI/LLM**：OpenAI SDK / Agent 开发 / Function Calling / Prompt Engineering

**运维**：Docker / Nginx / SSH 隧道 / GitHub Actions

**安全**：Web 安全攻防 / SQL 注入防护 / XSS 防护

---

## 0-1 项目经历

### AI Agent 数据分析平台

**项目简介**：自然语言数据库分析平台，用户配置 MySQL 数据库连接和业务 Schema，通过自然语言提问（如"上周新增了多少用户"），系统自动理解意图、生成 SQL、执行查询并解读结果。

**技术栈**：Midway.js + TypeORM + OpenAI SDK + 手写 Agent 框架

#### 核心架构

```
┌─────────────────────────────────────────────────┐
│               前端 (Vue/React)                   │
└─────────────────────────────────────────────────┘
                        ↓ SSE Stream
┌─────────────────────────────────────────────────┐
│              AgentController                     │
│  • 接收自然语言查询                               │
│  • 返回 SSE 流式响应                             │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│               GAAgent (核心)                     │
│  • 构建系统提示词（注入 Schema）                  │
│  • 流式调用 LLM                                  │
│  • 迭代工具调用（最多10轮）                       │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│               Tool System                        │
│  BaseTool → DynamicQueryTool → SQLBuilder       │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│           用户 MySQL 数据库                      │
│        （支持直连 / SSH 隧道连接）                │
└─────────────────────────────────────────────────┘
```

#### 技术亮点

**1. 手写 Agent 框架（无依赖 LangChain）**

```typescript
async *chatStream(query: string, context: IAgentContext) {
  let iterations = 0;
  while (iterations < 10) {  // 防止无限循环
    iterations++;

    // 流式调用 LLM
    const stream = await this.openai.chat.completions.create({
      model: this.model,
      messages,
      tools: openAITools,
      stream: true,
    });

    // 处理流式响应，实时推送内容
    for await (const chunk of stream) {
      if (chunk.delta.content) {
        yield { content: chunk.delta.content };
      }
    }

    // 有工具调用则执行后继续，否则返回
    if (toolCalls.length > 0) {
      const result = await tool.execute(args, context);
      messages.push({ role: 'tool', content: JSON.stringify(result) });
      continue;
    }
    break;
  }
}
```

为什么不用 LangChain？
- 轻量化：只需要 Function Calling 功能，不需要引入大量依赖
- 可控性：精确控制流式响应、错误处理、Token 统计
- 性能：减少中间层，直接调用 OpenAI SDK
- 场景适配：数据库查询场景相对固定，不需要复杂的 Chain 编排

**2. 四层 SQL 安全防护**

```
┌───────────────────────────────────────────────┐
│              SQL 安全防护体系                  │
├───────────────────────────────────────────────┤
│  第一层：设计层面                              │
│  └─ SQLBuilder 只能生成 SELECT 语句           │
│                                               │
│  第二层：白名单验证                            │
│  └─ 表名/列名必须在用户配置的 Schema 中       │
│                                               │
│  第三层：标识符转义                            │
│  └─ 只允许 [a-zA-Z0-9_]，反引号包裹           │
│                                               │
│  第四层：参数化查询                            │
│  └─ 所有用户输入都使用 ? 占位符               │
└───────────────────────────────────────────────┘
```

**3. 全链路流式响应**

- LLM 端：OpenAI SDK `stream: true`
- Agent 端：AsyncGenerator 逐步 yield
- Controller 端：SSE 协议实时推送
- 前端：EventSource 接收，实现"逐字输出"效果

**4. 多租户数据隔离**

- 每个用户独立配置 MySQL 连接信息和业务 Schema
- 动态创建数据库连接，支持直连和 SSH 隧道
- JWT 认证确保只能访问自己的配置

---

### SEO 内容平台（后端部分）

**项目简介**：内容发布平台后端，提供 SEO 友好的 API 设计和数据输出。

**技术栈**：Midway.js + TypeORM + MySQL + Redis

#### 后端 SEO 技术实现

**1. 动态 Sitemap 生成接口**

```typescript
@Controller('/sitemap')
export class SitemapController {
  @Get('.xml')
  async getSitemap() {
    const articles = await this.articleService.findAll();
    const topics = await this.topicService.findAll();

    const urls = [
      { loc: 'https://www.aiyly.com/', priority: 1.0, changefreq: 'daily' },
      ...articles.map(a => ({
        loc: `https://www.aiyly.com/article/${a.slug}`,
        lastmod: a.updatedAt.toISOString(),
        priority: 0.8,
        changefreq: 'weekly',
      })),
      ...topics.map(t => ({
        loc: `https://www.aiyly.com/topic/${t.slug}`,
        lastmod: t.updatedAt.toISOString(),
        priority: 0.9,
        changefreq: 'weekly',
      })),
    ];

    return this.buildSitemapXml(urls);
  }
}
```

**2. 结构化数据 API 输出**

```typescript
// 文章详情接口返回结构化数据
@Get('/:slug')
async getArticle(@Param('slug') slug: string) {
  const article = await this.articleService.findBySlug(slug);

  return {
    ...article,
    // 返回 JSON-LD 结构化数据供前端使用
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      image: article.coverImage,
      datePublished: article.createdAt,
      dateModified: article.updatedAt,
      author: { '@type': 'Person', name: article.author.name },
    },
    // 返回 SEO Meta 数据
    seoMeta: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.summary,
      keywords: article.keywords,
      canonicalUrl: `https://www.aiyly.com/article/${slug}`,
    },
  };
}
```

**3. URL 规范化处理**

```typescript
// 中间件：统一 URL 格式
@Middleware()
export class UrlNormalizeMiddleware {
  resolve() {
    return async (ctx: Context, next: () => Promise<void>) => {
      const path = ctx.path;

      // 去除末尾斜杠（首页除外）
      if (path !== '/' && path.endsWith('/')) {
        ctx.status = 301;
        ctx.redirect(path.slice(0, -1));
        return;
      }

      // 统一小写
      if (path !== path.toLowerCase()) {
        ctx.status = 301;
        ctx.redirect(path.toLowerCase());
        return;
      }

      await next();
    };
  }
}
```

**4. 内链自动插入**

```typescript
// 服务层：内容渲染时自动插入内链
@Provide()
export class ContentService {
  async renderWithInternalLinks(content: string): Promise<string> {
    // 获取所有关键词和对应链接
    const keywords = await this.keywordService.findAll();

    let result = content;
    for (const kw of keywords) {
      // 只替换第一次出现，避免过度优化
      const regex = new RegExp(`(?<![\\w>])${this.escapeRegex(kw.text)}(?![\\w<])`, 'i');
      result = result.replace(
        regex,
        `<a href="${kw.url}" title="${kw.text}">${kw.text}</a>`
      );
    }

    return result;
  }
}
```

**5. 缓存策略**

```typescript
// Redis 缓存热门内容
@Provide()
export class ArticleService {
  async findBySlug(slug: string) {
    const cacheKey = `article:${slug}`;

    // 先查缓存
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // 查数据库
    const article = await this.articleRepo.findOne({ where: { slug } });

    // 写入缓存，1 小时过期
    await this.redis.setex(cacheKey, 3600, JSON.stringify(article));

    return article;
  }
}
```

---

## 技术理解

### Agent vs 传统 LLM

| 模式 | 流程 | 特点 |
|------|------|------|
| 传统 LLM | 提问 → 回答 → 结束 | 只能基于训练数据 |
| Agent | 提问 → 思考 → 调用工具 → 获取结果 → 继续思考 → 最终回答 | 可连接真实数据 |

### SSE vs WebSocket

| 特性 | SSE | WebSocket |
|------|-----|-----------|
| 方向 | 单向（服务器→客户端） | 双向 |
| 协议 | HTTP | 独立协议 |
| 复杂度 | 简单 | 较复杂 |
| 适用场景 | 流式输出、推送通知 | 聊天、游戏 |

选择 SSE：Agent 响应是单向的，不需要双向通信，实现更简单。

---

## 爱好

- 篮球
- 户外
- 象棋

---

## 联系方式

- **Email**: wdoublekai@126.com
- **微信**: wdoublekai
- **博客**: [www.aiyly.com](https://www.aiyly.com)
