import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import tc from 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

  
class NavbarHeaderView extends Marionette.View
  template: tc.renderable (model) ->
    tc.a '.navbar-brand', href:model.url, model.label
  ui:
    brand: '.navbar-brand'
  triggers:
    click: 'click:brand'
export default NavbarHeaderView



