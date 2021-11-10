<template>
  <div class="totast">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: "Totast",
  props: ["msg"],
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.totast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  border-radius: 10px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.583);
  color: #fff;
}
</style>
