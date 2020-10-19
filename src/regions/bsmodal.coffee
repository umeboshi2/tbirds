import $ from 'jquery'
import { Region } from 'backbone.marionette'

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

export default BootstrapModalRegion
