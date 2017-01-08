Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

ace = require 'brace'
html_mode = require 'brace/mode/html'
twilight_theme = require 'brace/theme/twilight'
markdown_mode = require 'brace/mode/markdown'

ACEDEFAULTS:
  editorTheme: 'ace/theme/twilight'
  editorMode: 'ace/mode/html'
  
# view must have editorTheme and editorMode set
# or should?
class HasAceEditor extends Backbone.Marionette.Behavior
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
    @view.editor.$blockScrolling = Infinity
    @view.editor.setTheme @options.editorTheme
    if @view.model.has 'doctype'
      @setEditorMode @view.model.get 'doctype'
    if @view?.afterDomRefresh
      @view.afterDomRefresh()
    
  
  
module.exports = HasAceEditor
