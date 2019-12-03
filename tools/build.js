import webpack from "webpack"
import webpackClientConfig from './webpack/webpack.client.js'
import webpackServerConfig from './webpack/webpack.server.js'
import path from 'path'
import rimraf from 'rimraf'

async function build(params) { 
  await rimraf.sync(path.join(process.cwd(), 'dist'))

  let clientTask = () => new Promise((resolve, reject) => {
    webpack(webpackClientConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackClientConfig.stats))
        let statsJson = stats.toJson()
        if (statsJson.errors && statsJson.errors.length) {
          reject(statsJson.errors)
        } else {
          resolve()
        }
      }
    })
  })

  let serverTask = () => new Promise((resolve, reject) => {
    webpack(webpackServerConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackServerConfig.stats))
        let statsJson = stats.toJson()
        if (statsJson.errors && statsJson.errors.length) {
          reject(statsJson.errors)
        } else {
          resolve()
        }
      }
    })
  })
  
  if(process.argv[3] && process.argv[3]==='client'){
    await clientTask()
  }
    
  if(process.argv[3] && process.argv[3]==='server'){
    await serverTask()
  }

  if(!process.argv[3] || process.argv[3]==='all'){
    await clientTask()
    await serverTask()
  }
}

export default {name:'build',func:build}