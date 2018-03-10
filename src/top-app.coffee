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
TopApp = Toolkit.App.extend
  StateModel: TkAppState
  options:
    appConfig: {}
  onBeforeStart: ->
    MainChannel.reply 'main:app:object', =>
      @
    MainChannel.reply 'main:app:config', =>
      @getOption 'appConfig'
    cfg = @getOption 'appConfig'
    # FIXME - test for region class
    @setRegion new Marionette.Region el: cfg?.appRegion or 'body'
    # setup messages
    useMessages = true
    if cfg.useMessages? and cfg.useMessages is false
      useMessages = false
    if useMessages
      messagesApp = @addChildApp 'messages',
        AppClass: MessagesApp
        startWithParent: true
        ,
        parentApp: @
    # setup navbar
    useNavbar = true
    if cfg.useNavbar? and cfg.useNavbar is false
      useNavbar = false
    if useNavbar
      navbarApp = @addChildApp 'navbar',
        AppClass: NavbarApp
        startWithParent: true
        appConfig: cfg
        ,
        parentApp: @
        
  initPage: ->
    cfg = @options.appConfig
    AppLayout = cfg?.layout or MainPageLayout
    layoutOpts = cfg.layoutOptions
    layout = new AppLayout cfg.layoutOptions
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


