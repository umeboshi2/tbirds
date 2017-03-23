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

class BootstrapModalRegion extends Backbone.Marionette.Region
  el: '#modal'
  backdrop: false
  
  getEl: (selector) ->
    $el = $ selector
    $el.attr 'class', 'modal'
    #$el.attr 'class', 'modal fade'
    $el
    
  show: (view) ->
    super view
    @$el.modal
      backdrop: @backdrop
    @$el.modal 'show'
      
show_modal = (view, backdrop=false) ->
  modal_region = MainChannel.request 'main:app:get-region', 'modal'
  modal_region.backdrop = backdrop
  modal_region.show view

MainChannel.reply 'main:app:show-modal', (view, options) ->
  modal_region = MainChannel.request 'main:app:get-region', 'modal'
  modal_region.backdrop = !!options?.backdrop
  modal_region.show view
  

module.exports = BootstrapModalRegion
