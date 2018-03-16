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
    
    
class NavbarHeaderView extends Marionette.View
  template: tc.renderable (model) ->
    tc.a '.navbar-brand', href:model.url, model.label
    tc.span '.toggle-button'
  regions:
    toggle: '.toggle-button'
  ui:
    brand: '.navbar-brand'
  triggers:
    'click @ui.brand': 'click:brand'
  onRender: ->
    tview = new NavbarToggleButton
    @showChildView 'toggle', tview
    
    
export default NavbarHeaderView



