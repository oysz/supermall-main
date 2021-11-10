// 公共代码
import goTop from "@/components/content/goTop";
import totast from "@/components/common/toast/Toast.vue";

export const backTopMixIn = {
  components: {
    goTop,
  },
  data() {
    return {
      // 是否显示返回顶部
      isShowTop: false,
    };
  },
  methods: {
    // 返回顶部
    backTop() {
      // 调用scroll里封装的方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    showGoTop(y) {
      // 当滑动到一定位置出现返回顶部

      this.isShowTop = y < -1000 ? true : false;
    },
  },
};
export const goDetail = {
  methods: {
    // 点击商品跳转详情页
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        query: { id },
      });
    },
  },
};
export const showToast = {
  components: {
    totast,
  },
  data() {
    return {
      // 模态框消息
      msg: "",
      // 是否显示模态框
      isShowTotast: false,
    };
  },
  methods: {
    toastMixin() {
      this.isShowTotast = true;
      setTimeout(() => {
        this.isShowTotast = false;
      }, 3000);
    },
  },
};
