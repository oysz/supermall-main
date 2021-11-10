<template>
  <div class="detail">
    <!-- 将顶部导航封装进组件 -->
    <DetailNavBar @titleClick="titleClick" ref="nav" :title="title" />
    <scroll class="wrapper" ref="scroll" :probeType="3" @scrollPx="getScrollPx">
      <!-- 轮播 -->
      <swiper
        :options="swiperOption"
        class="swiper"
        ref="mySwiper"
        v-if="banners.length"
      >
        <swiper-slide
          v-for="(img, index) in banners"
          :key="index"
          class="swiper-slider"
        >
          <img :src="img" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 商品基本信息 -->
      <goods-detail :goodsInfo="goodsInfo" />
      <!-- 店铺 -->
      <shop-info :shopInfo="shopInfo" />

      <!-- 图片展示 -->
      <img-detail :detailInfo="detailInfo" @imgLoad="imgLoad" />
      <!-- 商品参数 -->
      <params-detail ref="params" :paramsInfo="paramsInfo" />
      <!-- 用户评价 -->
      <comment ref="comment" :rate="rate" />
      <!-- 推荐商品 -->
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addCart" @buyNow="buyNow" />
    <!-- 返回顶部 （mixin） -->
    <go-top @click.native="backTop" v-show="isShowTop" />
    <!-- 模态框 -->
    <totast v-if="isShowTotast" :msg="msg" />
  </div>
</template>

<script>
// scroll
import Scroll from "@/components/common/scroll/Scroll";

// 轮播
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";

// 子组件
import DetailNavBar from "@/views/detail/childCompon/DetailNavBar";
import GoodsDetail from "@/views/detail/childCompon/GoodsDetail";
import ShopInfo from "@/views/detail/childCompon/ShopInfo";
import ParamsDetail from "@/views/detail/childCompon/ParamsDetail";
import imgDetail from "@/views/detail/childCompon/imgDetail";
import Comment from "@/views/detail/childCompon/Comment";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailBottomBar from "@/views/detail/childCompon/DetailBottomBar";

// 数据请求
import {
  getDetail,
  // getRecommend,
  GoodsInfo,
  shopInfo,
  paramsInfo,
} from "@/network/detail";
import { getHomeGoods } from "@/network/home";
// 防抖
import { debounce } from "@/common/utils";

// ,以及返回顶部混入
import { backTopMixIn, showToast } from "@/common/mixin";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    GoodsDetail,
    ShopInfo,
    ParamsDetail,
    imgDetail,
    Comment,
    GoodsList,
    DetailBottomBar,

    swiper,
    swiperSlide,
  },
  mixins: [backTopMixIn, showToast],
  data() {
    return {
      id: this.$route.query.id,
      // 接收轮播图
      banners: [],

      // 接收整合数据
      goodsInfo: [],
      shopInfo: [],
      paramsInfo: [],

      // 接收数据
      detailInfo: [],
      rate: [],
      recommend: [],

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
      theamTop: [],
      currentIndex: 0,

      // DetailNavBar的数据
      title: ["商品", "参数", "评价", "推荐"],

      // 接收延时器
      timer: null,
    };
  },
  created() {
    this.getDetail(this.id);
  },
  watch: {
    // 在商品页面点击推荐商品后
    "$route.query.id": {
      handler() {
        // 点击了商品详情刷新页面
        this.$router.go(0);
        this.getDetail(this.$route.query.id);
      },
    },
  },
  mounted() {
    // 接收到推荐商品图片后
    // 防抖
    const refresh = debounce(this.$refs.scroll.imgLoad, 100);
    // 事件总线
    this.$bus.$on("detaliImgLoad", () => {
      refresh();
    });

    // 取随机数("首页的数据")给推荐商品
    const typeArr = ["pop", "new"];
    const x = typeArr[Math.floor(Math.random() * 2)];
    const y = Math.ceil(Math.random(10) * 50);
    this.getHomeGoods(x, y);
  },

  methods: {
    ...mapActions(["addCartList", "buy"]),
    // 请求商品数据
    getDetail(iid) {
      getDetail(iid).then(({ data: { result } }) => {
        // 轮播
        this.banners = result.itemInfo.topImages;
        // 将商品进本信息整合进goodsInfo
        this.goodsInfo = new GoodsInfo(
          result.itemInfo,
          result.columns,
          result.shopInfo.services
        );
        // 店铺信息
        this.shopInfo = new shopInfo(result.shopInfo);
        // 参数信息
        this.paramsInfo = new paramsInfo(
          result.itemParams.info,
          result.itemParams.rule
        );

        // 详情图片区
        this.detailInfo = result.detailInfo;
        // 用户评论
        if (result.rate.cRate) {
          // 如果有评价，就传递相关数据
          this.rate = result.rate;
        } else {
          // 没有评价，那就把评价标题也去掉
          this.title = ["商品", "参数", "推荐"];
        }
      });
    },
    // 请求推荐商品(这里请求的是首页数据)
    getHomeGoods(type, page) {
      getHomeGoods(type, page).then(({ data: { data } }) => {
        this.recommend = data.list;
      });
    },
    // 刷新视口高度
    imgLoad() {
      this.$refs.scroll.imgLoad();
      // 点击标题跳转到指定位置
      this.theamTop = [];
      this.theamTop.push(0);
      this.theamTop.push(-this.$refs.params.$el.offsetTop);
      // 如果没有评价就不添加坐标
      if (this.rate.cRate) {
        this.theamTop.push(-this.$refs.comment.$el.offsetTop);
      }
      this.theamTop.push(-this.$refs.recommend.$el.offsetTop);
      //传入最大值，简化判断条件
      this.theamTop.push(-Number.MAX_VALUE);
    },

    // 获取滑动的距离
    getScrollPx({ y }) {
      // 这里是混入方法
      this.showGoTop(y);
      // 滑动标题自动切换
      const length = this.theamTop.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          y <= this.theamTop[i] &&
          y >= this.theamTop[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //点击标题滚动
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.theamTop[index], 100);
    },
    // 将商品添加到购物车
    addCart() {
      clearTimeout(this.timer);
      // 将购物车所需的商品信息整合在product内;
      const product = {};
      product.iid = this.goodsInfo.iid;
      product.img = this.banners[0];
      product.title = this.goodsInfo.title;
      product.price = this.goodsInfo.realPrice;
      product.desc = this.goodsInfo.desc;
      product.shopImg = this.shopInfo.logo;
      product.shopName = this.shopInfo.name;
      // 映射actions//节流
      this.timer = setTimeout(() => {
        this.addCartList(product).then((res) => {
          // 出现模态框
          this.msg = res;
          // 混入方法
          this.toastMixin();
        });
      }, 500);
    },
    // 立刻购买商品
    buyNow() {
      clearTimeout(this.timer);

      // 映射actions//节流
      this.timer = setTimeout(() => {
        // 出现模态框
        this.msg = "请先加商品加入购物车，再进入购物车进行购买操作";
        // 混入方法
        this.toastMixin();
      }, 500);
    },
  },
};
</script>

<style lang='less' scoped>
.detail {
  font-size: var(--font-size);
  background-color: var(--color-background);
  .wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 55px;
    z-index: 1;
    background: var(--color-background);
    .swiper {
      position: relative;
      height: 300px;
      img {
        position: absolute;
        top: -30%;
      }
    }
  }
}
</style>
