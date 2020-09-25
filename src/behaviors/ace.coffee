import { Behavior } from 'backbone.marionette'


import ace from 'brace'
import html_mode from 'brace/mode/html'
import twilight_theme from 'brace/theme/twilight'
import markdown_mode from 'brace/mode/markdown'

if __DEV__ and DEBUG
  console.log html_mode, twilight_theme, markdown_mode
  
ACEDEFAULTS:
  editorTheme: 'ace/theme/twilight'
  editorMode: 'ace/mode/html'
  
# view must have editorTheme and editorMode set
# or should?
class HasAceEditor extends Behavior
  ui:
    editor: '#ace-editor'
  defaults:
    editorTheme: 'ace/theme/twilight'
    editorMode: 'markdown'

  setEditorMode: (mode) ->
    session = @view.editor.getSession()
    session.setMode "ace/mode/#{mode}"
    
  onDomRefresh: () ->
    @view.editor = ace.edit @view.ui.editor.attr 'id'
    # disable warning:
    # Automatically scrolling cursor into view after selection change
    # this will be disabled in the next version
    # set editor.$blockScrolling = Infinity to disable this message
    defaults = @getOption 'defaults'
    @view.editor.$blockScrolling = Infinity
    @view.editor.setTheme defaults.editorTheme
    if @view.model.has 'doctype'
      doctype = @view.model.get 'doctype'
      if __DEV__
        console.log "doctype is", doctype
      @setEditorMode doctype
    if @view?.afterDomRefresh
      @view.afterDomRefresh()
    
  
  
export default HasAceEditor
