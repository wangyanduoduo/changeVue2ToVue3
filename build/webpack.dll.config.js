/*
 * @Author: wy
 * @Date: 2023-12-28 15:00:38
 * @LastEditors: wy
 * @LastEditTime: 2023-12-28 15:10:28
 * @FilePath: /笔记/changeVue2ToVue3/build/webpack.dll.config.js
 * @Description:
 */
const path = require("path");
const webpack = require("webpack");

const dllPath = "../dll";
module.exports = {
  mode: "production",
  entry: {
    vue: ["vue", "vue-router", "vuex"],
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    library: "[name]_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      name: "[name]_[hash]", // 必须和output.library一致
      context: process.cwd(),
    }),
  ],
};
