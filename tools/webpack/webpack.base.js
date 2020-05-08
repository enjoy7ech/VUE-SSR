const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: isProd ? false : 'cheap-module-source-map',
  resolve: {
    alias: {
      public: path.join(process.cwd(), 'public'),
      '@': path.join(process.cwd(), 'src'),
      '@data': path.join(process.cwd(), 'src/data')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // hotReload: false,
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
          happyPackMode: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: 'image/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[\s\S])?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [new VueLoaderPlugin(), new webpack.optimize.ModuleConcatenationPlugin()]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
        new webpack.NamedModulesPlugin() // HMR shows correct file names in console on update.
      ]
}
