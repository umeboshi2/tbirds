BuildEnvironment = process.env.NODE_ENV or 'development'

scssLoaderRule =
  test: /\.scss$/
  use: [
    {
      loader: 'style-loader'
    },{
      loader: 'css-loader'
    },{
      loader: 'sass-loader'
      options:
        includePaths: [
          'node_modules/compass-mixins/lib'
          'node_modules/bootstrap/scss'
          ]
    }
  ]

export default scssLoaderRule
