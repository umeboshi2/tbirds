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

  empty: ->
    @$el.modal 'hide'
    super()
    

getModalRegion = ->
  app = MainChannel.request 'main:app:object'
  layout = app.getView()
  return layout.getRegion 'modal'
  

MainChannel.reply 'main:app:modal-region', ->
  return getModalRegion()
  
MainChannel.reply 'main:app:show-modal', (view, options) ->
  region = getModalRegion()
  region.backdrop = !!options?.backdrop
  region.show view
  return
  
MainChannel.reply 'main:app:empty-modal', ->
  region = getModalRegion()
  region.empty()
  return
  
  
export default BootstrapModalRegion
