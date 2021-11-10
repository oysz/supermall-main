<template>
  <div>
    <nav-bar class="box">
      <div slot="left" class="left">
        <!-- <router-link to> -->
        <img src="@/assets/img/common/back.svg" @click="goBack" />
        <!-- </router-link> -->
      </div>
      <div slot="center" class="center">
        <div
          class="item"
          v-for="(item, index) in title"
          :key="index"
          :class="{ active: index == currentIndex }"
          @click="tabClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  props: ["title"],
  components: {
    NavBar,
  },

  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      // 点击标题高亮，发射事件
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    goBack() {
      // 返回上一步
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='less' scoped>
.box {
  background-color: var(--color-background);
  height: 50px;
  .left {
    height: 100%;
    text-align: center;
    img {
      height: 50%;
      width: 50%;
    }
  }
  .center {
    display: flex;
    color: var(--color-text);
    .item {
      flex: 1;
      font-size: var(--font-size);
    }
    .active {
      color: var(--color-high-text);
    }
  }
}
</style>
