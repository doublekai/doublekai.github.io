title: 如何利用Markdown写文章
tags:
  - 文章
  - ''
categories: []
date: 2018-07-16 18:06:00
---
#  	Markdown语法说明

>首先来个h2标题就叫做Markdown语法说明
在给标题下面定义好ul列表作为目录
然后是一个h6副标题和一个>引用

##    简单的标题 
```
# h1
##  h2
```
>h1 == #    （后面加入一个制表符或空格）
h2 == ##    
...... 

接下来看一段文字

```
[link](https://www.cnblogs.com/doublekai "title")
```
>	link代表文字 （）包含链接和title

[点击我,能跳转到Doublekai的blog](https://www.cnblogs.com/doublekai "博客园")


##    引用
这里是正常的内容  
接下来是加了 >
>   看这就是引用
>>  我是二级引用
>>> 我是三级引用
>>>>    我是n层引用

##    插入图片
插入图片的格式就是
``` 
![Alt text](图片链接 "optional title")
```
>	Alt text：图片的Alt标签，用来描述图片的关键词，可以不写。最初的本意是当图片因为某种原因不能被显示时而出现的替代文字，后来又被用于SEO，可以方便搜索引擎根据Alt text里面的关键词搜索到图片。 图片链接：可以是图片的本地地址或者是网址。”optional title”：鼠标悬置于图片上会出现的标题文字，可以不写。

****


![image](/images/wechat.png  "图片")
##   插入代码

>   插入代码用三个 ` 来表示
接下来是一段定义结构体的代码
```
//因为这段时间专升本在学数据结构所以就拿来做实验了
#include "stdio" //代码光亮不错
#define maxlen 100
typedef struct{   //看来对各种语言关键字都懂啊！
    ElemType data[maxlen];
    int listlen;
    
}sqlist;

```
>	上面是一段数据结构代码 关键字都识别
    再来看一下 python

``` 
import re 
for i in rang(0,10):
    print i

```

>	再来一段html可以看到基本上对语言识别度很好。
```
<!DOCTYPE html>
<html>

	<head>
		<title></title>
	</head>

	<body>
        在加个脚本语言
	</body>
    <script type="text/javascript">
        console.log('hello,word');
    </script>
</html>
```
>>	下面是整个页面的md

![image](/images/t1.png)
![image](/images/t2.png)
---