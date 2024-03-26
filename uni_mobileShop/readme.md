
# 流程
1. 安装，HBuilderX
2. 新建，uniapp项目
3. 配置微信小程序ID，打开mainfest.json
4. 配置小程序开发者工具路径，打开工具-配置-运行配置
5. 开启微信开发者工具的服务端口
6. 配置 tabbar，打开page.json 
7. 配置请求拦截器，安装@escook/request-miniprogram发起网络请求
8. 小程序工具勾选不校验合法域名，在小程序后台添加request服务器域名
9. 轮播组件 swiper swiper-item image 标签
10. 配置小程序分包，减少首页加载时间，新建商品详情页、商品列表页
> 1. 创建分包根目录 subpkg
> 2. pages.json 中 和pages节点同级声明subPackages节点，用来定义分包结构
> 3. 在subpkg目录上鼠标右键，点击新建页面，选择小程序分包 subpkg
11. swiper 内嵌 navigator 组件，跳转商品详情页
> /subpkg/goods_detail/goods_detail?goods_id='',斜线代表项目根目录
12. 封装全局方法，uni.$showMsg()
13. onLoad() 获取分类导航数据，view、image标签、flex布局搭建UI结构
14. 编程式导航，uni.switchTab({url:''})
15. onLoad() 获取楼层数据，view、image标签、flex布局搭建UI结
16. 微信开发者工具新建编译模式，开发分类模块
17. 渲染三级分类UI，基于uni.getSystemInfoSync()方法、scroll-view + scrollTop、view标签、flex
```less
.wrap{
	display:flex;
	<!-- 子元素自动换行 -->
	flex-wrap:wrap;
	.item {
		width:33.3%;
		display:flex;
		<!-- 子元素纵向布局 -->
		flex-direction:column；
		<!-- 子元素纵向居中 -->
		align-items: center;
	}
}
```
18. 自定义搜索入口组件
```js
// 自定义搜索组件<my-search :bg :radius @myclick> + this.$emit('myclick')
// 在components目录，鼠标右键，新建组件
// 使用uni-ui组件<uni-icons>实现图标，使用 position:sticky; top:0; z-index:999实现吸顶
```
19. 搜索组件uni-ui组件 <uni-search-bar @input :radius> 
20. 自动获取焦点，修改源代码data中show、showSync为true
21. 搜索框防抖处理,每输入一次，kw就推迟500ms被赋值
```js
input(e){
	clearTimeout(this.timer)
	this.timer = setTimeout(()=>{
		this.kw = e.value
	},500)
}
```
22. 实现历史标签 uni-ui <uni-tag >，数组的[...this.historyList]reverse()实现数组翻转，new Set(this.historyList)对象 + .delate +.add 去重
23. uni.setStorage() 持久化历史标签
24. 请求商品列表页数据（query、cid、pagenum、pagesize）,view、block、image、flex定义UI结构
25. |(filters)过滤器处理商品价格，配置上拉加载更多
```js
/*
	1. 打开page.json配置文件，为subPackages分包中的goods_list页面配置上拉触底的距离 style-onReachBottomDistance
	2. 在页面onReachBottom()内让页码值加1，请求数据
*/
```
26. 通过节流阀防止额外的请求
```js
this.isloading = true
// request
// ......
this.isloading = false
// ......
onReachBottom() {
	if(pagenum * pagesize >= total) return uni.$showMsg('数据加载完毕')
	if(this.isloading) return
	// request
}
```
27. 开启下拉刷新,打开pages.json文件,在页面onPullDownRefresh()中重置请求参数、列表数据、节流阀，以及关闭下拉刷新效果uni.stopPullDownRefresh()
```js
"pages":[
	{
		"path":"goods_list/goods_list",
		"style":{
			<!-- 上拉刷新距离 -->
			"onReachBottomDistance":150,
			<!-- 下拉刷新 -->
			"enablePullDownRefresh":true,
			"backgroundColor":"#F8F8F8"
		}
	}
]
```
28. 调用uni.previewImage() 预览轮播图大图
29. 调用uni-ui <rich-text :nodes> 组件渲染商品介绍的富文本
30. 使用正则，解决富文本图片底部空白间隙的问题；将.webp替换成.jpg，解决ios上不支持的问题
```js
str.replace(/<img /g,'<img style="display:block;"').replace(/webp/g,'jpg')
```
31. v-if 判断是否有数据，解决页面闪烁的问题
32. 基于uni-ui GoodsNav组件实现商品导航区域UI
33. 基于uni.switchTab，点击购物车跳转购物车页面
34. 基于vuex存储购物车数据
```js
/*
	1.创建store文件夹，新建store.js文件，初始化store实例对象
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	// TODO 
	modules: {},
})

export default store
/*
	2. main.js中导入并挂载到实例上
*/
import store from './store/store.js'

const app = new Vue({
	...App,
	store,
})
app.$mount()
/*
	3. 新建cart.js, 配置store
*/
export default {
	namespace: true,
	// 返回一个对象
	state: ()=> ({
		cart:[],
	}),
	mutation:{},
	getters:{},
}
/*
	4. 在store.js中导入挂载cart.js 模块
*/
import moduleCart from '@/store/cart.js'
const store = new Vuex.Store({
	modules: {
		'm_cart':moduleCart
	},
})
/*
	5. 在商品详情页调用cart数据
*/
import {mapState} from 'vuex'
export default {
	computed:{
		...mapState('m_cart',[])
	}
}
/*
	6. 在cart.js mutations 添加addToCart(),调用数组的find((item)=>{item.id === xxx.id})去重
*/
mutations : {
	addToCart(state, goods) {
		const res = state.cart.find({item}=>{item.goods_id === goods.goods_id})
		
		if(res === undefined){
			// push
		} else {
			// count++
		}
	}
}
/*
	7. 调用addToCart方法
	-this.addToCart(goods)使用,goods是一个对象，包含商品ID\名称\价格\数量\图片
*/
import {mapState，mapMutations} from 'vuex'
export default {
	computed:{
		...mapState('m_cart',[])
	},
	methods:{
		...mapMutations('m_cart','addToCart')
	}
}
/*
	8. 在cart.js getters 添加total()
*/
getters: {
	total(state) {
		let c = 0
		state.cart.forEach(goods => c += goodsgood_count)
		return c
	}
}
/*
	9. 调用total()方法
*/
import {mapState，mapMutations，mapGetters} from 'vuex'
export default {
	computed:{
		...mapState('m_cart',[]),
		...mapGetters('m_cart','total')
	},
	methods:{
		...mapMutations('m_cart','addToCart')
	},
	watch: {
		total:{
			handler(newVal) {
				// 购物车角标赋值
			},
			// 首次加载，立即调用
			immediate: true
		}
		
	}
}
/*
	10. 在cart.js中 持久化存储购物车数据， 避免随内存销毁而销毁
	- saveToStorage方法，uni.setStorageSync('cart', JSON.stringify(state.cart))
	- state默认值，JSON.parse(uni.getStorageSync('cart') || '[]')
	- this.commit('m_cart/saveToStorage'),调用 m_cart 命名空间下的 saveToStorage 方法
*/
```
35. mixins + uni.setTabBarBadge({...}) 动态设置 tabBar角标
```js
/*
	1. 新建 mixins/tabbar_badge.js
*/
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}
/*
	2. 导入mixins的页面, 配置直接生效
*/
import badgeMix from '@/mixins/tabbar-badge.js'
  
export default {
	mixins: [badgeMix]
}
```
36. 优化<my-goods>组件，view、image、text 、uni-number-box实现购物车页面UI, uni-swipe-action uni-swipe-action-item实现列表和滑动删除
37. 实现<my-adress>组件，view、image、button 渲染UI，flex、justify-content:space-between实现子元素左右布局
38. 需要用户授权 scope.address，基于uni.chooseAddress(OBJECT)获取收获地址
39. 通过reAuth() + uni.showModal() 让用户重新授权
40. 通过数组reduce()函数返回购物车内商品的总数量，数组的filter方法过滤️⃣勾选的值
41. 获取code，uni.login()登录微信获取token、用户信息，将token保存到vuex中
42. 登出，清空用户信息、token、收货地址
43. 在"/my/"请求头中添加token
44. 微信支付实现，创建订单获取订单编号，用订单编号进行订单预支付，用预支付返回参数调用uni.requestPayment()发起微信支付
45. 发布小程序，压缩代码
> XHbuilder-发行-小程序-微信
> 小程序管理后台-版本管理-开发版本->发布版本-


# API文档
request域名：小程序只支持 https 协议，并且要求是已备案的域名。

```
https://www.zhengzhicheng.cn
备用：
https://autumnfish.cn/wx
https://www.uinav.com
```

## 文档更新说明

>  更新日期   2019-04-01

### 返回值调整

```
新版接口调整：  res.data.message

旧版接口废弃：  res.data.data
```

### 分类页图片

```js
新版接口调整：  cat_icon 属性直接返回完整图片 url 地址

旧版接口废弃：  cat_icon 返回相对路径，需要手动拼接路径
```

### 订单支付接口

```js
新版接口调整：  支付对象数据为 res.data.message.pay

旧版接口废弃：  支付对象数据为 res.data.data.wxorder
```



## 路径说明

- 根路径说明
```
	https://请求域名/api/public/v1
```
- 路径权限说明
	- 路径所有权限都可以访问
	```
		https://请求域名/api/public/v1
	```
	- 只有登录用户才可以访问路径
	```
		https://请求域名/api/public/v1/my
	```



## 电商登录实现方式

- 采用 jwt 方式进行
- 实现流程
  1. 请求登录
  2. 获取token
  3. 访问有权限的路径必须把 token 放置到 http 头中
  ```
  	"Authorization" : token
  ```
  4. token 不过期，长期有效。



## API详情



### 全局权限访问

- 访问根路径
```
	https://请求域名/api/public/v1
```



#### 主页API

##### 获取首页轮播图数据
- 请求路径：https://请求域名/api/public/v1/home/swiperdata
- 请求方法：GET
- 请求参数

| 参数名   | 参数说明 | 备注   |
| -------- | ---- | ---- |
| 无 |  ||

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| image_src | 图片路径 |          |
| open_type | 导航链接类型 | |
| navigator_url | 导航链接路径 |          |

- 响应数据参考

```JSON
{
    "message": [
        {
            "image_src": "https://www.zhengzhicheng.cn/pyg/banner1.png",
            "open_type": "navigate",
            "goods_id": 129,
            "navigator_url": "/pages/goods_detail/main?goods_id=129"
        },
        {
            "image_src": "https://www.zhengzhicheng.cn/pyg/banner2.png",
            "open_type": "navigate",
            "goods_id": 395,
            "navigator_url": "/pages/goods_detail/main?goods_id=395"
        },
        {
            "image_src": "https://www.zhengzhicheng.cn/pyg/banner3.png",
            "open_type": "navigate",
            "goods_id": 38,
            "navigator_url": "/pages/goods_detail/main?goods_id=38"
        }
    ],
    "meta": { "msg": "获取成功", "status": 200 }
}
```



##### 获取首页分类选项数据

- 请求路径：https://请求域名/api/public/v1/home/catitems
- 请求方法：GET
- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
|无||

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| name      | 名称   |          |
| image_src | 图片路径 |          |
| open_type | 导航链接类型 | |
| navigator_url | 导航链接路径 |          |

- 响应数据

```javascript
{
    "message": [
        {
            "name": "分类",
            "image_src": "https://www.zhengzhicheng.cn/pyg/icon_index_nav_4@2x.png",
            "open_type": "switchTab",
            "navigator_url": "/pages/category/main"
        },
        {
            "name": "秒杀拍",
            "image_src": "https://www.zhengzhicheng.cn/pyg/icon_index_nav_3@2x.png"
        },
        {
            "name": "超市购",
            "image_src": "https://www.zhengzhicheng.cn/pyg/icon_index_nav_2@2x.png"
        },
        {
            "name": "母婴品",
            "image_src": "https://www.zhengzhicheng.cn/pyg/icon_index_nav_1@2x.png"
        }
    ],
    "meta": { "msg": "获取成功", "status": 200 }
}
```



##### 获取首页楼层数据

- 请求路径：https://请求域名/api/public/v1/home/floordata
- 请求方法：GET
- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
|无||

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| floor_title | 楼层标题 |  |
| product_list | 楼层内容列表 |          |
| name | 名称 |          |
| image_src | 图片路径 |          |
| image_width | 商品图片宽度 |          |
| open_type | 导航链接类型 |          |
| navigator_url | 导航链接路径 |          |

- 响应数据

```javascript
{
    "message": [
        {
            "floor_title": {
                "name": "时尚女装",
                "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_title.png"
            },
            "product_list": [
                {
                    "name": "优质服饰",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_1@2x.png",
                    "image_width": "232",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=服饰"
                },
                {
                    "name": "春季热门",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_2@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=热"
                },
                {
                    "name": "爆款清仓",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_3@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=爆款"
                },
                {
                    "name": "倒春寒",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_4@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=春季"
                },
                {
                    "name": "怦然心动",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor01_5@2x.png",
                    "image_width": "233",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=心动"
                }
            ]
        },
        {
            "floor_title": {
                "name": "户外活动",
                "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_title.png"
            },
            "product_list": [
                {
                    "name": "勇往直前",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_1@2x.png",
                    "image_width": "232",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=户外"
                },
                {
                    "name": "户外登山包",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_2@2x.png",
                    "image_width": "273",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=登山包"
                },
                {
                    "name": "超强手套",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_3@2x.png",
                    "image_width": "193",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=手套"
                },
                {
                    "name": "户外运动鞋",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_4@2x.png",
                    "image_width": "193",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=运动鞋"
                },
                {
                    "name": "冲锋衣系列",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor02_5@2x.png",
                    "image_width": "273",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=冲锋衣"
                }
            ]
        },
        {
            "floor_title": {
                "name": "箱包配饰",
                "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_title.png"
            },
            "product_list": [
                {
                    "name": "清新气质",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_1@2x.png",
                    "image_width": "232",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=饰品"
                },
                {
                    "name": "复古胸针",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_2@2x.png",
                    "image_width": "263",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=胸针"
                },
                {
                    "name": "韩版手链",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_3@2x.png",
                    "image_width": "203",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=手链"
                },
                {
                    "name": "水晶项链",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_4@2x.png",
                    "image_width": "193",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=水晶项链"
                },
                {
                    "name": "情侣表",
                    "image_src": "https://www.zhengzhicheng.cn/pyg/pic_floor03_5@2x.png",
                    "image_width": "273",
                    "open_type": "navigate",
                    "navigator_url": "/pages/goods_list?query=情侣表"
                }
            ]
        }
    ],
    "meta": { "msg": "获取成功", "status": 200 }
}

```



#### 商品API



##### 商品列表搜索
- 请求路径：https://请求域名/api/public/v1/goods/search
- 请求方法：GET

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| query       | 查询关键词   |          |
| cid       | 分类ID   |      可选    |
| pagenum       | 页数索引   |  可选默认第一页        |
| pagesize       | 每页长度   |  可选默认20条       |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| total       | 总共记录   |          |
| pagenum       | 当前页数   |          |
| goods_id       | 商品ID   |          |
| cat_id       | 分类ID   |          |
| goods_name       | 商品名称   |          |
| goods_price       | 商品价格   |          |
| goods_number       | 商品数量   |          |
| goods_weight       | 商品重量   |          |
| goods_big_logo       | 商品大图标   |          |
| goods_small_logo       | 商品小图标   |          |
| add_time       | 商品添加时间   |          |
| upd_time       | 商品更新时间   |          |
| hot_mumber       | 热门商品数   |          |
| cat_one_id       | 所属一级分类   |          |
| cat_two_id       | 所属二级分类   |          |
| cat_three_id       | 所属三级分类   |          |

- 响应数据

```JSON
{
    "message": {
        "total": 2058,
        "pagenum": "1",
        "goods": [
            {
                "goods_id": 57332,
                "cat_id": 998,
                "goods_name": "400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）",
                "goods_price": 14,
                "goods_number": 100,
                "goods_weight": 100,
                "goods_big_logo": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_800x800.jpg",
                "goods_small_logo": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg",
                "add_time": 1516662792,
                "upd_time": 1516662792,
                "hot_mumber": 0,
                "is_promote": false,
                "cat_one_id": 962,
                "cat_two_id": 981,
                "cat_three_id": 998
            },
            {
                "goods_id": 57194,
                "cat_id": 992,
                "goods_name": "亿力洗车工具汽车美容用品海绵刷不伤车漆擦车海棉清洁海绵",
                "goods_price": 29,
                "goods_number": 100,
                "goods_weight": 100,
                "goods_big_logo": "",
                "goods_small_logo": "",
                "add_time": 1516662312,
                "upd_time": 1516662312,
                "hot_mumber": 0,
                "is_promote": false,
                "cat_one_id": 962,
                "cat_two_id": 980,
                "cat_three_id": 992
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```



##### 搜索建议查询

- 请求路径：https://请求域名/api/public/v1/goods/qsearch
- 请求方法：GET
- 请求参数

| 参数名 | 参数说明 | 备注                          |
| ------ | -------- | ----------------------------- |
| query  | 查询内容 | 如： goods/qsearch?query=小米 |

- 响应参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| goods_id   | 商品ID   |      |
| goods_name | 商品名称 |      |

- 响应数据

```JSON
{
    "message": [
        {
            "goods_id": 57332,
            "goods_name": "400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）"
        },
        {
            "goods_id": 57194,
            "goods_name": "亿力洗车工具汽车美容用品海绵刷不伤车漆擦车海棉清洁海绵"
        }
    ],
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```



##### 商品详情

- 请求路径：https://请求域名/api/public/v1/goods/detail
- 请求方法：GET

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| goods_id       | 商品ID   |  必要     |

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| goods_id       | 商品ID   |          |
| cat_id       | 分类ID   |          |
| goods_name       | 商品名称   |          |
| goods_price       | 商品价格   |          |
| goods_number       | 商品数量   |          |
| goods_weight       | 商品重量   |          |
| goods_big_logo       | 商品大图标   |          |
| goods_small_logo       | 商品小图标   |          |
| add_time       | 商品添加时间   |          |
| upd_time       | 商品更新时间   |          |
| hot_mumber       | 热门商品数   |          |
| cat_one_id       | 所属一级分类   |          |
| cat_two_id       | 所属二级分类   |          |
| cat_three_id       | 所属三级分类   |          |
| goods_introduce       | 商品介绍HTML富文本 |          |
| pics       | 商品图片列表   |          |
| attrs       | 商品属性列表   |          |


- 响应数据

```javascript
{
    "message": {
        "goods_id": 57332,
        "cat_id": 998,
        "goods_name": "400毫升 海鲜食品冷藏冰包 注水冰袋医用冰袋户外冷藏保鲜熟食冷藏反复使用（10个装）",
        "goods_price": 14,
        "goods_number": 100,
        "goods_weight": 100,
        "goods_introduce": "<div class=\"lazyimg\"><!-- Save for Web Slices (20170730关联模板.psd) -->\n<p><img data-src=\"//image.suning.cn/uimg/sop/commodity/167890268714163515505319_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" usemap=\"#Map\" border=\"0\" src=\"//image.suning.cn/uimg/sop/commodity/167890268714163515505319_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"> </p>\n<!-- End Save for Web Slices --><p></p><p><img picsize=\"706KB\" data-src=\"//image.suning.cn/uimg/sop/phonecomm/157271695856956094412300_640x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"//image.suning.cn/uimg/sop/phonecomm/157271695856956094412300_640x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></p><p><img picsize=\"610KB\" data-src=\"//image.suning.cn/uimg/sop/phonecomm/192892939814201549766135_640x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"//image.suning.cn/uimg/sop/phonecomm/192892939814201549766135_640x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\"></p></div>",
        "goods_big_logo": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_800x800.jpg",
        "goods_small_logo": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg",
        "goods_state": 2,
        "is_del": "0",
        "add_time": 1516662792,
        "upd_time": 1516662792,
        "delete_time": null,
        "hot_mumber": 0,
        "is_promote": false,
        "cat_one_id": 962,
        "cat_two_id": 981,
        "cat_three_id": 998,
        "goods_cat": "962,981,998",
        "pics": [
            {
                "pics_id": 234751,
                "goods_id": 57332,
                "pics_big": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_800x800.jpg",
                "pics_mid": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg",
                "pics_sma": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_200x200.jpg",
                "pics_big_url": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_800x800.jpg",
                "pics_mid_url": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_400x400.jpg",
                "pics_sma_url": "http://image4.suning.cn/uimg/b2c/newcatentries/0070083251-000000000168369396_1_200x200.jpg"
            }
        ],
        "attrs": [
            {
                "goods_id": 57332,
                "attr_id": 8519,
                "attr_value": "400",
                "add_price": 0,
                "attr_name": "主体-型号",
                "attr_sel": "only",
                "attr_write": "manual",
                "attr_vals": "Q6"
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```



#### 分类API

##### 获取分类数据
- 请求路径：https://请求域名/api/public/v1/categories
- 请求方法：GET

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
|无||

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| cat_id       | 分类ID   |          |
| cat_name       | 分类名称   |          |
| cat_level       | 分类级别   |          |
| cat_icon       | 分类图标   |     只有3级别分类采用图标     |
| children       | 子分类列表   | 对象数组 |

- 响应数据

```javascript
{
    "message": [
        {
            "cat_id": 1,
            "cat_name": "大家电",
            "cat_pid": 0,
            "cat_level": 0,
            "cat_deleted": false,
            "cat_icon": "",
            "children": [
                {
                    "cat_id": 3,
                    "cat_name": "电视",
                    "cat_pid": 1,
                    "cat_level": 1,
                    "cat_deleted": false,
                    "cat_icon": "",
                    "children": [
                    {
                        "cat_id": 5,
                        "cat_name": "曲面电视",
                        "cat_pid": 3,
                        "cat_level": 2,
                        "cat_deleted": false,
                        "cat_icon": "full/2fb113b32f7a2b161f5ee4096c319afedc3fd5a1.jpg"
                    }]
                }
            ]
        }
    ],
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```



#### 微信用户登录  API

##### 微信登录换取 Token

- 请求路径：https://请求域名/api/public/v1/users/wxlogin
- 请求方法：POST

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
|code|用户登录凭证|必要，可通过 [wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html#wxloginobject)  获取|
|encryptedData|完整用户信息密文|必要，可通过 getUserInfo 获取|
|iv|加密算法的初始向量|必要，可通过 getUserInfo 获取|
|rawData|用户信息原始数据字符串|必要，可通过 getUserInfo 获取，JSON.stringify() 转字符串|
|signature|使用 sha1得到字符串|必要，可通过 getUserInfo 获取|

- 请求数据参考


```json
{
  "code": "013pZWCt0GniKb1ftkBt0AxfDt0pZWCf",
  "encryptedData": "FGMaNbO4ytTFTUzK3wmtfHWoFeQJYkyMajQ5tVbQglwmnJ46SMi43Thq0OZjSSa5Msmnpdfx7yigYkdvUbsiQFyF9xMGEQLpUFcpNjnYoCQOl2Ka5zEeqpMY91ywYAsPISeu1rwvFCU2Ucenxf7gdcDPQ/jNJdORGb86DR+2gVJeg8TZiXWJ66enpynj35DiaE1jNWUSzpgbOvO40dZrWnHVwDEJN+upeSHRR/IW7t3cgtV63/GeZzNhFbUYqNHO6M1KHetwY1u8mFXuZoXwVV7DrEwEzY1btqcfW93q4ekn2uwAUeJM4U+3roBsIT5ZpEM8YtQZVsAwjaWHBe8id1H4lurEFC5/GwLnRONrIiR7KDF7MPxnMO9flWFQEfay5dt9rBELzk1Efjf2H6UnzYfh+o4MbPxtc0cUiHEnNCVcXjDtulXSRUy7RZQPmjF/tYBHHrXEFubxnK4oRBZz/A==",
  "iv": "y/ESFBaesbEzIbB1th5Knw==",
  "rawData":
    "{\"nickName\":\"优购\",\"gender\":0,\"language\":\"zh_CN\",\"city\":\"\",\"province\":\"\",\"country\":\"\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/icWlxE4rARHaIlib1PRmBtRa2tQicUSEHYu8UIGZ0LLic9C0PticibED6brRFCuQYeLGtwTcBYFgMtcF11N31pVhMF8g/132\"}",
  "signature": "d06cd3a54e89e6014e43694844706eaccad109bb"
}
```


- 响应参数参考
| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
|token|身份验证标志||
| user_id       | 用户ID   |          |

- 响应数据

```json
{
  "message": {
    "user_id": 12,
    "user_email_code": null,
    "is_active": null,
    "user_sex": "男",
    "user_qq": "",
    "user_tel": "",
    "user_xueli": "本科",
    "user_hobby": "",
    "user_introduce": null,
    "create_time": 1525402223,
    "update_time": 1525402223,
    "token":
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"
  },
  "meta": { "msg": "登录成功", "status": 200 }
}
```



### 登录后访问

- 访问根路径
```javascript
https://请求域名/api/public/v1/my
```
- 访问此系列请求必须在头信息中添加token
```JSON
"Authorization" : token
```


#### 订单API

##### 创建订单

- 请求路径：https://请求域名/api/public/v1/my/orders/create
- 请求方法：POST

- 请求参数

| 参数名      | 参数说明 | 备注   |
| -------- | ---- | ---- |
| order_price       | 订单价格   | 必要 |
| consignee_addr       | 订单地址   | 必要 |
| order_detail       | 订单详情   | 可选，字符串格式 |
| goods       | 商品列表内部存放商品（goods_id，goods_number和goods_price）列表 | 必要 |

- 请求数据参考
```javascript
{
  "order_price": 0.1,
  "consignee_addr": "广州市天河区",
  "order_detail":
    "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]",
  "goods": [
      { 
          "goods_id": 5, 
          "goods_number": 11, 
          "goods_price": 15 
      },
      { 
          "goods_id": 555, 
          "goods_number": 1, 
          "goods_price": 15 
      }
  ]
}

```

- 响应参数

| 参数名      | 参数说明   | 备注       |
| -------- | ------ | -------- |
| order_id       | 订单唯一ID   |          |
| user_id       | 用户ID   |          |
| order_number       | 订单编号   |          |
| order_price       | 订单总金额 |          |
| order_pay       | 订单支付方式   | 支付方式 0未支付 1支付宝 2微信 3银行卡 |
| consignee_addr       | 订单地址   |          |
| pay_status       | 订单支付状态   | 订单状态： 0未付款、1已付款 |

- 响应数据参考

```javascript
{
  "message": {
    "order_id": 45,
    "user_id": 12,
    "order_number": "GD20180504000000000045",
    "order_price": 0.1,
    "order_pay": "0",
    "is_send": "否",
    "trade_no": "",
    "order_fapiao_title": "个人",
    "order_fapiao_company": "",
    "order_fapiao_content": "",
    "consignee_addr": "广州市天河区",
    "pay_status": "0",
    "create_time": 1525408071,
    "update_time": 1525408071,
    "order_detail":
      "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]",
    "goods": [
      {
        "id": 64,
        "order_id": 45,
        "goods_id": 5,
        "goods_price": 15,
        "goods_number": 11,
        "goods_total_price": 15
      }
    ]
  },
  "meta": { "msg": "创建订单成功", "status": 200 }
}

```

##### 订单预支付

- 请求路径：https://请求域名/api/public/v1/my/orders/req_unifiedorder
- 请求方法：POST
- 请求参数

| 参数名       | 参数说明 | 备注 |
| ------------ | -------- | ---- |
| order_number | 订单编号 | 必要 |

- 请求数据

```json
{ "order_number": "GD20180507000000000110" }
```

- 响应参数

| 参数名       | 参数说明         | 备注                                                         |
| ------------ | ---------------- | ------------------------------------------------------------ |
| pay          | 订单对象         | 可通过 [wx.requestPayment(OBJECT)](https://developers.weixin.qq.com/miniprogram/dev/api/api-pay.html#wxrequestpaymentobject)，发起微信支付 |
| timeStamp    | 时间戳           |                                                              |
| nonceStr     | 随机字符串       |                                                              |
| package      | 下单接口返回参数 |                                                              |
| signType     | 签名算法         |                                                              |
| paySign      | 签名             |                                                              |
| order_number | 订单编号         |                                                              |

- 响应数据

```JSON
{
  "message": {
    "pay": {
      "timeStamp": "1525681145",
      "nonceStr": "BkPggorBXZwPGXe3",
      "package": "prepay_id=wx071619042918087bb4c1d3d72999385683",
      "signType": "MD5",
      "paySign": "D1642DEEF1663C8012EDEB9297E1D516"
    },
    "order_number": "GD20180507000000000110"
  },
  "meta": { "msg": "预付订单生成成功", "status": 200 }
}
```



##### 订单支付状态查询

- 请求路径：https://请求域名/api/public/v1/my/orders/chkOrder
- 请求方法：POST
- 请求参数

| 参数名       | 参数说明 | 备注 |
| ------------ | -------- | ---- |
| order_number | 订单编号 | 必要 |

- 请求数据

```json
{ "order_number": "GD20180507000000000050" }
```

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| data   | 支付状态 |      |
| meta   | 订单状态 |      |

- 响应数据

```JSON
// 支付成功
{
    "message":"支付成功",
    "meta":{"msg":"验证成功","status":200}
}

// 支付失败
{ 
    "message": null,
    "meta": { "msg": "订单未支付", "status": 400 } 
}
```



##### 订单查询

- 请求路径：https://请求域名/api/public/v1/my/orders/all
- 请求方法：GET
- 请求参数

| 参数名 | 参数说明 | 备注                                         |
| ------ | -------- | -------------------------------------------- |
| type   | 1        | 1  全部订单     2 代付款订单    3 已付款订单 |

- 2响应参数

| 参数名         | 参数说明     | 备注 |
| -------------- | ------------ | ---- |
| order_id       | 订单唯一ID   |      |
| user_id        | 用户ID       |      |
| order_number   | 订单编号     |      |
| order_price    | 订单价格     |      |
| order_pay      | 订单支付方式 |      |
| consignee_addr | 订单地址     |      |
| pay_status     | 订单支付状态 |      |

- 响应数据

```json
{
  "message": [
    {
      "order_id": 44,
      "user_id": 12,
      "order_number": "GD20180507000000000050",
      "order_price": 0.1,
      "order_pay": "0",
      "is_send": "否",
      "trade_no": "",
      "order_fapiao_title": "个人",
      "order_fapiao_company": "",
      "order_fapiao_content": "",
      "consignee_addr": "广州市天河区",
      "pay_status": "0",
      "create_time": 1525407814,
      "update_time": 1525407814,
      "order_detail":
        "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]"
    }
  ],
  "meta": { "msg": "获取订单列表成功", "status": 200 }
}
```