import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
// 安装插件
Vue.use(Vuex);

const state = {
  //   购物车列表
  cartList: JSON.parse(sessionStorage.getItem("cartList")) || [],
  // 用户信息
  userInfo: {
    balance: Number(sessionStorage.getItem("balance")) || 0,
    discount: 0,
    point: 0,
  },
  // 已购商品
  myGoods: JSON.parse(sessionStorage.getItem("myGoods")) || [],
};
// 创建store对象
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
// 挂载到vue实例

export default store;
