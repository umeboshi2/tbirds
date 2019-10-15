path = require 'path'
srcdir = path.join __dirname, './src'

coffeeLoaderTranspileRule =
  test: /\.coffee$/
  loader: 'coffee-loader'
  options:
    transpile:
      presets: ['@babel/env']
      #presets: ['env']
      #plugins: ["dynamic-import-webpack"]
    sourceMap: true

coffeeLoaderBasicRule =
  test: /\.coffee$/
  loader: 'coffee-loader'
  options:
    sourceMap: true
    
module.exports =
  target: 'node'
  mode: 'development'
  module:
    rules: [coffeeLoaderBasicRule]
  resolve:
    extensions: [".wasm", ".mjs", ".js", ".json", ".coffee"]
    alias:
      tbirds: srcdir
      
