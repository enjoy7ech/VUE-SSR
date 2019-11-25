const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: isProd ? [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`
    new VueSSRClientPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
    })
  ] : [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
      }),
      new VueSSRClientPlugin(),
    ],
  optimization: {
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的应用程序 /vendor 代码提供了更好的缓存。
    splitChunks: {
      cacheGroups: {
        manifest: {
          name: 'manifest'
        },
        vendor: {
          name: 'vendor',
          test: function (module) {
            // a module is extracted into the vendor chunk if...
            return (
              // it's inside node_modules
              // and not a CSS file (due to extract-text-webpack-plugin limitation)
              /node_modules/.test(module.context) && !/\.css$/.test(module.request)
            )
          }
        }
      }
    }
  }
})

module.exports = config