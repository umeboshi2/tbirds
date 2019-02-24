import $ from 'jquery'
import { Region } from 'backbone.marionette'

class SlideDownRegion extends Region
  attachHtml: (view) ->
    speed = if @slide_speed then @slide_speed else 'fast'
    @$el.hide()
    @$el.html view.el
    @$el.slideDown speed

export default SlideDownRegion
