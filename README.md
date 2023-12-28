<!--
 * @Author: wy
 * @Date: 2023-12-27 10:55:25
 * @LastEditors: wy
 * @LastEditTime: 2023-12-28 17:04:00
 * @FilePath: /笔记/changeVue2ToVue3/README.md
 * @Description:
-->

## vue2 -> vue3

利用`https://github.com/bailicangdu/vue2-elm`项目改造

使用 node 14.15.4 安装依赖

### 升级 vue 全家桶

```js
   "vue": "^2.1.0",
    "vue-router": "^2.1.1",
    "vuex": "^2.0.0"
```

```js
  "vue": "^3.0.0",
  "vue-router": "^4.0.0-0",
  "vuex": "^4.0.0-0"
```

### @vue/cli-service

帮助启动项目

### vue3 所需依赖

```js
  "@vue/compiler-sfc": "^3.3.13",
  "sass": "^1.69.5",
  "sass-loader": "^13.3.3"
```

### 配置 vue.config.js

```js
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
```

### main.js 修改

```js
import { createApp } from "vue";
import router from "./router/router";
import store from "./store";

import "./config/rem";

import App from "./App.vue";

createApp(App).use(router).use(store).mount("#app");
```

### vuex 配置

```js
import { createStore } from "vuex";
// ...
const store = createStore({
  state,
  getters,
  actions,
  mutations,
});

export default store;
```

### router

```js
import { createRouter, createWebHistory } from "vue-router";
// ...
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

### 性能优化

#### speed-measure-webpack-plugin 构建速度分析

```js
const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin({
  // outputFormat: "humanVerbose",
});

module.exports = {
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
      },
    },
  }),
};
```

#### webpack-bundle-analyzer 构建体积分析

```js
 plugins: [new BundleAnalyzerPlugin()],
```

#### thread-loader 开启多线程

vue-cli 中可以配置`parallel`可以自动开启

#### dll 分包

- 建立一个 webpack.dll.config.js,利用 webpack.DllPlugin 实现分包
  ```js
  const path = require("path");
  const webpack = require("webpack");
  const dllPath = "../dll";
  module.exports = {
    mode: "production",
    entry: {
    vue: ["vue", "vue-router", "vuex"],
    },
    output: {
      path: path.join(**dirname, dllPath),
      filename: "[name].dll.js",
      library: "[name]\_[hash]",
    },
    plugins: [
      // manifest是用于之后排除，打包的
      new webpack.DllPlugin({
        path: path.join(__dirname, dllPath, "[name]-manifest.json"),
        name: "[name]\_[hash]", // 必须和 output.library 一致
        context: process.cwd(),
      }),
    ],
  };
  ```
- 生成 dll 相关文件

```js
 "dll": "webpack --config build/webpack.dll.config.js"
```

会产生 dll 文件夹

```js
├── vue-manifest.json
├── vue.dll.js
└── vue.dll.js.LICENSE.txt
```

- 打包时，`webpack.DllReferencePlugin`排除 dll 分包

  分包完成，打包的时候，分包的文件就不需要把分包文件，打包进入了,通过**manifest**确定要被排除的文件。

  ```js
  // vue.config.js
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: path.resolve(__dirname, "./dll/vue-manifest.json"),
  });
  ```

- index.html 文件引入分包文件
  分包的文件，在最终打包的时候，被排除了，dist 里面，没有这部分的代码，程序运行的时候，会出错，所以需要把分包的文件，导入 html 中

```js
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
// ...
new AddAssetHtmlPlugin({
  filepath: path.resolve(__dirname, "./dll/vue.dll.js"),
});
```

#### webpack 的 cache 开启缓存，加快构建数度

```js
{
  cache: false;
}
```

#### image-webpack-loader 压缩图片

```js
rules: [
  {
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
      {
        loader: "image-webpack-loader",
        options: {
          mozjpeg: {
            progressive: true,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
  },
];
```

#### purgecss-webpack-plugin 删除未使用的 css

```js
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
};

new PurgeCSSPlugin({
  paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
}),
```
