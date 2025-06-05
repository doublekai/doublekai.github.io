---
title: Vue.js基础指令和使用
date: 2019-04-16 18:59:42

---
##  Vue的来源

Vue  是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。 

## Vue和jQuery
>	如果你使用过JQuery那你对Vue一定爱不释手，jQuery是js的库，而库就是仓库，用来管理我们常用的js调用方法,jQuery的优点就是寻找DOM快，操作DOM灵活。而Vue是js的一种框架。如果你知道怎么使用jQuery那就一定会使用Vue。(最后提醒一下:建议先用原生js实现DOM的操作不要直接接触jQuery和Vue)
---
##    Vue的在线使用(当然也可以下载到本地调用)
```
 <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> 
```
### 直接贴代码

```	
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>vue</title>
	
	
</head>
<body>
	<div id="root">
		<div>{{mes}}--{{age}}</div>
		<ul v-show="flag" >		<!-- v-show表示display属性表示控件是否显示-->
			<div>v-for遍历数组元素</div>
			<li v-for="(v,i) in lists">{{ v }}--{{ i }}</li>
			<div>遍历k vue</div>
			<li v-for="(v,key) in arr">{{ v }}--{{ key }}</li>
			<div>遍历数组列表元素</div>
			<li v-for="(v,i) in arrlist">{{ v }}--{{ i }}</li>
			<li v-for="(v,i) in arrlist">{{ v.name }}--{{ v.id }}</li>	
		</ul>
		<button v-on:click="clike2">点击2</button><!--点击按钮2 age=25 flag=true（控件显示）显示呜呜呜-->
		<button  v-on:click="clike1">点击1</button><!--点击按钮1 age=21 flag=false（控件消失） 显示哈哈哈-->
		<p v-if="age==19">嘿嘿嘿</p> 
		<p v-else-if="age==21">哈哈哈</p>	
		<p v-else>呜呜呜</p>

	</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
	//实例化一个Vue对象
	new Vue({
		el: "#root", 
		data:{
			mes:"hello", //显示内容
			flag:true,  
			age:19,//初始化年龄为19
			lists: ['Jake','Boy','Alies'],
			arr:{name:"aa",id:0001,name:"bb",id:0002},
			arrlist:[{name:"cccc",id:00003},{name:"dddd",id:00005},{name:"ffff",id:00004}]

		},
		methods:{
			clike1:function () {
				this.age=21;
				this.mes="看我";
				this.flag=false;
				

				/* body... */
			},
			clike2:function(){
				this.mes="再看我";
				this.flag=true;
				this.age=25;
			}


		}
	});
	
</script>
</html>
```


---
Vue框架常用参数含义
- el：Element,就是节点
- data：存放属性的经过后台响应返回H5显示 这些值改变前台随之改变
-  methods：存放函数的地方
-  filters： 过滤器（比如服务器上代表性别是0和1,在浏览器我们看到的是男女,这就需要我们用过滤器来实现。）

---
上面代码主要是Vue的基本指令遍历数组、遍历对象和if-else的基本使用，具体看注释。


###### 还有很多用多了自然会用，不用刻意去记一些单词

