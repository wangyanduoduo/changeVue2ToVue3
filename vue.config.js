/*
 * @Author: wy
 * @Date: 2023-12-27 14:12:39
 * @LastEditors: wy
 * @LastEditTime: 2023-12-27 14:13:58
 * @FilePath: /笔记/changeVue2ToVue3/vue.config.js
 * @Description:
 */
const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // vue$: "vue/dist/vue.common.js",
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
      },
    },
  },
};
