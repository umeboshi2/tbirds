import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import Toolkit from 'marionette.toolkit'
import tc from 'teacup'

import MessagesApp from './tkmessages'
import NavbarApp from './tknavbar'
import MainPageLayout from './tklayout'

if __useCssModules__
  require "../sass/tklayout.scss"

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
    console.warn "onBeforeStart"
    MainChannel.reply 'main:app:object', =>
      @
    MainChannel.reply 'main:app:config', =>
      @getOption 'appConfig'
    cfg = @getOption 'appConfig'
    # build main page layout
    @initPage()
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
    # FIXME - test for region class
    @setRegion new Marionette.Region el: cfg?.appRegion or 'body'
    @showView layout

  onStart: ->
    if @getState 'startHistory'
      # FIXME we need something better
      # we seem to be required to, at minimum, load
      # the frontdoor and handle the "empty" route
      c = MainChannel.request 'main-controller'
      c.loadFrontDoor()
      
export default TopApp


