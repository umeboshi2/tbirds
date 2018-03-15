import tc from 'teacup'


########################################
# Button Templates
########################################
spanbutton = tc.component (selector, attrs, renderContents) ->
  tc.span "#{selector}.btn.btn-secondary.btn-sm", renderContents

divbutton = tc.component (selector, attrs, renderContents) ->
  tc.div "#{selector}.btn.btn-secondary.btn-sm", renderContents

modal_close_button = tc.renderable (label='Close', icon='close')->
  tc.div '.btn.btn-secondary.btn-sm', 'data-dismiss': 'modal', ->
    tc.h4 '.modal-title', ->
      tc.i ".fa.fa-#{icon}"
      tc.text label

navbar_collapse_button  = tc.renderable (target) ->
  tc.button '.navbar-toggle', type:'button', 'data-toggle':'collapse',
  'data-target': "##{target}", ->
    tc.span '.sr-only', 'Toggle Navigation'
    tc.span '.icon-bar'
    tc.span '.icon-bar'
    tc.span '.icon-bar'

dropdown_toggle = tc.component (selector, attrs, renderContents) ->
  tc.a "#{selector}.dropdown-toggle", href:attrs.href,
  'data-toggle':'dropdown', renderContents

export {
  spanbutton
  divbutton
  modal_close_button
  navbar_collapse_button
  dropdown_toggle
  }
  
