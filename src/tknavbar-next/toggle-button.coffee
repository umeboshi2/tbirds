import $ from 'jquery'
import { View } from 'backbone.marionette'
import tc from 'teacup'

class NavbarToggleButton extends View
  tagName: 'button'
  className: 'navbar-toggler pull-right'
  attributes:
    type: 'button'
    'data-toggle': 'collapse'
    'data-target': '#navbar-view-collapse'
    'aria-controls': 'navbar-view-collapse'
    'aria-expanded': 'false'
    'aria-label': 'Toggle navigation'
  ui:
    icon: '.fa'
  template: tc.renderable ->
    tc.i '.fa.fa-toggle-down.navbar-toggler-icon'
  events:
    click: "toggleIcon"
  toggleIcon: ->
    icon = @ui.icon
    if icon.hasClass 'fa-toggle-down'
      icon.removeClass 'fa-toggle-down'
      icon.addClass 'fa-toggle-up'
    else
      icon.removeClass 'fa-toggle-up'
      icon.addClass 'fa-toggle-down'
      
export default NavbarToggleButton


