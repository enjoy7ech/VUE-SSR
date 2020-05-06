import webpack from 'webpack'
import webpackClientConfig from './webpack/webpack.client.js'
import webpackServerConfig from './webpack/webpack.server.js'
import path from 'path'
import rimraf from 'rimraf'
import { copy } from './utils/fs-utils'

async function build(options) {
  await rimraf.sync(path.join(process.cwd(), 'dist'))

  const clientTask = () =>
    new Promise((resolve, reject) => {
      webpack(webpackClientConfig, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          console.log(stats.toString(webpackClientConfig.stats))
          const statsJson = stats.toJson()
          if (statsJson.errors && statsJson.errors.length) {
            reject(statsJson.errors)
          } else {
            resolve()
          }
        }
      })
    })

  const serverTask = () =>
    new Promise((resolve, reject) => {
      webpack(webpackServerConfig, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          console.log(stats.toString(webpackServerConfig.stats))
          const statsJson = stats.toJson()
          if (statsJson.errors && statsJson.errors.length) {
            reject(statsJson.errors)
          } else {
            resolve()
          }
        }
      })
    })

  if (options && options === 'client') {
    await clientTask()
  }

  if (options && options === 'server') {
    await serverTask()
  }

  if (!options || options === 'all') {
    await clientTask()
    await serverTask()
  }

  //拷贝静态资源
  copy(path.join(process.cwd(), 'server.js'), path.join(process.cwd(), 'dist/server.js'))
  copy(path.join(process.cwd(), 'public/'), path.join(process.cwd(), 'dist/public'))
  //拷贝docker image依赖
  copy(path.join(process.cwd(), 'package.json'), path.join(process.cwd(), 'dist/package.json'))
  copy(path.join(process.cwd(), 'package-lock.json'), path.join(process.cwd(), 'dist/package-lock.json'))
}

export default { name: 'build', func: build }
