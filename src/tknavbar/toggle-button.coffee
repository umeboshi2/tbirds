import $ from 'jquery'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import tc from 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

  
class NavbarToggleButton extends Marionette.View
  tagName: 'button'
  className: 'navbar-toggler'
  attributes:
    type: 'button'
    'data-toggle': 'collapse'
    'data-target': '#navbar-view-collapse'
    'aria-controls': 'navbar-view-collapse'
    'aria-expanded': 'false'
    'aria-label': 'Toggle navigation'
  template: tc.renderable ->
    tc.span '.navbar-toggler-icon'
  onRender: ->
    console.log "Rhissdfsf"
  events:
    click: 'toggleClicked'
  toggleClicked: ->
    target = $ @attributes['data-target']
    target.toggle()
    
export default NavbarToggleButton


