const { ncp } = require('ncp')

export function copy(src, dist, callback) {
  ncp(src, dist, callback)
}
