# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hexo-based personal technical blog deployed to GitHub Pages at www.doublekai.com. The blog is written in Chinese and covers web security, backend systems, frontend frameworks, and computer science topics.

## Common Commands

```bash
# Development
npm run server      # Start local dev server with hot reload (hexo server)
npm run build       # Generate static site (hexo generate)
npm run clean       # Clean generated files (hexo clean)
npm run deploy      # Deploy to GitHub Pages (hexo deploy)

# Theme development (run from themes/apollo/)
npm run sass        # Compile SCSS to CSS
gulp                # Watch and compile SCSS in real-time
```

## Architecture

```
source/
├── _posts/         # Blog posts in Markdown with YAML front matter
├── about/          # About page
├── guestbook/      # Guestbook page
├── tags/           # Tags index
└── images/         # Blog images

themes/apollo/      # Customized Apollo theme
├── layout/         # Jade/Pug templates
│   ├── partial/    # Reusable components
│   └── mixins/     # Template mixins
├── source/
│   ├── scss/       # Stylesheets (edit these)
│   └── css/        # Compiled CSS (generated)
└── _config.yml     # Theme configuration

scaffolds/          # Templates for new content
├── post.md         # New post template
├── page.md         # New page template
└── draft.md        # Draft template
```

## Creating Content

Blog posts use YAML front matter:

```markdown
---
title: Post Title
date: YYYY-MM-DD HH:mm:ss
tags:
- tag1
- tag2
---

Post content here...
```

Posts support per-post asset folders (enabled via `post_asset_folder: true` in `_config.yml`).

## Deployment

- Source branch: `master`
- Deploy branch: `main`
- Deployment uses `hexo-deployer-git` plugin configured in `_config.yml`

## Key Configuration Files

- `_config.yml` - Main Hexo configuration (site info, URL, deployment)
- `themes/apollo/_config.yml` - Theme settings (menu, favicon, comments)
- `package.json` - Node.js dependencies and npm scripts
