# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aiyly Backend - A natural language MySQL database analysis agent built with Midway.js 3.x. Users configure their MySQL database connection and define schemas/metrics, then query their business data using natural language.

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:7001)
npm run build        # Compile TypeScript to dist/
npm start            # Production mode
npm run lint         # ESLint check (mwts)
npm run lint:fix     # Auto-fix lint issues
npm run test         # Run tests with Jest
npm run cov          # Run tests with coverage
```

## Architecture

### Core Framework
- **Midway.js 3.x** with Koa, TypeORM, JWT, Redis, Swagger modules
- **TypeORM 0.3.x** with MySQL and Snake Case naming strategy (camelCase in code → snake_case in DB)
- **Hand-written AI Agent** (no framework) using OpenAI SDK (compatible with Alibaba DashScope)

### Module Structure
Each business module in `src/modules/` follows this pattern:
- `*.entity.ts` - TypeORM entity
- `*.service.ts` - Business logic with `@Provide()` decorator
- `*.controller.ts` - HTTP endpoints with `@Controller()` decorator
- `*.dto.ts` - Request/response DTOs with validation decorators
- `index.ts` - Module exports

### Key Modules
- **auth/** - JWT + Google OAuth authentication
- **user/** - User management, MySQL config storage, schema/metrics storage
- **agent/** - AI agent core with tool system for natural language queries
- **conversation/** - Chat history persistence

### Agent Architecture (`src/modules/agent/`)
- `core/ga-agent.ts` - Main agent loop with streaming support and iterative tool calling (max 10 iterations)
- `tools/base.tool.ts` - Base class for all tools
- `tools/sql-builder.ts` - Safe SQL builder with whitelist validation and parameterized queries
- `tools/dynamic-query.tool.ts` - Dynamic SQL query tool, supports any user-configured tables

### Error Handling
- Unified response format: `{ code: number, msg: string, data: T }`
- Error codes: 0=success, 1xxx=general, 2xxx=auth, 3xxx=user, 4xxx=mysql, 5xxx=conversation
- Custom `BusinessError` class thrown and caught by `BusinessErrorFilter`
- Filter registration order in `configuration.ts`: BusinessError → Validation → NotFound → Default

### Authentication
- JWT middleware applied globally, use `@Public()` decorator to skip
- Routes requiring auth expect `Authorization: Bearer <token>` header

## Configuration

### Environment-based Config
- `src/config/config.default.ts` - Base configuration
- `src/config/config.local.ts` - Local development overrides
- `src/config/config.prod.ts` - Production overrides

### Key Environment Variables
```
DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME  # System database
JWT_SECRET, JWT_EXPIRES_IN                        # Authentication
DASHSCOPE_API_KEY or OPENAI_API_KEY              # AI provider
OPENAI_MODEL, OPENAI_BASE_URL                    # Model config
GOOGLE_CLIENT_ID                                  # Google OAuth
REDIS_ENABLED, REDIS_HOST, REDIS_PORT            # Optional Redis
```

## Code Conventions

### Naming
- TypeScript: camelCase for variables/functions, PascalCase for classes
- Database: snake_case (enforced by `SnakeNamingStrategy` in `src/common/utils/snake-naming-strategy.ts`)
- Constants: UPPER_SNAKE_CASE in `src/common/constants/`

### Dependency Injection
```typescript
@Inject() someService: SomeService;
@InjectEntityModel(User) userModel: Repository<User>;
@Config('jwt') jwtConfig: JwtConfig;
```

### Response Format
Always use the `Result` class from `src/common/utils/result.ts`:
```typescript
return Result.success(data);
return Result.fail(ErrorCode.SOME_ERROR, 'Error message');
```

## Important Rules

### API Documentation Sync
**IMPORTANT**: When modifying any API (controller), always update `docs/api.md` to keep documentation in sync.

- API prefix: `/api/v1/`
- Update request/response examples
- Update field descriptions
- Add new endpoints to the correct section

### Agent Security
The Agent only supports **read-only** queries (SELECT only). Write operations (INSERT/UPDATE/DELETE) are blocked by:
1. SQL Builder only generates SELECT statements
2. Whitelist validation for table/column names
3. Forbidden keywords check before execution
