const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const wpSetting = require('./config/webpack.setting')

module.exports = merge(base, {
  mode: 'production',
  target: 'node',
  entry: './server.js',
  output: {
    path: path.join(process.cwd(), wpSetting.default.serverSetupPath),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals(),
  module: {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})
