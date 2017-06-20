Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

require './messages'

message_box = tc.renderable (msg) ->
  lvl = msg.level
  if lvl == 'error'
    lvl = 'danger'
  tc.div ".alert.alert-#{lvl}", ->
    tc.button '.close', type:'button', 'aria-hidden': true, ->
      tc.raw '&times;'
    if msg.icon
      if msg.icon.startsWith 'fa-'
        iclass = ".fa.#{msg.icon}"
      else
        iclass = ".glyphicon.glyphicon-#{msg.icon}"
      tc.span iclass
      tc.raw '&nbsp;&nbsp'
    tc.text msg.content
    
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
  

