import Mock from "mockjs";

const { banner } = Mock.mock({
  "banner|5": [
    {
      id: "@increment",
      title: "@ctitle",
      image: "@image('200x100', '#894FC4', '#FFF', 'png', '模拟的png图片')",
      link: "@url",
    },
  ],
  //   "recommend|5": [
  //     {
  //       title: "@ctitle",
  //       image: "@image('200x100', '#894FC4', '#FFF', 'png', '模拟的png图片')",
  //       link: "@url",
  //     },
  //   ],
});

Mock.mock("/mock/home", "get", () => {
  return {
    status: 200,
    msg: "获取数据成功",
    banner,
    // recommend,
  };
});
