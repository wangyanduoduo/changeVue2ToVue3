/*
 * @Author: wy
 * @Date: 2023-12-27 14:12:39
 * @LastEditors: wy
 * @LastEditTime: 2023-12-28 17:01:44
 * @FilePath: /笔记/changeVue2ToVue3/vue.config.js
 * @Description:
 */
const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
};

const disable = true;

const smp = new SpeedMeasurePlugin({
  disable,
  outputFormat: "humanVerbose",
});

module.exports = {
  publicPath: "./",
  configureWebpack: smp.wrap({
    resolve: {
      alias: {
        // vue$: "vue/dist/vue.common.js",
        src: path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
      },
    },
    plugins: [
      new BundleAnalyzerPlugin({
        disabled: disable,
      }),
      // 指出不需要打包的分包文件
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: path.resolve(__dirname, "./dll/vue-manifest.json"),
      }),
      // dll 把一些文件从打包中去除了，但是html中还是需要引入的
      // 这样在打包之后的html文件中，会主动引入vue.dll.js
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, "./dll/vue.dll.js"),
      }),

      new PurgeCSSPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
    ],
    module: {
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

                webp: {
                  quality: 75,
                },
              },
            },
          ],
        },
      ],
    },
  }),
};
