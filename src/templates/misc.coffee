import tc from 'teacup'

########################################
# Misc Templates
########################################
ace_editor_div = tc.renderable () ->
  tc.div '#ace-editor', style:'position:relative;width:100%;height:24em;'
########################################
export {
  ace_editor_div
  }
