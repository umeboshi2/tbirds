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
  onStop: ->
    console.log "Stopping TkApplet", @.isRunning()
    
      
module.exports = TkApplet
