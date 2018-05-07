FaviconPlugin = require 'favicons-webpack-plugin'

module.exports = (options) ->
  if not options.logo
    throw new Error "options need logo property"
  options.statsFilename = options.statsFilename or 'favicon-stats.json'
  options.emitStats = true
  icons =
    android: false
    appleIcon: false
    appleStartup: false
    favicons: true
    # https://github.com/jantimon/favicons-webpack-plugin/issues/103
    opengraph: false
    twitter: false
    yandex: false
    windows: false
  options.icons = options.icons or icons
  return new FaviconPlugin options
