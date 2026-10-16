// Render the resume inside the existing published Apollo page shell.
// Usage: node render-resume.cjs <published-page.html>
// The full site theme must be restored before using a full Hexo deployment.
const fs = require('fs');
const path = require('path');
const Hexo = require('hexo');
(async () => {
  const target = process.argv[2];
  if (!target) throw new Error('Supply the existing published about/index.html path');
  const hexo = new Hexo(__dirname, { silent: true });
  await hexo.init();
  try {
    const source = fs.readFileSync(path.resolve(__dirname, 'source/about/index.md'), 'utf8');
    const body = source.replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const rendered = await hexo.render.render({ text: body, engine: 'md' });
    if (!rendered.includes('<h2') || !rendered.includes('个人简介')) throw new Error('Markdown did not render');
    const template = fs.readFileSync(target, 'utf8');
    const start = '<div class="post-content">';
    const end = '</div></article>';
    const begin = template.indexOf(start);
    const finish = template.lastIndexOf(end);
    if (begin < 0 || finish <= begin || template.indexOf(start, begin + 1) >= 0) throw new Error('Unexpected Apollo template');
    let html = template.slice(0, begin + start.length) + rendered + template.slice(finish);
    html = html.replace(/www\.doublekai\.com/g, 'www.aiyly.com');
    html = html.replace(/<div class="post-info">[^<]*<\/div>/, '');
    html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="王凯的个人简历：后端 / AI Agent 开发工程师，关注多模态交互、工具调用、上下文与记忆、异步执行及业务落地。">');
    fs.writeFileSync(target, html);
    console.log('Resume rendered:', target);
  } finally { await hexo.exit(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

