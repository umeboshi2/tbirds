import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import Toolkit from 'marionette.toolkit'
import tc from 'teacup'
import message_box from './templates/message-box'

if __useCssModules__
  require "../../sass/tkmessages.scss"

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

import './dbchannel'

class MessageView extends Marionette.View
  template: tc.renderable (model) ->
    if typeof model.content is 'function'
      model.content model
    else
      message_box model
  ui:
    close_button: 'button.close'
  events:
    'click @ui.close_button': 'destroy_message'
  destroy_message: ->
    MessageChannel.request 'delete-message', @model
    
class MessagesView extends Marionette.CollectionView
  childView: MessageView

class MessagesApp extends Toolkit.App
  initialize: (options) ->
    @collection = MessageChannel.request 'messages'
    view = new MessagesView
      collection: @collection
    @showView view
    
export default MessagesApp
  

