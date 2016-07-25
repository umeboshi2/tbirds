$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

class BaseMessage extends Backbone.Model
  defaults:
    level: 'info'
  
class BaseMessageCollection extends Backbone.Collection
  model: BaseMessage

main_message_collection = new BaseMessageCollection
MessageChannel.reply 'messages', ->
  main_message_collection

MessageChannel.reply 'display-message', (msg, lvl='info') =>
  messages = MessageChannel.request 'messages'
  # FIXME: why not use BaseMessage model?
  Message = new Backbone.Model
    content: msg
    level: lvl
  window.messages = messages
  messages.add Message

MessageChannel.reply 'delete-message', (model) =>
  messages = MessageChannel.request 'messages'
  messages.remove model



module.exports =
  BaseMessageCollection: BaseMessageCollection
  

