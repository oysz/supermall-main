<template>
  <div class="home">
    <!-- 顶部 -->
    <nav-bar>
      <h4 slot="center">购物街</h4>
    </nav-bar>
    <!-- 当滑动到一定位置，出现这个tabcontrol，实现吸顶效果 -->
    <tab-control
      v-show="tabControl.tabIsFixed"
      class="tab-control-top"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    />
    <!-- 调用滑动插件 -->
    <scroll
      class="scrollWrapper"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scrollPx="getScrollPx"
      @pullingUp="loadMore"
    >
      <!-- 轮播 -->
      <swiper
        :options="swiperOption"
        class="swiper"
        ref="mySwiper"
        v-if="banners.length"
      >
        <swiper-slide v-for="(banner, index) in banners" :key="index">
          <img :src="banner.image" :title="banner.title" @load="imgLoad" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 推荐视口 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />

      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <go-top @click.native="backTop" v-show="isShowTop" />
  </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/common/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList";

// api
import { getHomeMultidata, getHomeGoods } from "@/network/home.js";
// view路由组件
import RecommendView from "./childView/RecommendView.vue";
import FeatureView from "./childView/FeatureView.vue";

// swiper
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";

// better scroll插件
import Scroll from "@/components/common/scroll/Scroll.vue";

// 防抖方法
import { debounce } from "@/common/utils";

// 返回顶部混入
import { backTopMixIn } from "@/common/mixin";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,

    RecommendView,
    FeatureView,

    swiper,
    swiperSlide,
    Scroll,
  },
  mixins: [backTopMixIn],
  data() {
    return {
      banners: [],
      recommends: [],
      // swiper配置
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
        },
      },
      // 商品信息
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 点击获取类型
      currentType: "pop",

      // tabControl的相关信息存放
      tabControl: {
        tabOffsetTop: 0,
        imgIsLoad: true,
        tabIsFixed: false,
      },

      // 保存y值
      saveY: 0,
    };
  },

  created() {
    // 获取首页轮播图相关信息
    this.getHomeMultidata();
    // 获取首页推荐
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 拿元素方法，ref等在mounted拿
  mounted() {
    // 解决图片刷新，来不及更新滑动高度bug
    // 防抖
    const refresh = debounce(this.$refs.scroll.imgLoad, 100);
    // 事件总线
    this.$bus.$on("homeItemImgLoad", () => {
      refresh();
    });
  },
  // 获取离开时候滑动的位置
  activated() {
    // 先刷新，不然会有立刻返回顶部bug
    this.$refs.scroll.imgLoad();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  // 保存离开时候滑动的位置
  deactivated() {
    this.saveY = this.$refs.scroll.getCurrentY();
  },

  // 数据计算
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(({ data: { data } }) => {
        this.banners = data.banner.list;
        this.recommends = data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(({ data: { data } }) => {
        this.goods[type].list.push(...data.list);
        this.goods[type].page += 1;
        // 完成上拉加载
        this.$refs.scroll.finishPullUp();
      });
    },

    // 接收tab-control数据
    tabClick(index) {
      const pageY = this.tabControl.tabOffsetTop;
      this.$refs.scroll.scrollTo(0, -pageY);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 同步tabcontrol点击的type
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 获取滚动的px
    getScrollPx({ y }) {
      // 混入，出现返回顶部按钮
      this.showGoTop(y);
      // tabcontrol吸顶效果
      this.tabControl.tabIsFixed =
        Math.abs(y) > this.tabControl.tabOffsetTop ? true : false;
    },

    // 上拉加载
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 当轮播图加载完，拿tabcontrol的offsetTop值
    imgLoad() {
      // 只调用一次图片加载完
      if (this.tabControl.imgIsLoad) {
        this.tabControl.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.tabControl.imgIsLoad = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  font-size: var(--font-size);
  .tab-control-top {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }
  .scrollWrapper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
}
</style>
