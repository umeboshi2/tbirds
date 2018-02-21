Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
ms = require 'ms'

objectEmpty = require './util/object-empty'


MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

msRemaining = (token) ->
  now = new Date()
  exp = new Date(token.exp * 1000)
  return exp - now

accessTimeRemaining = ->
  token = MainChannel.request 'main:app:decode-auth-token'
  if objectEmpty token
    return 0
  remaining = msRemaining token
  return Math.floor(remaining / 1000)

tokenNeedsRefresh = (token, options) ->
  options = options or {}
  remaining = msRemaining token
  interval = ms '5m'
  if 'refreshInterval' in Object.keys options
    interval = ms options.refreshInterval
  multiple = options.refreshIntervalMultiple or 3
  accessPeriod = 1000 * (token.exp - token.iat)
  refreshWhen = accessPeriod - (multiple * interval)
  return remaining < refreshWhen
  
  
keepTokenFresh = (options) ->
  options = options or {}
  token = MainChannel.request 'main:app:decode-auth-token'
  if tokenNeedsRefresh token, options
    MainChannel.request 'main:app:refresh-token', options.loginUrl

initToken = ->
  remaining = accessTimeRemaining()
  token = MainChannel.request 'main:app:decode-auth-token'
  if remaining <= 0 and not objectEmpty token
    MessageChannel.request 'warning', 'deleting expired access token'
    MainChannel.request 'main:app:destroy-auth-token'
  token

# setupAuthModels(appConfig) needs to be called
# before calling this function.
# ex: "require('./authmodels')(appConfig)"
startUserApp = (app, appConfig) ->
  token = initToken()
  if objectEmpty token
    app.start
      state:
        currentUser: null
  else if tokenNeedsRefresh token, appConfig.authToken
    AuthRefresh = MainChannel.request 'main:app:AuthRefresh'
    refresh = new AuthRefresh
    response = refresh.fetch()
    response.fail ->
      if response.status == 401
        MainChannel.request 'main:app:destroy-auth-token'
        if appConfig.needLogin
          loginUrl = appConfig.authToken.loginUrl or "#frontdoor/login"
          window.location.hash = loginUrl
      app.start
        state:
          currentUser: null
    response.done ->
      property = appConfig.authToken.tokenResponseProperty or 'token' 
      token = refresh.get property
      MainChannel.request 'main:app:set-auth-token', token
      # start the app
      app.start
        state:
          currentUser: MainChannel.request 'main:app:decode-auth-token'
  else
    # start the app
    app.start
      state:
        currentUser: token
      
       
  
module.exports =
  accessTimeRemaining: accessTimeRemaining
  keepTokenFresh: keepTokenFresh
  startUserApp: startUserApp
