tc = require 'teacup'

########################################
# Misc Templates
########################################
ace_editor_div = tc.renderable () ->
  tc.div '#ace-editor', style:'position:relative;width:100%;height:24em;'
########################################
module.exports =
  ace_editor_div: ace_editor_div
