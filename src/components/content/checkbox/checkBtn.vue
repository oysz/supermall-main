<template>
  <div class="check-btn" :class="{ active: isCheck }">
    <img src="~@/assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: "checkBtn",
  props: ["isCheck"],
  // isCheck: {
  //     type: Boolean,
  //     default: false,
  //   },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.check-btn {
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  img {
    padding: 3px;
  }
}
.active {
  background-color: pink;
}
</style>
