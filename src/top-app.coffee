Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MessagesApp = require './tkmessages'
NavbarApp = require './tknavbar'
  
MainChannel = Backbone.Radio.channel 'global'
class TopApp extends Toolkit.App
  onBeforeStart: ->
    appConfig = @options.appConfig
    # FIXME - test for region class
    @setRegion new Marionette.Region el: appConfig.appRegion
    #console.log "TopApp region set to", @getRegion()
    if appConfig.useMessages
      messagesApp = @addChildApp 'messages',
        AppClass: MessagesApp
        startWithParent: true
        ,
        parentApp: @
    if appConfig.useNavbar
      navbarApp = @addChildApp 'navbar',
        AppClass: NavbarApp
        startWithParent: true
        appConfig: appConfig
        ,
        parentApp: @
        
  initPage: ->
    appConfig = @options.appConfig
    AppLayout = appConfig.layout
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


