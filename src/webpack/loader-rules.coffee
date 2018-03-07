# webpack config module.loaders
module.exports =
  [
    {
      test: /\.coffee$/
      use:
        loader: 'coffee-loader'
    }
    {
      test: /\.css$/
      use:
        loader: 'style-loader!css-loader'
    }
    {
      test: /\.(gif|png|eot|ttf)?$/
      use:
        loader: 'url-loader'
    }
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?[\&0-9]+)?$/
      use:
        loader: 'url-loader'
    }
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
      use:
        loader: 'url-loader'
    }
    {
      test: /jquery\/src\/selector\.js$/
      use:
        loader: 'amd-define-factory-patcher-loader'
    }
    {
      test: /jquery-ui\/ui\/selector\.js$/
      use:
        loader: 'amd-define-factory-patcher-loader'
    }
    {
      test: /pixi\.js/
      use:
        loader: 'expose?PIXI'
    }
    {
      test: /phaser-split\.js$/
      use:
        loader: 'expose?Phaser'
    }
    {
      test: /p2\.js/
      use:
        loader: 'expose?p2'
    }
    {
      test: /masonry-layout/,
      use:
        loader: 'imports-loader?define=>false&this=>window'
    }
  ]
