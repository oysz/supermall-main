<template>
  <div class="nav-bar">
    <div class="left"><slot name="left" /></div>
    <div class="center"><slot name="center" /></div>
    <div class="right"><slot name="right" /></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  position: fixed;
  font-size: 16px;
  font-weight: 550;
  top: 0;
  left: 0;
  right: 0;
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 2px rgba(100, 100, 100, 0.1);
  background-color: var(--color-tint);
  z-index: 2;
  .left,
  .right {
    width: 60px;
  }
  .center {
    flex: 1;
    text-align: center;
    color: var(--color-background);
  }
}
</style>