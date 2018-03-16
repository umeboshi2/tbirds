import $ from 'jquery'
import Marionette from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

class BootstrapModalRegion extends Marionette.Region
  el: '#modal'
  backdrop: false
  keyboard: false
  
  getEl: (selector) ->
    $el = $ selector
    $el.attr 'class', 'modal'
    #$el.attr 'class', 'modal fade'
    $el
    
  show: (view) ->
    super view
    @$el.modal
      backdrop: @backdrop
      keyboard: @keyboard
    @$el.modal 'show'
      
MainChannel.reply 'main:app:show-modal', (view, options) ->
  app = MainChannel.request 'main:app:object'
  layout = app.getView()
  modal_region = layout.regions.modal
  #modal_region = MainChannel.request 'main:app:get-region', 'modal'
  modal_region.backdrop = !!options?.backdrop
  modal_region.show view
  
export default BootstrapModalRegion
