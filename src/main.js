import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

// px转rem
// import "lib-flexible";

Vue.config.productionTip = false;

// 解决移动端300ms延迟
FastClick.attach(document.body);
// 使用懒加载插件,并且设置加载中的占位图片
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/placeholder.png"),
});

new Vue({
  // 设置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
