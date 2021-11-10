<template>
  <div class="goTop">
    <img src="@/assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.goTop {
  position: fixed;
  z-index: 999;
  bottom: 100px;
  right: 20px;
  width: 60px;
}
</style>
