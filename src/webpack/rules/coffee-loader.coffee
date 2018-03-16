BuildEnvironment = process.env.NODE_ENV or 'development'

coffeeLoaderRule =
  test: /\.coffee$/
  use: ['coffee-loader']
if BuildEnvironment is 'development'
  coffeeLoaderRule.parser =
    system: true

export default coffeeLoaderRule
