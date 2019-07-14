import $ from 'jquery'
import { Region } from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

class BootstrapModalRegion extends Region
  el: '#modal'
  backdrop: false
  keyboard: false
  
  getEl: (selector) ->
    $el = $ selector
    $el.attr 'class', 'modal'
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
  modal_region = layout.getRegion 'modal'
  modal_region.backdrop = !!options?.backdrop
  modal_region.show view
  
export default BootstrapModalRegion
