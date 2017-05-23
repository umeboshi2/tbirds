Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MessagesApp = require './tkmessages'
NavbarApp = require './tknavbar'
MainPageLayout = require './tklayout'

MainChannel = Backbone.Radio.channel 'global'

class TkAppState extends Backbone.Model
  defaults:
    startHistory: true
    appConfig: {}
    
MainChannel = Backbone.Radio.channel 'global'
class TopApp extends Toolkit.App
  StateModel: TkAppState
  options:
    appConfig: {}
  onBeforeStart: ->
    appConfig = @options.appConfig
    MainChannel.reply 'main:app:object', =>
      @
    MainChannel.reply 'main:app:config', ->
      appConfig
    # FIXME - test for region class
    @setRegion new Marionette.Region el: appConfig?.appRegion or 'body'
    # setup messages
    useMessages = true
    if appConfig.useMessages? and appConfig.useMessages is false
      useMessages = false
    if useMessages
      messagesApp = @addChildApp 'messages',
        AppClass: MessagesApp
        startWithParent: true
        ,
        parentApp: @
    # setup navbar
    useNavbar = true
    if appConfig.useNavbar? and appConfig.useNavbar is false
      useNavbar = false
    if useNavbar
      navbarApp = @addChildApp 'navbar',
        AppClass: NavbarApp
        startWithParent: true
        appConfig: appConfig
        ,
        parentApp: @
        
  initPage: ->
    appConfig = @options.appConfig
    AppLayout = appConfig?.layout or MainPageLayout
    layoutOpts = appConfig.layoutOptions
    layout = new AppLayout appConfig.layoutOptions
    @showView layout

  onStart: ->
    # build main page layout
    @initPage()
    if @getState 'startHistory'
      # FIXME we need something better
      # we seem to be required to, at minimum, load
      # the frontdoor and handle the "empty" route
      c = MainChannel.request 'main-controller'
      c.loadFrontDoor()
      
module.exports = TopApp


