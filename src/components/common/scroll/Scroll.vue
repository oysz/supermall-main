<template>
  <div class="wrapper1" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入better-scroll插件
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      // 接收BScroll对象
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 返回某个位置
    scrollTo(x, y, time = 500) {
      // 如果能拿到scroll对象，就执行改方法
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 完成加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 解决不能滑动bug
    imgLoad() {
      this.scroll && this.scroll.refresh();
    },

    // 获取当前Y值
    getCurrentY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 0,1不监测滑动的位置
      // 2 检测手指滑动时的位置
      // 3 监视滑动位置，包括手指离开的惯性滑动
      probeType: this.probeType,
      // 上拉加载更多
      pullUpLoad: this.pullUpLoad,
      // 开启div点击
      click: true,
      observeImage: true,
    });
    // 滚动位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scrollPx", position);
      });
    }
    // 上拉加载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style lang='less' scoped>
.content {
  // overflow: hidden;
}
</style>
