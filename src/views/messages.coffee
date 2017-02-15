Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MiscTemplates = require './templates/misc'

MessageChannel = Backbone.Radio.channel 'messages'

class MessageView extends Backbone.Marionette.View
  template:MiscTemplates.message_box
  ui:
    close_button: 'button.close'

  events:
    'click @ui.close_button': 'destroy_message'

  destroy_message: ->
    #console.log "Destroy message", @model.get("content")
    MessageChannel.request 'delete-message', @model
    

class MessagesView extends Backbone.Marionette.CollectionView
  childView: MessageView
  
  
module.exports = MessagesView
