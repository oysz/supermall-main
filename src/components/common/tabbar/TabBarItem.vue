<template>
  <div class="tab-bar-item" @click="toItem">
    <div v-show="!isActive">
      <slot name="item-icon" />
    </div>
    <div v-show="isActive">
      <slot v-show="isActive" name="item-icon-active" />
    </div>
    <div :class="{ active: isActive }">
      <slot name="item-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: ["path"],
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
  },
  methods: {
    toItem() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active {
    color: var(--color-tint);
  }
}
</style>