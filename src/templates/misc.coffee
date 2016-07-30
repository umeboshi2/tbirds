tc = require 'teacup'

# Main Templates must use teacup.
# The template must be a teacup.renderable, 
# and accept a layout model as an argument.

########################################
# Misc Templates
########################################
message_box = tc.renderable (msg) ->
  lvl = msg.level
  if lvl == 'error'
    lvl = 'danger'
  tc.div ".alert.alert-#{lvl}", ->
    tc.button '.close', type:'button', 'aria-hidden': true, ->
      tc.raw '&times;'
    tc.text msg.content
    
message_box_dismissable = tc.renderable (msg) ->
  lvl = msg.level
  if lvl == 'error'
    lvl = 'danger'
  tc.div ".alert-dismissable.alert.alert-#{lvl}", ->
    tc.button '.close', type:'button', 'data-dismiss':'alert',
    'aria-hidden': true, ->
      tc.raw '&times;'
    tc.text msg.content

ace_editor_div = tc.renderable () ->
  tc.div '#ace-editor', style:'position:relative;width:100%;height:40em;'
########################################
module.exports =
  message_box: message_box
  message_box_dismissable: message_box_dismissable
  ace_editor_div: ace_editor_div
