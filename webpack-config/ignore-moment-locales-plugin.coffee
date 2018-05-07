webpack = require 'webpack'

module.exports = (options) ->
  # This is to ignore moment locales with fullcalendar
  # https://github.com/moment/moment/issues/2416#issuecomment-111713308
  return new webpack.IgnorePlugin /^\.\/locale$/, /moment$/
