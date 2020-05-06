import webpack from 'webpack'
import webpackClientConfig from './webpack/webpack.client.js'
// import webpackServerConfig from './webpack/webpack.server.js'
import rimraf from 'rimraf'
import path from 'path'

async function analyse(params) {
  await rimraf.sync(path.join(process.cwd(), 'dist'))

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  await new Promise((resolve, reject) => {
    webpackClientConfig.plugins.push(new BundleAnalyzerPlugin())
    webpack(webpackClientConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackClientConfig.stats)) //eslint-disable-line
        const statsJson = stats.toJson()
        if (statsJson.errors && statsJson.errors.length) {
          reject(statsJson.errors)
        } else {
          resolve()
        }
      }
    })
  })
}

export default { name: 'analyse', func: analyse }
