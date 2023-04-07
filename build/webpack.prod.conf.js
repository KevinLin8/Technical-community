const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
  ],
})

module.exports = webpackConfig
