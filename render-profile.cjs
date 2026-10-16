// Render personal landing pages and a technology-only index using Apollo shells.
// Usage: node render-profile.cjs <published-worktree>
const fs = require('fs');
const path = require('path');
const Hexo = require('hexo');
const { escapeHTML } = require('hexo-util');
(async () => {
 const root = path.resolve(process.argv[2] || '');
 if(!fs.existsSync(path.join(root,'about/index.html'))) throw Error('Supply published checkout');
 const hexo = new Hexo(__dirname,{silent:true}); await hexo.init();
 try {
  hexo.config.timezone='Asia/Shanghai'; await hexo.load();
  const template=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const write=(relative,html)=>{const p=path.join(root,relative);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,html);};
  const shell=(title,content,pagination='')=>template.replace(/<title>[\s\S]*?<\/title>/,`<title>${escapeHTML(title)} · Doublekai</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${escapeHTML(title)}，王凯的技术记录与个人生活。">`).replace(/<main class="container">[\s\S]*?<\/main>/,`<main class="container">${content}</main>`).replace(/<div class="paginator">[\s\S]*?<\/div>/,`<div class="paginator">${pagination}</div>`);
  for(const [folder,title,output] of [['home','王凯 · 个人主页','index.html'],['personal','山野与日常','personal/index.html']]){
   const raw=fs.readFileSync(path.join(__dirname,'source',folder,'index.md'),'utf8').replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
   const body=await hexo.render.render({text:raw,engine:'md'});write(output,shell(title,body));
  }
  const posts=hexo.locals.get('posts').sort('-date').toArray().filter(p=>!['武功山徒步攻略','测试'].includes(p.title));
  const pages=Math.ceil(posts.length/10);
  for(let page=1;page<=pages;page++){
   const entries=posts.slice((page-1)*10,page*10).map(p=>`<li class="post-list-item"><article class="post-block"><h2 class="post-title"><a class="post-title-link" href="/${p.path}">${escapeHTML(p.title)}</a></h2><div class="post-info">${p.date.tz('Asia/Shanghai').format('YYYY-MM-DD')}</div><a class="read-more" href="/${p.path}">阅读全文 →</a></article></li>`).join('');
   const link=n=>n===1?'/tech/':`/tech/page/${n}/`;
   const pager=(page>1?`<a class="prev" href="${link(page-1)}">上一页</a>`:'')+(page<pages?`<a class="next" href="${link(page+1)}">下一页</a>`:'');
   write(page===1?'tech/index.html':`tech/page/${page}/index.html`,shell('技术与实践',`<div class="tech-heading"><p class="eyebrow">TECHNOLOGY / 技术记录</p><h1>技术与实践</h1><p>后端开发、AI Agent、数据库与 Web 技术。<a href="/personal/">徒步与生活记录在这里 →</a></p></div><ul class="home post-list">${entries}</ul>`,pager));
  }
  fs.copyFileSync(path.join(__dirname,'source/css/profile.css'),path.join(root,'css/profile.css'));
  const items=[['/','首页'],['/tech/','技术'],['/personal/','生活'],['/about/','简历'],['https://ai.aiyly.com','AI'],['https://github.com/doublekai','GitHub']];
  const patch=directory=>{for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
   if(entry.name.startsWith('.'))continue; const full=path.join(directory,entry.name);
   if(entry.isDirectory()){patch(full);continue;}if(!entry.name.endsWith('.html'))continue;
   const relative=path.relative(root,full).replace(/\\/g,'/');
   const active=relative==='index.html'?'/':relative.startsWith('personal/')?'/personal/':relative.startsWith('about/')?'/about/':relative.startsWith('tech/')||/^\d{4}\//.test(relative)||relative.startsWith('page/')?'/tech/':'';
   const nav='<ul class="nav nav-list">'+items.map(([href,label])=>`<li class="nav-list-item"><a href="${href}"${href.startsWith('https:')?' target="_blank" rel="noopener"':''} class="nav-list-link${href===active?' active':''}"${href===active?' aria-current="page"':''}>${label}</a></li>`).join('')+'</ul>';
   let html=fs.readFileSync(full,'utf8').replace(/<ul class="nav nav-list">[\s\S]*?<\/ul>/,nav);
   if(!html.includes('href="/css/profile.css"'))html=html.replace('</head>','<link rel="stylesheet" href="/css/profile.css"></head>');
   fs.writeFileSync(full,html);
  }};patch(root);
  // Extend the existing sitemap without changing article URLs.
  const sitemap=path.join(root,'sitemap.xml');let xml=fs.readFileSync(sitemap,'utf8');
  for(const relative of ['','personal/','tech/',...Array.from({length:pages-1},(_,i)=>`tech/page/${i+2}/`)]){const url=`https://www.aiyly.com/${relative}`;if(!xml.includes(`<loc>${url}</loc>`))xml=xml.replace('</urlset>',`<url><loc>${url}</loc></url>\n</urlset>`);}
  fs.writeFileSync(sitemap,xml);console.log(`Profile pages and ${pages} technology pages rendered; shared navigation updated.`);
 }finally{await hexo.exit();}
})().catch(e=>{console.error(e);process.exitCode=1;});
