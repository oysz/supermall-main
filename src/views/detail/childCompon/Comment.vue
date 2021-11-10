<template>
  <div class="comment" v-if="rate.list">
    <section class="top">
      <span>用户评价</span>
      <span>更多({{ rate.cRate }})</span>
    </section>
    <section class="userComment">
      <div class="userInfo">
        <img :src="rate.list[0].user.avatar" alt="" />
        <span class="userName">{{ rate.list[0].user.uname }}</span>
      </div>
      <div class="commentInfo">
        <p>
          {{ rate.list[0].content }}
        </p>
        <p class="explain" v-if="rate.list[0].explain">
          {{ rate.list[0].explain }}
        </p>
        <p class="small">
          <span>{{ timeFormat(rate.list[0].created, "yyyy-mm-dd") }}</span>
          <span>{{ rate.list[0].style }}</span>
        </p>
      </div>
      <div class="commentImg" v-if="rate.list[0].images">
        <div v-for="(img, index) in rate.list[0].images" :key="index">
          <img :src="img" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["rate"],
  data() {
    return {};
  },
  mounted() {},
  computed: {
    // 时间格式
    timeFormat() {
      return function (val, str) {
        const dt = new Date(val * 1000);
        const year = (dt.getFullYear() + "").padStart(2, "0");
        const month = (dt.getMonth() + 1 + "").padStart(2, "0");
        const date = (dt.getDate() + "").padStart(2, "0");
        const hours = (dt.getHours() + "").padStart(2, "0");
        const minutes = (dt.getMinutes() + "").padStart(2, "0");
        const seconds = (dt.getSeconds() + "").padStart(2, "0");
        if (str == "yyyy-mm-dd") {
          return `${year}-${month}-${date}`;
        } else {
          return `${year}-${month}-${date}-${hours}:${minutes}:${seconds}`;
        }
      };
    },
  },
  methods: {},
};
</script>

<style lang='less' scoped>
.comment {
  padding: 10px;
  border-bottom: 3px solid #ccc;
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    span {
      font-weight: 550;
    }
  }
  .userComment {
    .userInfo {
      padding: 10px 0;
      img {
        width: 40px;
        border-radius: 100%;
      }
      .userName {
        font-size: 16px;
        margin-left: 5px;
      }
    }
    .commentInfo {
      p.explain {
        margin-top: 10px;
        padding: 10px;
        background-color: #ff819862;
        border-radius: 10px;
      }
      p.small {
        padding: 10px 0;
        span {
          margin-right: 10px;
        }
      }
    }
    .commentImg {
      display: flex;
      margin-bottom: 20px;
      img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }
}
</style>
