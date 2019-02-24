import Backbone from 'backbone'
import { Region } from 'backbone.marionette'
import tc from 'teacup'

import RootApp from './root-app'
import MessagesApp from './tkmessages'
import NavbarApp from './tknavbar'

MainChannel = Backbone.Radio.channel 'global'

createMainApp = (cfg) ->
  rootEl = cfg?.appRegion or 'body'
  rootRegion = new Region el: rootEl
  mainApp = new RootApp
    appConfig: cfg
    region: rootRegion
  MainChannel.reply 'main:app:object', ->
    return mainApp
  MainChannel.reply 'main:app:config', ->
    return cfg
  layout = mainApp.getView()
  # setup messages
  useMessages = true
  if cfg.useMessages? and cfg.useMessages is false
    useMessages = false
  if useMessages
    msgApp = mainApp.addChildApp 'messages', MessagesApp,
      region: layout.getRegion 'messages'
      appConfig: cfg
      parentApp: mainApp
  # setup navbar
  useNavbar = true
  if cfg.useNavbar? and cfg.useNavbar is false
    useNavbar = false
  if useNavbar
    nbApp = mainApp.addChildApp 'navbar', NavbarApp,
      region: layout.getRegion 'navbar'
      startWithParent: true
      appConfig: cfg
      parentApp: mainApp
    if cfg.hasUser
      nbview = nbApp.getView()
      options =
        region: nbview.getRegion 'userEntries'
        startWithParent: true
        appConfig: cfg
        parentApp: nbApp
        user: MainChannel.request "main:app:decode-auth-token"
      userMenuApp = nbApp.addChildApp 'user-menu', cfg.userMenuApp, options
  return mainApp

export default createMainApp

    
    
