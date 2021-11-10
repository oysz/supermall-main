module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 19.2, // 75表示750设计稿，37.5表示375设计稿
      propList: ["*"],
    },
  },
};
