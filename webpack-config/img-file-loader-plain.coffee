module.exports =
  test: /\.(gif|png|ttf|eot|svg)?$/
  use: [
    {
      loader: 'file-loader'
      options:
        limit: undefined
        name: "[name]-[hash].[ext]"
    }
  ]
