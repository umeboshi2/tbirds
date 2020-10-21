import { Model, Collection, Radio } from 'backbone'
import jwtDecode from 'jwt-decode'

import BasicPageableCollection from './basic-pageable-collection'

MainChannel = Radio.channel 'global'
MessageChannel = Radio.channel 'messages'

setupAuthModels = (appConfig) ->
  tokenKeyName = appConfig.authToken.tokenKeyName or 'auth_token'

  makeAuthHeader = ->
    # retrieve from local storage on each request
    # to ensure current token
    token = localStorage.getItem tokenKeyName
    return "#{appConfig.authToken.bearerName} #{token}"
  
  sendAuthHeader = (xhr) ->
    xhr.setRequestHeader appConfig.authToken.requestHeader, makeAuthHeader()
    return
    
  MainChannel.reply 'main:app:authBeforeSend', ->
    return sendAuthHeader
  

  auth_sync_options = (options) ->
    options = options || {}
    options.beforeSend = sendAuthHeader
    return options

  class AuthModel extends Model
    sync: (method, model, options) ->
      options = auth_sync_options options
      super method, model, options

  class AuthCollection extends BasicPageableCollection
    sync: (method, model, options) ->
      options = auth_sync_options options
      super method, model, options

  class AuthUnPaginated extends Collection
    sync: (method, model, options) ->
      options = auth_sync_options options
      super method, model, options
    parse: (response) ->
      super response.items
    
  
  MainChannel.reply 'main:app:AuthModel', ->
    return AuthModel
  MainChannel.reply 'main:app:AuthCollection', ->
    return AuthCollection
  MainChannel.reply 'main:app:AuthUnPaginated', ->
    return AuthUnPaginated

  class AuthRefresh extends AuthModel
    url: appConfig.authToken.refreshUrl

  MainChannel.reply 'main:app:AuthRefresh', ->
    return AuthRefresh

  currentUser = new Model
    isGuest: true
    name: 'Guest'
    fullname: 'Guest User'
    groups: []
    
  MainChannel.reply 'main:app:currentUser', ->
    return currentUser
  MainChannel.reply 'main:app:set-guest-user', ->
    currentUser.set
      isGuest: true
      name: 'Guest'
      fullname: 'Guest User'
      groups: []
    return

  MainChannel.reply 'main:app:set-auth-token', (token) ->
    localStorage.setItem tokenKeyName, token
    
  MainChannel.reply 'main:app:decode-auth-token', ->
    token = localStorage.getItem tokenKeyName
    if token
      decoded = jwtDecode token
      isGuest = currentUser.get 'isGuest'
      if isGuest and decoded.uid
        currentUser.set 'isGuest', false
      currentUser.set decoded
      return currentUser.toJSON()
    else
      return {}


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
      return
    response.done ->
      token = refresh.get 'token'
      #decoded = jwtDecode token
      localStorage.setItem tokenKeyName, token
      return
      
  MainChannel.reply 'current-user', ->
    if __DEV__
      console.warn "We need to request 'main:app:decode-auth-token' instead"
    token = MainChannel.request 'main:app:decode-auth-token'
    unless token
      return null
    return new Model token
  
  MainChannel.reply 'main:app:destroy-auth-token', ->
    localStorage.removeItem tokenKeyName
    MainChannel.request 'main:app:set-guest-user'

  return
  
export default setupAuthModels
  
