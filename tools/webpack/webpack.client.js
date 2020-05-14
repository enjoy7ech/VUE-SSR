const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
const wpSetting = require('./config/webpack.setting')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  output: {
    path: path.join(process.cwd(), wpSetting.default.clientBundlePath),
    publicPath: '/',
    filename: '[name].[chunkhash:8].js'
    // chunkFilename: '[id].chunk.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? miniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: path.join(process.cwd(), 'tools/webpack/config/postcss.config.js')
              },
              plugins: loader => [
                require('postcss-url')(),
                require('autoprefixer'),
                // require('postcss-import')(),
                // require('postcss-cssnext')(),
                require('cssnano')(),
                require('postcss-pxtorem')
              ]
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    // https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery'
    }),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`
    new VueSSRClientPlugin(),
    new miniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的应用程序 /vendor 代码提供了更好的缓存。
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      // //以下是默认配置
      // chunks: 'all',
      // //生成块的最小大小30kb
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // //按需加载时最大并行请求数
      // maxAsyncRequests: 5,
      // //entry point的最大并行请求数
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // name: true,
      cacheGroups: isProd
        ? {
            vendor: {
              name: 'vendor',
              test: function(module) {
                // a module is extracted into the vendor chunk if...
                return (
                  // it's inside node_modules
                  // and not a CSS file (due to mini-css-extract-plugin limitation)
                  /[\\/]node_modules[\\/]/.test(module.context) && !/\.css$/.test(module.request)
                )
              },
              reuseExistingChunk: true,
              enforce: true,
              chunks: 'all'
            }
            // elementUI: {
            //   name: "chunk-elementUI", // 单独将 elementUI 拆包
            //   priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            //   test: /[\\/]node_modules[\\/]element-ui[\\/]/
            // },
          }
        : {
            //dev
          }
    }
  }
})

module.exports = config
