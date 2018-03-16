import $ from 'jquery'
import Marionette from 'backbone.marionette'

class SlideDownRegion extends Marionette.Region
  attachHtml: (view) ->
    speed = if @slide_speed then @slide_speed else 'fast'
    @$el.hide()
    @$el.html view.el
    @$el.slideDown speed

export default SlideDownRegion
