---
title: 服务器获取浏览器用户真实IP
date: 2021-08-17 09:56:22
tags:
---
##### nginx 配置文件中获取源IP的配置项
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr; #一般的web服务器用这个 X-Real-IP 来获取源IP
proxy_set_header x-forwarded-for $proxy_add_x_forwarded_for; #如果nginx 服务器是作为反向代理服务器的，则这个配置项是必须的；否则看不到源IP

##### nginx 代理服务器的模块
nginx 通过 ngx_http_proxy_module模块 实现反向代理；在nginx 启动服务load conf时，
 就会读取 proxy_set_header 的配置项；来获取需要的变量。proxy_set_header 是用来设置请求的header的；
 比如：设置上面的host  X-Real-IP x-forwarded-for 

 

#####  3个配置项的含义
host：只要 用户在浏览器中访问的域名绑定了 VIP VIP 下面有RS；则就用$host ；host是访问URL 中的域名和端口  www.taobao.com:80
X-real-IP:把源IP 【$remote_addr,建立HTTP连接header里面的信息】赋值给X-Real-IP;

####环境：nginx做反向代理，apache做后端服务器
nginx部分配置代码：

```
upstream apache{
server 127.0.0.1:8080; # 后端真实服务器地址及端口
}

server {
listen 80;

server_name www.a.com;
root /usr/share/nginx/html;

location / {
proxy_pass http://apache;
proxy_set_header ClientIpGetFromNginx $remote_addr;
}
```
变量 $remote_addr 代表客户端ip地址
nginx反向代理会添加一个请求头
proxy_set_header X-Forwarded-For $remote_addr;
以此传递客户端ip到后端服务器。
此时去查看后端服务器的访问日志如下
127.0.0.1 – – [01/Sep/2017:10:31:10 +0800] 后面内容省略···
可以看出来访问返回的是nginx也就是Referer上一层的ip，需要在apache日志格式修改
LogFormat “%{ClientIpGetFromNginx}i %l %u %t \”%r\” %>s %b \”%{Referer}i\” \”%{User-Agent}i\”” combined
### 如何判断移动端浏览器发出的请求并重定向站点
1、移动端开发需要加入的代码

```
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">  
<meta name="viewport" content="initial-scale=1,  user-scalable=no",

maximum-scale=1, minimum-scale=1>
```

2、判断移动端还是PC端

```
function browserRedirect() {
                var ua= navigator.userAgent.toLowerCase();
                var ipad= ua.match(/ipad/i) == "ipad";
                var iphone= ua.match(/iphone os/i) == "iphone os";

                var mid= ua.match(/midp/i) == "midp";

//midp，即Mobile Internet Device pad，一种新的“比智能电话大，比笔记本小”的互联网终端。

                var uc7= ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var uc= ua.match(/ucweb/i) == "ucweb";
                var android= ua.match(/android/i) == "android";
                var ce= ua.match(/windows ce/i) == "windows ce";
                var mobile= ua.match(/windows mobile/i) == "windows mobile";
                if (ipad|| iphone|| mid|| uc7|| uc || android|| ce|| mobile) {
                    //跳转移动端页面
                    window.location.href="http://www.wanshaobo.com/mobile/index.html";
                } else {
                    //跳转pc端页面
                    window.location.href="http://www.wanshaobo.com/index.html";
                }
            }
            ```