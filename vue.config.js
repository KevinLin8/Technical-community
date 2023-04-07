const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const packageJson = require('./package.json')

const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    name: 'vue Element Admin',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        APP_VERSION: `"${packageJson.version}"`,
        BUILD_DATE: JSON.stringify(new Date().toLocaleString()),
      }),
    ],
    optimization: {
      nodeEnv: false,
    },
  },
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
})
