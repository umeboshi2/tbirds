Backbone = require 'backbone'

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

display_message = (msg, level) ->
  message = new BaseMessage
    content: msg
    level: level
  main_message_collection.add message
  
MessageChannel.reply 'display-message', (msg, lvl='info') =>
  display_message msg, lvl

for level in ['success', 'info', 'warning', 'danger', 'brand']
  do (level) ->
    MessageChannel.reply level, (msg) =>
      display_message msg, level
      

MessageChannel.reply 'delete-message', (model) =>
  main_message_collection.remove model

module.exports =
  BaseMessageCollection: BaseMessageCollection
  

