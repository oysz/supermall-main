<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <!-- 底部tabbar -->
    <main-tab-bar />
  </div>
</template>

<script>
// tabbar
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style lang="less">
@import "assets/css/base.css";
body {
  touch-action: none;
}
</style>
