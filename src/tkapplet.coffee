Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'

MainChannel = Backbone.Radio.channel 'global'

class TkApplet extends Toolkit.App
  onBeforeStart: ->
    controller = new @Controller
    controller.applet = @
    @router = new @Router
      controller: controller
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
    #@initExtraRouters()
  onStop: ->
    console.log "Stopping TkApplet", @.isRunning()
  #initExtraRouters: ->
  #  console.log 'initExtraRouters'
    
      
module.exports = TkApplet
