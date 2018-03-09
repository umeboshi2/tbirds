Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'
message_box = require './templates/message-box'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

require './dbchannel'

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
  onBeforeStart: ->
    @collection = MessageChannel.request 'messages'
    @setRegion @options.parentApp.getView().getRegion 'messages'
    
  onStart: ->
    @initPage()

  initPage: ->
    view = new MessagesView
      collection: @collection
    @showView view

module.exports = MessagesApp
  

