<!--
 * @Author: wy
 * @Date: 2023-12-27 10:55:25
 * @LastEditors: wy
 * @LastEditTime: 2023-12-27 15:53:53
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
