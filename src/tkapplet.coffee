import { Radio } from 'backbone'
import { App } from 'marionette.toolkit'

NavbarChannel = Radio.channel 'navbar'

class TkApplet extends App
  setupAppletEntries: ->
    entries = NavbarChannel.request 'get-entries', 'applet'
    entries.reset()
    if @appletEntries
      entries.set @appletEntries
    viewEntries = NavbarChannel.request 'get-entries', 'view'
    viewEntries.reset()
  onBeforeStart: ->
    @setupAppletEntries()
    controller = new @Controller
      channelName: @getChannel().channelName
    controller.applet = @
    @router = new @Router
      controller: controller
      channelName: @getChannel().channelName
    if @?.appRoutes
      appRoutes = @appRoutes?() or @appRoutes
      Object.keys(appRoutes).forEach (r) =>
        @router.appRoute r, appRoutes[r]
    # we want to adjust the approuter for frontdoor
    # use here, instead of in the AppRouter class,
    # so hopefully, only one applet handles the "empty route.
    if @options?.isFrontdoorApplet
      method = @options.appConfig?.startFrontdoorMethod or 'start'
      unless '' in Object.keys @router.appRoutes
        if __DEV__
          console.warn "Adding start to TkApplet"
        @router.appRoute '', method
    @_extraRouters = {}
    @initExtraRouters()
    @getChannel().reply 'get-applet', =>
      return @
  onStop: ->
    if __DEV__
      console.log "Stopping TkApplet", @.isRunning()
  setExtraRouter: (name, routerClass, controllerClass) ->
    c = new controllerClass
    r = new routerClass
      controller: c
    @_extraRouters[name] = r
  initExtraRouters: ->
    extraRouters = @getOption 'extraRouters'
    for rtr of extraRouters
      ropts = extraRouters[rtr]
      @setExtraRouter rtr, ropts['router'], ropts['controller']
      if __DEV__
        console.log "extra router #{rtr} created"
        console.log "rtr", rtr, ropts
  getExtraRouter: (name) ->
    return @_extraRouters[name]
  getController: ->
    return @router.controller
    
      
export default TkApplet

