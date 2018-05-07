StatsPlugin = require 'stats-webpack-plugin'

module.exports = -> new StatsPlugin 'entrypoints.json',
  assets: false
  cached: false
  cachedAssets: false
  children: false
  chunks: false
  chunkModules: false
  chunkOrigins: false
  entrypoints: true
  modules: false
  reasons: false
  source: false
