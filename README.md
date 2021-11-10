# supermall
[在线浏览](http://120.76.40.51/)

## 描述

基于 vue.js 开发的商城类移动端项目，核心技术栈有**vuex**/**vue-router**/**axios**，同时配合了**Better-Scroll**滑动插件了移动端用户体验。

整体结构较为清晰，有良好的的组件封装，尽最大程度达到组件复用的效果。

学习到了规范使用了 vuex，每个 vuex 核心完成各个功能（actions 内对 mutation 进行代码复杂逻辑处理、异步操作,mutation 直接操控 state,getters 则返回处理 state 后的数据......）/axios 的封装使用,将 baseUrl 配置在根路径,每个文件处理各个组件内的接口调用....

## 功能截图以及设计思路

**数据请求方式思路**

1. 先创建一个独立的 js 文件，用来封装请求接口<br>

```
import axios from "axios";
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    // timeout: 5000,
  });
  //   拦截器
  instance.interceptors.request.use((config) => {
    return config;
  });
  instance.interceptors.response.use((res) => {
    return res;
  });
  return instance(config);
}
```

2. 根据各个页面的不同请求地址来进行归类封装，比如将首页商品请求封装到一个文件内<br>

```
import { request } from "./request";
export function getHomeMultidata() {
  return request({
    url: "/home/multidata",
  });
}
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page,
    },
  });
}

```

3. 然后在每个页面引入需要的 api，进行使用,拿到数据渲染到页面中<br>

```
// api
import { getHomeMultidata, getHomeGoods } from "@/network/home.js";


methods:{
// 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(({ data: { data } }) => {
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
      });
    },
  }
```

**路由设计**

注册路由表

```
import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/home/Home");
const Category = () => import("@/views/category/category");
const Cart = () => import("@/views/cart/Cart");
const Profile = () => import("@/views/profile/Profile");
const Detail = () => import("@/views/detail/Detail");
const Login = () => import("@/views/profile/childCompon/login");
const MyGoods = () => import("@/views/profile/childCompon/myGoods.vue");
Vue.use(VueRouter);

// 创建router
const routes = [
  { path: "", redirect: "/home" },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail",
    component: Detail,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/mygoods",
    component: MyGoods,
  },
];

// 创建路由对象
export default new VueRouter({
  routes,
  //history模式
  mode: "history",
});

```

大部分用的是编程式路由方式来进行路由转换

```
methods: {
    toItem() {
      this.$router.replace(this.path);
    },
  },
```

**各个页面展示**

![supermall1.gif](https://i.loli.net/2021/09/26/DlTv7Ye8zV65m9i.gif)

1. navbar 的粘性定位------首先在布局中，我还设置了一个相同的 navbar 固定定位在顶部，不过是隐藏状态，在 better-scroll 插件中有 api 能够获取到元素的 offsetTop 值，先拿到 navbar 的 offsetTop，到整个页面滑动到那指定的 offsetTop 值就把隐藏的 navbar 改为显示，并且功能也做了同步，这样就达到伪粘性定位的效果
2. navbar 之间的数据切换展示-------在 data 中定义不同类型商品的对象用来接收不同数据，默认展示第一页数据，每次点击 navbar，拿到索引值，找到对应索引的数据展示。
3. 下拉加载--------在 better-scroll 插件中提供了触底 api，每次触底先拿到当前 navbar 索引值，先请求对应商品数据的下一页，然后在 push 到原来的对象数据中

![supermall2.gif](https://i.loli.net/2021/09/26/JtWyRSwrjxcGP7Q.gif)

该页面没用滑动插件，通过 overflow：auto 来进行滚动条的出现

![supermall3.gif](https://i.loli.net/2021/09/26/kK2RlofHZGiSLjQ.gif)

vuex 状态管理---领取金额是通过 mutation 来增加 state 里的余额数据（随机，进行了格式转换）

同时在购物车内的消息提示是通过 getter 来判断加入购物车商品数量，如果是 0 就进行提示，

如果所选商品金额大于余额也会显示购买失败......等不同情况提示

![supermall4.gif](https://i.loli.net/2021/09/26/J41dAcEofpBZhVl.gif)

点击加入购物车，这里做了一个 action，来判断 state 里的购物车商品是否存在（find 方法），如果存在就只让该商品的数量加一，不在 push 给 state 购物车数据占位

![supermall5.gif](https://i.loli.net/2021/09/26/zt1wZacubNAqfXM.gif)

1. 全选和全不选状态-----这里是通过判断选中商品数量是否等于购物车内商品总数，如果相等就让全选按钮选中，反之同理。如果直接点击全选的话就在 mutation 中利用 forEach 让每一个商品选中，反之同理
2. 购买功能------购买的 action 返回了 promise 用来做提示

```
 // 商品购买（复用）
  buy({ state, commit, getters }) {
    return new Promise((reslove, reject) => {
      // 错误操作
      if (!getters.cartLeng) {
        reject("购物车空空如也");
      } else if (!getters.totalPrice) {
        reject("请选择购商品");
      } else {
        // reslove
        if (
          state.userInfo.balance >= getters.totalPrice &&
          state.userInfo.balance !== 0
        ) {
          commit("BUY", getters.totalPrice);
          reslove("购买成功！");
          // 向mutation提交选中的商品
          commit("DELGOODS", getters.delSel);
        } else {
          reject("余额不足！");
        }
      }
    });
  },

```

在下派的组件内映射 action

```
methods: {
...mapActions(["buy"]),
goBuy() {
clearTimeout("timer");
this.timer = setTimeout(() => {
this.buy()
.then((res) => {
// 购买成功
this.msg = res;
this.toastMixin();
})
.catch((error) => {
// 购买失败
this.msg = error;
this.toastMixin();
});
}, 500);
},
},

```

消息提示则是一个混入代码块（将 toast 封装成混入 mixin 了）

![supermall6.gif](https://i.loli.net/2021/09/26/c65dOChV3rungW2.gif)

拿到购物车在 state 里的数据进行展示

## 运行

1.

```

npm install

```

2.

```

npm run serve

```

## 项目结构

```

|-- .gitignore
|-- .postcssrc.js
|-- babel.config.js
|-- package-lock.json
|-- package.json
|-- README.md
|-- vue.config.js
|-- public
| |-- favicon.ico
| |-- index.html
|-- src
|-- App.vue
|-- main.js
|-- assets
| |-- css
| | |-- base.css
| | |-- normalize.css
| |-- img
| |-- cart
| | |-- tick.svg
| |-- common
| | |-- arrow-left.svg
| | |-- back.svg
| | |-- collect.svg
| | |-- placeholder.png
| | |-- top.png
| |-- detail
| | |-- cart.png
| | |-- detail_bottom.png
| |-- home
| | |-- recommend_bg.jpg
| |-- profile
| | |-- avatar.svg
| | |-- cart.svg
| | |-- message.svg
| | |-- phone.svg
| | |-- pointer.svg
| | |-- shopping.svg
| | |-- vip.svg
| |-- tabbar
| |-- category.svg
| |-- category_active.svg
| |-- home.svg
| |-- home_active.svg
| |-- profile.svg
| |-- profile_active.svg
| |-- shopcart.svg
| |-- shopcart_active.svg
|-- common
| |-- mixin.js
| |-- utils.js
|-- components
| |-- common
| | |-- navbar
| | | |-- NavBar.vue
| | |-- scroll
| | | |-- Scroll.vue
| | |-- tabbar
| | | |-- TabBar.vue
| | | |-- TabBarItem.vue
| | |-- tabControl
| | | |-- TabControl.vue
| | |-- toast
| | |-- Toast.vue
| |-- content
| |-- checkbox
| | |-- checkBtn.vue
| |-- goods
| | |-- GoodsList.vue
| | |-- GoodsListItem.vue
| |-- goTop
| | |-- index.vue
| |-- mainTabbar
| |-- MainTabBar.vue
|-- mock
| |-- index.js
|-- network
| |-- category.js
| |-- detail.js
| |-- home.js
| |-- request.js
|-- router
| |-- index.js
|-- store
| |-- actions.js
| |-- getters.js
| |-- index.js
| |-- mutations.js
|-- views
|-- cart
| |-- Cart.vue
| |-- childCompon
| |-- cartButtonBar.vue
| |-- cartGoodsItem.vue
|-- category
| |-- category.vue
|-- detail
| |-- Detail.vue
| |-- childCompon
| |-- Comment.vue
| |-- DetailBottomBar.vue
| |-- DetailNavBar.vue
| |-- GoodsDetail.vue
| |-- imgDetail.vue
| |-- ParamsDetail.vue
| |-- ShopInfo.vue
|-- home
| |-- Home.vue
| |-- childView
| |-- FeatureView.vue
| |-- RecommendView.vue
|-- profile
|-- Profile.vue
|-- childCompon
|-- login.vue
|-- myGoods.vue


```

```

```
