// Targeted publishing while the original Apollo theme source is unavailable.
// Reuses published page shells; never copies layout-less Hexo HTML output.
// Usage: node render-article.cjs <published-worktree> <post-slug>
const fs = require('fs');
const path = require('path');
const Hexo = require('hexo');
const { escapeHTML } = require('hexo-util');
(async () => {
  const [destination, slug] = process.argv.slice(2);
  if (!destination || !slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error('Supply worktree and simple post slug');
  const root = path.resolve(destination);
  const hexo = new Hexo(__dirname, { silent: true });
  await hexo.init();
  try {
    hexo.config.timezone = 'Asia/Shanghai';
    await hexo.call('generate');
    const post = hexo.locals.get('posts').findOne({ slug });
    if (!post || !post.content.includes('<h2')) throw new Error('Rendered post missing');
    const title = escapeHTML(post.title);
    const description = '用虚构的个人阅读助手理解工具调用、ReAct 决策循环、上下文管理与结果验证。';
    const url = '/' + post.path;
    const date = post.date.tz('Asia/Shanghai').locale('en').format('MMM D, YYYY');
    const oldUrl = '/2026/01/16/aiyly-ai-database-assistant/';
    const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
    const write = (relative, text) => {
      const file = path.join(root, relative);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, text.replace(/www\.doublekai\.com/g, 'www.aiyly.com'));
    };
    const template = read(oldUrl.slice(1) + 'index.html');
    const start = '<div class="post-content">';
    const finish = template.lastIndexOf('</div></article>');
    const begin = template.indexOf(start);
    if (begin < 0 || finish <= begin) throw new Error('Unexpected article shell');
    let article = template.slice(0, begin + start.length) + post.content + template.slice(finish);
    article = article.replace(/<title>[\s\S]*?<\/title>/, `<title>${title} · Doublekai的博客</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
      .replace(/<h1 class="post-title">[\s\S]*?<\/h1>/, `<h1 class="post-title">${title}</h1>`)
      .replace(/<div class="post-info">[^<]*<\/div>/, `<div class="post-info">${date}</div>`)
      .replace(/<div class="paginator">[\s\S]*?<\/div>/, `<div class="paginator"><a href="${oldUrl}" class="next">下一篇</a></div>`);
    write(post.path + 'index.html', article);
    const summary = `<li class="post-list-item"><article class="post-block"><h2 class="post-title"><a href="${url}" class="post-title-link">${title}</a></h2><div class="post-info">${date}</div><div class="post-content"><p>${description}</p></div><a href="${url}" class="read-more">...阅读全文</a></article></li>`;
    const listing = fs.existsSync(path.join(root, 'tech/index.html')) ? 'tech/index.html' : 'index.html';
    let home = read(listing);
    if (home.includes(`href="${url}"`)) throw new Error('Article already listed');
    write(listing, home.replace('<ul class="home post-list">', '<ul class="home post-list">' + summary));
    const item = `<div class="post-item"><div class="post-info">${date}</div><a href="${url}" class="post-title-link">${title}</a></div>`;
    const year = post.date.tz('Asia/Shanghai').format('YYYY');
    const month = post.date.tz('Asia/Shanghai').format('MM');
    const marker = `<h2 class="archive-year">${year}</h2>`;
    for (const relative of ['archives/index.html', `archives/${year}/index.html`]) {
      const archive = read(relative);
      if (!archive.includes(marker)) throw new Error('Archive year missing');
      write(relative, archive.replace(marker, marker + item));
    }
    const archiveShell = read(`archives/${year}/index.html`);
    const listPage = (relative, items) => write(relative, archiveShell.replace(/<div class="archive">[\s\S]*?<\/main>/, `<div class="archive">${marker}${items}</div></main>`).replace(/<div class="paginator">[\s\S]*?<\/div>/, '<div class="paginator"></div>'));
    listPage(`archives/${year}/${month}/index.html`, item);
    for (const tag of post.tags.toArray()) {
      const relative = tag.path + 'index.html';
      if (fs.existsSync(path.join(root, relative))) {
        const tagged = read(relative);
        write(relative, tagged.includes(marker) ? tagged.replace(marker, marker + item) : tagged.replace('<div class="archive">', '<div class="archive">' + marker + item));
      } else listPage(relative, item);
    }
    for (const name of ['atom.xml', 'sitemap.xml']) {
      const generated = fs.readFileSync(path.join(__dirname, 'public', name), 'utf8');
      if (!generated.includes(slug) || generated.includes('www.doublekai.com')) throw new Error('Invalid generated feed/sitemap');
      write(name, generated);
    }
    console.log(JSON.stringify({title: post.title, url: 'https://www.aiyly.com' + url}));
  } finally { await hexo.exit(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
