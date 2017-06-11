# webpack config resolve.alias
path = require 'path'

# FIXME - this isn't tested
# This is a helper function to generate useful
# resolve aliases for webpack.  The function
# should be called with __dirname from the
# webpack-config/ subdirectory of a project.
make_aliases = (dirname) ->
  nodeModulesPath = path.resolve dirname, '..', 'node_modules'
  phaserbuild = path.resolve nodeModulesPath, 'phaser/build/custom'
  phaser = path.resolve phaserbuild, 'phaser-split.js'
  pixi = path.resolve phaserbuild, 'pixi.js'
  p2 = path.resolve phaserbuild, 'p2.js'
  aliases =
    jquery: 'jquery/src/jquery'
    request: 'browser-request'
    applets: path.join dirname, '../client/applets'
    phaser: phaser
    pixi: pixi
    p2: p2
  return aliases

module.exports = make_aliases

