$ = require 'jquery'
Marionette = require 'backbone.marionette'

class SlideDownRegion extends Marionette.Region
  attachHtml: (view) ->
    speed = if @slide_speed then @slide_speed else 'fast'
    @$el.hide()
    @$el.html view.el
    @$el.slideDown speed

module.exports = SlideDownRegion
