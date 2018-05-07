module.exports =
  test: /\.(git|png|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/
  use: [
    {
      loader: 'file-loader'
      options:
        limit: undefined
        name: "[name]-[hash].[ext]"
    }
  ]
