---
title: Django入门
date: 2020-10-26 17:32:59
tags:
---
# Django入门笔记

## Django安装(python2.7)
> 版本对照![image](https://github.com/doublekai/user/blob/master/django.png?raw=true)
```
pip --default-timeout=100 install -i https://pypi.mirrors.ustc.edu.cn/simple/ django==1.8
```
## 创建第一个项目
> 进入提前创建的文件夹
```
django-admin startproject HelloWorld

cd HelloWorld/HelloWorld

```
>创建xx.py文件
```
from django.http import HttpResponse
def hello(request):
    return HttpResponse("Hello,world")
```
> 找到urls.py文件这个文件作用是保存路径和函数的对应关系，代码替换

```
from django.conf.urls import  url
from . import views

urlpatterns = [
    # Examples:
    # url(r'^$', 'HelloWord.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^', views.hello),
]
```
> 在目录下使用命令,启动服务器自己设定端口
```
python manage.py runserver  127.0.0.1:8000
```
>接下来打开浏览器就能看到

## 创建MTV项目
M =model
T =view
V =controller
>同上代码创建项目，在本项目内创建子目录（也就是子功能）
``` 
python manage.py startapp goods 

```
>在目录下找到settings.py在INSTALLED_APPS中将刚才两个项目添加进去，运行命令（ip也可以不要）
```
python manage.py runserver 
```
## 启动mysql
>启动服务 输入密码
```
net start mysql 
mysql -u root -p
```
>我使用的是Navicat for MySQL
然后在Djang创建的目录下找到刚才与上面相同的配置文件找到DATABASES修改和添加配置
```
 'ENGINE': 'django.db.backends.mysql',
        #数据库的名字
        'NAME':'' ,
        #数据库地址
        'HOST':"localhost",
        #端口
        'PORT':'3306',
        #用户名
        'USER':'root',
        #密码
        'PASSWORD':'root',
```
>在_init__.py中
```
importpy mysql
# 因为本身Django不支持mysql语句
pymysql.install_as_MySQLdb()
```
>在项目中找到模型也就是models.py中创建数据库表以及字段
```
from django.db import models

# Create your models here.
#商品分类表
class GoodsCategory(models.Model):
    #分类的名称 如果类型是字符串类型 max_length必须要
    cat_name=models.CharField(max_length=30)
    #分类的样式
    cat_css = models.CharField(max_length=20)
    #分类的图片  图片路径
    cat_img = models.ImageField(upload_to='cag')
#商品表
class GoodsInfo(models.Model):
    #商品名字
    goods_name = models.CharField(max_length=100)
    #商品价格 default 默认为0
    goods_price=models.IntegerField(default=0)
    #商品描述
    goods_desc=models.CharField(max_length=2000)
    #商品图片
    goods_img=models.ImageField(upload_to='goods')
    #商品分类   定义外键
    goods_cag=models.ForeignKey('GoodsCategory')

from django.db import models
class OrderInfo(models.Model):
    status=(
        (1,'待付款'),
        (2, '待发货'),
        (3, '待收货'),
        (4, '已完成'),
    )
    #订单编号
    order_id =models.CharField(max_length=100)
    #收货地址
    order_address=models.CharField(max_length=100)
    #收货人
    order_recv=models.CharField(max_length=50)
    #联系电话
    order_phone=models.CharField(max_length=11)
    #运费
    order_fee=models.IntegerField(default=10)
    #订单状态
    order_status=models.IntegerField(default=1,choices=status)

    #订单备注
    order_extra=models.CharField(max_length=200)
#订单商品表
class OrderGoods(models.Model):
    #所属商品 链接外键
    goods_info=models.ForeignKey('goods.GoodsInfo')
    #商品数量
    goods_num=models.IntegerField
    #商品所属订单  链接外键
    goods_order=models.ForeignKey('OrderInfo'

```
>执行语句 第一句会生成两个文件 两个文件就是创建sql语句 也可以用命令查看 第二句是执行sql语句 这时候会在数据库中看到我们创建的表
```
python manage.py makemigrations
python manage.py migrate
```
## 创建视图
> 1.需要创建我们的templates也就是前端页面

>2.在settings中TEMPLATES列表中'DIRS': [os.path.join(BASE_DIR,'templates')],添加我们的路径

>3.在views中使用render函数返回页面
```
return render(request,'index.html')
```
## 模板传值
>使用render方法
```
 return render(request,'index.html',{'name':'张三','age':19})
```
> 在index使用{{name}}显示
## 静态显示
>新建静态文件夹 在配置文件中添加静态文件的路径
```
STATICFILES_DIRS=[os.path.join(BASE_DIR,'static')]
```
## 创建主页
> 最后简单的预览
![image](https://github.com/doublekai/user/blob/master/1.png?raw=true)

#### 项目地址


[点击找到Pthoto](https://github.com/doublekai/user/)
#### GitHub上传
```
hexo new post Django入门 

hexo g -d

```














































 








```
