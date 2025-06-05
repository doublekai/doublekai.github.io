---
title: Cookie中的HttpOnly和SameSite属性
date: 2021-08-04 14:41:55
tags:
---
### HttpOnly
作用：如果cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie。XSS全称Cross SiteScript，跨站脚本攻击，是Web程序中常见的漏洞，[XSS](https://www.doublekai.com/2021/07/19/%E6%B7%B1%E6%8C%96XSS-%E5%92%8CCSRF/)属于被动式且用于客户端的攻击方式，所以容易被忽略其危害性。其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。如，盗取用户Cookie、破坏页面结构、重定向到其它网站等。

设置完毕后通过js脚本是读不到该cookie的，但使用如下方式可以读取。

Cookie cookies[]=request.getCookies();  
### SameSite
作用：防止[CSRF](https://www.doublekai.com/2021/07/19/%E6%B7%B1%E6%8C%96XSS-%E5%92%8CCSRF/)攻击
###### SameSite属性
可以设置三个值。
Strict
Lax
None
`Set-Cookie: CookieName=CookieValue; SameSite=Strict｜Lax｜None;`
1. Strict最为严格，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
2. 当这些 链接`<a href="..."></a> `预加载	`<link rel="prerender" href="..."/>`GET 表单	`<form method="GET" action="...">	`会发送cookie其他的post、ajax、image、iframe都不会发送cookie
3. Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
`Set-Cookie: widget_session='k'; SameSite=None; Secure`