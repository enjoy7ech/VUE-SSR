import webpack from "webpack"
import webpackConfig from './webpack/webpack.config.js'

function name(dd) {
  console.log(123,dd)
}

async function pack(params) {
  await new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackConfig.stats)) //eslint-disable-line
        let statsJson = stats.toJson()
        if (statsJson.errors && statsJson.errors.length) {
          reject(statsJson.errors)
        } else {
          resolve()
        }
      }
    })
  })
}

export default {name:'pack',func:pack}