<template>
  <div class="wrapper">
    <nav-bar>
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="cateBox">
      <div class="cateType">
        <ul>
          <li
            :class="{ active: nowIndex == index }"
            v-for="(item, index) in typeList"
            :key="index"
            @click="typeClick(index, item.maitKey, item.miniWallkey)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="cateGoods" ref="cateGoods">
        <div class="goods-type">
          <div
            class="goods-type-item"
            v-for="(item, index) in subCateList"
            :key="index"
          >
            <img :src="item.image" alt="" />
            <span class="small">{{ item.title }}</span>
          </div>
        </div>
        <GoodsList :goods="goodList" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";
import NavBar from "@/components/common/navbar/NavBar.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
export default {
  name: "category",
  components: { NavBar, GoodsList },
  data() {
    return {
      typeList: [],
      nowIndex: 0,
      subCateList: [],
      goodList: [],
    };
  },
  mounted() {
    getCategory().then(
      ({
        data: {
          data: { category },
        },
      }) => {
        this.typeList = category.list;
        // 首次进入页面获取商品类型中的分类
        this.getSubcategory(this.typeList[this.nowIndex].maitKey);

        // 类型分类中商品
        this.getCategoryDetail(this.typeList[this.nowIndex].miniWallkey);
      }
    );
  },

  methods: {
    typeClick(index, key, miniWallkey) {
      // 点击了各个type获取分类中商品的类型
      this.nowIndex = index;
      this.getSubcategory(key);
      this.getCategoryDetail(miniWallkey);
      // 点击每一个类型分类视图中返回顶部
      this.$refs.cateGoods.scrollTop = 0;
    },

    // 调用获取类型中的分类
    getSubcategory(key) {
      getSubcategory(key).then(({ data: { data } }) => {
        this.subCateList = data.list;
        console.log(data);
      });
    },

    // 获取类型分类中各个商品
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then(({ data }) => {
        this.goodList = data;
      });
    },
  },
};
</script>

<style lang='less' scoped>
.wrapper {
  height: 100vh;
  .cateBox {
    display: flex;
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
    .cateType {
      flex: 4;
      text-align: center;
      font-size: 16px;
      background-color: rgb(247, 245, 247);
      color: rgb(119, 119, 119);
      overflow: auto;
      li {
        padding: 15px;
      }
      .active {
        font-weight: 550;
        background-color: #fff;
        border-left: 5px solid var(--color-high-text);
        color: var(--color-high-text);
      }
    }
    .cateGoods {
      flex: 8;
      overflow: auto;
      text-align: center;
      .goods-type {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        border-bottom: 5px solid #ccc;
        .goods-type-item {
          margin-top: 10px;
          width: 30%;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
