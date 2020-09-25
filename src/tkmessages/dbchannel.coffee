import { Model, Collection, Radio } from 'backbone'

MessageChannel = Radio.channel 'messages'

class BaseMessage extends Model
  defaults:
    level: 'info'
  
class BaseMessageCollection extends Collection
  model: BaseMessage

main_message_collection = new BaseMessageCollection
MessageChannel.reply 'messages', ->
  main_message_collection

add_message = (msg, level, icon=false, delay=6000) ->
  message = new BaseMessage
    content: msg
    level: level
    icon: icon
  ## FIXME make delay configurable
  #delay = 6000
  unless level is 'danger'
    destroy = -> main_message_collection.remove message
    setTimeout destroy, delay
  main_message_collection.add message
  
MessageChannel.reply 'display-message', (msg, lvl='info', icon=false) ->
  console.warn 'icon', icon
  add_message msg, lvl, icon

levels = [ 'primary', 'secondary', 'success', 'info',
  'warning', 'danger', 'light', 'dark']

for level in levels
  do (level) ->
    MessageChannel.reply level, (msg, icon=false) ->
      add_message msg, level, icon
      

MessageChannel.reply 'delete-message', (model) ->
  main_message_collection.remove model

MessageChannel.reply 'xhr-error', (xhr) ->
  msg = xhr?.responseJSON?.message
  if not msg
    msg = xhr.statusText
  add_message msg, 'danger'
  

export {BaseMessageCollection}


