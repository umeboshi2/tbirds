Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'

MainChannel = Backbone.Radio.channel 'global'

class TkApplet extends Toolkit.App
  onBeforeStart: ->
    controller = new @Controller
    controller.applet = @
    @router = new @Router
      controller: controller

  onStop: ->
    console.log "Stopping TkApplet", @.isRunning()
    
      
module.exports = TkApplet
