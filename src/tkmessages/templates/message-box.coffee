tc = require 'teacup'

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
    
module.exports = message_box
  

