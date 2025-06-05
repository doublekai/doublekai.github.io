title: 浅谈HTTP
tags:
  - 网络
  - 
categories: []
date: 2018-10-25
---

###	网络模型
> 网络模型一般是指 OSI 七层参考模型和 TCP/IP 五层参考模型。（也有分为四层的，物理和数据链路为一层
大致参考下图！
![image](https://github.com/doublekai/user/blob/master/xiyi.png?raw=true)

>  我们现在常用的是TCP/IP模型又称为TCP/IP协议族，每一层分别有很多协议。而计算机之间的通信要通过这些被别人定义好的协议才能互相访问。
#### 各部分及功能
> 1、应用层：针对你特定应用的协议 
2、表示层：设备固定的数据格式和网络标准数据格式之间的转化 
3、会话层：通信管理，负责建立和单开通信连接，管理传输层 以下分层 
4、传输层：管理两个节点之间的数据传递。负责可靠传输 
5、网络层：地址管理和路由选择 
6、数据链路层：互联设备之间传送和识别数据帧 
7、物理层：界定连接器和网线之间的规格
###	HTTP
> 超文本传输协议（HTTP）是一种为分布式的，协作的，超媒体信息系统，它是面向应用层的协议。

#### 总体操作
>HTTP 协议是一种请求/响应型的协议。 客户端给服务器发送请求的格式是一个请求方法(request method)，URI，协议版本号，然后紧接着一个包含请求修饰符(modifiers)，客户端信息，和可能的消息主体的类 MIME(MIME-like)消息。服务器对请求端发送响应的格式 是以一个状态行(status line)，其后跟随一个包含服务器信息、实体元信息和可能的实体主体 内容的类 MIME(MIME-like)的消息。其中状态行(status line)包含消息的协议版本号和一 个成功或错误码。
![enter description here](//upload-images.jianshu.io/upload_images/2964446-5a35e17f298a48e1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2)
#### 常见协议参数
##### URL
> http_URL = "http:" "//" host [ ":" port ] [ abs_path [ "?" query ]]
> port不指明默认为80
##### 协议版本号
> HTTP 使用一个` <major>.<minor> `数字模式来指明协议的版本号。（具体请参考《HTTP协议》）
##### 	请求（Request）
>一个请求消息是从客户端到服务器端的，在消息首行里包含方法，资源指示符，协议版本。
Request = Request-Line ; Section 5.1 *(( general-header ; Section 4.5|request-header ; Section 5.3| entity-header ) CRLF) ; Section 7.1CRLF[ message-body ] ; Section 4.3
##### 	请求（Response）
>接收和解析一个请求消息后，服务器发出一个 HTTP 响应消息。
response =Status-Line*(( general-header)|response-header|entity-header)CRLF）|CRLF[ message-body ]
##### 状态码
> -1xx :报告的   -请求被接收到，继续处理
-2xx :成功 (accepted)的动作 。	-被成功地接收(received).
-3xx :重发	-为了完成请求必须采取进一步的动作。
-4xx :客户端出错		- 请求包括错的语法或不能被满足。
-5xx :服务器出错  -服务器无法完成显然有效的请求。
常见状态码
>> 
>> 200 OK                        //客户端请求成功
400 Bad Request               //客户端请求有语法错误，不能被服务器所理解
401 Unauthorized              //请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用 
403 Forbidden                 //服务器收到请求，但是拒绝提供服务
404 Not Found                 //请求资源不存在，eg：输入了错误的URL
500 Internal Server Error     //服务器发生不可预期的错误
503 Server Unavailable        //服务器当前不能处理客户端的请求，一段时间后可能恢复正常
###	HTTP请求方法
> 根据HTTP标准，HTTP请求可以使用多种请求方法。
HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。
HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。
GET     请求指定的页面信息，并返回实体主体。
HEAD     类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头
POST     向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
PUT     从客户端向服务器传送的数据取代指定的文档的内容。
DELETE      请求服务器删除指定的页面。
CONNECT     HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
OPTIONS     允许客户端查看服务器的性能。
TRACE     回显服务器收到的请求，主要用于测试或诊断。


###	HTTP工作原理
> HTTP协议定义Web客户端如何从Web服务器请求Web页面，以及服务器如何把Web页面传送给客户端。HTTP协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。

#### 以下是 HTTP 请求/响应的步骤：

> 1、客户端连接到Web服务器
一个HTTP客户端，通常是浏览器，与Web服务器的HTTP端口（默认为80）建立一个TCP套接字连接。例如，http://www.oakcms.cn。

> 2、发送HTTP请求
通过TCP套接字，客户端向Web服务器发送一个文本的请求报文，一个请求报文由请求行、请求头部、空行和请求数据4部分组成。

> 3、服务器接受请求并返回HTTP响应
Web服务器解析请求，定位请求资源。服务器将资源复本写到TCP套接字，由客户端读取。一个响应由状态行、响应头部、空行和响应数据4部分组成。

> 4、释放连接TCP连接
若connection 模式为close，则服务器主动关闭TCP连接，客户端被动关闭连接，释放TCP连接;若connection 模式为keepalive，则该连接会保持一段时间，在该时间内可以继续接收请求;

> 5、客户端浏览器解析HTML内容
客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。然后解析每一个响应头，响应头告知以下为若干字节的HTML文档和文档的字符集。客户端浏览器读取响应数据HTML，根据HTML的语法对其进行格式化，并在浏览器窗口中显示。

> 例如：在浏览器地址栏键入URL，按下回车之后会经历以下流程：

> 1、浏览器向 DNS 服务器请求解析该 URL 中的域名所对应的 IP 地址;

> 2、解析出 IP 地址后，根据该 IP 地址和默认端口 80，和服务器建立TCP连接;

> 3、浏览器发出读取文件(URL 中域名后面部分对应的文件)的HTTP 请求，该请求报文作为 TCP 三次握手的第三个报文的数据发送给服务器;

> 4、服务器对浏览器请求作出响应，并把对应的 html 文本发送给浏览器;

> 5、释放 TCP连接;

> 6、浏览器将该 html 文本并显示内容; 
具体参考[enter description here](https://www.cnblogs.com/ranyonsue/p/5984001.html )
和《HTTP协议》。