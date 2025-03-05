const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("@vant/auto-import-resolver");
const ComponentsPlugin = require("unplugin-vue-components/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  // 禁用 ESLint
  lintOnSave: false,
  devServer: {
    allowedHosts: "all",
    port: 3000,
    open: true,
    proxy: {
      "^/api": {
        target: process.env.VUE_APP_API_URL || "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    devtool: "source-map",
  },
  productionSourceMap: true,
  css: {
    sourceMap: true,
  },
  chainWebpack: (config) => {
    config.optimization.minimize(false);
  },
});
