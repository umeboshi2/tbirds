Backbone = require 'backbone'
navigate_to_url = require 'tbirds/util/navigate-to-url'
jwtDecode = require 'jwt-decode'
BasicPageableCollection = require './basic-pageable-collection'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

setupAuthModels = (appConfig) ->
  tokenKeyName = appConfig.authToken.tokenKeyName or 'auth_token'

  makeAuthHeader = ->
    # retrieve from local storage on each request
    # to ensure current token
    token = localStorage.getItem tokenKeyName
    "#{appConfig.authToken.bearerName} #{token}"
  
  sendAuthHeader = (xhr) ->
    rheader = appConfig.authToken.requestHeader
    aheader = makeAuthHeader()
    console.log "RHEADER", rheader
    console.log "AHEADER", aheader
    xhr.setRequestHeader appConfig.authToken.requestHeader, makeAuthHeader()

  MainChannel.reply 'main:app:authBeforeSend', ->
    sendAuthHeader
  

  auth_sync_options = (options) ->
    options = options || {}
    options.beforeSend = sendAuthHeader
    options

  class AuthModel extends Backbone.Model
    sync: (method, model, options) ->
      options = auth_sync_options options
      super method, model, options

  class AuthCollection extends BasicPageableCollection
    sync: (method, model, options) ->
      options = auth_sync_options options
      super method, model, options

  class AuthUnPaginated extends Backbone.Collection
    sync: (method, model, options) ->
      options = auth_sync_options options
      super method, model, options
    parse: (response) ->
      super response.items
    
  
  MainChannel.reply 'main:app:AuthModel', ->
    AuthModel
  MainChannel.reply 'main:app:AuthCollection', ->
    AuthCollection
  MainChannel.reply 'main:app:AuthUnPaginated', ->
    AuthUnPaginated

  class AuthRefresh extends AuthModel
    url: appConfig.authToken.refreshUrl

  MainChannel.reply 'main:app:AuthRefresh', ->
    AuthRefresh

  MainChannel.reply 'main:app:set-auth-token', (token) ->
    localStorage.setItem tokenKeyName, token

  MainChannel.reply 'main:app:decode-auth-token', ->
    token = localStorage.getItem tokenKeyName
    if token
      jwtDecode token
    else
      {}


  MainChannel.reply 'main:app:refresh-token', (loginUrl) ->
    unless tokenKeyName in Object.keys localStorage
      return
    loginUrl = loginUrl or appConfig.authToken.loginUrl
    refresh = new AuthRefresh
    response = refresh.fetch()
    response.fail ->
      if response.status == 401
        window.location.hash = loginUrl
      else
        msg = 'There was a problem refreshing the access token'
        MessageChannel.request 'warning', msg
    response.done ->
      token = refresh.get 'token'
      decoded = jwtDecode token
      localStorage.setItem tokenKeyName, token
  
  MainChannel.reply 'current-user', ->
    if __DEV__
      console.warn "We need to request 'main:app:decode-auth-token' instead"
    token = MainChannel.request 'main:app:decode-auth-token'
    unless token
      return null
    return new Backbone.Model token
  
  MainChannel.reply 'main:app:destroy-auth-token', ->
    localStorage.removeItem tokenKeyName

  return
  
module.exports = setupAuthModels
  
