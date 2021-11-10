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
