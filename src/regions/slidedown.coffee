$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'


class SlideDownRegion extends Backbone.Marionette.Region
  attachHtml: (view) ->
    speed = if @slide_speed then @slide_speed else 'fast'
    @$el.hide()
    @$el.html view.el
    @$el.slideDown speed

module.exports = SlideDownRegion
